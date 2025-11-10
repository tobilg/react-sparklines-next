const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['index.js'],
  bundle: true,
  outfile: 'build/index.js',
  format: 'cjs',
  platform: 'neutral',
  external: ['react', 'react-dom', 'prop-types'],
  loader: {
    '.js': 'jsx'
  },
  minify: true,
  sourcemap: true
}).then(() => {
  console.log('✓ Build complete');
}).catch(() => process.exit(1));
