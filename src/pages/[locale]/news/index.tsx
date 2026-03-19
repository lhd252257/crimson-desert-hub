import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { Locale, locales, t } from '@/lib/i18n'
import { getNewsPosts, NewsPost } from '@/lib/content'

interface NewsPageProps {
  locale: Locale
  posts: NewsPost[]
}

export default function NewsPage({ locale, posts }: NewsPageProps) {
  return (
    <Layout locale={locale} title={t(locale, 'nav_news')}>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">{t(locale, 'latest_news')}</h1>

        {posts.length === 0 ? (
          <p className="text-gray-400">No news available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/news/${post.slug}`}
                className="bg-brand-card border border-brand-border rounded-lg overflow-hidden hover:border-brand-primary transition-colors"
              >
                {post.coverImage && (
                  <div className="aspect-video bg-brand-dark">
                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-5">
                  <div className="text-sm text-gray-400 mb-2">{post.date}</div>
                  <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-3">{post.excerpt}</p>
                  <div className="mt-4 text-brand-primary text-sm font-medium">{t(locale, 'read_more')} →</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: locales.map((locale) => ({ params: { locale } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale as Locale
  return { props: { locale, posts: getNewsPosts(locale) } }
}
