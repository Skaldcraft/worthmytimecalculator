# Action Planner — Worth My Time Calculator

**Date:** 2025-05-29
**Mode:** Delivery
**Action ID Prefix:** ACT-
**Input Artifact:** `worthmytimecalculator_project-overview_20250529.md`

---

## 1. Action Register

| ID | Action | Finding Ref | Severity | Effort | Owner | Timeline | Acceptance Criterion |
|---|---|---|---|---|---|---|---|
| ACT-001 | Add automated unit tests for calculator logic | Risk Register — No tests (High) | High | M | QA Engineer | Now | `npm test` passes ≥10 tests covering price-to-time conversion, amortized cost, currency formatting, and edge cases (zero/negative inputs) with ≥80% line coverage on `CalculatorSection.jsx` |
| ACT-002 | Add URL routes, prerendered pages, hreflang tags, and sitemap entries for remaining 8 languages (DE, FR, IT, PL, RO, RU, TR, UK) | Risk Register — 8/10 languages no routes (High) | High | L | SEO Specialist + Frontend Engineer | Now | All 8 languages have a dedicated URL path (e.g. `/de`, `/fr`), a prerendered HTML file, a corresponding `<link hreflang>` tag in `<head>`, and a `<url>` entry in `sitemap.xml` |
| ACT-003 | Remove unused `next-themes` dependency | Risk Register — Unused dep (Medium) | Medium | S | Frontend Engineer | Now | `npm ls next-themes` returns empty; removed from `package.json` and all import statements; build completes without errors |
| ACT-004 | Add error monitoring (Sentry free tier or equivalent) | Risk Register — No monitoring (Medium) | Medium | S | Frontend Engineer | Now | An error event is captured and delivered to the monitoring service for each of these failure paths: ad JSON fetch failure, localStorage `setItem`/`getItem` exception, and unhandled React render error |
| ACT-005 | Align `.nvmrc` with CI Node version | Risk Register — `.nvmrc` 22 vs CI 20 (Medium) | Medium | S | DevOps Engineer | Now | `.nvmrc` and `deploy.yml` `node-version` both reference the same Node major version (either 20 or 22); CI pipeline passes after the change |
| ACT-006 | Implement privacy-respecting analytics (Plausible / Fathom / GA4) | Prioritized Recommendations — Analytics (Medium) | Medium | S | Frontend Engineer | Next | Analytics script loaded in `index.html`; a pageview event fires on every route change; dashboard shows pageviews, language distribution, and currency distribution |
| ACT-007 | Create legal pages (Privacy + Terms) for non-EN/ES languages | Risk Register — Legal pages only EN/ES (Low) | Low | M | Frontend Engineer | Next | Legal page content exists for DE, FR, IT, PL, RO, RU, TR, UK; each is reachable at its language-prefixed route; Footer sends users to the correct language-specific legal page |
| ACT-008 | Cache Chromium download in CI or make prerender conditional | Risk Register — Puppeteer heavy in CI (Low) | Low | S | DevOps Engineer | Later | CI pipeline time is reduced by ≥60 seconds compared to baseline; prerendered output is identical |

---

## 2. Phase Allocation

### Now (immediate — current sprint)
| ID | Action | Effort | Rationale |
|---|---|---|---|
| ACT-001 | Unit tests for calculator logic | M | High severity; no test coverage blocks all refactoring and increases handoff risk |
| ACT-002 | URL routes for 8 languages | L | High severity; missing routes mean zero SEO visibility for the majority of supported languages |
| ACT-003 | Remove unused `next-themes` | S | Quick win; reduces bundle size and attack surface with minimal risk |
| ACT-004 | Add error monitoring | S | Quick win; provides immediate visibility into production failures |
| ACT-005 | Align `.nvmrc` with CI | S | Quick win; eliminates a version-mismatch risk in one file change |

**Now total effort:** 1L + 1M + 3S

### Next (near-term — next sprint)
| ID | Action | Effort | Rationale |
|---|---|---|---|
| ACT-006 | Implement analytics | S | Valuable for measuring ACT-002 impact; lightweight addition |
| ACT-007 | Legal pages for 8 languages | M | Depends on ACT-002 (routes must exist first); lower severity allows sequencing after URLs |

**Next total effort:** 1M + 1S

### Later (backlog — future sprints)
| ID | Action | Effort | Rationale |
|---|---|---|---|
| ACT-008 | CI Chromium caching / conditional prerender | S | Low severity; nice-to-have optimisation with no user-facing impact |

**Later total effort:** 1S

---

## 3. Dependency Graph

```
ACT-005 (nvmrc align)       → no blockers, no dependents
ACT-003 (remove next-themes)→ no blockers, no dependents
ACT-004 (error monitoring)  → no blockers, no dependents
ACT-001 (unit tests)        → no blockers, no dependents
ACT-002 (URL routes)        ──→ ACT-007 (legal pages) [blocked: routes must exist before legal pages can be served]
ACT-002 (URL routes)        ──→ ACT-006 (analytics)   [informational: analytics will measure route traffic, not a hard block]
ACT-008 (CI cache)          → no blockers, no dependents
```

All Now-phase actions are independent and can be parallelised. ACT-007 must wait for ACT-002. ACT-006 is informed by ACT-002 but does not require it.

---

## 4. Conflict Log

| ID | Conflict | Resolution |
|---|---|---|
| C-001 | Removing `next-themes` (ACT-003) may affect `sonner.jsx` if the import is used transitively. | Verify by building after removal. If sonner depends on next-themes for styling, replace with a direct Tailwind class or inline style. The Project Overview assesses confidence as Medium that it is unused — confirm during execution. |
| C-002 | Adding routes for 8 languages (ACT-002) may conflict with existing `.htaccess` rewrite rules that assume only `/en` and `/es` paths. | Audit `.htaccess` and update rewrite rules to accept all 10 language prefixes before deploying ACT-002. |
| C-003 | No security artifacts were available for this planning run. No security-related conflicts were identified. | If security audit artifacts become available, re-evaluate ACT-001 through ACT-008 for potential security implications (e.g., monitoring may capture PII, new routes may expose new attack surface). |

---

## 5. Resource Plan

| Phase | Total Effort | Owner | Loading |
|---|---|---|---|
| Now | 1L + 1M + 3S | QA Engineer: 1M | Can be parallelised across owners |
| | | SEO Specialist + Frontend Engineer: 1L | Shared ownership — SEO defines routes, FE implements |
| | | Frontend Engineer: 2S (ACT-003, ACT-004) | Sequential; ~2-3 days total |
| | | DevOps Engineer: 1S (ACT-005) | ~1 day |
| Next | 1M + 1S | Frontend Engineer: 1M + 1S | ~5-7 days combined; ACT-007 starts after ACT-002 ships |
| Later | 1S | DevOps Engineer: 1S | ~1 day; no fixed delivery date |

**Notes:**
- A single maintainer context means owners are advisory role labels. The actual executor will likely be one person wearing all hats.
- ACT-002 (L) is the critical-path item. Estimated 1-2 weeks for a single person.

---

## 6. Risk-Adjusted Timeline

| Risk | Mitigation | Contingency |
|---|---|---|
| ACT-002 (URL routes) uncovers routing bugs in existing EN/ES routes | Add regression tests as part of ACT-002 scope | +2 days buffer |
| ACT-001 (tests) reveals calculation bugs that need fixing before tests can pass | Budget additional fix/test cycles | +3 days buffer |
| ACT-004 (error monitoring) reveals high error rate requiring immediate fixes | Do not deploy monitoring config that alerts publicly; use non-blocking instrumentation first | No timeline impact — errors were already occurring |
| Single maintainer availability risk | All Now actions are independent and can be parallelised; prioritise ACT-001 + ACT-002 first as they are the longest poles | If maintainer time is limited, defer ACT-003 (S) to Next rather than blocking ACT-001 or ACT-002 |

**Overall confidence:** High for S-effort items; Medium for ACT-001 (M) and ACT-002 (L) due to unknowns in calculator logic complexity and routing edge cases.

---

## 7. Sign-off Summary

This Action Planner converts the 7 findings from the Deep-mode Project Overview into 8 actions (5 Now, 2 Next, 1 Later). Every Now and Next action has a measurable acceptance criterion. All High-severity findings are scheduled in Now, not deferred. No security artifacts were available; no security-related conflicts were identified.

**Total deliverable scope:**
| Phase | Actions | Effort Sum |
|---|---|---|
| Now | 5 | 1L + 1M + 3S |
| Next | 2 | 1M + 1S |
| Later | 1 | 1S |
| **All** | **8** | **1L + 2M + 5S** |

**Key handoff notes for the executor:**
1. Start with ACT-001 and ACT-002 in parallel (they are independent and have the longest lead times).
2. ACT-003, ACT-004, and ACT-005 can be completed in 2-3 days and provide immediate quality-of-life improvements.
3. Do not start ACT-007 until ACT-002 is deployed.
4. After completing Now actions, re-run the Deep-mode audit to validate the updated risk posture before proceeding to Next.
