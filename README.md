# Fatma Ammar — Graphic Designer Portfolio Website

A responsive, animated portfolio website built for **Fatma Ammar**, Graphic Designer trained at **NTI** (National Telecommunication Institute).

Built using pure modern **HTML5**, **Vanilla CSS**, and **Vanilla JavaScript** (no external framework dependencies).

---

## 🎨 Design Palette & System
- **Soft Blush Rose**: `#FFB1B1`
- **Warm Apricot Peach**: `#FFDBB0`
- **Soft Cream Champagne**: `#FFFAD3`
- **Neutral Dark Base**: `#141118` / `#1B1622` (provides deep contrast, highlighting the glowing pastel tones)
- **Typography**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) & [Alexandria](https://fonts.google.com/specimen/Alexandria) (optimized for bilingual English & Arabic presentation)

---

## 📁 Suggested File Structure

```text
fatma-ammar-portfolio/
│
├── index.html              # Main HTML markup with 9 semantic sections & ARIA tags
├── styles.css              # Custom styling, responsive design tokens & animations
├── scripts.js              # Canvas background animation, scroll spy, modal & form logic
├── README.md               # Documentation and guide to update placeholders
│
└── assets/
    ├── images/
    │   ├── fatma-portrait.jpg    # Designer portrait placeholder (Hero section)
    │   ├── project-rashfa.jpg    # Featured Behance Project "رشفة"
    │   ├── project-2.jpg         # Place additional project images here
    │   └── project-3.jpg
    ├── cv/
    │   └── Fatma_Ammar_CV.pdf    # Place Fatma's downloadable CV PDF here
    └── icons/                    # Optional custom vector icons / SVG assets
```

---

## 📑 Included Sections & Where to Fill Placeholders

Every section in [`index.html`](file:///c:/Users/Ghonemy/Downloads/New%20folder/index.html) is labeled with HTML comments (`<!-- PLACEHOLDER: ... -->`) to make replacement straightforward:

1. **Home (Hero Section)**:
   - **Name & Bio**: "Fatma Ammar — Graphic Designer, trained at NTI"
   - **Buttons**:
     - `View Project` (`#projects` anchor)
     - `Download CV` (link points to your CV file, e.g. `assets/cv/Fatma_Ammar_CV.pdf`)
   - **Portrait Photo**: Located at `assets/images/fatma-portrait.jpg`. Replace with Fatma's personal photo.
   - **Background Animation**: HTML5 `<canvas id="ambient-canvas">` with floating pastel gradient orbs and connecting particles.

2. **About Me**:
   - Focus: Graphic designer for logos, social media designs, banners, roll-ups, and business cards.
   - Narrative card, specialty pill badges, and design pillars.

3. **Education**:
   - Focus: Bachelor's in Specific Education (**تربية نوعية**), Department of Educational Technology (**قسم تكنولوجيا التعليم**), Cumulative Grade: **Very Good (جيد جداً)**.

4. **Experience & Training**:
   - Focus: **NTI Study Grant** (National Telecommunication Institute / معهد تكنولوجيا الاتصالات) & Specialized Graphic Design Course.
   - Interactive milestone cards with deliverables and skills acquired.

5. **Skills & Tools**:
   - Disciplines: Social media visuals (95%), business cards & stationery (92%), roll-up displays (90%), banners & posters (94%).
   - Tools: Adobe Photoshop, Adobe Illustrator, Canva, InDesign.
   - Animated progress bars triggered on scroll.

6. **Projects Showcase**:
   - Featured Project: **"رشفة" (Rashfa Specialty Coffee)** on Behance with packaging & branding mockup, category tags, modal preview trigger, and Behance CTA.
   - Additional Project Placeholders: Pre-configured cards for Social Media Campaigns, Business Cards, and Roll-up Banners with easy drop-in image replacements.

7. **Services**:
   - Graphic Design & Identity, Photoshop Artistry & Retouching, Illustrator Vectoring, and Canva Quick Socials.

8. **Testimonials ("What People Say")**:
   - Pre-formatted review cards with 5-star ratings, quotes, avatar initials, and client roles.

9. **Get In Touch**:
   - **WhatsApp Link**: Update the phone number in `https://wa.me/201000000000...` with Fatma's real number.
   - **Email Link & Copy Button**: Points to `fatma.ammar.design@gmail.com`. Includes a 1-click clipboard copy button with animated toast alerts.
   - **Contact Form**: Complete interactive form with live validation and submission confirmation.

---

## 🚀 How to Run the Website Locally

You can open `index.html` directly in any web browser, or launch a local development server:

### Option A: Open directly in browser
Double-click `index.html` or open it with Google Chrome, Microsoft Edge, Firefox, or Safari.

### Option B: Using Python simple HTTP server
Run in terminal:
```bash
python -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

### Option C: Using Node `npx serve`
Run in terminal:
```bash
npx serve .
```

---

## 💡 Notes on Extending Animations & Responsiveness

### 1. Modifying the Ambient Canvas Background
In [`scripts.js`](file:///c:/Users/Ghonemy/Downloads/New%20folder/scripts.js) inside `initAmbientCanvas()`:
- **Palette adjustments**: Change the `colors` array `[{ r: 255, g: 177, b: 177 }, ...]` to introduce different color tints.
- **Speed & Density**:
  - Adjust `orb.vx` and `orb.vy` to speed up or slow down floating orbs.
  - Change `particleCount` calculation or `distance < 110` to adjust how dense the connecting particle constellation is.

### 2. Scroll Animations & Reveal Timing
- Scroll triggers utilize `IntersectionObserver` with CSS classes `.reveal-item` and `.reveal-item.is-visible`.
- To create staggered entrance effects, add `delay-1`, `delay-2`, `delay-3`, or `delay-4` to child elements.
- Timing curve and duration can be tweaked in [`styles.css`](file:///c:/Users/Ghonemy/Downloads/New%20folder/styles.css) under `--transition-normal` or `.reveal-item`.

### 3. Responsiveness Breakpoints
The layout is tested and optimized across 3 key breakpoints in [`styles.css`](file:///c:/Users/Ghonemy/Downloads/New%20folder/styles.css):
- **Desktop (>1024px)**: Multi-column grid layout with interactive hover lift cards and full sticky navigation.
- **Tablet (<=860px)**: 1-to-2 column flex grid, sticky header converts to a mobile hamburger menu drawer with keyboard trap (Escape key) and touch backdrop.
- **Mobile (<=600px)**: Single column stacked layout, touch-friendly touch targets (min 44px), optimized typography scaling with `clamp()`.
