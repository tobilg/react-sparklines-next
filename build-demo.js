const esbuild = require('esbuild');
const http = require('http');
const path = require('path');
const fs = require('fs');

const isWatch = process.argv.includes('--watch');

const buildOptions = {
  entryPoints: ['demo/demo.js'],
  bundle: true,
  outfile: 'demo/demo.build.js',
  loader: {
    '.js': 'jsx'
  },
  sourcemap: true
};

if (isWatch) {
  // Development mode with dev server
  esbuild.context(buildOptions).then(ctx => {
    ctx.watch();

    // Simple dev server
    const server = http.createServer((req, res) => {
      const filePath = req.url === '/' ? '/index.html' : req.url;
      const fullPath = path.join(__dirname, 'demo', filePath);

      fs.readFile(fullPath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end('Not found');
          return;
        }

        const ext = path.extname(fullPath);
        const contentType = {
          '.html': 'text/html',
          '.js': 'application/javascript',
          '.css': 'text/css'
        }[ext] || 'text/plain';

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      });
    });

    server.listen(8080);
    console.log('✓ Demo server running at http://localhost:8080');
  });
} else {
  // Production build
  esbuild.build(buildOptions).then(() => {
    console.log('✓ Demo build complete');
  }).catch(() => process.exit(1));
}
