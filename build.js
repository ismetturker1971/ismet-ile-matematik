const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

async function build() {
  const outDir = path.resolve(__dirname, 'dist');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  // Bundle app files into a single IIFE so they can run with global React
  await esbuild.build({
    entryPoints: ['entry.jsx'],
    bundle: true,
    minify: true,
    sourcemap: false,
    outfile: path.join(outDir, 'bundle.js'),
    loader: { '.jsx': 'jsx' },
    format: 'iife',
    globalName: 'AppBundle'
  });

  // copy image-slot.js as-is (it's a custom element script)
  fs.copyFileSync(path.resolve(__dirname, 'image-slot.js'), path.join(outDir, 'image-slot.js'));

  // Read original index.html and remove existing <script> tags, then inject production React + bundle
  const indexSrc = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8');
  // remove all script tags
  const stripped = indexSrc.replace(/<script[\s\S]*?<\/script>/gi, '');

  const reactScripts = [
    '<script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>',
    '<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>',
    '<script src="./image-slot.js"></script>',
    '<script src="./bundle.js"></script>'
  ].join('\n');

  const final = stripped.replace('</body>', reactScripts + '\n</body>');
  fs.writeFileSync(path.join(outDir, 'index.html'), final, 'utf8');

  console.log('Build complete. Output in ./dist');
}

build().catch((e) => { console.error(e); process.exit(1); });
