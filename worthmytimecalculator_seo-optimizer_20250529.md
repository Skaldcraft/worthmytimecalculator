# SEO Optimizer — Worth My Time Calculator

**Version:** v1.0
**Date:** 2025-05-29
**Mode:** Full (External + Internal)
**Gatekeeper Decision:** Conditional Proceed (79/100)
**Prepared by:** ASVAA (AI Search Visibility & Authority Auditor)

---

## Section 1 — ASVAA Audit: AI Readiness & Search Visibility

### Overall AI Readiness: 26/50

| Phase | Score | Status |
|---|---|---|
| 1 · Technical AI Readiness | 6/10 | 🟡 Needs work |
| 2 · Semantic Structure | 4/10 | 🔴 Critical |
| 3 · Information Gain & Authority | 5/10 | 🟡 Needs work |
| 4 · User Scrutiny | 6/10 | 🟡 Needs work |
| 5 · Freshness & Maintenance | 5/10 | 🟡 Needs work |

🔴 1–4 · Critical &nbsp;&nbsp; 🟡 5–7 · Needs work &nbsp;&nbsp; 🟢 8–10 · Good

---

### Phase 1 — Technical AI Readiness (6/10)

| Check | Finding | Confidence |
|---|---|---|
| AI crawler blocks in robots.txt | No blocks — `Allow: /` for all UAs. Sitemap referenced. | High |
| JS-rendered critical content | Prerendered HTML for 9 EN/ES routes. 8 languages exist only as JS-rendered SPA — no static HTML. | High |
| Structured data | WebApplication (EN + ES), Person, Organization schema present. Missing: HowTo, BreadcrumbList, FAQPage, SoftwareApplication with offers. | High |
| Hreflang tags | Only EN + ES alternates in `<head>`. 8 languages absent. `x-default` present pointing to `/`. | High |
| Canonical links | All language variants point to root `https://worthmytimecalculator.com` — incorrect. `/es` should self-reference. | High |
| Hidden SEO text | `<h2 class="seo-heading">` uses `font-size:1px; height:0; opacity:0; overflow:hidden` — visible cloaking technique, Google penalty risk. | High |
| Sitemap | 9 URLs covering EN/ES routes. Missing: 8 languages, additional content pages. Lastmod 2026-05-09. | High |

**Fixes:**
1. Remove hidden H2 SEO text from `index.html:76-78` and `HomePage.jsx:55-57` — replace with visible, meaningful content.
2. Fix canonical URLs per language route: `/es` → `https://worthmytimecalculator.com/es`, `/en` → `https://worthmytimecalculator.com/en`.
3. **[CONDITION-LINKED: ACT-002]** Add hreflang alternates for all 10 languages (DE, FR, IT, PL, RO, RU, TR, UK) after routes exist. Until then, add x-default-only alternates referencing the root.
4. Add HowTo schema for the calculator workflow (steps: enter price → enter income → toggle monthly/hourly → read result).
5. Add BreadcrumbList schema for legal pages.

---

### Phase 2 — Semantic Structure (4/10)

| Check | Finding | Confidence |
|---|---|---|
| Answer-first structure | No direct answers in visible content. Calculator is interactive — no prose that AI can lift as citation. | High |
| Question-based headings | H1 is "Worth My Time Calculator" (brand name, not a question). No H2-H4 headings phrased as queries. | High |
| Sub-topic coverage | No sub-topics covered. No FAQ, no explanatory text about how time-costing works, no examples. | High |
| Noscript fallback | Good summary paragraph in `<noscript>` but only 2 sentences — thin. | Medium |

**Fixes:**
1. Add visible H2 heading above the calculator: "How many hours of work does that purchase really cost?" or localized equivalent.
2. Add 3-5 FAQ items below the calculator with natural-language Q&A pairs (AI-citable).
3. Expand noscript content to a full paragraph describing the tool's value proposition.
4. **[CONDITION-LINKED: ACT-002]** Create language-specific answer-first content for each route — not just translated UI strings.

---

### Phase 3 — Information Gain & Authority (5/10)

| Check | Finding | Confidence |
|---|---|---|
| Original data/POV | The concept (price-to-work-time conversion) is inherently novel but not explained or framed as a methodology. | Medium |
| Named author | Ángel González Palenzuela defined in Person schema ✅. No byline visible on-page. | High |
| Organization defined | Skaldcraft in Organization schema ✅. No visible brand presence or about page. | High |
| Statistics with dates | Zero statistics cited anywhere. No research data, no consumer spending benchmarks. | High |
| Consistent entity definition | "Worth My Time Calculator" brand used consistently. No tagline variation across routes. | High |

**Fixes:**
1. Add an author byline or "About" section with credentials (even a single line: "Created by Ángel González Palenzuela, developer at Skaldcraft").
2. Add 1-2 authoritative statistics with source/date: e.g., "Average US hourly wage: $34.14 (BLS, 2025)".
3. Add a visible framework description: explain the 160 hours/month standard and how amortized cost works — this builds topical authority.
4. Create a single "About" page or `/how-it-works` page explaining the methodology.

---

### Phase 4 — User Scrutiny (6/10)

| Check | Finding | Confidence |
|---|---|---|
| Title tags | Per-language titles present ✅. EN: 56 chars ✅. ES: "Calculadora de Tiempo de Trabajo – ¿Cuántas horas cuesta X?" 62 chars — slightly over 60. | High |
| Meta descriptions | Per-language descriptions present ✅. Generic phrasing: "Simple calculator to convert any price into hours of work." Lacks unique value proposition. | High |
| OG/Twitter meta | Present ✅. Missing: `og:locale` (needed for language variants), `og:site_name`. | High |
| Rich media | Video ads load via iframe/`<video>` — no transcripts, no captions. Image ads use `alt={banner.alt}` (depends on ad JSON quality). | Medium |
| Data visualizations | None. Results are plain numbers — no charts or graphs showing time cost comparisons. | High |

**Fixes:**
1. Add `og:locale` (e.g., `en_US`, `es_ES`) and `og:site_name` tags per route.
2. Refine meta descriptions to include unique value: "See exactly how many hours, days, and weeks of work anything costs — based on your real income."
3. Add a chart/visualization component showing proportional time cost breakdown (if effort allows — medium priority).
4. Trim ES title to ≤60 chars: "Calculadora de Trabajo – ¿Cuántas horas cuesta un producto?"

---

### Phase 5 — Freshness & Maintenance (5/10)

| Check | Finding | Confidence |
|---|---|---|
| datePublished / dateModified in schema | Absent from all schema blocks. No visible dates on any page. | High |
| Content age | Sitemap lastmod is 2026-05-09 (20 days old). Core calculator changes infrequently. | Medium |
| High-decay content | Legal pages (3 EN + 3 ES) are static — low decay. No stats, no "best of" lists, no pricing. | High |

**Fixes:**
1. Add `datePublished` and `dateModified` to schema.org markup for all pages.
2. Add a visible last-updated line on legal pages: "Last updated: May 9, 2026".
3. Set up automated sitemap lastmod updates in the build pipeline (CI could stamp fresh timestamps per route).

---

### Priority Findings

**🔴 High Priority**

| Finding | Confidence | Fix |
|---|---|---|
| Hidden SEO H2 text (cloaking risk) | High | Remove `seo-heading` wrapper. Make H2 visible and meaningful above the calculator. |
| Canonical URLs all point to root | High | Set canonical per language route: `/en` → self, `/es` → self. |
| 8 of 10 languages invisible to crawlers | High | **[ACT-002 required]** Add URL routes, prerender, hreflang. |
| Missing HowTo & BreadcrumbList schema | High | Add to `index.html` JSON-LD block. |

**🟡 Medium Priority**

| Finding | Confidence | Fix |
|---|---|---|
| No FAQ or sub-topic content | High | Add FAQ section below calculator (5-7 Q&As). |
| Thin meta descriptions | High | Rewrite with unique value prop per language. |
| No visible dates on any page | High | Add datePublished/dateModified in schema and on-page. |
| Missing og:locale and og:site_name | High | Add to Helmet per route. |
| No author byline visible on-page | Medium | Add "Created by Ángel González Palenzuela" line in Footer or below calculator. |

**🟢 Low Priority**

| Finding | Confidence | Fix |
|---|---|---|
| No data visualizations | Medium | Add optional chart for time cost breakdown. |
| No blog / guide content | Medium | Create 2-3 supporting articles linking back to the tool. |
| No analytics to measure SEO impact | High | **[ACT-006]** Implement privacy-respecting analytics for KPI baseline. |

---

### Quick Wins

1. **Remove hidden H2 cloaking** — 30min, eliminates penalty risk, improves Phase 2 & 4 scores. Replace with visible `<h2>` above calculator.
2. **Fix canonical URLs per language route** — 30min in `HomePage.jsx` Helmet, fix for `index.html` inline script. Direct impact on indexation.
3. **Add HowTo schema** — 1hr in `index.html` JSON-LD block. Defines the calculator workflow for AI extraction. No code changes beyond markup.

---

## Section 2 — Condition-Linked Risk Register

The following recommendations are **blocked or partially blocked** until ACT-002 (URL routes + prerender + hreflang for 8 languages) is completed. These are flagged as conditional.

| ID | Recommendation | Dependency | Risk if ACT-002 Not Done |
|---|---|---|---|
| CLR-001 | Hreflang alternates for DE/FR/IT/PL/RO/RU/TR/UK | ACT-002 (routes must exist for hreflang to point at valid URLs) | AI crawlers cannot associate language content; no language targeting for 80% of UI languages |
| CLR-002 | Prerendered HTML for 8 languages | ACT-002 (prerender.mjs route list must expand) | JS-only rendering for 8 languages; AI crawlers see empty/no content |
| CLR-003 | Sitemap entries for 8 language home + legal pages | ACT-002 (routes must exist before sitemap URLs are valid) | 0% of non-EN/ES content in sitemap; no crawl pathway |
| CLR-004 | Language-specific canonical URLs for 8 languages | ACT-002 (must know final URL structure) | All 8 language variants would incorrectly canonical to root |
| CLR-005 | Legal pages for 8 languages (ACT-007) | ACT-002 (legal page components need routes to mount to) | Non-EN/ES users see mismatched UI language vs EN/ES-only legal content |
| CLR-006 | OG:locale and hreflang x-default for 8 languages | ACT-002 (proper language tagging requires dedicated routes) | Social sharing cards show English metadata for non-EN/ES users |
| CLR-007 | 8-language keyword targeting in GSC | ACT-002 (no indexed URLs to measure rankings against) | Cannot measure SEO performance for DE, FR, IT, PL, RO, RU, TR, UK markets |

**Risk Level:** High — 7 recommendations are gated. Until ACT-002, 80% of the language surface contributes zero SEO value.

**Mitigation:** If ACT-002 is deferred indefinitely, remove 8 language options from the UI selector (reduce to EN+ES only) to eliminate user confusion between visible language and invisible-route content.

---

## Section 3 — Competitive Landscape & Keyword Gap Analysis

### Primary Keyword: "work time calculator"

| Metric | Assessment | Confidence |
|---|---|---|
| Search intent | Transactional/Informational — user wants to calculate hours of work for a given price | High |
| Competition level | Low-Medium — niche tool, few direct competitors with dedicated domains | Medium |
| Current site ranking | Cannot verify (no GSC access — Unknown U-002) | Low |
| AI Overview likelihood | Medium — tool queries may trigger AI-generated calculation steps rather than clicks | Medium |

### Keyword Opportunities by Language

| Language | Primary Keyword | Search Volume Estimate | Current Coverage |
|---|---|---|---|
| EN | "work time calculator", "price to hours converter", "time cost calculator" | Medium | ✅ Route exists, title matches |
| ES | "calculadora horas de trabajo", "cuánto tiempo de trabajo cuesta" | Medium | ✅ Route exists, title matches |
| DE | "arbeitszeit rechner", "preis in arbeitsstunden" | Medium | ❌ No route, no hreflang |
| FR | "calculateur heures de travail", "convertisseur prix heures" | Medium | ❌ No route, no hreflang |
| IT | "calcolatore ore lavoro", "quanto costa in ore" | Low-Medium | ❌ No route, no hreflang |
| PL | "kalkulator godzin pracy", "przelicznik ceny na godziny" | Low-Medium | ❌ No route, no hreflang |
| RO | "calculator ore de muncă", "convertor preț în ore" | Low | ❌ No route, no hreflang |
| RU | "калькулятор рабочего времени", "цена в часах работы" | Medium | ❌ No route, no hreflang |
| TR | "çalışma saati hesaplayıcı", "fiyatı saate çevir" | Low-Medium | ❌ No route, no hreflang |
| UK | "калькулятор робочого часу", "ціна в годинах роботи" | Low | ❌ No route, no hreflang |

### Content Gap Summary

| Content Type | Exists? | Priority | Impact |
|---|---|---|---|
| Calculator tool | ✅ Yes | — | Core feature |
| FAQ section | ❌ No | High | AI citation, rich snippet eligible |
| Blog/guide content | ❌ No | Medium | Authority building, internal linking |
| About page / methodology | ❌ No | Medium | Trust signal, entity definition |
| Data visualization | ❌ No | Low | User engagement, shareability |
| Case studies / examples | ❌ No | Low | Click-through value |

---

## Section 4 — Action Plan

### Now (immediate — current sprint)

| ID | Action | Effort | Owner | Acceptance Criterion |
|---|---|---|---|---|
| SEO-001 | Remove hidden H2 cloaking from index.html + HomePage.jsx | S | Frontend | No `seo-heading` class with hidden text; visible H2 above calculator |
| SEO-002 | Fix canonical URLs per language route | S | Frontend | `/en` → `https://worthmytimecalculator.com/en`; `/es` → `https://worthmytimecalculator.com/es` |
| SEO-003 | Add HowTo + BreadcrumbList schema to index.html | S | Frontend | JSON-LD validates at schema.org/validator |
| SEO-004 | Add `og:locale` and `og:site_name` tags per route | S | Frontend | OG tags vary correctly by language route |
| SEO-005 | Rewrite meta descriptions with unique value prop | S | Content | EN + ES descriptions include user-specific value ("your real income") |
| SEO-006 | Add visible FAQ (5-7 items) below calculator | M | Frontend + Content | FAQ renders on `/en` and `/es`; semantically structured for AI extraction |

### Next (near-term — next sprint)

| ID | Action | Effort | Owner | Condition |
|---|---|---|---|---|
| SEO-007 | Implement privacy-respecting analytics (ACT-006) | S | Frontend | Pageview + event tracking live; baseline KPIs measurable |
| SEO-008 | Add datePublished/dateModified to schema + on-page | S | Frontend | Each prerendered page shows last-updated date; schema includes timestamps |
| SEO-009 | Create "How It Works" methodology section | M | Content | 300+ word explanation of price-to-time conversion with 160 hrs/month standard |
| SEO-010 | Add author byline visible on all pages | S | Frontend | "Created by Ángel González Palenzuela" in Footer or below calculator |

### Later (backlog)

| ID | Action | Effort | Owner | Condition |
|---|---|---|---|---|
| SEO-011 | **[CLR-001 to CLR-007]** Full language route expansion (ACT-002) | L | SEO + Frontend | 8 new routes deployed, hreflang complete, sitemap expanded |
| SEO-012 | Create 2-3 guide articles linking to calculator | M | Content | Published at `/en/guides/...`, cross-linked from calculator |
| SEO-013 | Add data visualization for time cost breakdown | M | Frontend | Chart.js or equivalent rendering cost breakdown |
| SEO-014 | Legal pages for 8 languages (ACT-007) | M | Frontend | **[Blocked by SEO-011]** |

### Effort Summary

| Phase | S | M | L | Total |
|---|---|---|---|---|
| Now | 5 | 1 | 0 | 6 |
| Next | 3 | 1 | 0 | 4 |
| Later | 0 | 2 | 1 | 3 |
| **Total** | **8** | **4** | **1** | **13** |

---

## Section 5 — 30-60-90 Day Execution Plan

### Days 1–30: Quick Wins & Foundation

| Day | Focus | Actions |
|---|---|---|
| 1-2 | Remove SEO penalty risk | SEO-001: Remove hidden H2 cloaking from `index.html` + `HomePage.jsx`. Verify no hidden text remains. |
| 3-4 | Fix core indexing signals | SEO-002: Fix canonical URLs. SEO-004: Add og:locale + og:site_name. SEO-003: Add HowTo + BreadcrumbList schema. |
| 5-7 | Improve meta + FAQ | SEO-005: Rewrite meta descriptions. SEO-006: Write and implement FAQ section (5-7 Q&As). |
| 8-10 | Analytics baseline | SEO-007 (ACT-006): Implement Plausible/Fathom/analytics. Verify events fire for pageviews and calculations. |
| 11-14 | Dates + author | SEO-008: Add dates to schema + footer. SEO-010: Add author byline. |
| 15-20 | Methodology content | SEO-009: Write 300+ word "How It Works" section explaining calculation logic and 160 hrs/month standard. |
| 21-25 | Security headers (SEC-001) | Deploy CSP, HSTS, XFO, XCTO, Referrer-Policy, Permissions-Policy — security signals influence SEO trust. |
| 26-30 | Monitoring + iteration | Verify all changes in production via GSC (after verification). Monitor for indexation changes. |

**Milestone (Day 30):** All 6 "Now" actions complete. ASVAA Phase 2 score expected to rise from 4/10 to 6/10. Phase 4 from 6/10 to 7/10.

### Days 31–60: Language Expansion & Authority Building

| Day | Focus | Actions |
|---|---|---|
| 31-35 | Plan ACT-002 | Audit `App.jsx`, `prerender.mjs`, `sitemap.xml`, `.htaccess` for 8-language route expansion. Create implementation blueprint. |
| 36-45 | Launch 8 language routes | **[CLR-001 to CLR-007]** Add routes to App.jsx, prerender.mjs, sitemap.xml, hreflang tags in index.html. Deploy all 8 new route groups. |
| 46-50 | Post-launch validation | Verify all 25+ URLs return 200, prerendered HTML exists, hreflang tags self-reference correctly. Fix any issues. |
| 51-55 | Guide content creation | Create 2 guide articles: "How to Calculate the Real Cost of Anything" + "Why Time-Based Spending Makes You Smarter". Link to calculator. |
| 56-60 | GSC monitoring | Submit new sitemap to GSC. Monitor indexation progress for 8 new language routes. Log baseline impressions/clicks. |

**Milestone (Day 60):** All 10 languages have indexed, prerendered routes. Sitemap covers 25+ URLs. ASVAA Phase 1 expected to rise from 6/10 to 9/10.

### Days 61–90: Measurement & Refinement

| Day | Focus | Actions |
|---|---|---|
| 61-70 | Visualization | SEO-013: Add chart component for time cost breakdown (bar or gauge showing days/hours/weeks). |
| 71-75 | Legal page expansion | SEO-014: Create legal pages for DE, FR, IT (top 3 non-EN/ES languages by market size). **[Partially blocked by ACT-002 — translations needed]** |
| 76-80 | Analytics review | Analyze 60 days of analytics data. Identify top-performing language routes, bounce rates, calculation completion rates. |
| 81-85 | Content refresh | Update FAQ with real user questions if any data available. Add examples section. |
| 86-90 | Cycle 2 ASVAA audit | Re-run full ASVAA audit. Target score: 38/50+ (up from 26/50). Prepare SEO Optimizer v2.0. |

**Milestone (Day 90):** Full SEO infrastructure live for all 10 languages. Measurement framework operational. ASVAA target: 38+/50.

---

## Section 6 — Internal Discoverability Package

### Taxonomy Tags

| Tag Category | Values |
|---|---|
| `type` | `web-app`, `calculator`, `utility`, `free-tool`, `financial` |
| `language` | `en`, `es`, `de`, `fr`, `it`, `pl`, `ro`, `ru`, `tr`, `uk` |
| `currency` | `usd`, `eur`, `gbp`, `jpy`, `cad`, `aud`, `chf`, `cny`, `brl`, `mxn`, `inr`, `sek`, `nok`, `dkk` |
| `feature` | `price-to-time`, `amortized-cost`, `calculation-history`, `lifespan-input`, `video-ads`, `currency-detect`, `language-detect` |
| `route-type` | `calculator`, `legal-notice`, `privacy-policy`, `cookie-policy` |
| `render` | `prerendered`, `client-js`, `hybrid` |
| `status` | `stable`, `needs-routes` |

### Suggested Keywords by Language

| Language | Primary Keywords |
|---|---|
| EN | `work time calculator`, `price to hours converter`, `time cost calculator`, `how many hours of work does it cost`, `is it worth it calculator`, `money to time converter`, `purchase time cost`, `hourly wage comparison tool` |
| ES | `calculadora de horas de trabajo`, `cuántas horas de trabajo cuesta`, `convertir precio en horas de trabajo`, `calculadora tiempo trabajo`, `vale la pena comprarlo calculadora`, `coste en horas de trabajo` |
| DE | `arbeitszeit rechner`, `preis in arbeitsstunden umrechnen`, `lohnt sich das rechner`, `kosten in arbeitszeit`, `stundenlohn rechner preis` |
| FR | `calculateur heures de travail`, `convertir prix en heures de travail`, `calculateur temps de travail prix`, `est-ce que ça vaut le coup calculatrice`, `convertisseur argent temps` |
| IT | `calcolatore ore di lavoro`, `convertire prezzo in ore di lavoro`, `calcolatore tempo lavoro prezzo`, `ne vale la pena calcolatrice`, `costo in ore di lavoro` |
| PL | `kalkulator godzin pracy`, `przelicz cenę na godziny pracy`, `kalkulator czasu pracy cena`, `czy warto kupić kalkulator`, `koszt w godzinach pracy` |
| RO | `calculator ore de muncă`, `convertește prețul în ore de muncă`, `calculator timp de muncă preț`, `merită calculator`, `cost în ore de muncă` |
| RU | `калькулятор часов работы`, `перевести цену в часы работы`, `калькулятор времени работы цена`, `стоит ли покупать калькулятор`, `стоимость в часах работы` |
| TR | `çalışma saati hesaplayıcı`, `fiyatı çalışma saatine çevir`, `zaman fiyat hesaplayıcı`, `buna değer mi hesaplayıcı`, `çalışma süresi maliyet` |
| UK | `калькулятор годин роботи`, `конвертувати ціну в години роботи`, `калькулятор часу роботи ціна`, `чи варто купувати калькулятор`, `вартість у годинах роботи` |

### Cross-Reference Map

```
/  ───redirect (LanguageRedirect)──→ /en  (or /es if browser lang is es)
│
├── /en ──── HomePage (calculator)
│    ├── /en/legal-notice ──── LegalNoticeEnPage
│    ├── /en/privacy-policy ── PrivacyPolicyEnPage
│    └── /en/cookie-policy ─── CookiePolicyEnPage
│
├── /es ──── HomePage (calculadora)
│    ├── /es/aviso-legal ─────── LegalNoticePage
│    ├── /es/politica-privacidad ── PrivacyPolicyPage
│    └── /es/politica-cookies ──── CookiePolicyPage
│
├── Footer (all pages)
│    ├── Links to legal routes based on browserIsSpanish()
│    └── Copyright line with translation
│
└── LanguageSelector (Header)
     └── Sets language state (no URL navigation for non-EN/ES)
```

**Planned (post ACT-002):**
```
/en           /es           /de           /fr           /it
/pl           /ro           /ru           /tr           /uk
  └── /{lang}/legal-notice (localized per language)
  └── /{lang}/privacy-policy (localized per language)
  └── /{lang}/cookie-policy (localized per language)
```

### Naming Conventions

| Convention | Pattern | Examples | Consistency |
|---|---|---|---|
| Language codes | 2-char ISO 639-1 | `en`, `es`, `de`, `fr` | ✅ Consistent |
| Route paths | `/{lang}/{slug}` | `/en/legal-notice`, `/es/aviso-legal` | ✅ Consistent |
| Page components (EN) | `{Name}EnPage.jsx` | `LegalNoticeEnPage.jsx`, `PrivacyPolicyEnPage.jsx` | ✅ Consistent for EN |
| Page components (ES) | `{Name}Page.jsx` | `LegalNoticePage.jsx`, `PrivacyPolicyPage.jsx` | ⚠️ Inconsistent — ES pages lack language suffix |
| Translation keys | camelCase | `metaTitle`, `priceLabel`, `seoH2` | ✅ Consistent |
| localStorage keys | camelCase + language suffix | `calculatorHistory_{lang}`, `userLanguagePreference`, `currencyPreference` | ✅ Consistent |
| Ad JSON files | `{lang}.json` | `en.json`, `es.json`, `de.json` | ✅ Consistent |
| Currency codes | ISO 4217 | `USD`, `EUR`, `GBP` | ✅ Consistent |
| CSS classes | kebab-case (Tailwind) | `seo-heading`, `text-muted-foreground` | ✅ Consistent |

**Recommendation:** Rename `LegalNoticePage.jsx` → `LegalNoticeEsPage.jsx` (and same for Privacy + Cookie) to match the EN naming pattern and make language ownership explicit.

### Stale & Orphaned Content Audit

| Item | Type | Status | Action |
|---|---|---|---|
| Translation strings for DE, FR, IT, PL, RO, RU, TR, UK | Translations | ⚠️ Orphaned — no URL routes for these languages | Route expansion (ACT-002) or remove from selector |
| `next-themes` dependency | npm package | 🗑️ Dead code — imported but never initialized | Remove per ACT-003 / SEC-002 |
| Hidden H2 SEO text in `index.html:76-78` | SEO markup | 🗑️ Stale technique — cloaking penalty risk | Remove per SEO-001 |
| Hidden H2 SEO text in `HomePage.jsx:55-57` | SEO markup | 🗑️ Stale technique — same as above | Remove per SEO-001 |
| `.version` file (`43`) | Version tracking | 🗑️ Manual — no automated increment | Replace with `git tag` + semantic-release |
| Ad JSON files for DE, FR, IT, PL, RO, RU, TR, UK | Ad configs | ⚠️ Exist but routes don't — ads load via JS regardless | Valid until routes exist; keep serving |
| Puppeteer YouTube/Vimeo iframe embeds | Components | ✅ Active — rendered based on ad JSON type | No action |
| `scrollToTop` effect for `/` route | UX | 🗑️ Redundant — root route redirects to `/en` or `/es` immediately | Evaluate removal or leave (minimal cost) |

---

## Section 7 — Measurement Framework

### Key Performance Indicators

| KPI | Baseline | Target (Day 30) | Target (Day 60) | Target (Day 90) | Measurement Source | Confidence |
|---|---|---|---|---|---|---|
| **Indexed pages in GSC** | Unknown (no GSC access) | 9 (all prerendered) | 25+ (all 10 languages included) | 30+ (with guides) | Google Search Console | Medium |
| **Primary keyword avg position (EN)** | Unknown | Track baseline | < 20 | < 10 | Google Search Console | Medium |
| **Primary keyword avg position (ES)** | Unknown | Track baseline | < 20 | < 10 | Google Search Console | Medium |
| **Language routes indexed** | 2 (EN, ES) | 2 | 10 ✅ (ACT-002 target) | 10 | Google Search Console | High |
| **Pages with HowTo schema** | 0 | 2 (EN + ES) | 10 | 10 + guides | Schema.org validator | High |
| **Calculation completion rate** | Unknown | Track baseline | > 30% | > 40% | Analytics (post SEO-007) | Medium |
| **Bounce rate (landing page)** | Unknown | Track baseline | < 65% | < 55% | Analytics (post SEO-007) | Medium |
| **AI Overview citations** | Unknown | Track baseline | Track | Track | Manual spot-check + third-party tools | Low |
| **Cumulative calculations performed** | Unknown | Track baseline | Track | Track | Analytics event tracking | Medium |
| **Page load time (LCP)** | ~1.5s (estimate — prerendered, lightweight) | Verify | < 2.0s (all routes) | < 1.8s | CrUX / PageSpeed Insights | High |
| **Sitemap submission status** | Not submitted to GSC | Submitted | Verified indexed | Verified indexed | Google Search Console | High |
| **Security headers deployed** | None | ✅ All 6 present | ✅ Maintained | ✅ Maintained | `curl -I` + securityheaders.com | High |
| **Hreflang tag coverage** | 2 languages + x-default | 2 + x-default | 10 languages + x-default | 10 + x-default | Manual inspection per route | High |

### Measurement Tools

| Tool | Purpose | Cost | Setup Effort |
|---|---|---|---|
| Google Search Console | Index status, keyword rankings, CTR, Core Web Vitals | Free | 1hr (domain verification via DNS/HTML file) |
| PageSpeed Insights / CrUX | LCP, FID/INP, CLS per route | Free | Immediate (URL-based) |
| Plausible / Fathom (ACT-006) | Pageviews, bounce rate, events, language/currency usage | Free tier available ($10-14/mo paid) | 2hr (script + event instrumentation) |
| Sentry free tier (R-002) | Error monitoring, JS exceptions | Free (5k events/month) | 1hr (DSN + instrumentation) |
| Schema.org Validator | Structured data validation | Free | Immediate (URL-based) |
| securityheaders.com | HTTP security header audit | Free | Immediate |

### Reporting Cadence

| Frequency | Report | Audience |
|---|---|---|
| Weekly (Mon) | KPI dashboard check: indexed pages, errors, Core Web Vitals | Maintainer |
| Bi-weekly | GSC performance snapshot: top queries, avg position, CTR | Maintainer |
| Monthly | Full ASVAA audit re-score + trend analysis | Maintainer |
| Quarterly | SEO Optimizer refresh: competitive landscape, keyword gaps | Maintainer |

---

## Section 8 — Execution Summary

| Dimension | Current State | Target State (Day 90) | Uplift |
|---|---|---|---|
| ASVAA Score | 26/50 | 38+/50 | +12+ points |
| Indexed Language Routes | 2 (EN, ES) | 10 (all languages) | +8 routes |
| Schema Types | 3 (WebApplication, Person, Organization) | 5 (+HowTo, +BreadcrumbList) | +2 schemas |
| Hreflang Coverage | 2 languages | 10 languages | +8 tags |
| Sitemap URLs | 9 | 25+ | +16 URLs |
| Guide Content | 0 pages | 2-3 pages | +2-3 pages |
| Analytics | None | Privacy-respecting analytics live | Baseline established |
| Error Monitoring | None | Sentry live (R-002) | Runtime visibility |
| Hidden SEO Text | Present (penalty risk) | Removed | Risk eliminated |
| Canonical URLs | All point to root | Per-language self-referencing | Corrected |

**Top 3 actions with highest score impact:**
1. **SEO-001 + SEO-002** (Remove cloaking + fix canonicals) — 1 day, eliminates penalty risk, corrects indexation.
2. **SEO-011** (8 language routes — ACT-002) — 1-2 weeks, unlocks 80% of language SEO value, raises Phase 1 from 6→9.
3. **SEO-006** (FAQ section) — 2-3 days, enables AI citation for Featured Snippets and AI Overviews, raises Phase 2 from 4→6+.

---

*End of SEO Optimizer v1.0 — Worth My Time Calculator*
*Prepared 2025-05-29 under Gatekeeper Decision: CONDITIONAL PROCEED (79/100)*
*Condition-linked risks (CLR-001 through CLR-007) are flagged and gated on ACT-002 completion.*
