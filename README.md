# Dynamic Express Solutions — Landing Page

A fully responsive, SEO-optimized landing page built with **strictly Vanilla HTML5, CSS3 and JavaScript** (zero frameworks, zero dependencies).

## 📁 Structure
```
dynamic-express-solutions/
├── index.html        # Single-page site, full SEO head + JSON-LD schema
├── css/styles.css    # Custom stylesheet (design tokens, grid/flex layouts, responsive)
├── js/main.js        # Mobile nav, form validation, scroll-reveal, back-to-top
├── images/           # Logo, hero, and 6 pest gallery images
├── robots.txt        # Crawl rules + sitemap reference
└── sitemap.xml       # XML sitemap with image extension
```

## ✅ SEO Checklist Implemented
- Keyword-optimized `<title>` (~60 visible chars of key terms first) and meta description (~160 chars)
- Meta keywords, author, robots, geo tags, theme-color, canonical URL
- **Open Graph** (Facebook/WhatsApp) + **Twitter Card** tags
- **JSON-LD `LocalBusiness` schema** with EPA credential, 3 office departments (Tema, Accra, Kumasi), opening hours, service catalog, and `areaServed: Ghana`
- Semantic HTML5 (`header / nav / main / section / article / figure / address / footer`)
- One `<h1>`, logical `h2 → h3` hierarchy
- Descriptive, keyword-rich `alt` text on every image
- `loading="lazy"` on below-the-fold images, `fetchpriority="high"` on hero
- `width`/`height` attributes to prevent layout shift (CLS)
- robots.txt + sitemap.xml

## 🚀 Before Going Live (client TODOs)
1. Replace all `+233 XX XXX XXXX` placeholders with real phone numbers (also in the JSON-LD and `tel:`/`wa.me` links).
2. Replace placeholder street addresses in the Locations section and JSON-LD.
3. Update `https://www.dynamicexpresssolutions.com/` to the real domain in: canonical link, OG/Twitter tags, JSON-LD, robots.txt, sitemap.xml.
4. Wire the contact form to a real backend or service (Formspree, Netlify Forms, custom PHP/Node endpoint) — see the marked block in `js/main.js`.
5. Optionally replace generated images with real job-site photos (keep the alt text pattern).

## 🖥 Run Locally
Just open `index.html` in a browser, or:
```bash
python3 -m http.server 8000
# → http://localhost:8000
```
