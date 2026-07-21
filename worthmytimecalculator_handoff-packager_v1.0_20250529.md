# Handoff Packager — Worth My Time Calculator

**Version:** v1.0
**Date:** 2025-05-29
**Prepared by:** opencode Handoff Packager (ASVAA)
**Trigger condition:** Gatekeeper Decision — **CONDITIONAL PROCEED (79/100)**
**Status:** ⚠️ This package transfers under **mandatory conditions**. The receiving team must complete the three mandatory fixes (R-001–R-003) before the project can be considered fully ready. See Section 6.

---

## 1. Package Header

| Field | Value |
|---|---|
| **Package ID** | HP-WMTC-20250529-v1.0 |
| **Project** | Worth My Time Calculator |
| **Repository** | `worthmytimecalculator` (GitHub, public) |
| **Domain** | https://worthmytimecalculator.com |
| **Gatekeeper Score** | 79 / 100 — **CONDITIONAL PROCEED** |
| **Hard-Stop Gates Passed** | 5 / 5 |
| **Input Artifacts (4)** | Project Overview (Deep) · Action Planner (Delivery) · Readiness Gatekeeper (Cycle 1) · Security Review (Risk-Focused) |
| **Total Actions Defined** | 8 (5 Now + 2 Next + 1 Later) |
| **Mandatory Fixes** | 3 (R-001, R-002, R-003) |

---

## 2. Executive Transfer Summary

Worth My Time Calculator is a production-deployed, single-page React application that converts prices into working time — hours, days, and weeks — based on a user's income. The app is live at worthmytimecalculator.com, serves 10 languages and 14 currencies, includes prerendered static HTML for 9 routes, schema.org structured data, and a video advertising subsystem. A single maintainer (Ángel González Palenzuela) owns the full stack from code through FTP deployment via GitHub Actions.

This handoff package transfers the project under a **Conditional Proceed** verdict (79/100). The Gatekeeper found no showstoppers — all five hard-stop gates pass, and a Security Review reported zero Critical, High, or Medium findings across 517 dependencies. However, three structural gaps prevent a straight-to-Proceed rating and must be closed by the receiving team: (1) zero automated tests exist for the core calculator logic, (2) no error monitoring is configured so production failures are invisible, and (3) 8 of 10 supported languages lack dedicated URL routes, prerendered HTML pages, and hreflang tags — eliminating SEO visibility for the majority of the app's language surface.

The Action Planner defines 8 concrete, independently executable actions with measurable acceptance criteria. Five actions are scoped for immediate execution (the "Now" phase), including the three mandatory fixes. The Security Review contributes 4 low-effort work items (SEC-001 through SEC-004) addressing defense-in-depth headers, dead dependency removal, iframe sandboxing, and post-deployment verification. The receiving team's first week is structured to prioritise test coverage and error monitoring — the two highest-return, lowest-risk actions — before tackling the larger language-routing effort. This package contains everything needed for a builder to take over development immediately, with the explicit understanding that the three conditions must be satisfied before the project achieves full Proceed status.

---

## 3. Artifact Inventory

| # | Artifact | Date | Mode | Lines | Status |
|---|---|---|---|---|---|
| A-01 | `worthmytimecalculator_project-overview_20250529.md` | 2025-05-29 | Deep | 181 | Complete |
| A-02 | `worthmytimecalculator_action-planner_20250529.md` | 2025-05-29 | Delivery | 127 | Complete |
| A-03 | `worthmytimecalculator_security-review_20250529.md` | 2025-05-29 | Risk-Focused | 306 | Complete |
| A-04 | `worthmytimecalculator_readiness-gatekeeper_20250529.md` | 2025-05-29 | Cycle 1 | 261 | Complete — **CONDITIONAL PROCEED** |
| A-05 | This document | 2025-05-29 | Handoff Packager v1.0 | — | Complete |

**Artifact cross-reference consistency:** All four upstream artifacts follow the same severity taxonomy, use consistent naming conventions, and cross-reference each other. No contradictions found.

---

## 4. Project Snapshot

### What It Is
A client-side-only React 18 / Vite 7 SPA that converts prices to working time. No backend, no database, no authentication. Deployed as static files to Hostinger via FTPS.

### Key Metrics
- **Languages:** 10 (EN, ES, DE, FR, IT, PL, RO, RU, TR, UK)
- **Currencies:** 14 (USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY, BRL, MXN, INR, SEK, NOK, DKK)
- **Production dependencies:** 13 direct, all modern (React 18, react-router-dom 7, Tailwind 3, lucide-react, sonner)
- **Build:** Vite 7.3 — `vite build && node prerender.mjs` (~6s)
- **Bundle concern:** 4 MP4 video ads account for ~7.8 MB of the 8.35 MB build
- **CI/CD:** GitHub Actions → FTPS → Hostinger (push to `main`)

### Architecture
```
public/                  ← Static assets (ads, .htaccess, robots, sitemap)
  ads/*.json             ← Per-language ad configs (video URLs, affiliate links)
  .htaccess              ← SPA rewrites + caching headers (no security headers)
src/
  context/               ← LanguageContext.jsx, CurrencyContext.jsx
  components/            ← Header, Footer, CalculatorSection, HistorySection,
                           BannerSection, LanguageRedirect, Selectors, ScrollToTop
  components/ui/         ← shadcn/ui primitives
  pages/                 ← HomePage + legal pages (EN/ES)
  lib/                   ← translations.js (310 strings), utils.js
  App.jsx                ← Router + providers
  main.jsx               ← React root mount
prerender.mjs            ← Puppeteer post-build (9 EN/ES routes)
.github/workflows/       ← deploy.yml
```

### Key Workflow
1. User enters price + income (monthly/hourly toggle) → calculator converts to hours/days/weeks of work
2. Optional lifespan input unlocks amortized cost + history save (localStorage, last 4 per language)
3. Language detection: URL path → localStorage → `navigator.language` → fallback `'en'`
4. Currency detection: localStorage → full locale match → language prefix match → fallback USD

### Failure Paths
- Ad JSON fetch fails → banner renders nothing (silent)
- localStorage unavailable → defaults used, saves skipped (silent)
- Prerender crashes → Vite output still deploys (no prerendered HTML)

---

## 5. Action Plan Summary

### Now (immediate — current sprint)

| ID | Action | Effort | Owner | Acceptance Criterion |
|---|---|---|---|---|
| **ACT-001** ★ | Unit tests for calculator logic | M | QA Engineer | `npm test` passes ≥10 tests with ≥80% line coverage on `CalculatorSection.jsx` |
| **ACT-002** ★ | URL routes + prerender + hreflang for 8 languages | L | SEO + Frontend | All 8 languages have `/de`, `/fr`, etc. routes, prerendered HTML, hreflang tags, sitemap entries |
| **ACT-003** | Remove unused `next-themes` | S | Frontend Engineer | `npm ls next-themes` empty; build succeeds |
| **ACT-004** ★ | Add error monitoring (Sentry or equiv.) | S | Frontend Engineer | Events captured for ad fetch failure, localStorage exception, unhandled React error |
| **ACT-005** | Align `.nvmrc` with CI Node version | S | DevOps Engineer | `.nvmrc` and CI `node-version` match; CI passes |

★ = Mandatory fix (R-001/R-002/R-003 from Gatekeeper).

### Next (near-term — next sprint)

| ID | Action | Effort | Owner |
|---|---|---|---|
| ACT-006 | Implement privacy-respecting analytics | S | Frontend Engineer |
| ACT-007 | Legal pages for 8 languages (blocked by ACT-002) | M | Frontend Engineer |

### Later (backlog)

| ID | Action | Effort | Owner |
|---|---|---|---|
| ACT-008 | Cache Chromium in CI / conditional prerender | S | DevOps Engineer |

### Security Work Items (from Security Review Action Planner Bridge)

| ID | Effort | Description |
|---|---|---|
| SEC-001 | 1h | Add CSP, HSTS, XFO, XCTO, Referrer-Policy, Permissions-Policy to `.htaccess` |
| SEC-002 | 30m | `npm uninstall next-themes`; hardcode `theme="system"` in sonner.jsx |
| SEC-003 | 30m | Add `sandbox="allow-scripts allow-same-origin"` to iframe in BannerSection.jsx |
| SEC-004 | 1h | Verify security headers reach production with `curl -I` after deploy |

---

## 6. Mandatory Remediation (Verbatim from Gatekeeper)

The following three mandatory fixes are reproduced verbatim from the Readiness Gatekeeper artifact (§6. Conditional Remediation). These must be completed before the project can be re-assessed for full Proceed status. The Gatekeeper verdict is **CONDITIONAL PROCEED** — the conditions are non-negotiable constraints on this handoff.

---

### R-001: Establish automated test suite for calculator logic

| Field | Value |
|---|---|
| **Source finding** | Project Overview Risk Register — High severity (No tests) |
| **Action ref** | ACT-001 |
| **Owner profile** | QA Engineer (or Frontend Engineer with testing experience) |
| **Effort** | M (estimated 3–5 days) |
| **Acceptance criteria** | `npm test` passes ≥10 tests covering price-to-time conversion, amortized cost, currency formatting, and edge cases (zero/negative inputs) with ≥80% line coverage on `CalculatorSection.jsx` |
| **Priority** | Critical — this is the single largest completeness gap |

### R-002: Implement error monitoring

| Field | Value |
|---|---|
| **Source finding** | Project Overview Risk Register — Medium severity (No monitoring) |
| **Action ref** | ACT-004 |
| **Owner profile** | Frontend Engineer |
| **Effort** | S (estimated 1 day) |
| **Acceptance criteria** | An error event is captured and delivered to the monitoring service for each failure path: ad JSON fetch failure, localStorage `setItem`/`getItem` exception, and unhandled React render error |
| **Priority** | High — closes the observability gap and enables risk detection |

### R-003: Add URL routes and prerendered pages for remaining 8 languages

| Field | Value |
|---|---|
| **Source finding** | Project Overview Risk Register — High severity (8/10 languages no routes) |
| **Action ref** | ACT-002 |
| **Owner profile** | SEO Specialist + Frontend Engineer |
| **Effort** | L (estimated 1–2 weeks) |
| **Acceptance criteria** | All 8 languages (DE, FR, IT, PL, RO, RU, TR, UK) have a dedicated URL path, a prerendered HTML file, a corresponding `<link hreflang>` tag in `<head>`, and a `<url>` entry in `sitemap.xml` |
| **Priority** | Medium — closes the second High-severity completeness gap; can be sequenced after R-001 and R-002 |

### Remediation Summary

| ID | Action | Effort | Owner | Priority |
|---|---|---|---|---|
| R-001 | Automated test suite (ACT-001) | M | QA Engineer | Critical |
| R-002 | Error monitoring (ACT-004) | S | Frontend Engineer | High |
| R-003 | URL routes for 8 languages (ACT-002) | L | SEO + Frontend | Medium |
| **Total** | **3 mandatory fixes** | **1L + 1M + 1S** | | |

**Re-assessment trigger:** When R-001 and R-002 are complete (estimated +4–6 days), re-run the Readiness Gatekeeper. Expected uplift: Completeness score rises from 3 to 4, weighted score rises from 79 to ≥84 (Proceed). R-003 can be completed in parallel or sequentially and will further raise the score.

---

## 7. Security Posture Brief

**Overall verdict:** Good for a zero-backend SPA. Security Review verdict: **PASS (with conditions)**.

### Risk Summary

| Severity | Count | Highest Finding |
|---|---|---|
| Critical | 0 | None |
| High | 0 | None |
| Medium | 0 | None |
| Low | 4 | Missing security HTTP headers (F-001) |
| Informational | 3 | Zero CVEs, no server-side processing, secrets managed correctly |

### Key Findings
- **F-001 (Low-Medium):** No CSP, HSTS, XFO, or other security headers in `.htaccess`. Defense-in-depth gap — no active exploit vector but should be closed (SEC-001).
- **F-002 (Low):** `next-themes` ~5–10 KB dead code. Scheduled for removal (ACT-003 / SEC-002).
- **F-003 (Low):** Owner PII on legal pages — legally mandated, no remediation needed.
- **F-004 (Low):** Iframe embeds without `sandbox` attribute. Add sandbox per SEC-003.

### Supply Chain
- 0 CVEs across 517 installed packages (94 prod, 417 dev)
- 13 modern production deps on supported versions
- No injection vectors (`dangerouslySetInnerHTML`, `eval`, `innerHTML` all absent)

### Threat Model Highlights
- **Trust boundary:** Single — the browser sandbox. No data crosses a network boundary beyond static asset fetching.
- **Primary attack vector:** Compromised FTP credentials could modify ad JSON → inject malicious iframe src. Mitigated by FTPS + GitHub Secrets + static version-controlled JSON.
- **No XSS, no SQLi, no CSRF, no session hijacking possible** (no backend, no database, no auth).

---

## 8. Receiving Team Checklist

### Before Taking Over

- [ ] Verify access to the GitHub repository
- [ ] Verify FTP credentials are configured as GitHub Secrets (FTP_SERVER, FTP_USERNAME, FTP_PASSWORD)
- [ ] Verify access to Hostinger hosting panel
- [ ] Read all 4 upstream artifacts (Section 3) and this document
- [ ] Clone repository and confirm `npm install && npm run dev` starts locally
- [ ] Confirm Node version matches `.nvmrc` (currently 22) or align CI (currently Node 20) per ACT-005
- [ ] Fork repository or configure new remote with own CI secrets

### First Actions (Week 1, see Section 9)

- [ ] R-001: Set up vitest and write ≥10 tests for calculator logic with ≥80% line coverage
- [ ] R-002: Integrate error monitoring (Sentry free tier or equivalent)
- [ ] SEC-001: Add security HTTP headers to `.htaccess`
- [ ] SEC-002: Remove unused `next-themes` dependency
- [ ] SEC-003: Add `sandbox` attribute to iframe embeds
- [ ] SEC-004: Verify headers reach production

### Before Re-Assessment

- [ ] Complete R-001 (test suite) and R-002 (error monitoring)
- [ ] Re-run Readiness Gatekeeper to confirm Proceed status
- [ ] Begin R-003 (URL routes for 8 languages) — largest effort item

### Operational Setup

- [ ] Configure error monitoring dashboard and alerting
- [ ] (Optional) Set up staging environment or preview deployments
- [ ] (Optional) Replace manual `.version` file with automated versioning (git tag + semantic-release)

---

## 9. First-Week Start Guide

**Context:** This guide prioritises the two highest-return, lowest-risk mandatory fixes (R-001, R-002) plus the three quick-win security items (SEC-001, SEC-002, SEC-003) in the first week. The larger language-routing effort (R-003 / ACT-002) can begin after Week 1.

---

### Day 1: Environment Setup and Orientation

**Objective:** Get the project running locally and understand the codebase structure.

**Concrete actions:**
1. Clone repository and run `npm install && npm run dev` — confirm the app loads at localhost with all 10 languages and 14 currencies selectable
2. Read the Project Overview artifact and this Handoff Packager to understand architecture, risk register, and the three mandatory conditions
3. Run `npm run build` to confirm the full build pipeline (Vite + prerender) completes without errors

**Required inputs:**
- GitHub repo access
- Project Overview (A-01), Handoff Packager (A-05)

**End-of-day check:** App runs locally. You can explain the routing system, language detection flow, and calculator logic from reading the source. You understand why the Gatekeeper issued Conditional Proceed (79/100) and what R-001, R-002, and R-003 require.

---

### Day 2: Test Suite Foundation (R-001, part 1)

**Objective:** Set up the testing framework and write the first tests for the calculator logic.

**Concrete actions:**
1. Install vitest (already in Vite ecosystem; no additional test runner needed) and configure `vitest.config.js` with `jsdom` environment and coverage provider
2. Create `src/__tests__/CalculatorSection.test.jsx` and export the pure calculation functions (price-to-time conversion, amortized cost, currency formatting) for isolated testing
3. Write 4–6 initial tests covering: (a) basic price-to-hours conversion, (b) monthly-vs-hourly income toggle, (c) amortized cost with lifespan, (d) edge case: zero price, (e) edge case: negative income

**Required inputs:**
- Project source code knowledge (Day 1)
- ACT-001 acceptance criteria

**End-of-day check:** `npm test` runs and shows ≥4 passing tests. Coverage report exists but may not yet meet the 80% threshold.

---

### Day 3: Complete Test Suite and Error Monitoring (R-001 completion + R-002 start)

**Objective:** Achieve the 80% line coverage mandate and begin error monitoring integration.

**Concrete actions:**
1. Complete the test suite to ≥10 tests covering all calculator function paths, edge cases (NaN, undefined, negative, zero), and currency formatting across 2–3 currencies — verify ≥80% line coverage on `CalculatorSection.jsx`
2. Install error monitoring SDK (Sentry free tier or equivalent) and add `Sentry.init()` to `main.jsx` with a DSN
3. Instrument three error-capture calls: (a) `BannerSection.jsx` — catch block around ad JSON fetch, (b) `LanguageContext.jsx` / `CurrencyContext.jsx` — `try/catch` around localStorage `setItem`/`getItem`, (c) add a global React error boundary that reports to Sentry

**Required inputs:**
- vitest configuration from Day 2
- Sentry account (free tier) — create at sentry.io if not already available

**End-of-day check:** `npm test` passes ≥10 tests with ≥80% line coverage. An intentional test error (e.g., `throw new Error('test')`) appears in the Sentry dashboard. R-001 is COMPLETE. R-002 is partially COMPLETE (instrumentation done, verification pending deploy).

---

### Day 4: Security Hardening and Cleanup (SEC-001, SEC-002, SEC-003)

**Objective:** Close the three low-effort security findings and complete R-002 verification.

**Concrete actions:**
1. Add the six security HTTP headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) to `public/.htaccess` (SEC-001)
2. Run `npm uninstall next-themes`, remove the `useTheme()` import from `src/components/ui/sonner.jsx`, hardcode `theme="system"` or remove the `theme` prop (SEC-002 / ACT-003)
3. Add `sandbox="allow-scripts allow-same-origin"` to the iframe in `BannerSection.jsx` (SEC-003)
4. Deploy to production and run `curl -I https://worthmytimecalculator.com` to confirm all security headers are present (SEC-004)

**Required inputs:**
- FTP secrets configured in GitHub
- SEC-001 through SEC-004 specifications from Security Review §8

**End-of-day check:** Security headers present in production response. `npm ls next-themes` returns empty. Iframes render correctly. R-002 is fully COMPLETE (verified in production). R-001 and R-002 now DONE — the Gatekeeper re-assessment threshold is met.

---

### Day 5: Re-Assessment and R-003 Planning

**Objective:** Confirm Proceed status via Gatekeeper re-assessment and prepare the roadmap for R-003 (URL routes).

**Concrete actions:**
1. Re-run the Readiness Gatekeeper (Cycle 2) with the updated test suite and error monitoring in place — confirm weighted score rises from 79 to ≥84 (Proceed)
2. Audit `App.jsx` routing, `.htaccess` rewrite rules, `prerender.mjs` route list, and `sitemap.xml` to scope the ACT-002 implementation plan for 8 languages
3. Create a brief implementation plan for R-003 covering: (a) route additions in App.jsx, (b) prerender config changes, (c) hreflang tag generation, (d) sitemap updates, (e) .htaccess rule audit (per Conflict C-002), (f) testing strategy for the new routes

**Required inputs:**
- Day 1–4 output (tests passing, monitoring live, security headers deployed)
- Readiness Gatekeeper (Cycle 1) for re-run criteria
- ACT-002 acceptance criterion

**End-of-day check:** Gatekeeper re-assessment confirms Proceed (≥80). A written plan for R-003 exists with effort estimates and sequencing. The receiving team is now in full Proceed status and can begin the language-routing effort with confidence.

---

### Week 1 Summary

| Day | Focus | Status Target |
|-----|-------|---------------|
| 1 | Environment setup, codebase orientation | App runs locally, conditions understood |
| 2 | Test framework + initial tests | ≥4 tests passing |
| 3 | Complete test suite + error monitoring | ≥10 tests, ≥80% coverage, Sentry live |
| 4 | Security headers, dead dep removal, iframe sandbox | All 4 SEC items deployed |
| 5 | Gatekeeper re-assessment + R-003 planning | Proceed confirmed, plan written |

---

## 10. Consolidated Open Unknowns and Assumptions

All open unknowns and assumptions from the four upstream artifacts are consolidated below. Each entry is tagged with its originating artifact.

### Unknowns

| # | Unknown | Origin | Impact if Unresolved |
|---|---|---|---|
| U-001 | Actual page load performance from real user locations — no RUM data available | Project Overview §9 | Cannot optimise for real-user experience; bundle-size decisions lack data |
| U-002 | Search console data — cannot verify which pages are indexed or what queries drive traffic | Project Overview §9 | ACT-002 (language routes) impact cannot be measured without baseline |
| U-003 | What analytics or monitoring, if any, exist on Hostinger's server side | Project Overview §9, Security Review §9 | No server-side error visibility; server-level attacks may go undetected |
| U-004 | Hostinger's shared hosting isolation — whether neighbouring tenants could impact this site | Security Review §9 | Potential unknown cross-tenant risk at hosting level |
| U-005 | Server-side access logs — no visibility into scanning or attack patterns | Security Review §9 | Intrusion attempts or reconnaissance cannot be detected |
| U-006 | CDN / RUM data — performance and security events from real users are invisible | Security Review §9 | No observability until error monitoring (R-002) is deployed |
| U-007 | Ad JSON delivery integrity — no SRI or checksum verification on `/ads/*.json` responses | Security Review §9 | Tampered ad JSON would be rendered without detection |
| U-008 | Whether GitHub Secrets (FTP credentials) have ever been exposed in prior commits | Security Review §9 | No way to verify credential rotation history from source alone |

### Assumptions

| # | Assumption | Confidence | Origin | Risk if Wrong |
|---|---|---|---|---|
| A-001 | `next-themes` is unused — only imported in sonner.jsx but never initialized or toggled | Medium | Project Overview §9 | Removing it could break Sonner toaster styling; must verify on Day 4 |
| A-002 | The FTP secrets (FTP_SERVER, FTP_USERNAME, FTP_PASSWORD) are correctly configured in GitHub Secrets | Medium | Project Overview §9 | CI deploy will fail; receiving team must verify or reconfigure |
| A-003 | The app works correctly on older browsers — no polyfills configured in Vite | Medium | Project Overview §9 | Users on legacy browsers may experience broken layouts or JS errors |
| A-004 | Hostinger enforces HTTPS at the server level | Medium | Security Review §9 | Without HSTS and without server-level enforcement, HTTP connections are possible |
| A-005 | Hostinger's hosting panel has no security misconfigurations | Medium | Security Review §9 | Server-level vulnerabilities could affect the site despite clean client-side code |
| A-006 | GitHub Secrets are properly rotated | Low | Security Review §9 | Stale or leaked credentials could allow unauthorised FTP access |
| A-007 | The `amzn.to` affiliate links are the owner's intended monetisation — no malicious redirects introduced by the ad network | Medium | Security Review §9 | Users could be redirected to unexpected or malicious affiliate targets |
| A-008 | Single maintainer context means owner roles (QA Engineer, SEO Specialist, DevOps Engineer) are advisory — actual executor is likely one person wearing all hats | High | Action Planner §5, Gatekeeper §7 | Timeline estimates assume parallelisation that may not be feasible for a solo developer |

### Key
- **Unknown:** Information that could not be discovered during the assessment cycles. These represent monitoring gaps, access limitations, or missing data.
- **Assumption:** A belief held with moderate-to-high confidence but without direct verification. The Confidence column reflects the assessor's certainty.

---

*End of Handoff Packager v1.0 — Worth My Time Calculator*
*Prepared 2025-05-29 under Gatekeeper Decision: CONDITIONAL PROCEED (79/100)*
*Mandatory conditions R-001, R-002, and R-003 must be completed for full Proceed status.*
