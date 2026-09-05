import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

// Plugin to ensure GitHub Pages SPA compatibility (generates 404.html and .nojekyll in dist)
function githubPagesSpa(): Plugin {
  return {
    name: 'github-pages-spa-helper',
    closeBundle() {
      try {
        const distDir = path.resolve(__dirname, 'dist');
        const indexPath = path.join(distDir, 'index.html');
        const notFoundPath = path.join(distDir, '404.html');
        const noJekyllPath = path.join(distDir, '.nojekyll');

        // Copy index.html to 404.html so direct URL reloads work seamlessly on GitHub Pages
        if (fs.existsSync(indexPath)) {
          fs.copyFileSync(indexPath, notFoundPath);
        }

        // Ensure .nojekyll exists to prevent GitHub Pages Jekyll engine from ignoring files
        if (!fs.existsSync(noJekyllPath)) {
          fs.writeFileSync(noJekyllPath, '');
        }
      } catch (err) {
        console.warn('Warning: Could not create GitHub Pages fallback files:', err);
      }
    },
  };
}

export default defineConfig(() => {
  // Determine base path for GitHub Pages or other hosts:
  let base = './';

  // 1. Explicit VITE_BASE_PATH set in CI or env (e.g. "/satun-wildlife" or "/repo")
  if (process.env.VITE_BASE_PATH && process.env.VITE_BASE_PATH.trim() !== '' && process.env.VITE_BASE_PATH !== '/') {
    base = `${process.env.VITE_BASE_PATH}/`.replace(/\/+/g, '/');
  }
  // 2. Automatically detect GitHub Actions environment: GITHUB_REPOSITORY="owner/repo-name"
  else if (process.env.GITHUB_REPOSITORY) {
    const parts = process.env.GITHUB_REPOSITORY.split('/');
    if (parts.length === 2) {
      const [owner, repo] = parts;
      base = repo && repo.toLowerCase() === `${owner.toLowerCase()}.github.io` ? '/' : `/${repo}/`;
    }
  }

  return {
    base,
    plugins: [react(), tailwindcss(), githubPagesSpa()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    preview: {
      port: 3000,
      host: '0.0.0.0',
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
    },
  };
});
