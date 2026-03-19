import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '@/components/Layout'
import { Locale, locales, t } from '@/lib/i18n'

export default function CharactersPage({ locale }: { locale: Locale }) {
  const characters = [
    {
      slug: 'mcclaren',
      name: 'Macduff McClaren',
      role: t(locale, 'char_mcclaren_role'),
      description: t(locale, 'char_mcclaren_desc'),
      image: '/images/mcclaren.jpg',
    },
    {
      slug: 'char2',
      name: 'TBA',
      role: t(locale, 'coming_soon'),
      description: '',
      image: '',
    },
    {
      slug: 'char3',
      name: 'TBA',
      role: t(locale, 'coming_soon'),
      description: '',
      image: '',
    },
  ]

  return (
    <Layout locale={locale} title={t(locale, 'nav_characters')} description="Meet the playable characters of Crimson Desert.">
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-4">{t(locale, 'nav_characters')}</h1>
        <p className="text-gray-400 mb-10">{t(locale, 'char_intro')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {characters.map((char) => (
            <div key={char.slug} className="bg-brand-card border border-brand-border rounded-xl overflow-hidden flex flex-col md:flex-row">
              <div className="w-full md:w-48 h-48 bg-brand-dark flex-shrink-0 flex items-center justify-center">
                {char.image ? (
                  <img src={char.image} alt={char.name} className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                ) : (
                  <span className="text-5xl">⚔️</span>
                )}
              </div>
              <div className="p-6">
                <div className="text-brand-primary text-sm font-medium mb-1">{char.role}</div>
                <h2 className="text-2xl font-bold mb-3">{char.name}</h2>
                {char.description && <p className="text-gray-400 text-sm leading-relaxed">{char.description}</p>}
              </div>
            </div>
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
