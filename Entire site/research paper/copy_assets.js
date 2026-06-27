const fs = require('fs');
const path = require('path');

const srcDir = '/home/prince/.gemini/antigravity/brain/f194a952-f0a2-470b-908f-3ea6c92d5517';
const destDir = '/home/prince/ProjectsMain/akr-inspo-component-library (1)/Entire site/research paper/assets';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = [
  { src: 'abstract_bw_1_1782564134186.png', dest: 'abstract_bw_1.png' },
  { src: 'abstract_bw_2_1782564147883.png', dest: 'abstract_bw_2.png' },
  { src: 'abstract_bw_3_1782564160616.png', dest: 'abstract_bw_3.png' },
  { src: 'yellow_butterfly_1782564111996.png', dest: 'yellow_butterfly.png' },
  { src: 'yellow_lines_1782564122704.png', dest: 'yellow_lines.png' }
];

files.forEach(f => {
  fs.copyFileSync(path.join(srcDir, f.src), path.join(destDir, f.dest));
});
console.log('Copied assets');
