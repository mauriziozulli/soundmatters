import { defineConfig } from 'astro/config';

// Statisch vorgebaut: Netlify liefert nur fertiges HTML aus. Kein Server,
// nichts, was nachts um vier ausfallen kann.
export default defineConfig({
  site: 'https://soundmatters.ch',
  output: 'static',
  build: { inlineStylesheets: 'always' }
});
