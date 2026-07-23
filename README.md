# Loremed Pharma — Corporate Website

A premium, production-ready corporate website for **Loremed Pharma**, built as a complete rebrand of the digital experience. The entire design language is derived from the official Loremed logo — its deep indigo-violet purple (`#322353`) and vivid pharma orange (`#EC691D`), its geometric “Ld” monogram, and its “We care about quality of life” promise.

Built to feel like the sites of Roche, Novo Nordisk, Stripe and Apple: minimal, Swiss, confident, and unmistakably Loremed.

---

## ✨ Highlights

- **Custom loading experience** — pure-white intro with the official logo, a breathing glow, and the “WE CARE ABOUT / QUALITY OF LIFE” lockup. Shows only until assets are ready (hard-capped at 2s), then fades + scales as the site fades in. Never replays within a session; respects `prefers-reduced-motion`.
- **Design system from the logo** — full Tailwind token scales (`primary` 50–950 purple, `secondary` 50–950 orange, violet-tinted neutrals, semantic + surface tokens), soft shadows, brand gradients, and logo-derived abstract graphics (quarter-arc bowls, molecular networks, gradient orbs). No stock photography.
- **13-section homepage** — Hero → Company Overview → Stats → Why Loremed → Featured Products → Manufacturing → R&D → Quality Assurance → Certifications → Global Partnerships → Healthcare Professionals → News → Testimonials → Contact.
- **Full site** — Products catalogue (search, category + status filters, quick-view), 9 product detail pages (SSG), About, Quality, R&D, and Contact (form + departments + map + FAQ).
- **Navigation** — transparent-over-hero → solid-on-scroll, animated mega menu, command-style search, English/العربية language switch, sticky and accessible.
- **Bilingual & RTL-ready** — English + Arabic with a full right-to-left layout flip (logical properties throughout), Cairo Arabic typeface, persisted preference.
- **Motion** — Framer Motion reveals, staggers, magnetic buttons, parallax, animated counters — all reduced-motion aware.
- **Engineered for quality** — WCAG-minded contrast & focus states, complete SEO metadata, JSON-LD (Organization, WebSite, Product, Breadcrumb, ItemList), sitemap, robots, and a ~150 kB first-load JS budget.

## 🧱 Tech Stack

| | |
|---|---|
| Framework | **Next.js 14** (App Router, React Server Components) |
| Language | **TypeScript** (strict) |
| Styling | **Tailwind CSS 3.4** (custom design-token theme) |
| Animation | **Framer Motion 11** |
| Icons | **lucide-react** (thin, rounded, on-brand) |
| Fonts | **Outfit** (display) · **Inter** (body) · **Cairo** (Arabic) — self-hosted via `next/font` |

## 🚀 Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the production build
```

## 📁 Structure

```
src/
├─ app/                     # routes (App Router)
│  ├─ layout.tsx            # fonts, metadata, providers, chrome, JSON-LD
│  ├─ page.tsx              # homepage (13 sections)
│  ├─ products/             # catalogue + [slug] detail (SSG)
│  ├─ about/ quality/ research/ contact/
│  ├─ icon.svg  sitemap.ts  robots.ts  not-found.tsx
│  └─ globals.css           # base layer + brand utilities
├─ components/
│  ├─ logo/                 # vector logo mark + wordmark
│  ├─ layout/               # LoadingScreen, Navbar, MegaMenu, MobileMenu, Footer, PageHero, Search, LanguageSwitcher
│  ├─ sections/             # every homepage & page section + ContactForm, Catalogue, QuickView
│  ├─ ui/                   # Button, Section/Container/Eyebrow/Badge, ProductCard, Accordion, motion primitives
│  └─ graphics/             # abstract logo-derived backdrops
├─ content/                 # site.ts, products.ts, company.ts  ← CMS-ready data layer
├─ i18n/                    # LanguageProvider + EN/AR dictionaries
└─ lib/                     # utils + SEO/JSON-LD helpers
```

## 🎨 Design Tokens

All tokens live in [`tailwind.config.ts`](tailwind.config.ts) and are pulled straight from the logo:

- **Primary (purple)** `50 → 950`, brand = `primary-800` `#322353`
- **Secondary (orange)** `50 → 950`, brand = `secondary-500` `#EC691D`
- **Neutral** violet-tinted grays `50 → 950`
- **Semantic** `success · warning · danger · info`
- **Surface / ink / line** UI tokens for backgrounds, text and borders

Use them as normal Tailwind utilities: `bg-primary-800`, `text-ink-soft`, `border-line`, `text-gradient`, etc.

## 🌍 Internationalisation (EN / AR)

`LanguageProvider` swaps the dictionary, sets `<html dir>` / `lang`, and persists the choice. UI chrome (nav, buttons, hero, footer, search, contact form, loading screen) is fully translated; the layout mirrors for Arabic using logical Tailwind utilities (`ps-/pe-`, `ms-/me-`, `start-/end-`, `text-start/end`). Add strings in [`src/i18n/dictionaries.ts`](src/i18n/dictionaries.ts).

## 🧩 CMS-Ready

All copy and product data are isolated in `src/content/*` as typed objects that map 1:1 to a headless CMS schema (Sanity / Strapi / Contentful). Swapping the data source for a CMS fetch requires **no UI changes** — the components are pure presentational consumers of these types.

## 📝 Content

Company details and the 9-product range (Imulormed, Lvylor, Vitelormed, Ferolormed, SmartOD, Welcaderm Lotion, Lvylor Advance, Coglern Syrup, SmartOD D) reflect the real Loremed catalogue and the company’s stated three-year growth ambition. Contact channels, department emails and precise address are set as sensible defaults in [`src/content/site.ts`](src/content/site.ts) — update them there before launch.

> **Medical disclaimer** is centralised in `src/content/site.ts` and surfaced on product pages and the footer.
