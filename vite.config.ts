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
} catch (err) {
  console.error('Error copying assets:', err);
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
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
