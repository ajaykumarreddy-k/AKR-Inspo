import { readFileSync, writeFileSync, renameSync, existsSync } from 'fs';
import { join, dirname } from 'path';

// Fix t6
const t6Dir = join('Components-maintiles', 'Themes', 't6');
if (existsSync(join(t6Dir, 'index.html'))) {
  const content = readFileSync(join(t6Dir, 'index.html'), 'utf-8');
  if (content.includes('import React')) {
    renameSync(join(t6Dir, 'index.html'), join(t6Dir, 'App.tsx'));
    writeFileSync(join(t6Dir, 'main.tsx'), `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../../../src/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`);
    writeFileSync(join(t6Dir, 'index.html'), `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Theme 6</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./main.tsx"></script>
  </body>
</html>`);
    console.log('Fixed t6');
  }
}

// Fix t8
const t8Dir = join('Components-maintiles', 'Themes', 't8');
if (existsSync(join(t8Dir, 'index.html'))) {
  const content = readFileSync(join(t8Dir, 'index.html'), 'utf-8');
  if (content.includes('import React')) {
    renameSync(join(t8Dir, 'index.html'), join(t8Dir, 'App.tsx'));
    writeFileSync(join(t8Dir, 'main.tsx'), `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../../../src/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`);
    writeFileSync(join(t8Dir, 'index.html'), `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Theme 8</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./main.tsx"></script>
  </body>
</html>`);
    console.log('Fixed t8');
  }
}

// Fix f2
const f2Dir = join('Components-maintiles', 'Footers', 'f2');
if (existsSync(join(f2Dir, 'index.html'))) {
  const content = readFileSync(join(f2Dir, 'index.html'), 'utf-8');
  if (content.includes('import React')) {
    renameSync(join(f2Dir, 'index.html'), join(f2Dir, 'App.tsx'));
    writeFileSync(join(f2Dir, 'main.tsx'), `import React from 'react';
import ReactDOM from 'react-dom/client';
import { Skiper39 } from './App';
import '../../../src/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Skiper39 />
  </React.StrictMode>
);`);
    writeFileSync(join(f2Dir, 'index.html'), `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Footer 2</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./main.tsx"></script>
  </body>
</html>`);
    console.log('Fixed f2');
  }
}

console.log('Done fixing React HTML files!');
