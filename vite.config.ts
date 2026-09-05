import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  // Determine base path for GitHub Pages or other hosts:
  // 1. VITE_BASE_PATH if provided by CI
  // 2. GitHub Actions environment: GITHUB_REPOSITORY="owner/repo-name" -> "/repo-name/"
  // 3. Fallback to './' relative path
  let base = './';
  if (process.env.VITE_BASE_PATH !== undefined) {
    base = process.env.VITE_BASE_PATH
      ? `${process.env.VITE_BASE_PATH}/`.replace(/\/+/g, '/')
      : '/';
  } else if (process.env.GITHUB_REPOSITORY) {
    const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
    base = repoName && repoName.endsWith('.github.io') ? '/' : `/${repoName}/`;
  }

  return {
    base,
    plugins: [react(), tailwindcss()],
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
