/**
 * Says what the build had to skip or correct in the content.
 *
 * Nothing an editor types stops a deploy any more: an unusable record is left
 * out and everything else publishes. That is the right trade — one mistyped
 * field used to hold back every other edit on the site — but content that
 * disappears quietly is its own kind of failure, so it has to be said out loud
 * somewhere.
 *
 * The deploy runs this after a successful upload and puts the output at the top
 * of the run. Exits 0 always: this reports on a deploy that already worked, and
 * failing here would turn a report back into the blockage it replaced.
 *
 * Run it locally the same way: `npx tsx scripts/content-report.ts`
 */

import { products, productsOutcome } from '../src/content/products';
import { bundles, bundlesOutcome } from '../src/content/bundles';
import { validateProducts } from '../src/content/productsSchema';
import { validateBundles } from '../src/content/bundlesSchema';
import productsRaw from '../src/content/products.json';
import bundlesRaw from '../src/content/bundles.json';

const skipped = [
  ...productsOutcome.skipped.map((s) => `Products — ${s}`),
  ...bundlesOutcome.skipped.map((s) => `Bundles — ${s}`),
];
const repaired = [
  ...productsOutcome.repaired.map((s) => `Products — ${s}`),
  ...bundlesOutcome.repaired.map((s) => `Bundles — ${s}`),
];

// Everything else the validators object to. These never block anything; they
// are the "published, but worth a look" pile — a missing translation, an empty
// ingredient list. Anything already reported above is left out so the same
// problem is not listed twice.
/**
 * Which record a message is about — a quoted slug, or the positional name used
 * when there is no usable slug to quote. Matching on the slug alone left
 * "product #12" listed twice, once as skipped and again as imperfect, which
 * reads as two problems rather than one.
 */
const subjectOf = (m: string) => {
  // Anchored: a message can contain incidental quotes ("en" and "ar"), and
  // matching those made every field of one broken record look like a record of
  // its own. The subject is always the identifier the message opens with.
  const head = m.replace(/^(?:Products|Bundles) — /, '');
  return head.match(/^"([^"]+)"/)?.[1] ?? head.match(/^((?:product|bundle) #\d+)/)?.[1] ?? null;
};

const reportedSubjects = new Set(
  [...skipped, ...repaired].map(subjectOf).filter((s): s is string => s !== null),
);

const alreadyMentioned = (m: string) => {
  const subject = subjectOf(m);
  return subject !== null && reportedSubjects.has(subject);
};

const cosmetic = [
  ...validateProducts(productsRaw).map((m) => `Products — ${m}`),
  ...validateBundles(bundlesRaw).map((m) => `Bundles — ${m}`),
].filter((m) => !alreadyMentioned(m));

const lines: string[] = [];

if (skipped.length) {
  lines.push('### Left out of the site');
  lines.push('');
  lines.push('These could not be drawn at all, so they were skipped. **Everything else deployed normally.**');
  lines.push('');
  for (const s of skipped) lines.push(`- ${s}`);
  lines.push('');
}

if (repaired.length) {
  lines.push('### Corrected automatically');
  lines.push('');
  lines.push('These had a safe answer, so the site used it. Worth fixing properly at /admin.');
  lines.push('');
  for (const s of repaired) lines.push(`- ${s}`);
  lines.push('');
}

if (cosmetic.length) {
  lines.push('### Published, but worth a look');
  lines.push('');
  for (const s of cosmetic) lines.push(`- ${s}`);
  lines.push('');
}

if (lines.length === 0) {
  console.log(`Nothing to report: ${products.length} products and ${bundles.length} bundles, all clean.`);
} else {
  lines.push(`Live now: ${products.length} products, ${bundles.length} bundles.`);
  console.log(lines.join('\n'));
}

process.exit(0);
