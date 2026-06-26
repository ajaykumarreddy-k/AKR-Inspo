import fs from 'fs';
const pjson = JSON.parse(fs.readFileSync('./node_modules/@react-three/fiber/package.json', 'utf8'));
console.log('@react-three/fiber version:', pjson.version);

const dreiPjson = JSON.parse(fs.readFileSync('./node_modules/@react-three/drei/package.json', 'utf8'));
console.log('@react-three/drei version:', dreiPjson.version);
