# Security Review — Worth My Time Calculator
**Date:** 2025-05-29
**Mode:** Risk-Focused
**Reviewer:** opencode Security Review (ASVAA)
**App type:** Client-side-only SPA (React 18 / Vite 7)
**Deployment:** Static files via FTPS to Hostinger
**Backend:** None | **Database:** None | **Auth:** None

---

## 1. Executive Summary

This is a **client-side-only single-page application** with no backend, no database, no authentication, and no server-side data processing. Every calculation happens in the browser via React state. The only persistence mechanism is `localStorage` (language preference, currency preference, calculation history). No user data is transmitted to any server.

The attack surface is consequently **very narrow**. There are no API endpoints to exploit, no database to inject into, no sessions to hijack, and no authentication to bypass. The review focuses on: (1) input handling in the calculator, (2) dependency supply chain, (3) configuration (HTTP headers, secrets management), and (4) data handling in `localStorage` and the advertising subsystem.

**Overall security posture:** Good for a zero-backend SPA. Zero known CVEs across 517 dependencies. No injection vectors identified. The principal gaps are in defense-in-depth: security HTTP headers are entirely absent, and unused dependencies add unnecessary supply chain surface. One PII-disclosure observation (legally mandated) is noted.

| Severity | Count |
|----------|-------|
| Critical | 0 |
| High     | 0 |
| Medium   | 0 |
| Low      | 4 |
| Informational | 3 |

---

## 2. Scope and Methodology

### In scope
- Source code in `src/` (React components, contexts, pages, utilities)
- Build configuration (`vite.config.js`, `index.html`, `prerender.mjs`)
- Deployment configuration (`.github/workflows/deploy.yml`, `.htaccess`)
- Dependency manifest (`package.json`, `package-lock.json` via `npm audit`)
- Static assets (`public/ads/*.json`, `public/sitemap.xml`)
- Legal pages for PII exposure

### Out of scope
- Hostinger server configuration (no access to server logs, WAF, or hosting panel)
- DNS / CDN configuration (Cloudflare or other)
- Actual runtime monitoring or penetration testing
- Browser extension interactions

### Methodology
1. Static analysis of all source files for injection sinks (`dangerouslySetInnerHTML`, `eval`, `document.write`, `innerHTML`)
2. `npm audit` for known dependency CVEs
3. Review of `.htaccess` for security HTTP headers (CSP, HSTS, XFO, etc.)
4. Review of CI/CD for secret exposure
5. `localStorage` handling review (sensitive data, `try/catch` patterns)
6. Third-party content review (ad JSON, iframe embeds, affiliate links)

---

## 3. Findings

### F-001: Missing Security HTTP Headers (Low-Medium)

**Domain:** Configuration
**Location:** `public/.htaccess`
**Confidence:** High

**.htaccess** has `mod_headers.c` rules for caching but **zero security headers**:

| Header | Present? | Risk |
|--------|----------|------|
| `Content-Security-Policy` | No | XSS defense absent; inline `<script>` in `index.html` would need `'unsafe-inline'` anyway, but a CSP could restrict external resources |
| `Strict-Transport-Security` | No | No HSTS; downgrade/MitM possible if HTTP is ever served |
| `X-Content-Type-Options: nosniff` | No | MIME-sniffing risk for JS/CSS resources |
| `X-Frame-Options: DENY` (or `SAMEORIGIN`) | No | Clickjacking possible |
| `Referrer-Policy` | No | Full referrer sent on outbound links by default |
| `Permissions-Policy` | No | No control over browser feature access (camera, microphone, etc.) |

**Impact:** Low, because the app has no user-reflected input and no injection surface. However, defense-in-depth is absent. A future code change could introduce an XSS vector, and there would be no CSP to mitigate it.

**Recommendation:** Add the following to `.htaccess`:
```
Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; media-src 'self'; frame-src https://www.youtube.com https://player.vimeo.com; connect-src 'self';"
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
Header always set X-Content-Type-Options "nosniff"
Header always set X-Frame-Options "SAMEORIGIN"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
```

---

### F-002: Unused `next-themes` Dependency (Low)

**Domain:** Dependency supply chain
**Location:** `package.json:18`, `src/components/ui/sonner.jsx:1`
**Confidence:** High

`next-themes` v0.4.6 is imported in `sonner.jsx` via `useTheme()` but the app has **no theme toggle UI**. The `useTheme()` call always returns `theme = "system"` because no `<ThemeProvider>` wraps the app. This is dead code.

- Imported from: `sonner.jsx:1` — `import { useTheme } from "next-themes"`
- No `<ThemeProvider>` anywhere in `App.jsx` or `main.jsx`
- The `theme` variable is always `"system"`; the Sonner toaster always renders with system theme
- Dead bundle weight: ~5–10 KB

**Impact:** Low. No known CVE in `next-themes` 0.4.6, but the principle of least code applies — every bundled dependency is a potential supply chain vector.

**Recommendation:** Remove `next-themes` from `package.json` and remove the `useTheme()` call from `sonner.jsx`, hardcoding `theme="system"` or omitting the prop.

---

### F-003: PII Exposure in Legal Pages (Low)

**Domain:** Data handling (disclosure)
**Location:** `src/pages/LegalNoticePage.jsx:68-81`
**Confidence:** High

The Spanish legal notice page discloses the owner's full PII as required by Spanish LSSICE law:
- Full name: Ángel González Palenzuela
- Spanish NIF/tax ID: 38078911L
- Home address: Avenida de los Telares, 30 - 33401 Avilés, Asturias
- Email: skald@skaldcraft.com

This is a **legally mandated disclosure** under Spanish law (Ley 34/2002 LSSICE), not a mistake. It is surfaced here as an observation — the owner should be aware that this information is publicly scrapable from the client-side source code.

**Impact:** Low. Required by law, but permanently exposed in the source code.

**Recommendation:** No remediation needed (legal requirement). However, consider whether the home address could be replaced with a P.O. box or business address for privacy without violating legal requirements.

---

### F-004: Third-Party Iframe Embedding (Low)

**Domain:** Data handling / Content Security
**Location:** `src/components/BannerSection.jsx:24-25`
**Confidence:** Medium

YouTube and Vimeo video IDs are extracted from static ad JSON and embedded via `<iframe>`:
```jsx
const src = youtubeId
  ? `https://www.youtube.com/embed/${youtubeId}?rel=0`
  : `https://player.vimeo.com/video/${vimeoId}`;
```

- The `allow` attribute permits `accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture`
- `allowFullScreen` is set
- The ad JSON is static, first-party served from `/ads/${language}.json`

**Risk:** If an attacker could modify the ad JSON (via compromised FTP credentials or build pipeline), they could inject a malicious video ID pointing to a phishing or malware video. Since the JSON is static and version-controlled, the practical risk is low — but defense-in-depth would mitigate this.

**Recommendation:** Add a `sandbox` attribute to the iframe (e.g., `sandbox="allow-scripts allow-same-origin"`). Validate video IDs against a known pattern before embedding.

---

### I-001: Zero Known CVEs in Dependencies (Informational)

**Domain:** Dependency supply chain
**Location:** `package.json` (13 prod + 11 dev)
**Confidence:** High

`npm audit` reports **zero vulnerabilities** across all 517 installed packages (94 prod, 417 dev, 61 optional, 17 peer). All dependencies are on modern versions. No stale, deprecated, or abandoned packages detected. Supply chain hygiene is good.

---

### I-002: No Server-Side Data Processing (Informational)

**Domain:** Data handling
**Confidence:** High

All calculator logic executes in `CalculatorSection.jsx` using React `useState` and `useEffect`. There is no backend, no API calls, no data transmission. `localStorage` is the only persistence layer and is used for:
- `userLanguagePreference` — short string (2-letter code)
- `currencyPreference` — short string (3-letter code)
- `calculatorHistory_{lang}` — array of up to 4 objects with `{price, days, timestamp, language}`

No sensitive personal data (names, addresses, financial account numbers, passwords) is ever collected or stored.

---

### I-003: CI/CD Secrets Management (Informational)

**Domain:** Configuration
**Location:** `.github/workflows/deploy.yml:32-34`
**Confidence:** High

FTP credentials (`FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`) are injected via `${{ secrets.FTP_* }}` — correctly using GitHub encrypted secrets. No credentials appear in source. The action uses FTPS (explicit TLS) protocol, ensuring credentials are encrypted in transit.

---

## 4. Risk Register

| # | Severity | Finding | Impact | Evidence | Confidence |
|---|----------|---------|--------|----------|------------|
| F-001 | **Low-Medium** | Missing security HTTP headers (CSP, HSTS, XFO, etc.) | No defense-in-depth against XSS, clickjacking, MIME sniffing | `.htaccess` has `mod_headers.c` rules for caching only; zero security headers | High |
| F-002 | **Low** | `next-themes` imported but unused | ~5–10 KB dead code; unnecessary supply chain surface | Import in `sonner.jsx:1`; no `<ThemeProvider>` in app | High |
| F-003 | **Low** | PII disclosure in legal page source | Owner's address, NIF, email publicly scrapable | `LegalNoticePage.jsx:68-81` | High |
| F-004 | **Low** | Third-party iframe embed without sandbox | Potential vector if ad JSON is compromised | `BannerSection.jsx:24-25` | Medium |
| I-001 | Informational | Zero known CVEs in dependencies | N/A — no actionable risk | `npm audit` — 0 vulnerabilities across 517 packages | High |
| I-002 | Informational | No server-side data processing | N/A — all computation client-side | Architecture review: no backend, no API calls | High |
| I-003 | Informational | Secrets correctly managed in CI/CD | N/A — credentials properly stored as GitHub Secrets | `deploy.yml:32-34` | High |

---

## 5. Threat Model

### Assets
1. **Application source code** — publicly accessible on GitHub (public repo)
2. **Deployment credentials** — FTP server/host/user/password in GitHub Secrets
3. **User's localStorage** — calculation history (price, days worked), language/currency preferences
4. **Ad JSON files** — affiliate link targets (`amzn.to` URLs), video URLs

### Trust Boundary
There is only **one trust boundary**: the browser sandbox. All code executes client-side. No data crosses a network boundary beyond the initial page load and static asset fetching.

### Attack Surface

| Entry Point | Vector | Feasibility |
|-------------|--------|-------------|
| Calculator inputs | Numeric injection → `parseFloat()` → `NaN` guard → safe | Not exploitable |
| URL path (`/en`, `/es`) | Path traversal → read as string, `.startsWith()` check only | Not exploitable |
| Ad JSON (static) | If FTP credentials stolen, attacker could modify ad JSON to inject malicious iframe src or affiliate redirect | Low (requires credential compromise) |
| `localStorage` | XSS → read/write history | Low (no XSS vector identified) |
| Dependency | Known CVE in a dependency → RCE or data exfiltration | None (0 CVEs) |

### Threat Scenarios

**T-001: Ad JSON compromise via FTP credential leak**
If an attacker obtains the FTP credentials (e.g., from a leaked GitHub secret or phishing), they could replace `/ads/en.json` to point an iframe at a malicious URL. The `BannerItem` component would render it. **Mitigation:** No `sandbox` attribute on iframe. **Existing controls:** FTPS in transit, GitHub Secrets at rest, static version-controlled JSON.

**T-002: Stored XSS via ad JSON** (theoretical)
If ad JSON were user-controllable (it is not currently), an attacker could set `banner.alt` to a malicious string. React's JSX auto-escapes this in `title={banner.alt}` and `aria-label={banner.alt}`. No XSS via React string interpolation is possible.

**T-003: Clickjacking**
Without `X-Frame-Options`, the site could be embedded in an `<iframe>` on another domain and overlaid with transparent elements. Since the site has no authenticated actions (no login, no transactions), the impact is limited to potential ad fraud or reputational harm.

---

## 6. Recommendations

### Near-term (1-2 weeks)

| # | Recommendation | Finding | Effort | Impact |
|---|---------------|---------|--------|--------|
| R-01 | Add security HTTP headers to `.htaccess` | F-001 | S | Defense-in-depth against multiple attack classes |
| R-02 | Remove unused `next-themes` dependency | F-002 | S | Reduce bundle and supply chain surface |
| R-03 | Add `sandbox` attribute to iframe embeds | F-004 | S | Confine iframe capabilities if ad JSON is ever attacker-controlled |

### Medium-term (1-3 months)

| # | Recommendation | Finding | Effort | Impact |
|---|---------------|---------|--------|--------|
| R-04 | Evaluate whether owner PII in legal pages can use a business/P.O. box address | F-003 | S | Reduced PII exposure while remaining legally compliant |

### Low priority

| # | Recommendation | Finding | Effort | Impact |
|---|---------------|---------|--------|--------|
| R-05 | Pin ad JSON URLs to their commit hash or add integrity checksum validation | F-004 | M | Tamper-proof ad content |

---

## 7. Gatekeeper Bridge

**Assessment gate for promotion past Security Review:**

| Criterion | Status | Notes |
|-----------|--------|-------|
| Critical findings | ✅ **Pass** — 0 Critical | No server, no database, no auth — inherently limited critical-risk surface |
| High findings | ✅ **Pass** — 0 High | All findings are Low or Low-Medium |
| Exploitable injection vector | ✅ **None found** | No `dangerouslySetInnerHTML`, `eval`, `innerHTML`, or reflection patterns |
| CVEs in production deps | ✅ **None** | `npm audit` clean — 0 vulnerabilities |
| Secrets in source | ✅ **None** | All secrets are GitHub encrypted `${{ secrets.* }}`; `.env`/`.env.local` in `.gitignore` |
| CSP / security headers | ⚠️ **Gap** — F-001 | Missing entirely; recommend R-01 before production deployment |

**Gatekeeper verdict: PASS (with conditions)**
Add security headers (R-01) within 1 sprint to close the only defense-in-depth gap. No findings block delivery.

---

## 8. Action Planner Bridge

### Work items for Engineering

| Work Item ID | Effort | Dependency | Description |
|-------------|--------|------------|-------------|
| SEC-001 | 1h | None | Add CSP, HSTS, XFO, XCTO, Referrer-Policy, Permissions-Policy to `.htaccess` |
| SEC-002 | 30m | None | `npm uninstall next-themes`; remove `useTheme()` import from `sonner.jsx`; hardcode `theme="system"` or remove `theme` prop |
| SEC-003 | 30m | None | Add `sandbox="allow-scripts allow-same-origin"` to iframe in `BannerSection.jsx` |
| SEC-004 | 1h | SEC-001 | Verify security headers reach production with `curl -I https://worthmytimecalculator.com` after deployment |

### Acceptance criteria

1. `curl -I` returns CSP, HSTS, XFO, X-CTO, Referrer-Policy headers with recommended values
2. `npm ls next-themes` shows package removed
3. `BannerSection` iframes render correctly with `sandbox` attribute
4. Calculator functionality is verified unaffected (no behavioral changes)

---

## 9. Assumptions and Unknowns

### Assumptions
- **Hostinger enforces HTTPS** at the server level — the review had no access to server TLS configuration
- **Hostinger's hosting panel has no security misconfigurations** — no access to server-side WAF, PHP settings, or .htaccess overrides by the hosting provider
- **GitHub Secrets are properly rotated** — no way to verify from source whether FTP credentials have ever been exposed in prior commits
- **The `amzn.to` affiliate links are the owner's intended monetization** — no malicious redirects introduced by the ad network

### Unknowns
- **Server-side access logs** — no visibility into whether the site is being scanned or attacked
- **CDN/RUM data** — no Real User Monitoring; performance and security events from real users are invisible
- **Hostinger's shared hosting isolation** — we cannot assess whether neighboring tenants could impact this site
- **Ad JSON delivery integrity** — no Subresource Integrity (SRI) or checksum verification on `/ads/*.json` responses
