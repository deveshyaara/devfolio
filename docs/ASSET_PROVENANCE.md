# Asset Provenance & Licensing Audit — Devesh Tiwari Portfolio (`devfolio`)

This document records the origin, licensing status, and asset reuse compliance for every static and 3D asset in `f:\Projects\devfolio`.

---

## 1. Strict Asset Reuse Policy Compliance

Per the implementation mandate:
- **Reused from the Yogi Suria / Stoik reference (`knarayanareddy/WebsitedesignandPrompts`, `ysuriadesign/`)**: ONLY the original 3D Spline scene, its required local viewer/Draco decompression runtime, and open-source Geist webfont binaries.
- **Excluded (0% copied)**: All personal photography, agency photos, Twitter/X avatars, client project screenshots/videos, testimonial portraits, and commercial trial fonts (`Gellix-TRIAL`, `FKRasterRomanCompactTrial`) from the reference repository were **strictly excluded**.
- **Personal & Project Media**: 100% of portraits, project screenshots, and vector architecture visuals belong exclusively to Devesh Tiwari.

---

## 2. Reused 3D & Open-Source Runtime Assets

| Local Path | Source in Reference Repo | Size | License / Provenance | Notes |
|---|---|---|---|---|
| `public/assets/scene.splinecode` | `ysuriadesign/assets/scene.splinecode` | 7.64 MB | Reference 3D scene asset (see `knarayanareddy/WebsitedesignandPrompts` `LICENSE` — code MIT; 3D media provenance documented here for review before commercial redistribution) | Original neoclassical marble philosopher sculpture wearing silver headphones with iPhone & MacBook Pro; explicitly requested for 1:1 3D hero fidelity. |
| `public/assets/vendor/spline-viewer.js` | `ysuriadesign/assets/vendor/spline-viewer.js` | Local bundle | `@splinetool/viewer` Web Component runtime | Patched Draco decoder path from `./assets/vendor/draco/` to `/assets/vendor/draco/` for Next.js root-relative resolution. |
| `public/assets/vendor/draco/draco_decoder.wasm` | `ysuriadesign/assets/vendor/draco/draco_decoder.wasm` | Local WASM | Apache 2.0 (Google Draco) | Offline WebAssembly geometry decompression; zero external CDN dependency. |
| `public/assets/vendor/draco/draco_wasm_wrapper.js` | `ysuriadesign/assets/vendor/draco/draco_wasm_wrapper.js` | Local JS | Apache 2.0 (Google Draco) | JS loader wrapper for Draco WASM decoder. |
| `public/assets/fonts/geist.css` + 11 `.woff2` files | `ysuriadesign/assets/fonts/` | Local WOFF2 | SIL Open Font License 1.1 (Vercel Geist & Geist Mono) | Self-hosted locally to match the reference's Geist typography with zero external font calls. |

---

## 3. Devesh Tiwari Owned & Bespoke Assets

| Local Path | Owner / Origin | Used In |
|---|---|---|
| `public/profile-photo.jpg` | Devesh Tiwari (existing repo) | Floating "Talk to Devesh" glassmorphic CTA card & About section portrait |
| `public/hacktv.svg` | Bespoke vector asset created for HackTV | HackTV flagship carousel slide 1, Hero reel, Expertise dial |
| `public/hacktv-control.svg` | Bespoke vector asset created for HackTV | HackTV flagship carousel slide 2 (React/TypeScript Control Center), Hero reel |
| `public/hacktv-architecture.svg` | Bespoke vector asset created for HackTV | HackTV flagship carousel slide 3 (Android TV + LG webOS + Node WS Topology), Expertise dial |
| `public/ai-finance-platform-image.png` | Devesh Tiwari — WealthWise (existing repo) | WealthWise case study, Hero reel, Expertise dial |
| `public/portfolio.png` | Devesh Tiwari — DevFolio (existing repo) | DevFolio case study, Hero reel, Expertise dial |
| `public/project_1.png` | Devesh Tiwari — E-Commerce Backend API (existing repo) | E-Commerce case study, Hero reel, Expertise dial |
| `public/project-5.png` | Devesh Tiwari — QR Mapper (existing repo) | Additional Work grid, Hero reel, Expertise dial |
| `public/ai-showcase.jpeg` | Devesh Tiwari — NLP Text Classifier (existing repo) | Additional Work grid, Hero reel |
| `public/healthlink.png` | Devesh Tiwari — HealthLink (existing repo) | Additional Work grid, Hero reel, Expertise dial |
| `public/proctored.jpeg` | Devesh Tiwari — ProctorED (existing repo) | Additional Work grid, Hero reel, Expertise dial |
| `public/guruos.png` | Devesh Tiwari — GuruOS (existing repo) | Additional Work grid, Hero reel |
| `public/devesh_resume.pdf` | Devesh Tiwari (existing repo) | Resume download link in Header, Contact Footer, and `/resume` |

---

## 4. Reference Visuals Replaced With Original Implementations

- **Footer Panorama (`footer-photo.webp` in reference)**: Not reused. Replaced with an original pure CSS/SVG daylight sky & cumulus cloud panoramic horizon in `src/components/stoik-contact.tsx`.
- **Approach Videos (`traditional.webm`, `justbringit.webm` in reference)**: Not reused. Replaced with an original monochrome architectural systems blueprint SVG (`Traditional`) and pure CSS animated spectrum bars (`Just bring it`) in `src/components/stoik-approach.tsx`.
- **Hero Avatar Video (`yogi.webm` in reference)**: Not reused. Replaced with Devesh Tiwari's own `/profile-photo.jpg` in `src/components/stoik-header.tsx`.
- **Twitter Avatars & Testimonials (`assets/avatars/`, `assets/testimonials/`)**: Not reused. Replaced with verified, authentic engineering achievements, roles, and technical credentials from Devesh Tiwari's resume & repository data.
