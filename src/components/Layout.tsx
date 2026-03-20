import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Navbar from './Navbar'
import Footer from './Footer'
import LoadingBar from './LoadingBar'
import { Locale, locales } from '@/lib/i18n'

// 动态导入非关键组件
const BackToTop = dynamic(() => import('./BackToTop'), {
  ssr: false,
})

interface LayoutProps {
  children: React.ReactNode
  locale: Locale
  title?: string
  description?: string
  jsonLd?: object
}

const BASE_URL = 'https://crimson-desert.org'

export default function Layout({ children, locale, title, description, jsonLd }: LayoutProps) {
  const router = useRouter()
  const siteName = 'CrimsonDesertHub'
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} — Crimson Desert Fan Hub`
  const defaultDesc = 'Crimson Desert guides, news, characters, lore and database. Your #1 unofficial fan hub.'
  const desc = description ?? defaultDesc
  const canonicalUrl = `${BASE_URL}${router.asPath}`
  const ogImage = `${BASE_URL}/images/og-cover.jpg`

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={desc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={desc} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={ogImage} />

        {/* hreflang for SEO */}
        {locales.map((l) => (
          <link key={l} rel="alternate" hrefLang={l} href={`${BASE_URL}/${l}/`} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/en/`} />

        {/* JSON-LD Structured Data */}
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
      </Head>

      <LoadingBar />
      <div className="min-h-screen flex flex-col">
        <Navbar locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
      </div>
      <BackToTop />
    </>
  )
}
