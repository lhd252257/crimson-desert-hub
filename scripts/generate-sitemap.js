const fs = require('fs')
const path = require('path')

const locales = ['en', 'es', 'ko', 'ja', 'de', 'fr', 'zh']
const baseUrl = 'https://crimson-desert.org'

function generateSitemap() {
  const pages = [
    '',
    '/news',
    '/characters',
    '/guides',
    '/guides/beginner',
    '/guides/combat',
    '/guides/boss',
    '/guides/walkthrough',
    '/database',
    '/database/weapons',
    '/database/skills',
    '/database/equipment',
    '/world',
    '/world/map',
    '/world/lore',
    '/world/locations',
    '/buy',
  ]

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`

  locales.forEach((locale) => {
    pages.forEach((page) => {
      const url = `${baseUrl}/${locale}${page}`
      sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
`
      locales.forEach((altLocale) => {
        sitemap += `    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${baseUrl}/${altLocale}${page}"/>
`
      })
      sitemap += `  </url>
`
    })

    // Add news articles
    const newsDir = path.join(__dirname, '../src/content', locale, 'news')
    if (fs.existsSync(newsDir)) {
      const files = fs.readdirSync(newsDir).filter(f => f.endsWith('.md'))
      files.forEach((file) => {
        const slug = file.replace('.md', '')
        const url = `${baseUrl}/${locale}/news/${slug}`
        sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`
      })
    }
  })

  sitemap += `</urlset>`

  const outDir = path.join(__dirname, '../out')
  fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap)
  console.log('✓ Sitemap generated successfully')
}

generateSitemap()
