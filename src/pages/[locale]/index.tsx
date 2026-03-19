import { GetStaticPaths, GetStaticProps } from 'next'
import { useState } from 'react'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { Locale, locales, t } from '@/lib/i18n'
import { getNewsPosts, NewsPost } from '@/lib/content'

interface HomeProps {
  locale: Locale
  latestNews: NewsPost[]
}

export default function Home({ locale, latestNews }: HomeProps) {
  const [videoLightbox, setVideoLightbox] = useState<string | null>(null)
  const guideCards = [
    { href: `/${locale}/guides/beginner`, title: t(locale, 'nav_guides_beginner'), icon: '⚔️' },
    { href: `/${locale}/guides/combat`, title: t(locale, 'nav_guides_combat'), icon: '🛡️' },
    { href: `/${locale}/guides/boss`, title: t(locale, 'nav_guides_boss'), icon: '💀' },
    { href: `/${locale}/guides/walkthrough`, title: t(locale, 'nav_guides_walkthrough'), icon: '📜' },
  ]

  return (
    <Layout locale={locale}>
      {/* Hero */}
      <section className="relative border-b border-brand-border overflow-hidden"
        style={{ minHeight: '480px' }}>
        {/* 背景图 */}
        <div className="absolute inset-0">
          <img src="/images/backgroundImages/bgm.png" alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(13,11,8,0.45) 0%, rgba(13,11,8,0.75) 60%, rgba(13,11,8,1) 100%)' }} />
        </div>
        {/* 装饰线 */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-40" />
        <div className="container text-center relative py-28">
          <div className="text-brand-muted text-xs tracking-[0.4em] uppercase mb-6" style={{ fontFamily: 'Cinzel, serif' }}>
            Pearl Abyss · 2026
          </div>
          {/* Logo 图片 */}
          <div className="flex justify-center mb-8">
            <img src="/images/logo/logo.png" alt="Crimson Desert" className="h-20 md:h-28 w-auto object-contain" style={{ filter: 'drop-shadow(0 0 30px rgba(200,169,110,0.4))' }} />
          </div>
          <p className="text-lg text-gray-400 mb-12 max-w-xl mx-auto">{t(locale, 'hero_subtitle')}</p>

          <div className="flex flex-wrap justify-center gap-6 text-sm mb-12">
            {[
              { label: t(locale, 'release_date'), value: t(locale, 'release_date_value') },
              { label: t(locale, 'platforms'), value: 'PC · PS5 · Xbox' },
              { label: t(locale, 'game_length'), value: t(locale, 'game_length_value') },
            ].map((stat) => (
              <div key={stat.label} className="text-center px-6 border-l border-brand-border first:border-l-0">
                <div className="text-brand-muted text-xs tracking-widest uppercase mb-1" style={{ fontFamily: 'Cinzel, serif' }}>{stat.label}</div>
                <div className="text-white font-semibold">{stat.value}</div>
              </div>
            ))}
          </div>

          <Link href={`/${locale}/buy`} className="btn-gold inline-flex">
            {t(locale, 'nav_buy')}
          </Link>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-20" />
      </section>

      {/* Media */}
      <section className="py-20 border-t border-brand-border" style={{ background: 'linear-gradient(180deg, rgba(200,169,110,0.03) 0%, transparent 100%)' }}>
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-brand-border" />
            <h2 className="text-xl tracking-[0.3em] uppercase text-brand-primary" style={{ fontFamily: 'Cinzel, serif' }}>
              {t(locale, 'section_media')}
            </h2>
            <div className="h-px flex-1 bg-brand-border" />
          </div>
          <p className="text-center text-brand-muted text-xs tracking-widest uppercase mb-12" style={{ fontFamily: 'Cinzel, serif' }}>
            {t(locale, 'media_subtitle')}
          </p>

          {/* 主视频 + 侧边小视频 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* 主视频 */}
            <div className="lg:col-span-2">
              <div
                className="relative aspect-video bg-brand-card border border-brand-border group cursor-pointer overflow-hidden"
                onClick={() => setVideoLightbox('VWIw_f8e9Pg')}
              >
                <img
                  src="/images/media/videos/5474a45367f20260313113457875.jpg"
                  alt="Official Launch Trailer"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-brand-dark/30 group-hover:bg-brand-dark/10 transition-all duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-2 border-brand-primary flex items-center justify-center group-hover:bg-brand-primary transition-all duration-300">
                    <svg className="w-6 h-6 text-brand-primary group-hover:text-brand-dark ml-1 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 px-4 py-3 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-xs text-brand-primary tracking-[0.3em] uppercase" style={{ fontFamily: 'Cinzel, serif' }}>Official Launch Trailer</p>
                </div>
                <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-brand-primary opacity-60" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-brand-primary opacity-60" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-brand-primary opacity-60" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-brand-primary opacity-60" />
              </div>
            </div>

            {/* 侧边截图预览 */}
            <div className="flex flex-col gap-4">
              {['0fa22bc59df20250929074929326.png', '2feee76926620250929120729888.jpg'].map((file) => (
                <div key={file} className="relative aspect-video bg-brand-card border border-brand-border overflow-hidden group cursor-pointer flex-1">
                  <img src={`/images/media/screenshots/${file}`} alt="Screenshot" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/20 transition-all" />
                  <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-brand-primary opacity-40" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-brand-primary opacity-40" />
                </div>
              ))}
            </div>
          </div>

          {/* 查看更多 */}
          <div className="text-center mt-8">
            <a href={`/${locale}/media`} className="btn-gold inline-flex">
              {t(locale, 'media_view_full')} →
            </a>
          </div>
        </div>
      </section>

      {/* Popular Guides */}
      <section className="container py-20">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-brand-border" />
          <h2 className="text-xl tracking-[0.3em] uppercase text-brand-primary" style={{ fontFamily: 'Cinzel, serif' }}>
            {t(locale, 'section_guides')}
          </h2>
          <div className="h-px flex-1 bg-brand-border" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {guideCards.map((card) => (
            <Link key={card.href} href={card.href} className="card-gold p-6 text-center group">
              <div className="text-3xl mb-3">{card.icon}</div>
              <div className="text-xs font-medium text-gray-400 group-hover:text-brand-primary transition-colors tracking-wider uppercase" style={{ fontFamily: 'Cinzel, serif' }}>
                {card.title}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest News */}
      <section className="container pb-20">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-brand-border" />
          <h2 className="text-xl tracking-[0.3em] uppercase text-brand-primary" style={{ fontFamily: 'Cinzel, serif' }}>
            {t(locale, 'latest_news')}
          </h2>
          <div className="h-px flex-1 bg-brand-border" />
        </div>
        {latestNews.length === 0 ? (
          <p className="text-brand-muted text-center py-12 tracking-widest uppercase text-sm" style={{ fontFamily: 'Cinzel, serif' }}>
            {t(locale, 'coming_soon')}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map((post) => (
              <Link key={post.slug} href={`/${locale}/news/${post.slug}`} className="card-gold overflow-hidden group">
                {post.coverImage && (
                  <div className="aspect-video bg-brand-dark">
                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
                <div className="p-5">
                  <div className="text-xs text-brand-muted mb-2 tracking-widest uppercase" style={{ fontFamily: 'Cinzel, serif' }}>{post.date}</div>
                  <h3 className="text-base font-semibold mb-2 line-clamp-2 text-gray-200 group-hover:text-brand-primary transition-colors" style={{ fontFamily: 'Cinzel, serif' }}>{post.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-3">{post.excerpt}</p>
                  <div className="mt-4 text-brand-primary text-xs tracking-widest uppercase" style={{ fontFamily: 'Cinzel, serif' }}>{t(locale, 'read_more')} →</div>
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className="text-center mt-8">
          <Link href={`/${locale}/news`} className="btn-gold inline-flex">
            {t(locale, 'read_more')}
          </Link>
        </div>
      </section>

      {/* Video Lightbox */}
      {videoLightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={() => setVideoLightbox(null)}
        >
          <div className="relative max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${videoLightbox}?autoplay=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <button
              onClick={() => setVideoLightbox(null)}
              className="absolute -top-10 right-0 w-8 h-8 flex items-center justify-center border border-brand-border text-gray-400 hover:text-brand-primary hover:border-brand-primary transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: locales.map((locale) => ({ params: { locale } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale as Locale
  const latestNews = getNewsPosts(locale).slice(0, 6)
  return { props: { locale, latestNews } }
}
