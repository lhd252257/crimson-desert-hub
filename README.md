# GTA6Hub — Multi-language GTA 6 News & Info Site

A modern, SEO-optimized website for GTA 6 news, characters, platforms, and more. Built with Next.js and deployed on Cloudflare Pages.

## Features

- 🌍 **Multi-language support** (EN, ES, KO, JA, DE, FR)
- 📰 **Markdown-based content management**
- 🎨 **Modern, responsive design** with Tailwind CSS
- ⚡ **Static site generation** for blazing-fast performance
- 🔍 **SEO optimized** with hreflang tags, meta descriptions, and sitemap
- 🎮 **Game-focused pages**: News, Characters, Platforms, Map, Requirements, Buy

## Tech Stack

- **Framework**: Next.js 15 (Pages Router)
- **Styling**: Tailwind CSS
- **Content**: Markdown files with gray-matter
- **Deployment**: Cloudflare Pages
- **Language**: TypeScript

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Add Content

Create markdown files in `src/content/{locale}/news/`:

```markdown
---
title: "Your Article Title"
date: "2026-03-17"
excerpt: "Brief description"
coverImage: "/images/news/your-image.jpg"
---

Your article content here...
```

### 4. Build for Production

```bash
npm run build
```

This generates a static site in the `out/` directory.

## Deployment to Cloudflare Pages

1. Push your code to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
3. Connect your repository
4. Set build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
5. Deploy!

## Project Structure

```
gta6-hub/
├── src/
│   ├── components/       # React components (Navbar, Footer, Layout)
│   ├── content/          # Markdown content files
│   │   ├── en/news/      # English news articles
│   │   ├── es/news/      # Spanish news articles
│   │   └── ...
│   ├── lib/              # Utilities (i18n, content loader)
│   ├── pages/            # Next.js pages
│   │   ├── index.tsx     # Homepage
│   │   ├── news/         # News pages
│   │   ├── characters/   # Characters page
│   │   └── ...
│   └── styles/           # Global CSS
├── public/               # Static assets (images, favicon)
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json
```

## Adding New Languages

1. Add locale to `next.config.js`:
   ```js
   locales: ['en', 'es', 'ko', 'ja', 'de', 'fr', 'pt'],
   ```

2. Add translations to `src/lib/i18n.ts`

3. Create content directory: `src/content/{locale}/news/`

## SEO Tips

- Keep titles under 60 characters
- Write compelling meta descriptions (150-160 chars)
- Use descriptive URLs and slugs
- Add alt text to images
- Create high-quality, unique content for each language
- Update content regularly (news sites benefit from freshness)

## License

MIT
# crimson-desert-hub
