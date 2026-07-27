# WebLite Portfolio Dossier

> **Purpose.** This document is a portfolio extraction dossier for a completed WebLite project. It is written so that another team (or AI) can design and build a portfolio case study **without needing access to this repository**.
>
> **Accuracy policy.** Every claim below is tagged **[Verified]**, **[Inferred]**, or **[Needs Owner Confirmation]**. No business results, traffic figures, conversion metrics, revenue, client testimonials, or client requirements have been invented. Where the repository's own README makes claims that the code contradicts, the code wins and the discrepancy is noted.
>
> **Generated:** 2026-07-27 · **Analysis basis:** full source tree, dependencies, assets, build output, and live browser verification of the running production build.

---

## 1. Project Identification

| Field | Value | Confidence |
|---|---|---|
| **Project Type** | Pharmaceutical & nutraceutical corporate website with a product catalogue and a lightweight direct-ordering flow | [Verified] |
| **Industry** | Pharmaceuticals / Nutraceuticals / Consumer Health Supplements | [Verified] |
| **Sub-vertical** | Consumer health brand (immune support, respiratory care, vitamins & minerals, children's health, omega/brain health, dermatology) | [Verified] — six product categories defined in `src/content/products.ts` |
| **Primary market** | Egypt, with stated reach across the Middle East and Africa | [Verified] — `areaServed` in JSON-LD; partnership content by region |
| **Languages** | English + Arabic, full RTL | [Verified] |
| **Build target** | Fully static / prerendered site (23 pages generated at build time) | [Verified] — `next build` output |

### Primary Purpose

The site serves **four** business goals simultaneously, all evidenced in code:

1. **Build brand credibility** — the majority of the site is corporate trust-building: manufacturing standards, R&D pipeline, quality assurance, certifications/standards, partnerships, and a leadership section. [Verified]
2. **Present the product range** — a filterable catalogue with 10 products and individual detail pages carrying ingredients, benefits, dosing and pack data. [Verified]
3. **Generate leads** — a departmental contact form, per-department email routing, an enquiry CTA on every product page, and a "request datasheet" action. [Verified]
4. **Take direct consumer orders without a payment gateway** — a cart and checkout that hands a fully formatted order to WhatsApp. [Verified]

Point 4 is the commercially distinctive one: the business gets e-commerce-style ordering **without** payment infrastructure, PCI scope, or a backend. [Inferred — the intent is clear from the implementation; the business rationale is not documented in the repo.]

---

## 2. Portfolio Summary

### Short description (≈45 words)

A bilingual English/Arabic website for a pharmaceutical and supplements brand, pairing a corporate credibility story with a filterable product catalogue and a checkout that sends fully formatted orders straight to WhatsApp — no payment gateway, no backend, fully right-to-left aware.

### Full case-study description (≈235 words)

This is a complete corporate and product website for a pharmaceutical and nutraceutical brand, built as a single statically-rendered Next.js application that runs entirely without a backend.

The experience opens with a custom branded loading sequence — a white screen carrying the brand mark, a breathing glow, and the company promise — that shows once per session, caps itself at two seconds, and respects reduced-motion preferences. From there the homepage moves through thirteen composed sections covering the company story, manufacturing standards, R&D pipeline, quality assurance, certifications, regional partnerships and healthcare-professional resources.

The product side is the functional core. A catalogue of ten products supports live text search across names, taglines, descriptions and active ingredients, plus category and availability filtering and a quick-view modal that avoids a full page load. Each product has its own prerendered detail page with key ingredients, benefits, dosing instructions, pack data, an embedded product video, and structured Product schema for search engines.

The ordering flow is what distinguishes the build. Visitors add products to a persistent cart, then complete a checkout that validates their details, optionally captures their GPS coordinates as a map link, and composes a formatted order — itemised lines, subtotal, delivery fee, total, payment method and ETA — which opens directly in WhatsApp. The message is always composed in Arabic regardless of the language the customer browsed in, so the fulfilment team receives every order in one consistent format.

The entire interface is bilingual with a genuine right-to-left layout flip rather than mirrored text alone.

---

## 3. Feature Extraction

Ordered by portfolio impact.

### 3.1 WhatsApp Order Checkout (no payment gateway) — **[Verified]**
**What it does.** A full cart-and-checkout flow. Customers add available products, adjust quantities, and complete a validated form (name, phone, delivery address, optional notes). On submit the app generates an 8-digit order reference and composes a structured message — customer block, itemised product lines with per-line totals, subtotal, delivery fee, grand total, payment method and delivery ETA — then opens it in WhatsApp addressed to the business number.
**Why it matters.** The business gets e-commerce ordering with zero payment-processing setup, zero PCI scope, and zero server cost, using the channel its customers already use daily. Orders arrive pre-formatted, so there is no transcription step.
*Implementation:* `src/components/sections/OrderClient.tsx`, `src/cart/CartProvider.tsx`.

### 3.2 Always-Arabic Order Messages — **[Verified]**
**What it does.** The outbound WhatsApp order is composed in Arabic even when the customer browsed the site in English. Product names remain in English (they are brand names).
**Why it matters.** An operations detail with real value: the fulfilment team reads one consistent format regardless of customer language, removing a class of mistakes.

### 3.3 One-Tap Location Capture — **[Verified]**
**What it does.** An optional "use my location" control calls the browser Geolocation API and attaches a Google Maps coordinate link to the order message.
**Why it matters.** Delivery addresses in the region are often descriptive rather than structured; a precise pin materially reduces failed deliveries. Handles permission denial and timeout without blocking checkout.

### 3.4 Filterable Product Catalogue with Quick View — **[Verified]**
**What it does.** Live client-side search across product name, tagline, short description and active-ingredient names; filtering by six therapeutic categories and by availability status; a result counter; a clear-filters control; and a quick-view modal for previewing a product without leaving the grid. Filters can be deep-linked via `?category=`, `?status=` and `?q=` URL parameters.
**Why it matters.** Lets visitors self-serve to the right product quickly, and lets the business link straight to a filtered view from campaigns.
*Implementation:* `src/components/sections/ProductCatalogue.tsx`, `QuickView.tsx`.

### 3.5 Full Bilingual EN/AR with True RTL — **[Verified]**
**What it does.** A custom i18n layer with 186 translation keys per locale, plus bilingual content objects across the company data model. Switching language sets `<html lang>` and `<html dir>`, persists the choice to localStorage, and flips the entire layout using CSS logical properties (`ps-/pe-`, `ms-/me-`, `start-/end-`) rather than mirrored text. A dedicated Arabic typeface (Cairo) loads alongside the Latin faces, and Arabic-specific letter-spacing rules prevent the connected script from being broken apart.
**Why it matters.** Arabic is a first-class experience, not a translation bolt-on — a genuine differentiator in this market.

### 3.6 Embedded Product Videos — **[Verified]**
**What it does.** Eight of the ten products carry an embedded product video, lazily loaded and served from the privacy-enhanced `youtube-nocookie` host. Products still under regulatory registration correctly show no video.
**Why it matters.** Video on the product page supports the purchase decision without the page paying a load-time cost up front.

### 3.7 Custom Branded Loading Experience — **[Verified]**
**What it does.** A white intro screen with the brand mark, a breathing radial glow and an animated brand-promise lockup. It waits for the window `load` event, enforces a minimum of 650 ms so the fade registers, hard-caps at 2 seconds, shows only once per browser session, and fades and scales out as the page content fades in.
**Why it matters.** A premium first impression that cannot become an obstacle — the hard cap and once-per-session rule are the details that separate a considered intro from an annoying one.

### 3.8 Contact System with Departmental Routing — **[Verified]**
**What it does.** A validated contact form (name, email with format checking, phone, department, subject, message) with inline bilingual error messages and focus management to the first invalid field. On submit it composes a pre-filled email to the company address with a structured body. The contact page also lists five departments with their own email addresses, an embedded interactive map, opening hours, social links, and an FAQ accordion.
**Why it matters.** Routes enquiries to the right team and captures leads without a backend or third-party form service.

### 3.9 Persistent Cart — **[Verified]**
**What it does.** Cart state lives in React Context and is mirrored to localStorage, so it survives reloads and navigation. It defensively re-resolves each stored slug against the product catalogue on read, so items that are removed or become unavailable drop out cleanly rather than breaking the cart. A live count badge appears in the navigation.

### 3.10 Command-Style Search Dialog — **[Verified]**
**What it does.** An overlay search dialog covering products and site sections, with `role="dialog"`, `aria-modal`, Escape-to-close and scroll locking. Compacted on mobile so it does not dominate small screens.

### 3.11 Animated Navigation System — **[Verified]**
**What it does.** A fixed navigation bar that transitions from transparent-over-hero to solid-on-scroll (throttled with `requestAnimationFrame`), an animated mega menu with descriptions per link, a separate mobile menu, a language switcher, a search trigger and a cart badge.

### 3.12 SEO & Structured Data — **[Verified]**
**What it does.** Per-page metadata with canonical URLs, Open Graph and Twitter cards; JSON-LD for Organization, WebSite (with SearchAction), Product (per product page) and BreadcrumbList; a generated `sitemap.xml` covering all 10 product routes; and a generated `robots.txt`.

### 3.13 Accessibility Considerations — **[Verified]**
A skip-to-content link, 30 `aria-label`s, 39 `aria-hidden` decorative markers, `aria-modal`/`role="dialog"` on overlays, `aria-invalid` and `role="alert"` on form errors, `aria-expanded` on menus, `aria-current`, visible `:focus-visible` outlines, and a global `prefers-reduced-motion` rule. *(Not a substitute for a formal WCAG audit — see §13.)*

---

## 4. Technical Analysis

### Frontend — [Verified from `package.json` and source]

| Concern | Technology | Version |
|---|---|---|
| Framework | **Next.js** (App Router, React Server Components) | 14.2.15 |
| UI runtime | **React** / React DOM | 18.3.1 |
| Language | **TypeScript** (strict) | 5.5.4 |
| Styling | **Tailwind CSS** with a fully custom design-token theme | 3.4.10 |
| Animation | **Framer Motion** | 11.3.30 |
| Icons | **lucide-react** | 0.436.0 |
| Class utilities | `clsx` + `tailwind-merge` | 2.1.1 / 2.5.2 |
| Fonts | **Outfit** (display), **Inter** (body), **Cairo** (Arabic) via `next/font/google` | — |
| Build tooling | PostCSS 8.4.41, Autoprefixer 10.4.20, ESLint 8.57 + `eslint-config-next` | — |
| Test tooling | Playwright (devDependency, used for browser verification) | ^1.47.2 |

### Backend — **None** [Verified]
There are **no** API routes (`src/app/api` does not exist), no route handlers, no middleware, and no server actions. All rendering is static or SSG. Every "dynamic" behaviour is client-side.

### Database / Storage — **None** [Verified]
No database, no ORM, no Prisma/Supabase/Firebase/Mongo. The only persistence is **browser localStorage** (two keys: cart and locale) plus **sessionStorage** (one key: intro-seen).

### Content model — **Typed local content layer** [Verified]
All copy and product data live in `src/content/*.ts` as typed objects (`site.ts`, `products.ts`, `company.ts`, `navKeys.ts`). Components are pure presentational consumers of these types. The README describes this as "CMS-ready" — the type shapes would map cleanly to a headless CMS schema, but **no CMS is integrated**. [Verified: no CMS SDK present.]

### 3D / Graphics — **No 3D** [Verified]
There is **no** Three.js, React Three Fiber, WebGL, shader, GSAP, Lottie or `<canvas>` usage anywhere in the codebase. Visual richness comes entirely from **hand-built SVG brand graphics** (`BrandBackdrop.tsx`: `GradientOrb`, `GridField`, `DotField`, `QuarterArc`, `Molecule`, `LogoBloom`, `AmbientField`), CSS gradients, and Framer Motion. *This is worth stating plainly so the portfolio does not imply 3D capability from this project.*

### Third-party embeds — [Verified]
- **YouTube** (`youtube-nocookie.com`) — product videos, lazy-loaded, no API key.
- **Google Maps** — an `iframe` embed on the contact page driven by stored coordinates, **no API key required**.
- **WhatsApp** — `wa.me` deep links.
- **Browser Geolocation API** — optional order location.

All integrations are keyless. **No API keys, tokens, secrets or `.env` files exist in the repository.** [Verified]

### Security headers — [Verified]
`next.config.mjs` sets `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, and disables `X-Powered-By`.

### Hosting / deployment
No `vercel.json`, `netlify.toml`, `Dockerfile` or CI workflow is committed. `.gitignore` contains a `.vercel` entry, which suggests Vercel. **[Inferred — deployment platform is not proven by committed configuration.]** The owner has separately indicated the site auto-deploys to Vercel from the default branch. **[Needs Owner Confirmation]**

### Performance characteristics — [Verified from build output]
- 23 pages prerendered at build time; all product pages are SSG via `generateStaticParams`.
- Shared first-load JS: **87.1 kB**. Route first-load totals: **~149–185 kB**.
- AVIF/WebP image formats enabled; `next/image` with explicit `sizes`.
- Lazy-loaded video and map iframes.
- Scroll listener throttled via `requestAnimationFrame` and registered `{ passive: true }`.

---

## 5. Design & UX Analysis

**Visual direction.** Restrained, clinical-premium, Swiss-influenced. The README states the design language is derived from the client's logo, and the token values corroborate it: a deep indigo-violet (`#322353`) as `primary-800` and a vivid pharma orange (`#EC691D`) as `secondary-500`. The palette is built as full 50–950 scales for both brand colours plus violet-tinted neutrals — a proper design system rather than ad-hoc colours. [Verified in `tailwind.config.ts`.] **No stock photography is used anywhere**; all non-product imagery is generated SVG/CSS. [Verified]

**Typography.** A three-family system: Outfit for display, Inter for body, Cairo for Arabic. Display sizes use `clamp()` for fluid scaling with tightened negative letter-spacing at large sizes (`-0.03em` down to `-0.015em`) and a dedicated `eyebrow` token at `0.18em` positive tracking. Headings use `text-wrap: balance`, body copy uses `text-wrap: pretty`. This is deliberate, considered typography.

**Colour system.** Semantic tokens (`success`/`warning`/`danger`/`info`) sit alongside UI-role tokens (`surface`, `ink`, `line`) so components describe intent rather than hue. Brand gradients are defined centrally.

**Layout.** Generous vertical rhythm via `.section` utilities that scale across breakpoints. Consistent `Container` widths. Card-based product grids at 1/2/3 columns. Rounded geometry throughout (custom `rounded-3xl`/`4xl` scale) with soft, layered shadow tokens (`soft`, `card`, `lift`, `glow`).

**Motion.** A **custom animation primitive library** (`src/components/ui/motion.tsx`) rather than scattered one-off animations:
- `Reveal` — scroll-triggered fade-and-rise
- `Stagger` / `StaggerItem` — choreographed sequential entrances
- `Magnetic` — spring-driven cursor attraction on buttons
- `Counter` — viewport-triggered spring-eased number counting
- `Parallax` — scroll-progress-linked translation

Plus a marquee, a slow spin, and a breathing glow in the Tailwind keyframes. Every primitive is reduced-motion aware.

**Interaction patterns.** Card hover lifts the card, scales the product image, reveals a quick-view affordance and shifts an arrow — a coordinated multi-element response rather than a single hover state. Directional affordances (`rtl:rotate-180`) flip correctly in Arabic.

**Mobile / responsive.** Breakpoints at 640/768/1024/1200/1320. Mobile-specific decisions are visible in the code and commented: the catalogue toolbar is sticky only from `lg` up so it does not eat a phone screen; category chips become a single horizontal scroll row with a hidden scrollbar on mobile and wrap normally above `sm`; the search dialog compacts and drops its tag column; cart line items restructure from a single row into a stacked layout to avoid RTL overflow; and a global `overflow-x: clip` (deliberately `clip`, not `hidden`, to preserve `position: sticky`) contains decorative bleed that would otherwise cause mobile browsers to zoom out.

**Content hierarchy.** Every section follows a consistent eyebrow → display heading → lead → content rhythm, which makes a 13-section homepage scannable rather than exhausting.

**Premium-feeling details.** The once-per-session capped loading screen; magnetic buttons; animated statistic counters; the coordinated card hover; glass/backdrop-blur surfaces; and a medical disclaimer centralised and surfaced on product pages and the footer — a credibility signal specific to this industry.

---

## 6. Complexity / Standout Engineering

### 6.1 Backendless commerce architecture — **[Verified]**
**Challenge.** Deliver cart, checkout, validation and order transmission with no server, no database and no payment provider.
**Implementation.** Cart state in React Context mirrored to localStorage; catalogue re-resolution on every read so stale or unavailable slugs are dropped rather than crashing the cart; order totals derived, never stored; and transmission via a `wa.me` deep link carrying a URI-encoded structured message. The result behaves like commerce while remaining a fully static site.

### 6.2 Locale-decoupled output formatting — **[Verified]**
**Challenge.** The customer-facing UI must follow the visitor's language, but the outbound operational message must always be Arabic.
**Implementation.** The message builder reads directly from the Arabic dictionary and Arabic currency token as module constants, deliberately bypassing the active-locale `t()` function. This separates *presentation locale* from *operations locale* — a subtle architectural distinction most implementations miss.

### 6.3 Bilingual RTL architecture — **[Verified]**
**Challenge.** Support Arabic as a genuine first-class layout, not mirrored English.
**Implementation.** A `Bi = { en, ar }` type applied across the entire content model; a 186-key dictionary per locale; CSS logical properties throughout so the layout physically flips; per-locale typography rules (Arabic drops the wide Latin tracking that would shred connected script); a dedicated Arabic font family; directional icon flipping; and persisted preference. A deliberate, documented constraint keeps medical/regulatory product content English-only while UI chrome and taxonomy are bilingual — a domain-aware decision.

### 6.4 SSR-safe reduced-motion handling — **[Verified]**
**Challenge.** `useReducedMotion()` reads a media query, so it is always `false` during server rendering but can be `true` on the client's first render. Six components branched their **rendered markup** on it — including the `will-change` property Framer Motion derives from `animate`. The mismatch caused React to fail hydration and **discard the entire server-rendered document**, re-rendering the whole page on the client for every visitor with "reduce motion" enabled.
**Implementation.** A shared `useSafeReducedMotion()` hook reports `false` until after mount so the first client render is identical to the server's, then applies the real preference on the next commit. Verified fixed by browser test. This is the kind of defect that is invisible in normal QA and only surfaces under an accessibility setting.

### 6.5 Custom animation primitive library — **[Verified]**
Six reusable, composable, reduced-motion-aware primitives (`Reveal`, `Stagger`, `StaggerItem`, `Magnetic`, `Counter`, `Parallax`) built on Framer Motion's `useScroll`/`useSpring`/`useTransform`/`useInView`/`useMotionValue`. Motion is a system, not decoration.

### 6.6 Design-token system derived from brand — **[Verified]**
Two full 50–950 brand ramps, violet-tinted neutrals, semantic and UI-role tokens, fluid `clamp()` display scale, custom shadow/radius scales, brand gradients and keyframes — all centralised in `tailwind.config.ts`.

### 6.7 Deliberate mobile-overflow engineering — **[Verified]**
Using `overflow-x: clip` rather than `hidden` specifically to contain decorative bleed **without** breaking `position: sticky`, with the reasoning documented in a code comment. A precise fix for a subtle, commonly-mishandled mobile bug.

### 6.8 Structured-data coverage — **[Verified]**
Four schema types including per-product `Product` schema with `additionalProperty` entries generated from each product's active ingredients, and a `WebSite` `SearchAction` pointing at the catalogue's query parameter.

### 6.9 Verified quality gates — **[Verified in this session]**
The production build was driven in a real browser across **17 routes × 2 locales × 2 viewports (444 assertions)**, checking HTTP status, horizontal overflow, `dir` correctness, heading presence, image loading and console errors — all passing. The order flow, video-to-product mapping, cart persistence, language switching, map coordinates and contact-form output were each verified functionally. `tsc --noEmit`, `next lint` and `next build` all pass clean.

---

## 7. Privacy-Safe Portfolio Version

### Anonymous Project Title
**Pharmaceutical & Supplements Brand — Bilingual Corporate & Product Site**

*(Shorter alternatives: "Bilingual Pharmaceutical Brand Website" · "Consumer Health & Supplements Brand Platform")*

### Industry
Pharmaceuticals / Consumer Health & Nutraceuticals

### Anonymous Short Description (≈45 words)
A bilingual English/Arabic website for a pharmaceutical and supplements brand, combining a corporate credibility story with a searchable product catalogue and a checkout that delivers fully formatted orders straight to WhatsApp — no payment gateway and no backend required.

### Anonymous Full Description (≈210 words)

A complete corporate and product website for a pharmaceutical and nutraceutical brand, delivered as a fully statically-rendered application that runs without a backend or database.

A custom branded loading sequence opens the experience — capped at two seconds, shown once per session, and fully reduced-motion aware. The homepage then moves through thirteen composed sections covering company story, manufacturing standards, R&D pipeline, quality assurance, certifications, regional partnerships and healthcare-professional resources.

The product catalogue supports live search across product names, taglines, descriptions and active ingredients, alongside therapeutic-category and availability filtering and a quick-view modal. Every product has a prerendered detail page carrying ingredients, benefits, dosing guidance, pack information, an embedded product video, and structured Product data for search engines.

The ordering flow is the centrepiece: a persistent cart feeds a validated checkout that can optionally capture the customer's GPS location as a map link, then composes a structured order — itemised lines, subtotal, delivery fee, total, payment method and ETA — and opens it directly in WhatsApp. The outbound message is always composed in a single fixed language so the fulfilment team receives every order in one consistent format, whichever language the customer browsed in.

The entire interface is bilingual with a genuine right-to-left layout flip.

### Anonymous Feature List
- WhatsApp order checkout with structured, itemised order messages — no payment gateway
- Persistent cart surviving reloads, with live count badge
- Optional one-tap GPS location capture attached to orders
- Fixed-language outbound order formatting for consistent fulfilment
- Searchable, filterable product catalogue with deep-linkable filters
- Quick-view product modal
- Prerendered product detail pages with ingredients, benefits, dosing and pack data
- Embedded, lazy-loaded product videos
- Full bilingual EN/AR with true right-to-left layout
- Custom branded loading experience (session-capped, reduced-motion aware)
- Departmental contact form with validation and email routing
- Embedded interactive location map
- Animated mega-menu navigation and command-style search dialog
- Custom scroll-reveal, parallax, magnetic-button and counter animation system
- Complete SEO implementation with structured data, sitemap and robots
- Mobile-optimised responsive layouts with RTL-aware overflow handling

### ⚠️ Privacy Warnings — assets and data that identify the client

**Must be removed, replaced or blurred before any public use:**

| Location | Identifying content |
|---|---|
| `public/media/logo.png`, `public/media/logo.svg` | Client logo (vector + raster) |
| `public/loremed-logo-original.png` | Original client logo file |
| `media/logo.jpg`, `media/logo.png` (repo root, outside `public/`) | Client logo source files |
| `public/media/*.png`, `public/media/*.jpg` (10 product packshots) | **Product packaging showing brand name and product names** — visible in every catalogue and product-page screenshot |
| `src/content/site.ts` | Company name, legal name, domain, public email, department emails, phone number, WhatsApp order number, city/region, **exact HQ GPS coordinates**, Google Maps place link, Facebook / LinkedIn / YouTube channel URLs |
| `src/app/contact/page.tsx` | Five department email addresses |
| `src/content/products.ts` | 10 real product names, taglines and formulations |
| `src/content/company.ts` | Company history/timeline, leadership roles, statistics, news items |
| `README.md` | Client name throughout, brand hex values, product list |
| `_legacy/old-site.html` (96 KB) | Prior version of the client's site — contains client name |
| `brag-output/` *(gitignored, not committed)* | Promo video and poster containing client logo, a product packshot, a price, a phone number and an address |
| App icon `src/app/icon.svg` | Likely brand-derived — verify before use |

**Confirmed clean:** No API keys, tokens, credentials, `.env` files or secrets exist anywhere in the repository. [Verified]

**Note on product imagery.** Because product packaging carries the brand name, *any* catalogue or product-page screenshot will identify the client unless packshots are blurred, replaced with neutral mockups, or the brand name is retouched. This is the single biggest constraint on the visual plan below.

---

## 8. Portfolio Visuals — Capture Plan

> **Not yet captured — this is a plan only.** All captures should be taken with the language switcher exercised in both directions where noted, and with an empty browser session so the loading screen plays.

| # | Page / Route | Viewport | What to capture | Why it's worth showing | Privacy concerns |
|---|---|---|---|---|---|
| 1 | `/` (initial load) | Desktop | **Video clip (3–4 s).** The branded loading screen playing through: mark, breathing glow, animated promise lockup, then the fade-and-scale exit revealing the hero. | The single most premium-feeling moment on the site; immediately signals bespoke work rather than a template. | **Client logo is the focal point** — must be swapped for a neutral mark or the clip is unusable publicly. |
| 2 | `/` hero + first scroll | Desktop | **Video clip (5–6 s).** Slow scroll from hero through the featured products and stats band, showing scroll-reveals, staggered entrances and the animated counters firing. | Demonstrates the custom motion system; static images cannot convey it. | Logo in nav; product packshots in the featured row. |
| 3 | `/products` | Desktop | **Video clip (6–8 s).** Typing into search, then switching category chips and the status segmented control, with the grid re-filtering and the result counter updating live. | Proves real interactive functionality, not a static grid — a key "we build applications" signal. | Product packshots and names throughout. |
| 4 | `/order` (checkout) | Both | **Video clip (8–10 s).** Cart with 2–3 items → adjust a quantity → fill the form → tap "use my location" → submit → the composed WhatsApp message appears. | **The strongest single differentiator in the project.** Shows a complete commerce flow with no payment gateway. | Use dummy customer data. The destination WhatsApp number and the Arabic message content will be visible — **blur or replace the number**. |
| 5 | Any product detail page | Desktop | **Still.** Full page showing hero visual, meta cards (form / suitable-for / pack), add-to-cart box, ingredients panel, benefits list and the embedded video. | Shows depth of content architecture and that products are real records, not marketing blocks. | Product packshot, product name, embedded video thumbnail — all identifying. |
| 6 | `/` or `/products` — **EN ⇄ AR** | Desktop | **Video clip (4–5 s).** Clicking the language switcher and holding on the result, so the entire layout flips right-to-left — navigation, cards, icon directions, typography. | The most impressive "hard to fake" capability in the build. Bilingual RTL is a genuine specialism. | Logo and packshots visible. |
| 7 | `/products` | Mobile (390 px) | **Video clip (4 s).** The horizontally-scrolling category chip row, then opening a product quick-view modal. | Demonstrates deliberate mobile-specific design decisions rather than a squeezed desktop layout. | Product names/packshots. |
| 8 | `/` full page | Mobile | **Still (long screenshot).** The full homepage at phone width. | Pairs with the desktop shot to evidence responsive craft across a 13-section page. | Logo, packshots. |
| 9 | `/contact` | Desktop | **Still.** The contact form beside the department cards and the embedded live map. | Shows lead-capture architecture and map integration. | **Contains real emails, real map location and the company address — must be redacted or the map re-pointed to a neutral location.** |
| 10 | `/` navigation | Desktop | **Video clip (3 s).** Hovering a nav item to open the animated mega menu, then the nav transitioning transparent → solid on scroll. | A polished, premium navigation detail that reads as high-end. | Logo in nav. |

**Recommended hero visual for the case study:** #4 (the WhatsApp checkout clip) — it is the most commercially compelling and hardest-to-replicate capability. **Recommended secondary:** #6 (the RTL language flip).

---

## 9. Portfolio Card

**Project Title:** Pharmaceutical & Supplements Brand

**Category:** Pharmaceutical Website · Product Catalogue · Bilingual

**One-Line Hook** (13 words):
*Bilingual pharma site where checkout sends complete, formatted orders straight to WhatsApp.*

**Description** (34 words):
A bilingual English/Arabic pharmaceutical brand site pairing a corporate credibility story with a searchable product catalogue and a cart that delivers fully formatted orders to WhatsApp — no payment gateway, no backend.

**Top 3 Features:**
1. WhatsApp order checkout with structured, itemised messages and optional GPS location
2. Full English/Arabic experience with a genuine right-to-left layout flip
3. Searchable, filterable product catalogue with quick-view and prerendered detail pages

**Technology Tags:**
`Next.js` · `React` · `TypeScript` · `Tailwind CSS` · `Framer Motion` · `Multilingual (RTL)` · `WhatsApp Integration` · `SEO / Structured Data`

**Suggested Thumbnail:**
A composed two-device shot — desktop showing the product catalogue mid-filter, phone in front showing the checkout with the WhatsApp order composed. Product packshots must be neutralised. Set against the brand's deep indigo-violet with the orange accent, echoing the site's own palette.

**Suggested Interaction (hover / tap):**
The static thumbnail cross-fades into a short looping muted clip of the **language switch flipping the layout to right-to-left**, with a small `EN ⇄ AR` badge sliding in. It communicates the project's most distinctive capability in under two seconds without requiring a click. On touch devices, autoplay the loop when the card enters the viewport.

---

## 10. Case Study Page Structure

### Overview
A complete corporate and product website for a pharmaceutical and nutraceutical brand, built as a fully statically-rendered Next.js 14 application. The site carries the company's credibility story — manufacturing, R&D, quality assurance, certifications and partnerships — alongside a working product catalogue and a direct-to-WhatsApp ordering flow, all with no backend, no database and no payment gateway.

### The Experience
Visitors are greeted by a branded loading sequence that plays once per session and never exceeds two seconds. From the homepage they can move through thirteen sections of company narrative, or go straight to the catalogue and search by product name or active ingredient, filter by therapeutic category and availability, and preview any product in a quick-view modal without leaving the grid.

Each product has its own page with key ingredients, benefits, dosing instructions, pack details and an embedded product video. Available products can be added to a cart that persists across visits. At checkout, customers enter their details, optionally share their exact location with one tap, and submit — which opens WhatsApp with a complete, itemised order ready to send.

Every part of the interface can be switched between English and Arabic, with the layout genuinely flipping to right-to-left.

### Key Features
- WhatsApp checkout producing structured, itemised order messages with totals, delivery fee, payment method and ETA
- Outbound orders always composed in one fixed language for consistent fulfilment
- Optional one-tap GPS capture attached to the order as a map link
- Persistent cart with live navigation badge and defensive catalogue re-resolution
- Product catalogue with live multi-field search, category and status filters, and deep-linkable filter URLs
- Ten prerendered product detail pages with embedded videos
- Full bilingual EN/AR with true RTL layout and locale-aware typography
- Departmental contact form with validation and per-team email routing
- Embedded interactive location map
- Custom branded loading experience, animated mega menu and command-style search
- Complete SEO with Organization, WebSite, Product and Breadcrumb structured data

### Design
The visual language is derived from the brand's own logo: a deep indigo-violet and a vivid pharma orange, developed into full 50–950 token ramps with violet-tinted neutrals and semantic UI tokens. Typography is a three-family system — a geometric display face, a neutral body face, and a dedicated Arabic face — with fluid `clamp()` sizing and tightened tracking at display sizes.

There is no stock photography anywhere. All non-product imagery is hand-built SVG and CSS: gradient orbs, grid and dot fields, quarter-arc forms and molecular network graphics derived from the brand mark. Motion is treated as a system rather than decoration, with reusable scroll-reveal, stagger, parallax, magnetic-button and animated-counter primitives — all reduced-motion aware.

### Engineering
The most interesting constraint was delivering commerce behaviour from a fully static site. Cart state lives in React Context mirrored to localStorage, re-resolving stored items against the catalogue on every read so unavailable products drop out cleanly; totals are always derived rather than stored; and orders are transmitted as a URI-encoded structured message via a WhatsApp deep link.

A subtler piece of architecture separates *presentation locale* from *operations locale*: the order-message builder deliberately bypasses the active-language translation function and reads from a fixed dictionary, so the fulfilment team always receives one consistent format regardless of how the customer browsed.

The build also resolves a class of bug that rarely surfaces in normal QA: six components branched their rendered markup on the reduced-motion media query, which is always false during server rendering. For any visitor with "reduce motion" enabled, the markup mismatch caused React to fail hydration and discard the entire server-rendered document. A shared SSR-safe hook now keeps the first client render identical to the server's, applying the real preference immediately afterwards.

### Responsive Experience
Five breakpoints from 640 px to 1320 px, with mobile treated as a distinct design problem rather than a compressed desktop. The catalogue toolbar is sticky only on large screens so it never consumes a phone viewport; category filters collapse into a single horizontal scroll row with a hidden scrollbar; the search dialog compacts and sheds its secondary column; cart line items restructure from a single row into a stacked layout to prevent right-to-left overflow; and decorative background bleed is contained with `overflow-x: clip` — chosen specifically over `hidden` so `position: sticky` keeps working.

The full site was verified in-browser across every route in both languages at both mobile and desktop widths, with no horizontal overflow and no console errors.

### Technology
Next.js 14 (App Router, React Server Components) · React 18 · TypeScript (strict) · Tailwind CSS 3.4 with a custom design-token theme · Framer Motion 11 · lucide-react · `next/font` (Outfit, Inter, Cairo) · YouTube and Google Maps embeds · WhatsApp deep linking · Browser Geolocation API. Fully static output: 23 prerendered pages, 87 kB shared first-load JS.

### Gallery Plan
Lead with the WhatsApp checkout clip (#4), then the RTL language flip (#6), then the catalogue filtering clip (#3). Follow with the product detail still (#5) and the loading-screen clip (#1), then close with the paired desktop/mobile homepage stills (#8) and the mega-menu detail (#10). See §8 for full capture specifications and privacy constraints.

> **Deliberately omitted:** no "Challenge", "Client Brief", "Results" or "Impact" section. The repository contains no evidence for any of these. See §13.

---

## 11. Capability Tags

**Demonstrated by this project — [Verified]:**
- Web Design
- Web Development
- Responsive Development
- UI/UX
- Multilingual Websites *(genuine RTL — a specialism, not a checkbox)*
- Pharmaceutical Websites
- Corporate Websites
- Product Catalogs
- Animation
- Interactive Experiences
- SEO
- Performance Optimization
- Lead Generation
- API Integration *(browser and third-party embed integration — Geolocation, Maps, YouTube, WhatsApp deep linking; **not** server-side REST/GraphQL integration)*

**Additional warranted tags:**
- **Design Systems** — full token architecture built from brand assets
- **Accessibility-Conscious Development** — skip links, ARIA, focus management, reduced-motion support *(not formally audited)*
- **Conversational Commerce / WhatsApp Ordering** — a distinctive, regionally relevant capability
- **Static-First Architecture** — commerce behaviour with no backend or database
- **Motion Design Systems** — reusable animation primitives

**Explicitly NOT demonstrated by this project — do not tag:**
- ❌ 3D Web Experiences / WebGL — none present
- ❌ E-Commerce *(in the payment-processing sense)* — no gateway, no transactions
- ❌ Database Development — no database
- ❌ Custom CMS / Admin functionality — no CMS, no admin
- ❌ Authentication — none
- ❌ Custom Web Applications *(server-backed)* — no backend of any kind

---

## 12. Evidence & Confidence Summary

### Verified — directly supported by code, assets or build output
- Framework, language, styling, animation library and all dependency versions
- No backend, no API routes, no database, no auth, no CMS, no secrets
- No 3D/WebGL/GSAP/Lottie/canvas anywhere
- 10 products (8 available, 2 under registration); 6 therapeutic categories
- 23 prerendered pages; 87.1 kB shared first-load JS
- Cart, checkout, WhatsApp message composition, always-Arabic formatting, geolocation
- Bilingual EN/AR with 186 keys per locale, RTL layout flip, persisted preference
- Product videos on all 8 available products, each with a unique ID; none on under-registration products
- Contact form validation and `mailto:` composition; departmental email routing
- Map embed driven by stored coordinates, no API key
- SEO metadata, four JSON-LD schema types, sitemap, robots, security headers
- Custom design tokens, motion primitives and SVG brand graphics
- Accessibility markers (skip link, ARIA, focus-visible, reduced-motion)
- All routes render without console errors or horizontal overflow in both locales at both viewports

### Inferred — strongly suggested but not documented
- **This was a redesign, not a greenfield build.** `_legacy/old-site.html` (96 KB) contains a prior version of the client's site. [Needs Owner Confirmation]
- **Design language derived from the client's logo.** Asserted in the README and consistent with the token values, but the derivation process is not documented.
- **Vercel hosting.** Only evidence is a `.vercel` entry in `.gitignore`; no deployment config is committed.
- **The backendless architecture was a cost/simplicity decision.** The benefit is obvious from the implementation; the rationale is undocumented.

### Needs Owner Confirmation — cannot be determined from the repository
- Whether the client's identity may be disclosed publicly
- Whether screenshots and video captures may be published
- Whether WebLite built the whole site or specific parts
- Whether branding, logo and product photography were client-supplied or WebLite-created
- Whether the site is currently live, and at which domain
- Deployment platform and hosting arrangement
- **Content accuracy of several data sets** (see warning below)

### ⚠️ Content-accuracy warnings — resolve before publishing

1. **Testimonials are role-attributed, not named** ("Community Pharmacist", "Paediatric Nutrition Specialist", "Regional Distribution Partner"). They read as representative/illustrative placeholder copy. **Do not present these as verified client testimonials or social proof.** [Needs Owner Confirmation]
2. **News items** carry specific dates and claims (pipeline size, regulatory progress). Their factual status is unverifiable from the repository. Do not repeat them as fact in the case study.
3. **Statistics** ("30+ formulations in development", "6 therapeutic areas", "100% commitment to GMP quality") are content values, not measured metrics. Note that the stats block says **"9 products"** while the catalogue now contains **10** — a live content inconsistency worth flagging to the owner.
4. **The README is out of date.** It describes 9 products (there are 10), misspells a product name ("Lvylor" vs "Ivylor"), and makes no mention of the cart, checkout, WhatsApp ordering, product videos or the map — all of which exist. Do not source case-study claims from the README.
5. **Product prices** are live in the catalogue and used in order totals. Confirm they are current before any screenshot showing prices is published.

---

## Questions for WebLite

**Scope & authorship**
1. Was this a redesign of an existing site? A prior version (`_legacy/old-site.html`) is in the repository — was WebLite responsible for the rebrand and redesign, or only the new build?
2. Which parts did WebLite build versus the client or another party? Specifically: the logo and brand identity, the product photography/packshots, and the written copy (company story, product descriptions, dosing text).
3. Was the design system (colour ramps, typography scale, SVG brand graphics) created by WebLite, or supplied as brand guidelines?

**Client brief & problem**
4. What problem did the client originally come to WebLite with?
5. Was the WhatsApp ordering flow a client requirement, or a WebLite recommendation? *(This is the project's most distinctive feature — knowing whose idea it was materially changes how the case study is framed.)*
6. Was bilingual Arabic support in the original brief, or added later?
7. Why was a payment gateway not used — cost, regulatory constraint, customer behaviour, or timeline?

**Permissions & privacy**
8. May the client be publicly named, or must the case study stay anonymous?
9. May screenshots and screen recordings be published? If the client stays anonymous, may product packshots appear (they carry the brand name on the packaging), or must they be blurred or replaced?
10. May the live URL be linked from the portfolio?

**Status & results**
11. Is the site currently live? At which domain, and since when?
12. Are there any measurable outcomes the client is willing to share (orders received, enquiries, engagement)? *(None are recorded in the repository, so nothing will be claimed without this.)*
13. Are there client testimonials available for the case study? *(The testimonials in the site content are role-attributed placeholders and will not be used as social proof.)*

**Content accuracy**
14. Are the testimonials, news items and statistics in the site real, illustrative, or pending client sign-off? The stats block says "9 products" while the catalogue has 10 — should this be corrected?
15. Are the current product prices final and safe to show in screenshots?

**Technical**
16. Where is the site hosted, and is there a CI/CD pipeline not committed to the repository?
17. Is a headless CMS migration planned? The content layer is structured for it but nothing is integrated.
18. Is the contact form intended to remain `mailto:`-based, or is server-side delivery planned?

---

## 13. Portfolio Strength Score

| Dimension | Score | Reasoning |
|---|---|---|
| **Visual Design** | **8 / 10** | A genuinely considered design system built from brand assets — full token ramps, fluid typographic scale, hand-built SVG graphics, zero stock photography. Restrained and credible for the sector. Loses points only because the aesthetic is deliberately conservative (as the industry demands) rather than visually adventurous. |
| **Technical Complexity** | **6.5 / 10** | Sophisticated for a static site — backendless commerce, locale-decoupled output, a custom motion library, a real hydration-correctness fix. But there is no backend, database, authentication, real-time behaviour or 3D. Honest positioning: advanced front-end engineering, not full-stack application work. |
| **Interactivity** | **7.5 / 10** | Cart, multi-field search and filtering, quick-view modals, a full checkout flow, geolocation capture, language switching, mega menu, command search, and a systematised motion layer. Rich for a marketing site; short of a configurator or immersive experience. |
| **Business Value** | **9 / 10** | The strongest dimension. The site does credibility, catalogue, lead capture **and** order-taking, with the ordering flow removing an entire category of cost and complexity (payment infrastructure, PCI scope, hosting). Bilingual RTL meaningfully widens the addressable audience. Very easy to explain to a prospective client. |
| **Portfolio Appeal** | **8 / 10** | Two immediately demonstrable "wow" moments — the WhatsApp checkout and the RTL layout flip — both of which show well in short clips. Broad relevance to a large prospect segment (regional businesses wanting to sell without a gateway). Main constraint is the privacy work needed on brand-carrying assets. |

### **Overall: 7.8 / 10 → Recommend: FEATURED PROJECT**

**Why featured.** This project's value is commercial rather than technical spectacle. It demonstrates something a large share of WebLite's likely prospects want and can immediately picture for themselves: a polished, credible, multilingual brand site that also *takes orders*, without the cost and complexity of a payment gateway or a backend. The WhatsApp checkout and the right-to-left language flip are both concrete, screenshot-able differentiators, and bilingual Arabic RTL is a genuine specialism that many agencies cannot deliver convincingly.

**How to position it.** Lead on the ordering flow and the bilingual experience, supported by the design system and motion work. **Do not** position this as a 3D, full-stack, or e-commerce-platform project — it is none of those, and the portfolio is stronger for being precise. If WebLite has a 3D or database-backed project available, feature this one alongside it as the "conversion-focused multilingual brand site" counterpart rather than the technical showpiece.

**Before publishing:** resolve the privacy items in §7 (logo and packshot handling above all), and get owner answers to questions 8–10 and 14–15.

---

## 14. Machine-Readable Data

```json
{
  "anonymousTitle": "Pharmaceutical & Supplements Brand — Bilingual Corporate & Product Site",
  "projectType": "Pharmaceutical and nutraceutical corporate website with product catalogue and WhatsApp-based direct ordering",
  "industry": "Pharmaceuticals / Consumer Health & Nutraceuticals",
  "shortDescription": "A bilingual English/Arabic website for a pharmaceutical and supplements brand, combining a corporate credibility story with a searchable product catalogue and a checkout that delivers fully formatted orders straight to WhatsApp — no payment gateway and no backend required.",
  "longDescription": "A complete corporate and product website for a pharmaceutical and nutraceutical brand, delivered as a fully statically-rendered application that runs without a backend or database. A custom branded loading sequence opens the experience, capped at two seconds, shown once per session, and fully reduced-motion aware. The homepage then moves through thirteen composed sections covering company story, manufacturing standards, R&D pipeline, quality assurance, certifications, regional partnerships and healthcare-professional resources. The product catalogue supports live search across product names, taglines, descriptions and active ingredients, alongside therapeutic-category and availability filtering and a quick-view modal. Every product has a prerendered detail page carrying ingredients, benefits, dosing guidance, pack information, an embedded product video, and structured Product data for search engines. The ordering flow is the centrepiece: a persistent cart feeds a validated checkout that can optionally capture the customer's GPS location as a map link, then composes a structured order with itemised lines, subtotal, delivery fee, total, payment method and ETA, and opens it directly in WhatsApp. The outbound message is always composed in a single fixed language so the fulfilment team receives every order in one consistent format, whichever language the customer browsed in. The entire interface is bilingual with a genuine right-to-left layout flip.",
  "features": [
    {
      "name": "WhatsApp order checkout",
      "description": "A validated cart and checkout that composes a structured, itemised order message with subtotal, delivery fee, total, payment method and ETA, then opens it in WhatsApp addressed to the business.",
      "businessValue": "Delivers e-commerce style ordering with no payment gateway, no PCI scope and no server cost, using the channel customers already use daily."
    },
    {
      "name": "Fixed-language outbound order formatting",
      "description": "Order messages are always composed in one fixed language regardless of the language the customer browsed the site in.",
      "businessValue": "The fulfilment team receives every order in one consistent format, removing a class of transcription errors."
    },
    {
      "name": "One-tap GPS location capture",
      "description": "An optional control that reads the browser Geolocation API and attaches a map coordinate link to the order, handling permission denial and timeout gracefully.",
      "businessValue": "Reduces failed deliveries in a market where addresses are often descriptive rather than structured."
    },
    {
      "name": "Persistent cart",
      "description": "Cart state held in React Context and mirrored to localStorage, re-resolved against the catalogue on every read so unavailable items drop out cleanly. Live count badge in the navigation.",
      "businessValue": "Customers can leave and return without losing their basket."
    },
    {
      "name": "Searchable and filterable product catalogue",
      "description": "Live client-side search across product name, tagline, description and active ingredients, plus category and availability filters, a result counter and deep-linkable filter URLs.",
      "businessValue": "Visitors self-serve to the right product quickly, and campaigns can link straight to a filtered view."
    },
    {
      "name": "Quick-view product modal",
      "description": "Preview a product's key details in an accessible modal without leaving the catalogue grid.",
      "businessValue": "Shortens the path from browsing to adding to cart."
    },
    {
      "name": "Prerendered product detail pages",
      "description": "Ten statically generated pages carrying key ingredients, benefits, dosing instructions, pack and form data, related products and Product structured data.",
      "businessValue": "Fast, individually indexable pages that answer purchase questions in full."
    },
    {
      "name": "Embedded product videos",
      "description": "Lazy-loaded, privacy-enhanced video embeds on all available products; correctly absent on products still under regulatory registration.",
      "businessValue": "Supports the purchase decision without an up-front page-load cost."
    },
    {
      "name": "Full bilingual EN/AR with true RTL",
      "description": "186 translation keys per locale plus a bilingual content model, with the layout physically flipping via CSS logical properties, a dedicated Arabic typeface, locale-aware letter-spacing and directional icon flipping. Preference persists.",
      "businessValue": "Arabic is a first-class experience rather than a translation bolt-on, widening the addressable audience."
    },
    {
      "name": "Custom branded loading experience",
      "description": "A white intro with the brand mark, breathing glow and animated promise lockup; waits for page load, enforces a minimum fade, hard-caps at two seconds, plays once per session and respects reduced-motion.",
      "businessValue": "A premium first impression that can never become an obstacle to the visitor."
    },
    {
      "name": "Departmental contact system",
      "description": "A validated bilingual contact form with inline errors and focus management that composes a structured pre-filled email, alongside five department cards with their own addresses, hours, socials and an FAQ accordion.",
      "businessValue": "Routes enquiries to the right team and captures leads without a backend or third-party form service."
    },
    {
      "name": "Embedded interactive location map",
      "description": "A keyless map embed driven by stored coordinates, with a directions link.",
      "businessValue": "Helps partners, distributors and visitors locate the business."
    },
    {
      "name": "Animated navigation and command-style search",
      "description": "A fixed navigation transitioning transparent to solid on scroll, an animated mega menu with per-link descriptions, a separate mobile menu, and an accessible overlay search dialog covering products and sections.",
      "businessValue": "Fast wayfinding across a large site with a premium feel."
    },
    {
      "name": "Custom motion system",
      "description": "Six reusable reduced-motion-aware animation primitives: scroll reveal, stagger, magnetic buttons, spring-eased counters and scroll-linked parallax.",
      "businessValue": "Consistent, high-quality motion across the whole site rather than scattered one-off effects."
    },
    {
      "name": "SEO and structured data",
      "description": "Per-page metadata with canonicals, Open Graph and Twitter cards, plus Organization, WebSite with SearchAction, per-product Product and BreadcrumbList JSON-LD, a generated sitemap and robots file.",
      "businessValue": "Improves discoverability and enables rich search results for products."
    },
    {
      "name": "Mobile-optimised responsive design",
      "description": "Five breakpoints with mobile-specific layout decisions including a non-sticky catalogue toolbar, horizontally scrolling filter chips, a compacted search dialog, restructured cart rows and RTL-aware overflow containment.",
      "businessValue": "A properly designed phone experience rather than a compressed desktop one."
    }
  ],
  "technologies": {
    "frontend": ["Next.js 14.2.15 (App Router, React Server Components)", "React 18.3.1", "TypeScript 5.5.4 (strict)", "Tailwind CSS 3.4.10 (custom design-token theme)", "Framer Motion 11.3.30", "lucide-react 0.436.0", "clsx 2.1.1", "tailwind-merge 2.5.2", "next/font (Outfit, Inter, Cairo)"],
    "backend": [],
    "database": [],
    "threeDAndGraphics": ["Hand-authored SVG brand graphics", "CSS gradients and keyframe animation"],
    "integrations": ["WhatsApp deep linking (wa.me)", "YouTube nocookie video embeds", "Google Maps iframe embed (keyless)", "Browser Geolocation API"],
    "storage": ["Browser localStorage (cart, locale)", "Browser sessionStorage (intro seen)"],
    "buildAndTooling": ["PostCSS 8.4.41", "Autoprefixer 10.4.20", "ESLint 8.57 with eslint-config-next", "Playwright 1.47 (browser verification)"],
    "hosting": "Not proven by committed configuration; a .vercel gitignore entry suggests Vercel",
    "notPresent": ["Three.js", "React Three Fiber", "WebGL", "GSAP", "Lottie", "Canvas", "Any database or ORM", "Any authentication system", "Any CMS integration", "Any server API routes", "Any payment gateway", "Any environment variables or secrets"]
  },
  "capabilities": [
    "Web Design",
    "Web Development",
    "Responsive Development",
    "UI/UX",
    "Multilingual Websites",
    "Pharmaceutical Websites",
    "Corporate Websites",
    "Product Catalogs",
    "Animation",
    "Interactive Experiences",
    "SEO",
    "Performance Optimization",
    "Lead Generation",
    "API Integration",
    "Design Systems",
    "Accessibility-Conscious Development",
    "Conversational Commerce / WhatsApp Ordering",
    "Static-First Architecture",
    "Motion Design Systems"
  ],
  "capabilitiesExplicitlyNotDemonstrated": [
    "3D Web Experiences",
    "WebGL",
    "E-Commerce with payment processing",
    "Database Development",
    "Custom CMS or Admin Dashboard",
    "Authentication",
    "Server-backed Custom Web Applications"
  ],
  "designHighlights": [
    "Full 50-950 token ramps for two brand colours plus violet-tinted neutrals, semantic and UI-role tokens, all derived from the brand mark",
    "Three-family typography system with a dedicated Arabic face and fluid clamp-based display scale with tightened negative tracking",
    "Zero stock photography; all non-product imagery is hand-built SVG including gradient orbs, grid and dot fields, quarter arcs and molecular networks",
    "Coordinated multi-element card hover that lifts the card, scales the image, reveals a quick-view affordance and shifts an arrow",
    "Custom shadow, radius and gradient scales giving a consistent soft, premium surface treatment",
    "Consistent eyebrow to display-heading to lead content rhythm that keeps a thirteen-section homepage scannable",
    "Centralised medical disclaimer surfaced on product pages and the footer as an industry-appropriate credibility signal",
    "Session-capped branded loading sequence with breathing glow and animated brand-promise lockup"
  ],
  "engineeringHighlights": [
    "Backendless commerce: cart, checkout, validation and order transmission with no server, database or payment provider, using localStorage-mirrored context and a URI-encoded WhatsApp deep link",
    "Locale-decoupled output formatting: the order-message builder deliberately bypasses the active-locale translation function so operations always receive one fixed language while the UI follows the visitor",
    "Bilingual RTL architecture using a Bi type across the content model, CSS logical properties for a true layout flip, locale-aware typography rules, and a deliberate English-only constraint on medical and regulatory content",
    "SSR-safe reduced-motion hook resolving a document-level hydration failure that made React discard the entire server-rendered page for every visitor with reduce-motion enabled",
    "Custom reusable motion primitive library built on scroll, spring, transform, in-view and motion-value hooks, uniformly reduced-motion aware",
    "Defensive cart re-resolution against the catalogue on every read so removed or unavailable products drop out without breaking state",
    "Deliberate use of overflow-x clip rather than hidden to contain decorative bleed without breaking position sticky",
    "Structured data covering four schema types including per-product Product schema generated from each product's active ingredients",
    "Fully static output of 23 prerendered pages with 87.1 kB shared first-load JS, AVIF and WebP image formats, lazy third-party embeds and rAF-throttled passive scroll listening",
    "Verified in-browser across 17 routes by 2 locales by 2 viewports with 444 passing assertions covering status, overflow, direction, headings, images and console errors"
  ],
  "visualRecommendations": [
    {"id": 1, "route": "/", "viewport": "Desktop", "type": "video", "duration": "3-4s", "capture": "Branded loading screen playing through to its fade-and-scale exit revealing the hero", "why": "The most premium moment on the site; signals bespoke work immediately", "privacy": "Client logo is the focal point; must be replaced with a neutral mark for public use"},
    {"id": 2, "route": "/", "viewport": "Desktop", "type": "video", "duration": "5-6s", "capture": "Slow scroll from hero through featured products and the stats band showing reveals, staggers and counters firing", "why": "Demonstrates the custom motion system, which stills cannot convey", "privacy": "Logo in navigation and product packshots visible"},
    {"id": 3, "route": "/products", "viewport": "Desktop", "type": "video", "duration": "6-8s", "capture": "Typing a search term then switching category chips and status filters with the grid and counter updating live", "why": "Proves real interactive functionality rather than a static grid", "privacy": "Product packshots and product names throughout"},
    {"id": 4, "route": "/order", "viewport": "Both", "type": "video", "duration": "8-10s", "capture": "Cart with items, quantity adjustment, form completion, location capture, submit, and the composed WhatsApp order message", "why": "The strongest single differentiator; a complete commerce flow with no payment gateway", "privacy": "Use dummy customer data; the destination WhatsApp number must be blurred or replaced"},
    {"id": 5, "route": "/products/[slug]", "viewport": "Desktop", "type": "still", "capture": "Full product page showing hero visual, meta cards, add-to-cart box, ingredients, benefits and embedded video", "why": "Shows depth of content architecture and that products are real records", "privacy": "Product packshot, product name and video thumbnail are all identifying"},
    {"id": 6, "route": "/ or /products", "viewport": "Desktop", "type": "video", "duration": "4-5s", "capture": "Clicking the language switcher so the entire layout flips right-to-left including navigation, cards, icons and typography", "why": "The most impressive hard-to-fake capability; bilingual RTL is a genuine specialism", "privacy": "Logo and packshots visible"},
    {"id": 7, "route": "/products", "viewport": "Mobile", "type": "video", "duration": "4s", "capture": "Horizontally scrolling category chip row then opening a quick-view modal", "why": "Demonstrates deliberate mobile-specific design rather than a squeezed desktop layout", "privacy": "Product names and packshots"},
    {"id": 8, "route": "/", "viewport": "Mobile", "type": "still", "capture": "Full-length homepage screenshot at phone width", "why": "Evidences responsive craft across a thirteen-section page", "privacy": "Logo and packshots"},
    {"id": 9, "route": "/contact", "viewport": "Desktop", "type": "still", "capture": "Contact form beside department cards and the embedded live map", "why": "Shows lead-capture architecture and map integration", "privacy": "Contains real emails, real map location and company address; must be redacted or re-pointed to a neutral location"},
    {"id": 10, "route": "/", "viewport": "Desktop", "type": "video", "duration": "3s", "capture": "Hovering a navigation item to open the animated mega menu, then the nav transitioning transparent to solid on scroll", "why": "A polished premium navigation detail", "privacy": "Logo in navigation"}
  ],
  "privacyWarnings": [
    "Client logo files present at public/media/logo.png, public/media/logo.svg, public/loremed-logo-original.png and repo-root media/logo.jpg and media/logo.png",
    "Ten product packshot images in public/media carry brand and product names on the packaging, so any catalogue or product-page screenshot identifies the client unless retouched or replaced",
    "src/content/site.ts contains company name, legal name, domain, public email, phone number, WhatsApp order number, city and region, exact HQ GPS coordinates, a Google Maps place link and Facebook, LinkedIn and YouTube channel URLs",
    "src/app/contact/page.tsx lists five department email addresses",
    "src/content/products.ts contains ten real product names, taglines and formulations",
    "src/content/company.ts contains company history, leadership roles, statistics and news items",
    "README.md references the client name throughout along with brand hex values and the product list",
    "_legacy/old-site.html is a 96 KB prior version of the client site containing the client name",
    "The gitignored brag-output directory contains a promo video and poster showing the client logo, a product packshot, a price, a phone number and an address",
    "src/app/icon.svg is likely brand-derived and should be verified before use",
    "No API keys, tokens, credentials, environment files or secrets are present anywhere in the repository"
  ],
  "portfolioScores": {
    "visualDesign": 8,
    "technicalComplexity": 6.5,
    "interactivity": 7.5,
    "businessValue": 9,
    "portfolioAppeal": 8,
    "overall": 7.8
  },
  "recommendedTier": "Featured Project",
  "recommendedTierReasoning": "The project's value is commercial rather than technical spectacle. It demonstrates something a large share of likely prospects want and can immediately picture: a polished, credible, multilingual brand site that also takes orders without the cost and complexity of a payment gateway or backend. The WhatsApp checkout and the right-to-left language flip are concrete, easily captured differentiators, and bilingual Arabic RTL is a genuine specialism many agencies cannot deliver convincingly. Position it as the conversion-focused multilingual brand site rather than a technical showpiece, and do not imply 3D, full-stack or payment-processing capability.",
  "ownerQuestions": [
    "Was this a redesign of an existing site, and was WebLite responsible for the rebrand as well as the build? A prior version of the client site is present in the repository.",
    "Which parts did WebLite build versus the client or another party, specifically the logo and brand identity, the product photography, and the written copy?",
    "Was the design system created by WebLite or supplied as brand guidelines?",
    "What problem did the client originally come to WebLite with?",
    "Was the WhatsApp ordering flow a client requirement or a WebLite recommendation?",
    "Was bilingual Arabic support in the original brief or added later?",
    "Why was a payment gateway not used: cost, regulatory constraint, customer behaviour, or timeline?",
    "May the client be publicly named, or must the case study remain anonymous?",
    "May screenshots and screen recordings be published, and may product packshots appear given the packaging carries the brand name?",
    "May the live URL be linked from the portfolio?",
    "Is the site currently live, at which domain, and since when?",
    "Are there any measurable outcomes the client is willing to share? None are recorded in the repository.",
    "Are client testimonials available? The testimonials in the site content are role-attributed placeholders and will not be used as social proof.",
    "Are the testimonials, news items and statistics real, illustrative, or pending client sign-off? The stats block says nine products while the catalogue has ten.",
    "Are the current product prices final and safe to show in screenshots?",
    "Where is the site hosted, and is there a CI/CD pipeline not committed to the repository?",
    "Is a headless CMS migration planned? The content layer is structured for it but nothing is integrated.",
    "Is the contact form intended to remain mailto-based, or is server-side delivery planned?"
  ]
}
```
