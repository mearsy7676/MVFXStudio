# AGENTS.md

## Project shape
**MVFX Studio** — A modern, cinematic portfolio & product showcase for a creative design studio.
- Static site built with vanilla HTML/CSS/JS (scaffolded from HTML5 Boilerplate).
- **Currently deployed**: single-page site (`index.html`) with hero section, about, and vault preview animations.
- **Tech stack**: Tailwind CSS (CDN), GSAP 3.12.2 for animations + ScrollTrigger, Canvas particles, webpack for optional bundling.
- **Styling approach**: Tailwind for utility classes + inline `<style>` block in `index.html` for animations & canvas setup.
- **No framework**: vanilla JavaScript directly in `js/script.js`; no React, Vue, or build-time JSX.

## Key files to read first
- `index.html` — **source of truth for page structure**; includes Tailwind CDN, GSAP library links, hero/about/vault sections.
- `js/script.js` — **animation engine**; GSAP timeline animations, ScrollTrigger configs, particle canvas effect.
- `css/style.css` — HTML5 Boilerplate base + helper classes; **custom studio styling lives in `index.html` `<style>` block**.
- `webpack.common.js` — currently maps `./js/app.js` (unused); real entry is `js/script.js` loaded directly in HTML.
- `package.json` — `start` (dev server), `build` (production bundle), `test` (placeholder).

## Build and dev workflow
- **Development**: `npm start` → webpack-dev-server serves repo root, hot reload enabled. Edit `index.html` and `js/script.js` directly; changes reflect instantly.
- **Production**: `npm run build` → webpack outputs `dist/index.html`, copies `img/`, `css/`, and static assets. Deploy `dist/` folder.
- **Note**: `webpack.common.js` entry points to unused `js/app.js`. Actual runtime JS is `js/script.js` loaded as `<script src="js/script.js"></script>` in HTML.

## How assets flow through the app
- **HTML**: Single `index.html` template with embedded `<style>` block (animations, canvas, noise overlay).
- **JavaScript**: `js/script.js` runs GSAP animations + particle effects; no module bundling needed (yet).
  - GSAP timeline animates hero elements (`#logo`, `#tagline`, `#light-streak`) on page load.
  - ScrollTrigger animates sections (`#about`, `#vault-preview`) as user scrolls.
  - Canvas particle effect runs continuously in background.
- **CSS**: Tailwind utilities via CDN + HTML5 Boilerplate base in `css/style.css`.
- **Build**: Production copies assets to `dist/` per `webpack.config.prod.js` patterns; ensure new static files are added to CopyPlugin config.

## Naming & animation patterns
- **IDs for animation targets**: `#logo`, `#tagline`, `#light-streak`, `#divider-about`, `#about-title`, `#about-text`, `#vault-*` (all prefixed with ID).
  - Pattern: `gsap.to("#element-id", { opacity: 1, y: -10, duration: 1, ease: "power2.out" }, "label");`
  - ScrollTrigger usage: `{ scrollTrigger: { trigger: "#section-id", start: "top 80%" } }` triggers animation when section scrolls into view.
- **Sections as containers**: `<section id="about">`, `<section id="vault-preview">`, etc. Each section is a discrete scroll-trigger zone.
- **Glassmorphism**: Tailwind classes like `backdrop-blur` (future); particle/noise overlays add depth.

## Project-specific conventions
- **2-space indentation, UTF-8, LF line endings** per `.editorconfig`.
- **Tailwind-first**: Use Tailwind utility classes; minimize custom CSS in `<style>` block.
- **Keep it flat**: No component files, no routing, no API layer. Everything in `index.html` + `js/script.js`.
- **CDN for libraries**: GSAP, Tailwind via CDN; avoid npm deps unless absolutely necessary.
- **Static assets**: Images go in `img/` (keep `img/logo.png`, `img/bg-noise.png`). Update `webpack.config.prod.js` CopyPlugin if adding new asset types.

## Animation patterns to extend
- **Hero entrance**: Use GSAP timeline with staggered element animations (0.5s delay, ease: "power3.out").
- **Scroll animations**: Always wrap in `gsap.registerPlugin(ScrollTrigger)` + provide `scrollTrigger: { trigger, start }`.
- **Opacity + transform**: Combine `opacity`, `y` (vertical shift), `scale` for smooth fade-in effects.
- **Example pattern**:
  ```js
  gsap.to("#element", {
    scrollTrigger: { trigger: "#container", start: "top 80%" },
    opacity: 1, y: -10, duration: 1, ease: "power2.out"
  });
  ```

## When adding new sections
1. Add `<section id="section-name">` with content in `index.html`.
2. Add IDs to elements you want to animate (e.g., `id="section-name-title"`, `id="section-name-text"`).
3. Add corresponding GSAP animations in `js/script.js` using ScrollTrigger pattern above.
4. Use Tailwind classes for layout; inline `<style>` block only for animation setup (canvas, noise, keyframes).
5. Update `site.webmanifest` and Open Graph tags in `<head>` if content/branding changes.

