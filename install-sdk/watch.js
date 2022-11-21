const esbuild = require('esbuild');
const path = require('path');

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
    watch: {
      onRebuild(err, result) {
        if (err) console.error('ESBuild: Watch build failed:', new Date(), err)
        else console.log('ESBuild: Watch build succeeded:', new Date(), result)
      }
    },
    minify: false,
    tsconfig: 'tsconfig.json',
    platform: 'node',
    target: 'node16.2',
    sourcemap: 'inline',
    treeShaking: true,
    plugins: [makeAllPackagesExternalPlugin],
    outdir: 'dist',
    entryPoints: [path.join('src', 'index.ts')],
  })
  .then(() => {
    console.log('ESBuild: Watching code...')
  })
  .catch(() => process.exit(1));