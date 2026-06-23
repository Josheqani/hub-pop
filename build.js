import * as esbuild from 'esbuild';
import { execSync } from 'node:child_process';

const watch = process.argv.includes('--watch');

/** Shared esbuild config for every output format. */
const shared = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'browser',
  target: ['es2019'],
  sourcemap: true,
  logLevel: 'info',
};

/** One config per build output. */
const builds = [
  // CommonJS — package "main"
  { ...shared, format: 'cjs', outfile: 'dist/index.js' },
  // ES module — package "module"
  { ...shared, format: 'esm', outfile: 'dist/index.esm.js' },
  // Minified IIFE for <script> / CDN use. Exposes a global `HubPop` function.
  {
    ...shared,
    format: 'iife',
    globalName: 'HubPopModule',
    outfile: 'dist/index.min.js',
    minify: true,
    sourcemap: false,
    footer: {
      js: 'window.HubPop=HubPopModule.HubPop;window.HubPop.default=HubPopModule.default;',
    },
  },
];

/** Emit dist/*.d.ts via the TypeScript compiler (esbuild can't generate types). */
function emitTypes() {
  try {
    execSync('npx tsc --project tsconfig.json', { stdio: 'inherit' });
    console.log('✓ type declarations emitted');
  } catch (err) {
    console.error('✗ failed to emit type declarations:', err.message);
  }
}

async function run() {
  if (watch) {
    for (const cfg of builds) {
      const ctx = await esbuild.context(cfg);
      await ctx.watch();
    }
    console.log('watching for changes…');
  } else {
    await Promise.all(builds.map((cfg) => esbuild.build(cfg)));
    emitTypes();
    console.log('✓ build complete');
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
