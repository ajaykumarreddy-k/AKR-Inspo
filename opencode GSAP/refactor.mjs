import fs from 'fs';
import path from 'path';

const appPath = path.resolve('src/App.tsx');
let code = fs.readFileSync(appPath, 'utf8');

// 1. Add React imports
if (!code.includes('import React, { lazy, Suspense }')) {
  code = code.replace(
    "import { ComponentPreview } from './components/playground/preview/ComponentPreview'",
    "import React, { lazy, Suspense } from 'react';\nimport { ComponentPreview } from './components/playground/preview/ComponentPreview'"
  );
}

// 2. Regex to replace static component imports with React.lazy
// Matches: import ComponentName from './path/to/component'
// Specifically targeting the animations and demos folders to avoid breaking base UI components.
const importRegex = /^import\s+([A-Z]\w+)\s+from\s+'(\.\/(animations|components\/playground\/demos)\/[^']+)'$/gm;

let replacedCount = 0;
code = code.replace(importRegex, (match, componentName, importPath) => {
  replacedCount++;
  return `const ${componentName} = lazy(() => import('${importPath}'));`;
});

// 3. Wrap the main component area in a Suspense boundary
if (!code.includes('<Suspense fallback')) {
  code = code.replace(
    /<main className="relative z-10([^>]+)">/,
    `<main className="relative z-10$1">\n        <Suspense fallback={\n          <div className="h-96 w-full flex flex-col items-center justify-center border border-white/5 rounded-2xl glass-light animate-pulse-glow">\n            <div className="w-12 h-12 rounded-full border-2 border-[var(--color-accent)] border-t-transparent animate-spin mb-4"></div>\n            <span className="text-white/60 text-lg font-medium tracking-wide">Loading Premium Components...</span>\n          </div>\n        }>`
  );
  
  // Find the closing main tag
  code = code.replace(
    /<\/main>/,
    `        </Suspense>\n      </main>`
  );
}

fs.writeFileSync(appPath, code);
console.log(`\n✅ Success! App.tsx successfully refactored.`);
console.log(`🚀 Converted ${replacedCount} static components to React.lazy dynamic imports!`);
