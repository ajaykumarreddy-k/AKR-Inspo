import { spawn } from 'child_process';
import { readdirSync, existsSync, statSync, readFileSync } from 'fs';
import { join } from 'path';

const processes = [];
let colorIndex = 0;
const colors = ['\x1b[36m', '\x1b[32m', '\x1b[33m', '\x1b[35m', '\x1b[34m'];
const resetColor = '\x1b[0m';

function startProcess(name, command, args, cwd) {
  const color = colors[colorIndex % colors.length];
  colorIndex++;

  console.log(`${color}[${name}] Starting in ${cwd}...${resetColor}`);
  
  const proc = spawn(command, args, {
    cwd: cwd,
    shell: true,
    stdio: 'pipe'
  });

  proc.stdout.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach(line => {
      if (line.trim()) console.log(`${color}[${name}]${resetColor} ${line}`);
    });
  });

  proc.stderr.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach(line => {
      if (line.trim()) console.error(`${color}[${name}]${resetColor} ${line}`);
    });
  });

  proc.on('close', (code) => {
    console.log(`${color}[${name}] Exited with code ${code}${resetColor}`);
  });

  processes.push(proc);
}

// Start root dev server
startProcess('ROOT', 'vite', ['--port=3000', '--host=0.0.0.0'], '.');

// Function to find nested projects
function findProjects(dir, depth = 0) {
  if (depth > 2) return; // limit depth to avoid scanning too deep
  
  let entries;
  try {
    entries = readdirSync(dir);
  } catch (e) {
    return;
  }
  
  // Check if directory has a package.json with a dev script and bun.lock / bun.lockb
  const hasPackageJson = entries.includes('package.json');
  const hasBunLock = entries.includes('bun.lock') || entries.includes('bun.lockb');
  
  if (hasPackageJson && dir !== '.') {
    try {
      const pkg = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf-8'));
      if (pkg.scripts && pkg.scripts.dev) {
        // If it has a dev script, run it!
        const projectName = pkg.name || dir.split('/').pop() || 'sub-project';
        startProcess(projectName, 'bun', ['run', 'dev'], dir);
        return; // Don't scan inside this project's folders anymore
      }
    } catch (e) {
      // ignore parse errors
    }
  }

  for (const entry of entries) {
    if (entry === 'node_modules' || entry === '.git' || entry === 'dist' || entry === 'public' || entry === 'src') continue;
    const fullPath = join(dir, entry);
    try {
      if (statSync(fullPath).isDirectory()) {
        findProjects(fullPath, depth + 1);
      }
    } catch (e) {
      // ignore permission errors
    }
  }
}

console.log('\n🔍 Scanning for nested Bun projects...\n');
findProjects('.');

// Handle termination cleanly
process.on('SIGINT', () => {
  console.log('\nStopping all dev servers...');
  processes.forEach(p => p.kill('SIGINT'));
  process.exit();
});
process.on('SIGTERM', () => {
  processes.forEach(p => p.kill('SIGTERM'));
  process.exit();
});
