import { readdirSync, existsSync, statSync, readFileSync, writeFileSync, mkdirSync, renameSync } from 'fs';
import { join } from 'path';

const projects = [];

// Function to find nested projects
function findProjects(dir, depth = 0) {
  if (depth > 5) return; // limit depth
  
  let entries;
  try {
    entries = readdirSync(dir);
  } catch (e) {
    return;
  }
  
  let hasIndexHtml = entries.includes('index.html');
  const isIgnored = dir.includes('node_modules') || dir.includes('dist') || dir.includes('.git') || dir.includes('public') || dir.includes('assets') || dir.includes('Resource-Boy');

  // Auto-rename solitary .html files to index.html
  if (!hasIndexHtml) {
    const htmlFiles = entries.filter(e => e.endsWith('.html'));
    if (htmlFiles.length === 1) {
      const oldPath = join(dir, htmlFiles[0]);
      const newPath = join(dir, 'index.html');
      try {
        renameSync(oldPath, newPath);
        console.log(`  -> Renamed ${htmlFiles[0]} to index.html for ${dir}`);
        hasIndexHtml = true;
        entries.push('index.html');
      } catch (e) {
        console.error(`  -> Failed to rename ${htmlFiles[0]} in ${dir}`, e);
      }
    }
  }
  
  // Auto-promote src/index.html to root if missing
  if (!hasIndexHtml && entries.includes('src')) {
    const srcIndexPath = join(dir, 'src', 'index.html');
    if (existsSync(srcIndexPath)) {
      try {
        let html = readFileSync(srcIndexPath, 'utf-8');
        // Rewrite relative paths for standard web assets to point to ./src/
        html = html.replace(/(src|href)="(?!\/|http)([^"]+\.(?:tsx|ts|jsx|js|css|svg|png|jpg|jpeg|ico|json|webmanifest))"/g, '$1="./src/$2"');
        writeFileSync(join(dir, 'index.html'), html);
        console.log(`  -> Auto-promoted src/index.html to root for ${dir}`);
        hasIndexHtml = true;
      } catch(e) {}
    }
  }

  if (hasIndexHtml && dir !== '.' && !isIgnored) {
    console.log(`Found project endpoint at: ${dir}`);
    
    // 1. Fix the index.html script tag to use relative paths so Vite can serve it
    const indexPath = join(dir, 'index.html');
    try {
      let html = readFileSync(indexPath, 'utf-8');
      if (html.includes('src="/src/')) {
        html = html.replace(/src="\/src\//g, 'src="./src/');
        writeFileSync(indexPath, html);
        console.log(`  -> Fixed absolute paths in ${indexPath}`);
      }
    } catch (e) {
      console.error(`  -> Failed to read/write ${indexPath}`);
    }

    // 2. Determine a clean name for the project
    let name = dir.split('/').pop();
    let isCustomName = false;
    if (entries.includes('package.json')) {
      try {
        const pkg = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf-8'));
        if (pkg.name && pkg.name !== 'react-example' && pkg.name !== 'vite-react-typescript-starter') {
            name = pkg.name;
            isCustomName = true;
        }
      } catch(e){}
    }

    // 3. Find a thumbnail image
    let thumbnail = null;
    const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'webp'];
    try {
      const projEntries = readdirSync(dir, { withFileTypes: true });
      for (const entry of projEntries) {
        if (entry.isFile()) {
          const ext = entry.name.toLowerCase().split('.').pop();
          if (imageExtensions.includes(ext)) {
            thumbnail = `${dir}/${entry.name}`.replace(/\\/g, '/');
            break;
          }
        }
      }
      if (!thumbnail) {
        // Look one level deep
        for (const entry of projEntries) {
          if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git') {
            const subDir = join(dir, entry.name);
            const subEntries = readdirSync(subDir, { withFileTypes: true });
            for (const sub of subEntries) {
              if (sub.isFile()) {
                const ext = sub.name.toLowerCase().split('.').pop();
                if (imageExtensions.includes(ext)) {
                  thumbnail = `${dir}/${entry.name}/${sub.name}`.replace(/\\/g, '/');
                  break;
                }
              }
            }
            if (thumbnail) break;
          }
        }
      }
    } catch (e) {}

    // Convert folder path to a URL path
    const urlPath = `/${dir}/index.html`.replace(/\\/g, '/');
    
    projects.push({
      id: dir.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase(),
      name: isCustomName ? name : name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      path: urlPath,
      folder: dir,
      thumbnail: thumbnail
    });
    
    return; // Don't scan deeper inside this project
  }

  for (const entry of entries) {
    if (entry === 'node_modules' || entry === '.git' || entry === 'dist' || entry === 'public' || entry === 'src' || entry === 'assets' || entry.startsWith('Resource-Boy')) continue;
    const fullPath = join(dir, entry);
    try {
      if (statSync(fullPath).isDirectory()) {
        findProjects(fullPath, depth + 1);
      }
    } catch (e) {
      // ignore permission errors
    }
  }
}

console.log('🔍 Scanning for nested frontend projects...');
findProjects('.');

// Ensure data directory exists
const dataDir = join('.', 'src', 'data');
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

// Write the dynamic project list so the React app can render them
writeFileSync(
  join(dataDir, 'projects.json'), 
  JSON.stringify(projects, null, 2)
);

console.log(`✅ Automatically registered ${projects.length} separate endpoints!`);
