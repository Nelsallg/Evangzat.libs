import { defineConfig } from 'vite';

export default defineConfig({
  // Point d'entrée de l'application
  // Ici, le fichier principal est main.ts
  // Vous pouvez ajuster cela en fonction de votre structure de projet
  root: './src',
  base: '/',
  plugins: [],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true,
  },
});
