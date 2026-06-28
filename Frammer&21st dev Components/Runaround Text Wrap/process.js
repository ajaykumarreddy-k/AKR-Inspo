import fs from 'fs';

const content = fs.readFileSync('/home/prince/.gemini/antigravity/brain/8297dd75-ab46-4ef7-9fc3-1f5180239a77/.system_generated/steps/20/content.md', 'utf-8');

const lines = content.split('\n');
// skip lines 0 to 3
const codeLines = lines.slice(4);
let code = codeLines.join('\n');

code = code.replace(
  'import{addPropertyControls,ControlType,RenderTarget,useIsStaticRenderer}from"framer";',
  'const addPropertyControls = () => {}; const ControlType = {}; const RenderTarget = { current: () => "canvas" }; const useIsStaticRenderer = () => false;'
);

fs.writeFileSync('/home/prince/ProjectsMain/akr-inspo-component-library (1)/Frammer&21st dev Components/Runaround Text Wrap/src/RunaroundTextWrap.js', code);
