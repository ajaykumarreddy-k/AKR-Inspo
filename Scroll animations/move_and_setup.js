const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
const mdFilesDir = path.join(srcDir, 'md files');
const destAnimations = path.join(srcDir, 'src', 'components', 'animations');

// Create directories
fs.mkdirSync(mdFilesDir, { recursive: true });
fs.mkdirSync(destAnimations, { recursive: true });

// Read files from root
const files = fs.readdirSync(srcDir).filter(f => 
  f.endsWith('.md') && 
  !['README.md', 'CLAUDE.md', 'implementation_plan.md', 'task.md', 'walkthrough.md'].includes(f)
);

if (fs.existsSync(path.join(srcDir, 'scrollwaypointsmd'))) {
  files.push('scrollwaypointsmd');
}

for (const file of files) {
  const oldPath = path.join(srcDir, file);
  const content = fs.readFileSync(oldPath, 'utf-8');
  const baseName = file.endsWith('.md') ? file.replace('.md', '') : file;
  
  // 1. Move the markdown file into `md files` directory
  const newMdPath = path.join(mdFilesDir, file.endsWith('.md') ? file : `${file}.md`);
  fs.renameSync(oldPath, newMdPath);
  
  // 2. Determine if it's a React component
  const isReact = content.includes('import ') || content.includes('export default') || content.includes('use client');
  
  // 3. Save as .tsx for component rendering ONLY if it is a React component
  if (isReact) {
    fs.writeFileSync(path.join(destAnimations, `${baseName}.tsx`), content);
    console.log(`✅ Processed ${file}: Moved to md files/ and generated React component ${baseName}.tsx`);
  } else {
    console.log(`✅ Processed ${file}: Moved to md files/ (Kept as HTML/CSS/JS monolithic file)`);
  }
}

console.log('\nAll files moved and React components generated successfully!');
