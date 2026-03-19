import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { Locale, locales, t } from '@/lib/i18n'

export default function WorldIndex({ locale }: { locale: Locale }) {
  const sections = [
    { href: `/${locale}/world/map`, title: t(locale, 'nav_world_map'), icon: '🗺️' },
    { href: `/${locale}/world/lore`, title: t(locale, 'nav_world_lore'), icon: '📖' },
    { href: `/${locale}/world/locations`, title: t(locale, 'nav_world_locations'), icon: '📍' },
  ]
  return (
    <Layout locale={locale} title={t(locale, 'nav_world')}>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-4">{t(locale, 'nav_world')}</h1>
        <p className="text-gray-400 mb-8">{t(locale, 'world_intro')}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map((s) => (
            <Link key={s.href} href={s.href}
              className="bg-brand-card border border-brand-border rounded-lg p-6 text-center hover:border-brand-primary transition-colors">
              <div className="text-4xl mb-3">{s.icon}</div>
              <div className="font-semibold">{s.title}</div>
              <div className="text-gray-400 text-sm mt-2">{t(locale, 'coming_soon')}</div>
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
