const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
const destAnimations = path.join(srcDir, 'src', 'components', 'animations');
const destPublic = path.join(srcDir, 'public', 'code');

fs.mkdirSync(destAnimations, { recursive: true });
fs.mkdirSync(destPublic, { recursive: true });

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
  
  // 1. Save as .tsx for component rendering
  fs.writeFileSync(path.join(destAnimations, `${baseName}.tsx`), content);
  
  // 2. Save as .txt for code preview
  fs.writeFileSync(path.join(destPublic, `${baseName}.txt`), content);
  
  // 3. Remove original to clean up
  fs.unlinkSync(oldPath);
  
  console.log(`Processed ${file} -> ${baseName}.tsx and ${baseName}.txt`);
}

console.log('\n✅ Setup complete! You can now run `bun dev`');
