import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';

// Automatically copy the resume PDF, me.png, and logo.png assets to this project's public folder on Vite reload.
try {
  const destPublic = '/home/prince/ProjectsMain/akr-inspo-component-library (1)/public';
  fs.mkdirSync(destPublic, { recursive: true });

  // 1. Copy Resume PDF
  const srcFile = '/home/prince/ProjectsMain/forever dev portfolio/trails/Alltogther/public/Resume/KRISHNAREDDY GARI AJAY KUMAR REDDY_Doc.pdf';
  const destDir = path.join(destPublic, 'Resume');
  if (fs.existsSync(srcFile)) {
    fs.mkdirSync(destDir, { recursive: true });
    fs.copyFileSync(srcFile, path.join(destDir, 'KRISHNAREDDY GARI AJAY KUMAR REDDY_Doc.pdf'));
    console.log('Successfully copied resume PDF file!');
  }

  // 2. Copy Profile Image
  const srcImg = '/home/prince/ProjectsMain/forever dev portfolio/trails/Alltogther/public/me.png';
  if (fs.existsSync(srcImg)) {
    fs.copyFileSync(srcImg, path.join(destPublic, 'me.png'));
    console.log('Successfully copied profile image me.png!');
  }

  // 3. Copy Logo Image
  const srcLogo = '/home/prince/ProjectsMain/akr-inspo-component-library (1)/assets/logo.png';
  if (fs.existsSync(srcLogo)) {
    fs.copyFileSync(srcLogo, path.join(destPublic, 'logo.png'));
    console.log('Successfully copied logo.png!');
  }

  // 4. Automatically Reorganize Components-maintiles
  const baseTiles = '/home/prince/ProjectsMain/akr-inspo-component-library (1)/Components-maintiles';
  if (fs.existsSync(baseTiles)) {
    const moves: [string, string][] = [
      // UI-Components (from components/compo1/)
      ["components/compo1/compo1.html", "UI-Components/compo1/compo1.html"],
      ["components/compo1/compo1.png",  "UI-Components/compo1/compo1.png"],
      ["components/compo1/compo2.html", "UI-Components/compo2/compo2.html"],
      ["components/compo1/compo2.png",  "UI-Components/compo2/compo2.png"],
      
      // UI-Components c3-c6, c8-c11
      ...[3,4,5,6,8,9,10,11].map(n => ["components/compo1/c" + n + ".html", "UI-Components/c" + n + "/c" + n + ".html"] as [string, string]),
      ...[3,4,5,6,8,9,10,11].map(n => ["components/compo1/c" + n + ".png",  "UI-Components/c" + n + "/c" + n + ".png"] as [string, string]),
      
      // UI-Components c7
      ["components/c7.html", "UI-Components/c7/c7.html"],
      ["components/c7.png",  "UI-Components/c7/c7.png"],
      
      // Page-Templates
      ["Trvel agency/index.html",        "Page-Templates/travel-agency/travel-agency.html"],
      ["Trvel agency/designref.png",     "Page-Templates/travel-agency/travel-agency.png"],
      ["Trvel agency/roundedcorner.html","Page-Templates/travel-agency/roundedcorner.html"],
      
      // Themes t1-t6
      ...[1,2,3,4,5,6].map(i => ["theme/t" + i + ".html", "Themes/t" + i + "/t" + i + ".html"] as [string, string]),
      ...[1,2,3,4,5,6].map(i => ["theme/t" + i + ".png",  "Themes/t" + i + "/t" + i + ".png"] as [string, string]),
      
      // Theme-unique
      ["theme-unique/index.html", "Themes/theme-unique/theme-unique.html"],
      ["theme-unique/image.png",  "Themes/theme-unique/theme-unique.png"],
      
      // Testimonials
      ["testimonials/1.html", "Testimonials/ts1/ts1.html"],
      ["testimonials/1.png",  "Testimonials/ts1/ts1.png"],
      
      // Flows-Layouts
      ["Flow/c1.html", "Flows-Layouts/fl1/fl1.html"],
      ["Flow/c1.png",  "Flows-Layouts/fl1/fl1.png"],

      // Footers (c1-c9 -> f1-f9)
      ...[1,2,3,4,5,6,7,8,9].map(n => ["footer/c" + n + ".html", "Footers/f" + n + "/f" + n + ".html"] as [string, string]),
      ...[1,2,3,4,5,6,7,8,9].map(n => ["footer/c" + n + ".png",  "Footers/f" + n + "/f" + n + ".png"] as [string, string]),
    ];

    let movedCount = 0;
    for (const [srcRel, destRel] of moves) {
      const srcPath = path.join(baseTiles, srcRel);
      const destPath = path.join(baseTiles, destRel);
      if (fs.existsSync(srcPath)) {
        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        fs.renameSync(srcPath, destPath);
        movedCount++;
      }
    }
    if (movedCount > 0) {
      console.log(`Successfully reorganized ${movedCount} component files!`);
    }

    // Clean up old directories if they exist
    const oldDirs = [
      "components/compo1",
      "components",
      "Trvel agency",
      "theme",
      "theme-unique",
      "footer",
      "testimonials",
      "Flow"
    ];
    for (const oldRel of oldDirs) {
      const oldPath = path.join(baseTiles, oldRel);
      if (fs.existsSync(oldPath)) {
        try {
          fs.rmdirSync(oldPath);
          console.log(`Cleaned up empty directory: ${oldRel}`);
        } catch (e) {
          try {
            fs.rmSync(oldPath, { recursive: true, force: true });
            console.log(`Cleaned up directory recursively: ${oldRel}`);
          } catch (err) {
            console.error(`Error cleaning up directory ${oldRel}:`, err);
          }
        }
      }
    }
  }
} catch (err) {
  console.error('Error copying assets or reorganizing tiles:', err);
}

export default defineConfig(() => {
  const inputs: Record<string, string> = {
    main: path.resolve(__dirname, 'index.html')
  };
  const projectsJsonPath = path.resolve(__dirname, 'src/data/projects.json');
  if (fs.existsSync(projectsJsonPath)) {
    try {
      const projects = JSON.parse(fs.readFileSync(projectsJsonPath, 'utf-8'));
      projects.forEach((p: any) => {
        if (p.id && p.folder) {
          inputs[p.id] = path.resolve(__dirname, p.folder, 'index.html');
        }
      });
    } catch (e) {
      console.error('Failed to parse projects.json', e);
    }
  }

  return {
    build: {
      rollupOptions: {
        input: inputs
      }
    },
    optimizeDeps: {
      force: true
    },
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'universal-alias',
        enforce: 'pre',
        async resolveId(source, importer, options) {
          if (source.startsWith('@/')) {
            let baseDir = path.resolve(__dirname, 'src'); // Default for root project
            
            if (importer) {
              const relativeImporter = path.relative(__dirname, importer);
              const topLevelFolder = relativeImporter.split(path.sep)[0];
              if (topLevelFolder && topLevelFolder !== 'src' && !topLevelFolder.startsWith('..')) {
                const subProjectSrc = path.resolve(__dirname, topLevelFolder, 'src');
                if (fs.existsSync(subProjectSrc)) {
                  baseDir = subProjectSrc;
                }
              }
            }
            
            const resolvedPath = path.resolve(baseDir, source.slice(2));
            
            // Try Vite's internal resolution first
            const resolution = await this.resolve(resolvedPath, importer, { skipSelf: true, ...options });
            if (resolution) return resolution;

            // Manual fallback for extensions
            const exts = ['.tsx', '.ts', '.jsx', '.js', '.json', '.css'];
            for (const ext of exts) {
               if (fs.existsSync(resolvedPath + ext)) return resolvedPath + ext;
            }
            if (fs.existsSync(resolvedPath + '/index.tsx')) return resolvedPath + '/index.tsx';
            if (fs.existsSync(resolvedPath + '/index.ts')) return resolvedPath + '/index.ts';
            if (fs.existsSync(resolvedPath)) return resolvedPath;
          }
          return null;
        }
      }
    ],
    resolve: {
      dedupe: ['react', 'react-dom'],
      alias: {
        'react': path.resolve(__dirname, 'node_modules/react'),
        'react-dom': path.resolve(__dirname, 'node_modules/react-dom')
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
