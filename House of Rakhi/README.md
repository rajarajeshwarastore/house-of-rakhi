# Rajarajeshwara Rakhi Store — Website

A premium, bilingual (English + Telugu) business website for a Raksha Bandhan / Rakhi
store, built with plain HTML5, CSS3, and vanilla JavaScript — no frameworks.

## Project Structure

```
rakhi-store/
├── index.html                          # All page content
├── css/
│   └── style.css                       # All styling (festive maroon/gold theme)
├── js/
│   └── script.js                       # Mobile menu, animations, back-to-top
└── images/
    ├── logo-placeholder.png            # Replace with your real logo
    ├── about-store-placeholder.jpg     # Replace with a real storefront photo
    ├── rakhi-kids.jpg                  # Replace with a real product photo
    ├── rakhi-bhaiya-bhabhi.jpg
    ├── rakhi-designer.jpg
    ├── rakhi-silver.jpg
    ├── rakhi-lumba.jpg
    └── rakhi-kundan.jpg
```

## How to View It

Double-click `index.html` — it opens directly in your browser. No installation needed.

## ⚠️ Things You MUST Update Before Going Live

### 1. Phone & WhatsApp numbers
Search-and-replace `910000000000` throughout `index.html` with your real number
(country code + number, no spaces or symbols — e.g. `919876543210` for a number
`98765 43210`). It appears in these places:
- Header call/WhatsApp icons
- Hero section buttons
- Contact section (phone, WhatsApp, and the two visible "(placeholder)" labels)
- Footer
- Floating WhatsApp/Call buttons (bottom-right of every page)

Also update the **visible text** `+91 00000 00000` in the Contact section to
match, and delete the `<em>(placeholder — update with real number)</em>` notes.

### 2. Logo
Replace `images/logo-placeholder.png` with your real logo file, keeping the
same filename (or update the `src` in `index.html` if you rename it).

### 3. Product Photos
Replace each `images/rakhi-*.jpg` file with real photos of that category,
keeping the same filenames — or update the corresponding `src` attributes in
the "Our Rakhi Collection" section of `index.html`.

### 4. Store Photo
Replace `images/about-store-placeholder.jpg` with a real photo of your store.

### 5. Google Maps
The map currently searches for "Vemulawada Telangana Hanuman Temple". For a
pinpoint-accurate map:
1. Open [Google Maps](https://www.google.com/maps) and search for your exact store location.
2. Click **Share → Embed a map**, copy the `src` URL it gives you.
3. In `index.html`, find the `<iframe>` in the Contact section and replace its
   `src` value with the one you copied.

## What's Already Done

- Bilingual English + Telugu text throughout (nav, hero, all sections, footer)
- Sticky navigation with mobile hamburger menu
- Festive hero section with a decorative "toran" (garland) motif
- Rakhi Collection grid with 6 category cards
- About Us, Why Choose Us, Store Timings, and Contact sections
- Google Maps embed (placeholder search query — see step 5 above)
- Floating WhatsApp + Call buttons, plus a back-to-top button
- Scroll-reveal animations (respects users' "reduced motion" settings)
- Fully mobile responsive
- SEO meta tags (title, description, keywords, Open Graph)

## Editing Tips

- All text is in `index.html` — search for the English phrase you want to change.
- Telugu text sits right next to its English counterpart, usually inside a `<span class="te">`.
- Colors, fonts, and spacing are all in `css/style.css` under `:root` at the top.
