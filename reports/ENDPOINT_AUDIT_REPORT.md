# DevFolio Complete Endpoint, Route, Link & Data QA Audit Report

**Repository:** `f:\Projects\devfolio`  
**Framework / Runtime:** Next.js `16.4.6` (App Router, `webpack` production build) · Node.js `v26.13.0`  
**Audit Execution Date:** 2026-11-18  
**Methodology:** Two-pass audit (Pass 1: full discovery, live HTTP/method/link testing, root-cause fixes → Pass 2: clean rebuild, automated regression test suite, external re-verification).

---

## 1. Architecture & Endpoint Discovery Summary

Full repository inspection confirmed that `devfolio` is a **static-first Next.js 16 App Router application** with:
- **0 custom backend API routes** (`src/app/api/*` does not exist; no Express/Spring Boot controllers, no Server Actions `'use server'`, no database or auth sessions).
- **2 primary frontend routes**: `/` and `/resume`, plus `/robots.txt`, `/sitemap.xml`, and custom `not-found.tsx` (added during Pass 1 to close missing metadata/error endpoints).
- **1 Next.js 16 Proxy (`src/proxy.ts`)**: Added during Pass 1 to enforce RFC-compliant HTTP method handling (`405`/`204`) on static public assets and eliminate HTTP 500 errors.
- **21 verified static public endpoints** (PDF resume, 3D Spline scene, Draco WebAssembly decoder, self-hosted Geist fonts, bespoke SVGs, and project screenshots).
- **2 external service integrations**:
  1. Streamlit Cloud AI Agent embed (`https://devfolio-agent.streamlit.app/?embed=true`) in `src/components/chatbot-card.tsx`
  2. Optional Google AdSense script (`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`, gated by `NEXT_PUBLIC_GOOGLE_ADSENSE_ID`) in `src/app/layout.tsx`
- **20 external portfolio links** (social profiles, live demos, GitHub repositories, Postman docs, Coursera credential).

---

## 2. Complete Endpoint & Method Test Matrix (Pass 2 Final State)

| Endpoint | Method | Expected behavior | Actual status | Result |
|---|---|---|---|---|
| `/` | `GET`, `HEAD` | Serve homepage HTML with section anchors, security headers, Schema.org JSON-LD, and accurate OSCode data | `200 OK` (`text/html`, 9–17ms) | **PASS** |
| `/` | `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS` | Reject unsupported methods without 5xx (malformed JSON/body safe) | `405 Method Not Allowed` | **PASS** |
| `/resume` | `GET`, `HEAD` | Serve online resume HTML with Back link, PDF link, verified repo URLs, legible links, completed OSCode dates | `200 OK` (`text/html`, 5–15ms) | **PASS** |
| `/resume` | `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS` | Reject unsupported methods without 5xx | `405 Method Not Allowed` | **PASS** |
| `/resume/` | `GET` | Normalize trailing slash cleanly without redirect loop | `308 Permanent Redirect` → `/resume` | **PASS** |
| `/robots.txt` | `GET`, `HEAD` | Serve valid crawler policy pointing to sitemap | `200 OK` (`text/plain`) | **PASS** |
| `/sitemap.xml` | `GET`, `HEAD` | Serve valid XML sitemap listing `/` and `/resume` | `200 OK` (`application/xml`) | **PASS** |
| `/nonexistent-qa-route-404` & `/api/nonexistent` | `GET`, `HEAD`, `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS` | Return custom branded 404 page with navigation back to `/` and no stack traces | `404 Not Found` | **PASS** |
| `/ads.txt` | `GET`, `HEAD` | Serve AdSense publisher authorization file | `200 OK` (`text/plain`, 58 bytes) | **PASS** |
| `/favicon.ico` | `GET`, `HEAD` | Serve site favicon | `200 OK` (`image/x-icon`) | **PASS** |
| `/devesh_resume.pdf` | `GET`, `HEAD` | Serve valid PDF document (`%PDF-` header) | `200 OK` (`application/pdf`, 71,422 bytes) | **PASS** |
| `/devesh_resume.pdf`, `/ads.txt`, `/hacktv.svg` | `POST`, `PUT`, `PATCH`, `DELETE` | Reject write methods cleanly with `Allow` header (Pass 1 returned `500`; fixed via `src/proxy.ts`) | `405 Method Not Allowed` (`Allow: GET, HEAD, OPTIONS`) | **PASS** |
| `/devesh_resume.pdf`, `/ads.txt`, `/hacktv.svg` | `OPTIONS` | Return allowed methods cleanly (Pass 1 returned `500`; fixed via `src/proxy.ts`) | `204 No Content` (`Allow: GET, HEAD, OPTIONS`) | **PASS** |
| `/assets/scene.splinecode` | `GET`, `HEAD` | Serve original 3D Spline neoclassical marble scene | `200 OK` (`application/octet-stream`, 7,641,965 bytes) | **PASS** |
| `/assets/vendor/spline-viewer.js` | `GET`, `HEAD` | Serve patched local `@splinetool/viewer` module | `200 OK` (`application/javascript`) | **PASS** |
| `/assets/vendor/draco/draco_decoder.wasm` | `GET`, `HEAD` | Serve valid WebAssembly binary (`\0asm` magic bytes) | `200 OK` (`application/wasm`) | **PASS** |
| `/assets/vendor/draco/draco_wasm_wrapper.js` | `GET`, `HEAD` | Serve Draco JS loader wrapper | `200 OK` (`application/javascript`) | **PASS** |
| `/assets/fonts/geist.css` | `GET`, `HEAD` | Serve self-hosted Geist font stylesheet | `200 OK` (`text/css`) | **PASS** |
| `/assets/fonts/gyByhwUxId8gMEwcGFWNOITd.woff2` | `GET`, `HEAD` | Serve self-hosted Geist Latin WOFF2 | `200 OK` (`font/woff2`, 29,288 bytes) | **PASS** |
| `/assets/fonts/or3nQ6H-1_WfwkMZI_qYFrcdmhHkjko.woff2` | `GET`, `HEAD` | Serve self-hosted Geist Mono Latin WOFF2 | `200 OK` (`font/woff2`, 23,108 bytes) | **PASS** |
| `/profile-photo.jpg` | `GET`, `HEAD` | Serve Devesh Tiwari portrait | `200 OK` (`image/jpeg`, 67,916 bytes) | **PASS** |
| `/hacktv.svg`, `/hacktv-control.svg`, `/hacktv-architecture.svg` | `GET`, `HEAD` | Serve bespoke HackTV vector visuals | `200 OK` (`image/svg+xml`) | **PASS** |
| `/ai-finance-platform-image.png`, `/portfolio.png`, `/project_1.png`, `/project-5.png`, `/healthlink.png`, `/guruos.png` | `GET`, `HEAD` | Serve Devesh Tiwari project PNG screenshots | `200 OK` (`image/png`) | **PASS** |
| `/ai-showcase.jpeg`, `/proctored.jpeg` | `GET`, `HEAD` | Serve Devesh Tiwari project JPEG screenshots | `200 OK` (`image/jpeg`) | **PASS** |
| `https://devfolio-agent.streamlit.app/?embed=true` | `GET` | External Streamlit AI Agent iframe endpoint reachable without `X-Frame-Options` denial | `200 OK` (586ms, 9,782 bytes, no XFO block) | **PASS** |
| `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js` | `GET` | External Google AdSense script (only rendered when `NEXT_PUBLIC_GOOGLE_ADSENSE_ID` is set) | `ERR: UNABLE_TO_VERIFY_LEAF_SIGNATURE` (env var unset locally) | **BLOCKED** |

*Summary counts:* **33** endpoint/method entries discovered · **32** verified **PASS** · **0** **FAIL** · **1** **BLOCKED** (optional Google AdSense, unconfigured in local `.env` and TLS-intercepted on local network) · **0** **NOT TESTED**.

---

## 3. Pass 1 Failures & Permanent Root-Cause Fixes

### Failure 1 — HTTP 500 Internal Server Error on Non-GET Methods for Static Public Files
- **Observed in Pass 1:** `POST`, `PUT`, `PATCH`, `DELETE`, and `OPTIONS` against `/devesh_resume.pdf` returned `500 Internal Server Error`.
- **Root Cause:** Next.js 16's static file pipeline did not short-circuit unsupported HTTP methods on `public/` files before invoking internal page resolution.
- **Source File:** Added `src/proxy.ts` (Next.js 16 `proxy` convention).
- **Fix Applied:** Implemented `proxy(request)` matching static asset extensions to return `204 No Content` (`Allow: GET, HEAD, OPTIONS`) for `OPTIONS` and `405 Method Not Allowed` (`Allow: GET, HEAD, OPTIONS`) for `POST`/`PUT`/`PATCH`/`DELETE`.
- **Retest Result (Pass 2):** **PASS** — `405` / `204` verified across `/devesh_resume.pdf`, `/ads.txt`, and `/hacktv.svg` with zero 5xx responses.

### Failure 2 — Stale Ongoing OSCode Experience ("Sep 2025 – Present") & Format Mismatch
- **Observed in Pass 1:** `/resume` rendered `Creative Team Lead` / `Sep 2025 – Present` for `OSCode, SAIT Chapter`; `/` used abbreviated `Sep 2025 – Sep 2026`; `src/lib/data.ts` bio used present-tense `"leading"`.
- **Root Cause:** `src/lib/data.ts` was never updated after the one-year tenure ended in September 2026, and React JSX expressions `{exp.title} | {exp.period}` emitted `<!-- -->` hydration comments splitting the text string in SSR HTML.
- **Source Files:** `src/lib/data.ts`, `src/components/stoik-about.tsx`, `src/components/stoik-hero.tsx`, `src/components/stoik-projects.tsx`, `src/app/resume/page.tsx`, `src/app/layout.tsx`.
- **Fix Applied:** Standardized every occurrence to **OSCode, SAIT Chapter** · `Creative Lead | September 2025 – September 2026` as completed past experience (preserving verified +108% attendance 120 → 250+, QR check-in/certificate automation, and ~80% admin reduction); rendered `{`${exp.title} | ${exp.period}`}` cleanly as a single text node; added Schema.org `Person` JSON-LD excluding OSCode from `worksFor`.
- **Retest Result (Pass 2):** **PASS** — Automated regression test asserts exact format on `/` and `/resume` and confirms zero `Present`/`Current` OSCode leakage.

### Failure 3 — Broken 404 GitHub Link (Vision Transformer Repository)
- **Observed in Pass 1:** `https://github.com/deveshyaara/Vision-Transformer-ViT-for-Image-Classification` returned `404 Not Found` (`"Page not found · GitHub"`).
- **Root Cause:** Outdated repository slug in `src/lib/data.ts`. Verification against `https://github.com/deveshyaara?tab=repositories` confirmed the real public repository is `https://github.com/deveshyaara/-Vision-Transformer-ViT-`.
- **Source File:** `src/lib/data.ts`.
- **Fix Applied:** Updated link to `https://github.com/deveshyaara/-Vision-Transformer-ViT-`.
- **Retest Result (Pass 2):** **PASS** — External probe returned `200 OK` (590ms); automated test verifies exact URL on `/resume`.

### Failure 4 — Broken Placeholder `href="#"` Links (GuruOS)
- **Observed in Pass 1:** `src/lib/data.ts` defined `liveDemoUrl: '#'`, `repoUrl: '#'`, and `resumeProjects` GuruOS `links: [{ name: 'GitHub', url: '#' }]`, rendering a dead `<a href="#" target="_blank">` link on `/resume`.
- **Root Cause:** Placeholder `#` anchors were left for a project without a public repository URL.
- **Source Files:** `src/lib/data.ts`, `src/app/resume/page.tsx`.
- **Fix Applied:** Made `liveDemoUrl`/`repoUrl` optional in `Project`, removed placeholder `#` values for GuruOS, set `resumeProjects` GuruOS `links: []`, and conditionally rendered the link row only when `project.links.length > 0`.
- **Retest Result (Pass 2):** **PASS** — Automated HTML audit confirms zero `href="#"` or `href=""` on `/` and `/resume`.

### Failure 5 — Invisible Project & Certification Links on `/resume` + Missing Back Navigation
- **Observed in Pass 1:** `src/app/resume/page.tsx` styled project/certification links with `text-accent-foreground`, which maps to `#FFFFFF` (`0 0% 100%`) in `globals.css`, making links invisible white text on a white card. `/resume` also lacked a navigation link back to `/`.
- **Root Cause:** Token mismatch after migrating `globals.css` from the old dark palette to the Stoik light stone-grey theme.
- **Source File:** `src/app/resume/page.tsx`.
- **Fix Applied:** Updated link styling to high-contrast electric blue (`text-[#0052FF] hover:underline`), aligned `/resume` card styling with the Stoik theme, and added a top `← Back to Portfolio` `<Link href="/">` bar (hidden in print media).
- **Retest Result (Pass 2):** **PASS** — Verified in SSR HTML and automated test suite.

### Failure 6 — Missing Security Headers, `/robots.txt`, `/sitemap.xml`, and Branded 404 Page
- **Observed in Pass 1:** All responses lacked `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and `Permissions-Policy`; `/robots.txt` and `/sitemap.xml` returned `404`.
- **Source Files:** `next.config.ts`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/not-found.tsx`.
- **Fix Applied:** Added global `headers()` in `next.config.ts`, created Next.js 16 `robots.ts`, `sitemap.ts`, and branded `not-found.tsx`.
- **Retest Result (Pass 2):** **PASS** — All headers and metadata routes verified `200 OK` (and `404` for unknown routes) in automated tests.

### Failure 7 — Frontend Resilience & Memory Leak Fixes
- **`src/components/stoik-expertise.tsx`:** Fixed `window.addEventListener('resize', () => ...)` memory leak by naming `onResize` and removing it in `useEffect` cleanup.
- **`src/components/chatbot-card.tsx` & `src/components/chatbot.tsx`:** Added 12-second load timeout, `onError` handler, Retry action, and direct external fallback link (`https://devfolio-agent.streamlit.app/`) so Streamlit Cloud cold-starts/outages never stall indefinitely; raised mobile FAB positioning (`bottom-[116px] z-[92]`) above `.stoik-hero-card` (`z-index: 90`) so mobile visitors can tap it; added `Escape` close handler.
- **`src/components/stoik-contact.tsx`:** Added `execCommand('copy')` fallback and explicit `Copied` / `Copy unavailable` feedback so the copy button never silently fails.
- **`src/components/stoik-header.tsx`:** Added `IntersectionObserver`-driven active section highlighting (`aria-current="location"`), `aria-expanded` on mobile drawer toggle, and `Escape` close handler.
- **`src/components/spline-scene.tsx`:** Dispatched `stoik:spline-ready` on `customElements.whenDefined` failure so the preloader cannot stall.

---

## 4. Frontend Route Report

| Route | Direct Access | Trailing Slash | Security Headers | Status |
|---|---|---|---|---|
| `/` | `200 OK` | N/A | Present (`nosniff`, `SAMEORIGIN`, `strict-origin-when-cross-origin`, `Permissions-Policy`) | **PASS** |
| `/resume` | `200 OK` | `/resume/` → `308` → `/resume` | Present | **PASS** |
| `/robots.txt` | `200 OK` | N/A | Present | **PASS** |
| `/sitemap.xml` | `200 OK` | N/A | Present | **PASS** |
| `/nonexistent-qa-route-404` | `404 Not Found` (branded page) | N/A | Present | **PASS** |

*Interactive Browser E2E Verification:* **BLOCKED** — Automated Chrome DevTools browser inspection could not attach because Google Chrome remote debugging (`DevToolsActivePort`) is not active on this machine and Playwright is not installed in `devDependencies`. All SSR HTML, route transitions, headers, method handling, and payload integrity were verified directly against a live `next start` server via Node.js automated tests (`10/10` pass).

---

## 5. External Links Audit Report

| Category | Destination | Pass 1 Status | Fix Applied | Pass 2 Status | Result |
|---|---|---|---|---|---|
| Social | `https://github.com/deveshyaara` | `200` | — | `200` (648ms) | **PASS** |
| Social | `https://www.linkedin.com/in/deveshcodes/` | `999` (LinkedIn bot-filter) | Standardized trailing `/` across codebase | `999` (1892ms, LinkedIn anti-bot status) | **BLOCKED** (bot filter; manual browser verification required) |
| Social | `https://www.instagram.com/devesh_yaara_` | `200` | — | `200` (408ms) | **PASS** |
| Canonical | `https://devesh.co.in/` | `200` (→ `www.devesh.co.in`) | — | `200` (575ms) | **PASS** |
| Project Demo | `https://wealthwise.devesh.co.in/` | `200` (manual GET) / transient reset in parallel batch | — | `200` (Node default GET) / `403` (`curl HEAD` Vercel/Arcjet bot protection) | **PASS** (live on Vercel; bot-protected on HEAD/automated clients) |
| Project Repo | `https://github.com/deveshyaara/WealthWise` | `200` | — | `200` (737ms) | **PASS** |
| Project Demo | `https://devfolio-taupe.vercel.app/` | `200` | — | `200` (444ms) | **PASS** |
| Project Repo | `https://github.com/deveshyaara/devfolio` | `200` (301 from `.git`) | Stripped `.git` suffix | `200` direct (663ms) | **PASS** |
| Project Demo | `https://documenter.getpostman.com/view/34764585/2sA3JQ3yun` | `200` | — | `200` (1350ms) | **PASS** |
| Project Repo | `https://github.com/deveshyaara/E-Commerce-Backend` | `200` (301 from `.git`) | Stripped `.git` suffix | `200` direct (603ms) | **PASS** |
| Project Demo | `https://qr-mapper-mu.vercel.app/` | `200` | — | `200` (400ms) | **PASS** |
| Project Repo | `https://github.com/deveshyaara/QR-Mapper` | `200` | Normalized repo casing | `200` (550ms) | **PASS** |
| Project Demo | `https://textclassifier.devesh.co.in/` | `200` | — | `200` (133ms) | **PASS** |
| Project Repo | `https://github.com/deveshyaara/Text-Classifier/tree/main/nlp-text-classifier` | `200` | — | `200` (537ms) | **PASS** |
| Project Demo | `https://healthlink.devesh.co.in/` | `200` | — | `200` (157ms) | **PASS** |
| Project Repo | `https://github.com/deveshyaara/Healthlink_RPC` | `200` (301 from `.git`) | Stripped `.git` suffix | `200` direct (697ms) | **PASS** |
| Project Demo | `https://proctored.devesh.co.in/` | `200` | — | `200` (434ms) | **PASS** |
| Project Repo | `https://github.com/deveshyaara/proctor-ed` | `200` | — | `200` (548ms) | **PASS** |
| Project Repo | `https://github.com/deveshyaara/-Vision-Transformer-ViT-` | **FAIL (`404` on old slug)** | Updated to real public repo slug | `200` (590ms) | **PASS** |
| Certification | `https://coursera.org/share/e32c1a6e411718423a941a935b2d6f9d` | `200` (redirects to `https://www.coursera.org/`) | Preserved real URL; flagged redirect | `200` → `https://www.coursera.org/` (1329ms) | **BLOCKED** (Coursera redirects unauthenticated/non-JS requests to homepage; verify link validity in signed-in browser) |

---

## 6. External Integration Report

1. **Streamlit Cloud AI Agent (`https://devfolio-agent.streamlit.app/?embed=true`)**
   - **Configuration:** Hardcoded public embed URL in `src/components/chatbot-card.tsx` (no secrets exposed).
   - **Availability:** `200 OK` (586ms, 9,782 bytes), no `X-Frame-Options` or `frame-ancestors` block, no Streamlit sleep page detected.
   - **Failure Handling (Fixed):** Added 12s timeout fallback, `onError` UI, manual Retry button, and direct external tab fallback link.
2. **Google AdSense (`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`)**
   - **Configuration:** Gated on `process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID` in `src/app/layout.tsx`; `public/ads.txt` serves `google.com, pub-3061580844965201, DIRECT, f08c47fec0942fa0`.
   - **Status:** **BLOCKED** in local audit because `NEXT_PUBLIC_GOOGLE_ADSENSE_ID` is not set in the local environment and local network TLS failed (`UNABLE_TO_VERIFY_LEAF_SIGNATURE`) against `pagead2.googlesyndication.com`. Graceful degradation works properly: script tag is omitted when the env var is unset.

---

## 7. Authentication & Authorization Report

- **Result:** **NOT APPLICABLE** — This portfolio application has no user accounts, login endpoints, JWT/cookie sessions, or protected backend APIs.
- Anonymous read-only access to public pages and assets is intended; unsupported write methods (`POST`, `PUT`, `PATCH`, `DELETE`) are rejected with `405 Method Not Allowed`.
- No secrets, API keys, `.env` files, or credentials are exposed in client bundles or logs.

---

## 8. Performance & Security Observations

- **Latency (local `next start`):** `/` served in `9–17ms`, `/resume` in `5–15ms`, static assets in `2–5ms`.
- **Concurrency:** 24 concurrent read requests across `/`, `/resume`, `/robots.txt`, `/sitemap.xml`, `/devesh_resume.pdf`, and `/ads.txt` completed in **`41.1ms`** with 100% `200 OK` and zero server errors.
- **Security Hardening Verified:**
  - `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy` enforced globally via `next.config.ts`.
  - Every `target="_blank"` anchor on `/` and `/resume` verified to include `rel="noopener noreferrer"`.
  - Malformed JSON/XML bodies and `<script>` query string probes do not reflect unescaped payloads or trigger 5xx errors.
  - Zero stack traces exposed in 404 or 405 responses.
- **Dependency Note:** `npm install` reported existing transitive audit advisories (`21 vulnerabilities` in dev/transitive packages) and Next.js 16 emits a deprecation notice for React 18 (support will be removed in Next.js 17). Upgrading React 18 → React 19 is outside the scope of this QA fix pass and tracked as a future upgrade item.

---

## 9. Remaining Limitations

1. **Live Headless/Chrome Browser Execution Blocked:** Chrome DevTools remote debugging (`DevToolsActivePort`) was unavailable in this environment, so visual DOM interaction, WebGL Spline rendering, and live browser console capture could not be executed programmatically. Enable `chrome://inspect/#remote-debugging` or install Playwright to run full browser E2E checks.
2. **Static PDF Binary (`public/devesh_resume.pdf`):** Stream inspection confirmed the static PDF already lists OSCode as completed (`Sep 2025 – Sep 2026`, NOT `Present`), though its title still reads `Creative Team Lead` with abbreviated months (`Sep 2025 – Sep 2026`). Because the PDF is a precompiled binary without source `.tex`/`.docx` in the repo, it was not overwritten.
3. **Bot-Protected External Destinations:** LinkedIn (`999`) and Coursera share URL (redirects to `www.coursera.org/` for automated HTTP clients) require manual verification in an authenticated browser session.
4. **Google AdSense (`NEXT_PUBLIC_GOOGLE_ADSENSE_ID`):** Unset in local environment; verify in production deployment where the env var is configured.
