const fs = require('fs');
const path = require('path');

const dir = __dirname;
const targetDir = path.join(dir, 'src', 'components', 'animations');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const files = fs.readdirSync(dir);
for (const file of files) {
  if (file.endsWith('.md') && file !== 'README.md' && file !== 'CLAUDE.md' && file !== 'Bidirectional.md' && file !== 'Drawapath.md' && file !== 'Gradients.md' && file !== 'Horizontaltext.md' && file !== 'Stickyelemet.md' && file !== 'animatealongpath.md' && file !== 'cardstack.md' && file !== 'footerbounce.md' && file !== 'imagefollowcurser.md' && file !== 'imagerevealonhover.md' && file !== 'imagestackup.md' && file !== 'liquidGlass.md' && file !== 'noise.md' && file !== 'scrollwaypointsmd' && file !== 'smoothscroll.md' && file !== 'smoothscrolling.md' && file !== 'swapanddrag.md' && file !== 'textanimation.md' && file !== 'unidirection.md') {
      // This is a complex way of matching the files. Actually, let's just match the specific files.
  }
}

const targetFiles = [
  'Bidirectional.md', 'Drawapath.md', 'Gradients.md', 'Horizontaltext.md', 'Stickyelemet.md',
  'animatealongpath.md', 'cardstack.md', 'footerbounce.md', 'imagefollowcurser.md', 'imagerevealonhover.md',
  'imagestackup.md', 'liquidGlass.md', 'noise.md', 'scrollwaypointsmd', 'smoothscroll.md',
  'smoothscrolling.md', 'swapanddrag.md', 'textanimation.md', 'unidirection.md'
];

for (const file of targetFiles) {
  const oldPath = path.join(dir, file);
  if (fs.existsSync(oldPath)) {
    const newFile = file.endsWith('.md') ? file.replace('.md', '.tsx') : file + '.tsx';
    const newPath = path.join(targetDir, newFile);
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed ${file} to ${newFile}`);
  }
}
