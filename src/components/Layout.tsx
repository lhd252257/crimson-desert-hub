import Head from 'next/head'
import dynamic from 'next/dynamic'
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

export default function Layout({ children, locale, title, description, jsonLd }: LayoutProps) {
  const siteName = 'CrimsonDesertHub'
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} — Crimson Desert Fan Hub`
  const defaultDesc = 'Crimson Desert guides, news, characters, lore and database. Your #1 unofficial fan hub.'

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description ?? defaultDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description ?? defaultDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="CrimsonDesertHub" />
        {/* hreflang for SEO */}
        {locales.map((l) => (
          <link key={l} rel="alternate" hrefLang={l} href={`https://crimsondeserthub.com/${l}/`} />
        ))}

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
