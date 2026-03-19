import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Locale } from './i18n'

const contentDir = path.join(process.cwd(), 'src/content')

export interface NewsPost {
  slug: string
  title: string
  date: string
  excerpt: string
  coverImage?: string
  content: string
  locale: Locale
}

export function getNewsPosts(locale: Locale): NewsPost[] {
  const dir = path.join(contentDir, locale, 'news')
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))

  return files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(dir, filename), 'utf-8')
      const { data, content } = matter(raw)
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? '',
        excerpt: data.excerpt ?? '',
        coverImage: data.coverImage ?? null,
        content,
        locale,
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getNewsPost(locale: Locale, slug: string): NewsPost | null {
  const filePath = path.join(contentDir, locale, 'news', `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    excerpt: data.excerpt ?? '',
    coverImage: data.coverImage ?? null,
    content,
    locale,
  }
}
