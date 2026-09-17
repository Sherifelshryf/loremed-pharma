/**
 * Prints what is wrong with the content, in sentences.
 *
 * The deploy runs `npm test` before it uploads, so an invalid product or bundle
 * stops the deploy and the live site keeps its previous copy. That is the right
 * behaviour, but from inside the CMS it is indistinguishable from nothing
 * happening: it says "saved", and the site never changes. Twice now an editor
 * has been left staring at an unchanged site with no idea why.
 *
 * The workflow runs this on failure and puts the output at the top of the run,
 * so the reason is a sentence about a field rather than TAP output in a log.
 *
 * Run it locally the same way: `npx tsx scripts/explain-content-errors.ts`
 */

import { validateProducts } from '../src/content/productsSchema';
import { validateBundles } from '../src/content/bundlesSchema';
import products from '../src/content/products.json';
import bundles from '../src/content/bundles.json';

const problems = [
  ...validateProducts(products).map((m) => `Products — ${m}`),
  ...validateBundles(bundles).map((m) => `Bundles — ${m}`),
];

if (problems.length === 0) {
  // The content is fine, so something else failed: a code test, most likely.
  console.log('The products and bundles are both valid, so this is not a content problem.');
  console.log('Look at the failing test above — it is in the code, not in anything edited at /admin.');
} else {
  for (const p of problems) console.log(p);
}

// Always exit 0. This script exists to explain a failure that has already
// happened; failing here as well would only bury the explanation.
process.exit(0);
