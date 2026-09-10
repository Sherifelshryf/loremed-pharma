/**
 * Copies the Sveltia CMS bundle out of node_modules into public/admin/ so the
 * editor is served from our own origin.
 *
 * Why not a CDN script tag: the site's Content-Security-Policy is
 * script-src 'self'. Pointing at a CDN would mean either the editor is blocked
 * or the policy is opened up for every page on the site to accommodate one
 * admin page. Self-hosting also pins the editor to the version in
 * package.json rather than whatever the CDN is serving this week.
 *
 * The copy is a build artifact, not source, so it is gitignored and regenerated
 * by `npm run build`, `npm run build:static` and `npm run dev`.
 */

import { copyFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const from = resolve(root, 'node_modules/@sveltia/cms/dist/sveltia-cms.js');
const to = resolve(root, 'public/admin/sveltia-cms.js');

if (!existsSync(from)) {
  console.error(
    '\n  The CMS bundle is missing from node_modules.\n' +
      '  Run `npm ci` (or `npm install`) and try again.\n' +
      `  Looked for: ${from}\n`,
  );
  process.exit(1);
}

mkdirSync(dirname(to), { recursive: true });
copyFileSync(from, to);

const kb = Math.round(statSync(to).size / 1024);
console.log(`copy-cms: public/admin/sveltia-cms.js (${kb} KB)`);
