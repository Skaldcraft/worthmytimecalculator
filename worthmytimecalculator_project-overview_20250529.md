# Project Overview — Worth My Time Calculator
**Date:** 2025-05-29
**Mode:** Deep
**Confidence:** High

---

## 1. Executive Summary

**What it is:** A single-page React application that converts any monetary price into equivalent working hours, days, and weeks based on the user's income. Targeted at consumers evaluating purchases in terms of time cost.

**Maturity:** Production-ready. The app is deployed at worthmytimecalculator.com via GitHub Actions (push-to-deploy over FTP to Hostinger). It has prerendered static HTML for 9 routes, full schema.org structured data, multi-language support (10 languages), multi-currency support (14 currencies), and video advertising.

**Top 3 issues/opportunities:**
1. **Video ads dominate payload** — 4 MP4 files account for ~7.8 MB of the 8.35 MB build. Videos use `preload="none"` now, but still represent nearly all bandwidth on first visit.
2. **Only EN/ES have URL routes** — 8 of 10 languages work via the selector but have no dedicated URL paths, no hreflang tags, and no prerendered pages. This limits SEO for non-EN/ES languages.
3. **No automated testing** — The project has a linter (ESLint) but zero unit, integration, or E2E tests. The calculator logic is untested.

---

## 2. Project Map

```
public/                     ← Static assets (ads, htaccess, robots, sitemap)
  ads/                      ← Video files + language-specific ad JSON configs
  .htaccess                 ← SPA rewrites + cache headers
  sitemap.xml               ← 11 URLs, all in EN/ES only

src/
  context/
    LanguageContext.jsx      ← 10-language detection + localStorage persistence
    CurrencyContext.jsx      ← 14-currency detection + localStorage persistence
  components/
    Header.jsx               ← Sticky header with LanguageSelector + CurrencySelector
    Footer.jsx               ← Legal links (browser-language-aware routing)
    CalculatorSection.jsx    ← Core calculation logic + UI
    HistorySection.jsx       ← Recent calculations (localStorage, last 4, per-language)
    BannerSection.jsx        ← Video/image ad display (language-specific JSON fetch)
    LanguageRedirect.jsx     ← Root `/` redirects based on browser language
    LanguageSelector.jsx     ← Dropdown for 10 languages
    CurrencySelector.jsx     ← Dropdown for 14 currencies
    ScrollToTop.jsx          ← Route-change scroll reset
    ui/                      ← shadcn/ui primitives (button, card, input, label, sonner)
  pages/
    HomePage.jsx             ← Main SPA entry point
    *Page.jsx / *EnPage.jsx  ← Legal pages (ES/EN static content, 6 files)
  lib/
    translations.js          ← 10 languages × 31 keys each (310 strings)
    utils.js                 ← cn() helper (clsx + twMerge)
  index.css                  ← Tailwind + CSS variables + banner ad protections
  App.jsx                    ← Router + providers
  main.jsx                   ← React root mount

prerender.mjs               ← Post-build Puppeteer script (9 routes)
```

---

## 3. How the System Works

**Primary workflow (price calculation):**
1. User enters item price and income (monthly or hourly, toggled via segmented control).
2. Optional: lifespan in years unlocks amortized cost/month and cost/year estimates + hours-needed-to-work for that cost.
3. Results (days, hours, weeks of work) are displayed in 3 cards below.
4. If lifespan is provided, the calculation is saved to localStorage history (last 4, per language).

**Language detection flow:**
1. URL path (`/es` → Spanish, `/en` → English) checked first.
2. localStorage user preference checked second.
3. `navigator.language` prefix checked third.
4. Falls back to `'en'`.

**Currency detection flow:**
1. localStorage preference checked first.
2. Full locale match (e.g. `es-MX` → MXN) checked second.
3. Language prefix match (e.g. `de` → EUR) checked third.
4. Falls back to USD.

**Deployment flow:**
1. Push to `main` branch triggers GitHub Actions workflow.
2. Workflow runs `npm ci && npm run build` (Vite build + Puppeteer prerender).
3. FTP-deploys `dist/` to Hostinger `/public_html/`.

**Failure paths:**
- If ad JSON fetch fails → banner section renders nothing (silent failure).
- If localStorage is unavailable → language/currency defaults are used, preference saving is silently skipped.
- If prerender crash → the `dist/` folder still contains Vite build output (no prerendered HTML).

---

## 4. Capability Matrix

| Capability | Status | Confidence | Key Dependencies | Notes |
|---|---|---|---|---|
| Price-to-time conversion | Implemented | High | React state, 160 hrs/month constant | Core feature, responsive on all screen sizes |
| Amortized cost (lifespan) | Implemented | High | Price + lifespan input | Unlocks history saving |
| Multi-language UI (10) | Implemented | High | LanguageContext, translations.js | 8 languages lack URL routes |
| Multi-currency (14) | Implemented | High | CurrencyContext, localStorage | Fully independent from language |
| Language auto-detect | Implemented | High | navigator.language | URL path takes precedence |
| Currency auto-detect | Implemented | High | navigator.language | Full locale + language fallback |
| Prerendered static pages | Implemented | High | Puppeteer, 9 routes | EN + ES only |
| Schema.org structured data | Implemented | High | index.html JSON-LD | WebApplication, Person, Organization |
| Video advertising | Implemented | High | BannerSection, per-language JSON | 4 MP4 files, language-aware |
| Calculation history | Implemented | High | localStorage, per-language keyed | Last 4, clearable |
| Automated testing | Missing | High | N/A | Zero tests exist |
| URL routes for all languages | Partial | High | Only EN + ES have routes | 8 languages missing |
| Legal pages (EN + ES) | Implemented | High | 6 static page components | Browser-language-aware routing in Footer |

---

## 5. Dependency and Operations Posture

**Build:** Vite 7.3. Dev: `vite`. Production: `vite build && node prerender.mjs`. Clean, fast (~6s build). No orphaned dependencies.

**Dependencies (production):** 13 direct deps. All modern, well-maintained (React 18, react-router-dom 7, Tailwind 3, lucide-react, sonner). `next-themes` is bundled but appears unused — the app has no theme toggle. This is ~5-10 KB of dead code.

**Dependencies (dev):** 11 direct deps. All typical for a Vite React project. Eslint 9 with react plugins, terser for minification.

**CI/CD:** Single workflow via GitHub Actions. Node 20 (repo specifies 22 in `.nvmrc`). FTPS deploy to Hostinger. Secrets are properly stored as GitHub secrets. No staging environment.

**Observability:** None. No analytics, error tracking, or logging in production. Silent failures on ad fetch and localStorage errors.

**Maintenance signals:** Single maintainer (Ángel González Palenzuela). No contributing guide. No issue templates. No test suite. Version file (`.version` = 43) suggests manual version tracking.

---

## 6. Risk Register

| Severity | Finding | Impact | Evidence | Confidence |
|---|---|---|---|---|
| **High** | No automated tests for calculator logic | Calculation errors reach users undetected; refactoring is high-risk | Zero test files found | High |
| **High** | 8 of 10 languages have no URL routes or prerendered pages | No SEO visibility for DE, FR, IT, PL, RO, RU, TR, UK content | Routes only exist for `/en` and `/es` in App.jsx; sitemap only has EN/ES URLs | High |
| **Medium** | `next-themes` dependency appears unused | ~5-10 KB dead JS shipped to users | No theme toggle in UI; import only in sonner.jsx | Medium |
| **Medium** | No analytics or error monitoring | Silent failures; no visibility into user behavior or errors | No analytics script or error tracking service found | High |
| **Medium** | `.nvmrc` says Node 22, CI uses Node 20 | Minor mismatch could cause CI vs local behavior differences | `.nvmrc: 22` vs `deploy.yml: node-version: 20` | High |
| **Low** | `@prerenderer/prerenderer` and Puppeteer are dev-only but heavy downloads (~300 MB Chromium) | CI pipeline takes longer due to Chromium download on every build | `deploy.yml` runs `npm ci` which installs prerenderer + Puppeteer each time | High |
| **Low** | Legal pages only exist in EN and ES | Users in other languages see mismatched UI language vs legal page content | `browserIsSpanish()` in Footer sends non-ES users to English legal pages | High |

---

## 7. Prioritized Recommendations

| Timeline | Recommendation | Expected Impact | Direction | Effort |
|---|---|---|---|---|
| **Quick win** | Remove unused `next-themes` dependency | Save ~5-10 KB bundle, reduce attack surface | Uninstall npm package, remove import from sonner.jsx | S |
| **Quick win** | Add error tracking (e.g., Sentry free tier) | Visibility into runtime failures, ad fetch errors, localStorage issues | Add Sentry or equivalent, instrument ad fetch and localStorage calls | S |
| **Near-term** | Add unit tests for core calculation logic | Prevent regressions, enable safe refactoring | Use vitest (already in Vite ecosystem), test CalculatorSection logic in isolation | M |
| **Near-term** | Align `.nvmrc` with CI or vice versa | Eliminate version mismatch risk | Change `.nvmrc` to 20 or `deploy.yml` to 22 | S |
| **Strategic** | Add URL routes + prerendered HTML for remaining 8 languages | SEO visibility for DE, FR, IT, PL, RO, RU, TR, UK markets; hreflang coverage | Add routes in App.jsx, generate prerender routes, update sitemap, add hreflang alternates | L |
| **Strategic** | Implement analytics (e.g., Plausible, Fathom, GA4) | Measure usage patterns, ad performance, language/currency adoption | Add privacy-respecting analytics script to index.html | S |

---

## 8. Transition Readiness

**Reusable components:**
- LanguageContext and CurrencyContext are clean, decoupled, and localStorage-persisted — easy to drop into another project.
- Translations data file is pure JSON-like structure, importable anywhere.
- shadcn/ui primitives are standard and follow established patterns.

**Gaps to close:**
- Zero test coverage prevents confident handoff.
- No environment documentation, contributing guide, or onboarding steps.
- No analytics means no baseline performance or usage data for the receiving team.

**Minimum next steps for a receiving builder:**
1. Read this overview and the source code.
2. Set up local dev (`npm install && npm run dev`).
3. Push to a fork or new remote with their own CI secrets configured.
4. Add tests before making functional changes.

---

## 9. Assumptions and Unknowns

- **Assumption:** `next-themes` is unused. Confidence: Medium. It's only imported in sonner.jsx but never initialized or toggled in the UI.
- **Assumption:** The FTP secrets (FTP_SERVER, FTP_USERNAME, FTP_PASSWORD) are correctly configured in GitHub Secrets. Confidence: Medium (deploy has succeeded in prior runs after fixes).
- **Unknown:** What analytics or monitoring, if any, exist on Hostinger's side. We have no access to server logs.
- **Unknown:** Actual page load performance from real user locations (no RUM data available).
- **Unknown:** Search console data — we cannot verify which pages are indexed or what queries drive traffic.
- **Assumption:** The app works correctly on older browsers (no polyfills configured in Vite — `terser` is the only build optimization). Confidence: Medium.
