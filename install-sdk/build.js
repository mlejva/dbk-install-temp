const esbuild = require('esbuild');
const path = require('path');

const isDev = process.env.NODE_ENV === 'dev';

const makeAllPackagesExternalPlugin = {
  name: 'make-all-packages-external',
  setup(build) {
    const filter = /^[^./]|^\.[^./]|^\.\.[^/]/; // Must not start with "/" or "./" or "../"
    build.onResolve({ filter }, (args) => ({
      path: args.path,
      external: true,
    }));
  },
};

esbuild
  .build({
    bundle: true,
    minify: !isDev,
    tsconfig: 'tsconfig.json',
    platform: 'node',
    target: 'node16.2',
    sourcemap: isDev ? 'inline' : false,
    treeShaking: true,
    plugins: [makeAllPackagesExternalPlugin],
    outdir: 'dist',
    entryPoints: [path.join('src', 'index.ts')],
  })
  .catch(() => process.exit(1));