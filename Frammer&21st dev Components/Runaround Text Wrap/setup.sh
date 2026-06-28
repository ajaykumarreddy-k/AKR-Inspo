#!/bin/bash
mkdir -p src
tail -n +5 "/home/prince/.gemini/antigravity/brain/8297dd75-ab46-4ef7-9fc3-1f5180239a77/.system_generated/steps/20/content.md" > src/RunaroundTextWrap.js

# Remove framer dependencies to make it standalone (optional but recommended for Vite)
sed -i 's/import{addPropertyControls,ControlType,RenderTarget,useIsStaticRenderer}from"framer";/const addPropertyControls = () => {}; const ControlType = {}; const RenderTarget = { current: () => "canvas" }; const useIsStaticRenderer = () => false;/g' src/RunaroundTextWrap.js

echo "Component successfully extracted and patched."
