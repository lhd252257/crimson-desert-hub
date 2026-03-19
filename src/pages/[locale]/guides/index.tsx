import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { Locale, locales, t } from '@/lib/i18n'

export default function GuidesIndex({ locale }: { locale: Locale }) {
  const guides = [
    { href: `/${locale}/guides/beginner`, title: t(locale, 'nav_guides_beginner'), icon: '🗡️', desc: '' },
    { href: `/${locale}/guides/combat`, title: t(locale, 'nav_guides_combat'), icon: '⚔️', desc: '' },
    { href: `/${locale}/guides/boss`, title: t(locale, 'nav_guides_boss'), icon: '💀', desc: '' },
    { href: `/${locale}/guides/walkthrough`, title: t(locale, 'nav_guides_walkthrough'), icon: '📜', desc: '' },
  ]
  return (
    <Layout locale={locale} title={t(locale, 'nav_guides')}>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">{t(locale, 'nav_guides')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map((g) => (
            <Link key={g.href} href={g.href}
              className="bg-brand-card border border-brand-border rounded-lg p-6 hover:border-brand-primary transition-colors flex items-center gap-4">
              <span className="text-4xl">{g.icon}</span>
              <div>
                <div className="font-semibold text-lg">{g.title}</div>
                <div className="text-gray-400 text-sm mt-1">{t(locale, 'coming_soon')}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: locales.map((locale) => ({ params: { locale } })),
  fallback: false,
})
export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: { locale: params?.locale as Locale },
})
