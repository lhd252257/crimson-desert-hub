import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { Locale, locales, t } from '@/lib/i18n'

export default function DatabaseIndex({ locale }: { locale: Locale }) {
  const sections = [
    { href: `/${locale}/database/weapons`, title: t(locale, 'nav_db_weapons'), icon: '🗡️' },
    { href: `/${locale}/database/skills`, title: t(locale, 'nav_db_skills'), icon: '✨' },
    { href: `/${locale}/database/equipment`, title: t(locale, 'nav_db_equipment'), icon: '🛡️' },
  ]
  return (
    <Layout locale={locale} title={t(locale, 'nav_database')}>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">{t(locale, 'nav_database')}</h1>
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
