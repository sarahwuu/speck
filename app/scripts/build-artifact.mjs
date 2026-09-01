// Combines the vite.artifact.config.js build output (index.html + one JS
// chunk + one CSS chunk, all other assets already base64-inlined into
// those two) into a single self-contained HTML fragment suitable for
// publishing as a Claude Artifact.
import { readFileSync, writeFileSync } from 'node:fs';
import { globSync } from 'node:fs';
import path from 'node:path';

const distDir = path.resolve(import.meta.dirname, '../dist-artifact');

const jsFile = globSync(path.join(distDir, 'assets/*.js'))[0];
const cssFile = globSync(path.join(distDir, 'assets/*.css'))[0];
if (!jsFile || !cssFile) throw new Error('Expected exactly one JS and one CSS chunk in dist-artifact/assets');

const js = readFileSync(jsFile, 'utf8');
const css = readFileSync(cssFile, 'utf8');

const out = `<title>speck</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Libertinus+Serif:ital,wght@0,400;1,400&display=swap">
<style>
${css}
</style>
<div id="root"></div>
<script type="module">
${js}
</script>
`;

const outPath = path.resolve(import.meta.dirname, '../dist-artifact/speck.artifact.html');
writeFileSync(outPath, out);
console.log('wrote', outPath, `(${(out.length / 1024).toFixed(0)} KB)`);
