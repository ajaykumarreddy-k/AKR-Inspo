import fs from 'fs';
import path from 'path';

const srcDir = process.cwd();
const destAnimations = path.join(srcDir, 'src', 'components', 'animations');

fs.mkdirSync(destAnimations, { recursive: true });

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
  
  // Check if it is a React component
  const isReact = content.includes('import ') || content.includes('use client') || content.includes('export default');
  
  if (isReact) {
    fs.writeFileSync(path.join(destAnimations, `${baseName}.tsx`), content);
    console.log(`✅ Generated ${baseName}.tsx for React component`);
  } else {
    console.log(`⏭️  Skipped ${file} (Not a React component, will render via HTML monolithic iframe)`);
  }
}

console.log('\n✅ Safe setup complete!');
