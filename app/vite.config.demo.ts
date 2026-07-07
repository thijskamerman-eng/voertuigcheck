import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Standalone single-file build used only for the shareable preview artifact.
// No PWA/service-worker (meaningless in a sandboxed iframe) and no external font requests.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: 'dist-demo',
    cssCodeSplit: false,
  },
});
