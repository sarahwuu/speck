import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// A one-off build used only to produce a single self-contained HTML file
// for publishing as a Claude Artifact — every imported asset (fonts, logo
// PNGs) gets base64-inlined instead of emitted as a separate file, so the
// output has no relative-path dependencies left to resolve.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-artifact',
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
  },
});
