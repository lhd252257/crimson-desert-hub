import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '@/components/Layout'
import { Locale, locales, t } from '@/lib/i18n'

const guideConfig: Record<string, { icon: string; titleKey: string }> = {
  beginner:    { icon: '🗡️', titleKey: 'nav_guides_beginner' },
  combat:      { icon: '⚔️', titleKey: 'nav_guides_combat' },
  boss:        { icon: '💀', titleKey: 'nav_guides_boss' },
  walkthrough: { icon: '📜', titleKey: 'nav_guides_walkthrough' },
}

export default function GuidePage({ locale, slug }: { locale: Locale; slug: string }) {
  const cfg = guideConfig[slug]
  const title = cfg ? t(locale, cfg.titleKey) : slug
  return (
    <Layout locale={locale} title={title}>
      <div className="container py-12 max-w-4xl">
        <div className="text-5xl mb-4">{cfg?.icon}</div>
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-gray-400 text-lg">{t(locale, 'coming_soon')}</p>
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = Object.keys(guideConfig)
  return {
    paths: locales.flatMap((locale) => slugs.map((slug) => ({ params: { locale, slug } }))),
    fallback: false,
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: { locale: params?.locale as Locale, slug: params?.slug as string },
})
