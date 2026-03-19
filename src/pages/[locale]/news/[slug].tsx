import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { marked } from 'marked'
import Layout from '@/components/Layout'
import Breadcrumb from '@/components/Breadcrumb'
import SocialShare from '@/components/SocialShare'
import { Locale, locales, t } from '@/lib/i18n'
import { getNewsPosts, getNewsPost, NewsPost } from '@/lib/content'

interface NewsPostPageProps {
  locale: Locale
  post: NewsPost
  htmlContent: string
  relatedPosts: NewsPost[]
}

export default function NewsPostPage({ locale, post, htmlContent, relatedPosts }: NewsPostPageProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'GTA6Hub',
    },
  }

  return (
    <Layout locale={locale} title={post.title} description={post.excerpt} jsonLd={jsonLd}>
      <Breadcrumb
        locale={locale}
        items={[
          { label: t(locale, 'nav_news'), href: `/${locale}/news` },
          { label: post.title },
        ]}
      />

      <article className="container py-12 max-w-4xl">
        <header className="mb-8">
          <div className="text-sm text-gray-400 mb-3">{post.date}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          {post.excerpt && <p className="text-xl text-gray-300">{post.excerpt}</p>}
        </header>

        {post.coverImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img src={post.coverImage} alt={post.title} className="w-full" loading="lazy" />
          </div>
        )}

        <div
          className="prose prose-invert prose-lg max-w-none
            prose-headings:text-white prose-p:text-gray-300
            prose-a:text-brand-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white prose-code:text-brand-primary"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        <SocialShare url={`/${locale}/news/${post.slug}`} title={post.title} locale={locale} />
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="container py-12 max-w-4xl border-t border-brand-border">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/${locale}/news/${relatedPost.slug}`}
                className="bg-brand-card border border-brand-border rounded-lg p-4 hover:border-brand-primary transition-colors"
              >
                <div className="text-xs text-gray-500 mb-2">{relatedPost.date}</div>
                <h3 className="font-semibold mb-2 line-clamp-2">{relatedPost.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{relatedPost.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: Array<{ params: { locale: string; slug: string } }> = []
  for (const locale of locales) {
    const posts = getNewsPosts(locale)
    posts.forEach((post) => {
      paths.push({ params: { locale, slug: post.slug } })
    })
  }
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale as Locale
  const slug = params?.slug as string
  const post = getNewsPost(locale, slug)
  if (!post) return { notFound: true }

  const htmlContent = await marked(post.content)

  // Get related posts (exclude current post, limit to 2)
  const allPosts = getNewsPosts(locale)
  const relatedPosts = allPosts.filter(p => p.slug !== slug).slice(0, 2)

  return { props: { locale, post, htmlContent, relatedPosts } }
}
