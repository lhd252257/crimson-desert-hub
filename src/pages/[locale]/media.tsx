import { GetStaticPaths, GetStaticProps } from 'next'
import { useState } from 'react'
import Layout from '@/components/Layout'
import { Locale, locales, t } from '@/lib/i18n'

const videos = [
  { id: 'VWIw_f8e9Pg', title: 'Official Launch Trailer', thumbnail: '5474a45367f20260313113457875.jpg' },
  { id: 'BOy81crUgtw', title: 'Crimson Desert Trailer', thumbnail: '5b61db495c520260213064632914.jpg' },
  { id: 'srQ-NtGNBpY', title: 'Crimson Desert Trailer', thumbnail: '58e2b0bf96520260205102154106.jpg' },
  { id: 'MfZCV8EySac', title: 'Crimson Desert Trailer', thumbnail: '9336e90e58320260129141234143.jpg' },
  { id: 'ua_7lmxiVV8', title: 'Crimson Desert Trailer', thumbnail: '2ece0ae924820251212075417017.jpg' },
  { id: '1ItNYP9U1M0', title: 'Crimson Desert Trailer', thumbnail: 'e69f48015e920250321042942502.jpg' },
  { id: 'uz2m_k6L1q4', title: 'Crimson Desert Trailer', thumbnail: '3e7f31395a520250321043434663.jpg' },
  { id: 'B2fccBA64Ds', title: 'Crimson Desert Trailer', thumbnail: '64be2fb2b9720250321043537281.jpg' },
  { id: 'rrQgbLuIzq0', title: 'Crimson Desert Trailer', thumbnail: '6a481b45a6f20250321043057239.jpg' },
  { id: 'ZIsYk5MtjmY', title: 'Crimson Desert Trailer', thumbnail: '3a1f80d46df20250321043206129.jpg' },
  { id: 'Tn1igh_q0Wc', title: 'Crimson Desert Trailer', thumbnail: '44a18aba8c520250321042827734.jpg' },
  { id: 'C2OCmtmwpVA', title: 'Crimson Desert Trailer', thumbnail: '1447cf0cef020250321043639932.jpg' },
  { id: 'W4Fyv9s4g3M', title: 'Crimson Desert Trailer', thumbnail: '0ed942a9de320250318080953234.jpg' },
  { id: 'GxiHTuzZ6_w', title: 'Crimson Desert Trailer', thumbnail: '0cc7191f59720250318080933345.jpg' },
  { id: 'tYQRBqqpV3M', title: 'Crimson Desert Trailer', thumbnail: 'fa399467ddb20250318080923692.jpg' },
  { id: 'K_sWEhRZaTM', title: 'Crimson Desert Trailer', thumbnail: '24466182d3620250318080855012.jpg' },
]

const screenshots = [
  '0fa22bc59df20250929074929326.png',
  '2feee76926620250929120729888.jpg',
  '7f4f1788a4320250929121012584.jpg',
  'a63ac2e3b3b20250929125208870.jpg',
  '3f05d600c4420250929123923146.jpg',
  'ef1d4dbc92620250929123753200.jpg',
  '1ac53a3432e20250929123529670.jpg',
  '62724a1e11d20250319045114563.jpg',
  '5849fc6078c20250319045029831.jpg',
  '5c9853d25eb20250319044947138.jpg',
  '7c002c1311f20250319044844953.jpg',
  'fa31993b81b20250319044803058.jpg',
  '24bed1e97e720250319044720086.jpg',
  '1727bfa6c5320250319044518457.jpg',
  '94165e3cae620250319044439434.jpg',
  '190be4e7a3c20250319044358216.jpg',
  '0366bcaa92b20250319044311656.jpg',
  '8e15b8cbcec20250319044101116.jpg',
  '43dfa67a73420250319043542057.jpg',
  'c7c3afb68de20250319043358825.jpg',
  'ecaff74ca9520250319043955796.jpg',
  '28bca4424a620250319043013737.jpg',
  '11339d9e87120250319043708816.jpg',
  'e56c4e85bc420250319043623784.jpg',
  '5652cda4ec620250319043752616.jpg',
  '6572fb4cec020250319043858961.jpg',
  '2ba9af8134320250319043321854.jpg',
  '1eb8e98bb7420250319043150934.jpg',
  '4f42f326de020250319043055572.jpg',
  'b6d2a175d9720250319041921556.jpg',
  '8db886b703f20250319031443082.jpg',
  '124cfeed1a420250319031317125.jpg',
  'b84f5ef99b420250319031235903.jpg',
  '8cd7463c41820250319031119132.jpg',
  '606d66d664320250319030736330.jpg',
  '124a0fadfba20250319030700436.jpg',
  'c8ea0fa476720250319030320580.jpg',
  'fed3a05e99820250319025821792.jpg',
  '35ab6ef43f820250319025531744.jpg',
  '181bb8e9d1320250319025659397.jpg',
  '6280d1a327720250318082118657.jpg',
  'd11b3e76f3220250318082056064.jpg',
  '970367f95ff20250318082031392.jpg',
  '9ec6300d3a320250318082009352.jpg',
  'a262810b0b820250318081947177.jpg',
  'f53dee3244720250318081925451.jpg',
  '30d5f79703f20250318081859370.jpg',
  'b89c85c909920250318081838070.jpg',
  'b39060e074320250318081806865.jpg',
  'e1a22329edf20250318081712570.jpg',
  'fb1119f14a020250318081647380.jpg',
  '621943badf220250318081623821.jpg',
  '5711c704ff020250318081556980.jpg',
  '5e6c87f6eb320250318081535184.jpg',
  '48d35e7bf8c20250318081510003.jpg',
  '02bf21042a120250318081447675.jpg',
]

type Tab = 'screenshots' | 'videos' | 'wallpapers'

export default function MediaPage({ locale }: { locale: Locale }) {
  const [activeTab, setActiveTab] = useState<Tab>('screenshots')
  const [lightbox, setLightbox] = useState<string | null>(null)
  const [videoLightbox, setVideoLightbox] = useState<string | null>(null)

  const tabs: { key: Tab; label: string }[] = [
    { key: 'screenshots', label: t(locale, 'media_screenshots') },
    { key: 'videos', label: t(locale, 'media_videos') },
    { key: 'wallpapers', label: t(locale, 'media_wallpapers') },
  ]

  return (
    <Layout locale={locale} title={t(locale, 'section_media')}>
      <div className="container py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px flex-1 bg-brand-border" />
          <h1 className="text-xl tracking-[0.3em] uppercase text-brand-primary" style={{ fontFamily: 'Cinzel, serif' }}>
            {t(locale, 'section_media')}
          </h1>
          <div className="h-px flex-1 bg-brand-border" />
        </div>
        <p className="text-center text-brand-muted text-xs tracking-widest uppercase mb-10" style={{ fontFamily: 'Cinzel, serif' }}>
          {t(locale, 'media_subtitle')}
        </p>

        {/* Tabs */}
        <div className="flex justify-center gap-0 mb-10 border-b border-brand-border">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-8 py-3 text-xs tracking-widest uppercase transition-all border-b-2 -mb-px ${
                activeTab === tab.key
                  ? 'border-brand-primary text-brand-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Screenshots Grid */}
        {activeTab === 'screenshots' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {screenshots.map((file) => (
              <div
                key={file}
                className="relative aspect-video bg-brand-card border border-brand-border overflow-hidden cursor-pointer group"
                onClick={() => setLightbox(file)}
              >
                <img
                  src={`/images/media/screenshots/${file}`}
                  alt="Crimson Desert Screenshot"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                />
                {/* hover overlay */}
                <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
                {/* 角落装饰 */}
                <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-brand-primary opacity-0 group-hover:opacity-60 transition-opacity" />
                <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-brand-primary opacity-0 group-hover:opacity-60 transition-opacity" />
              </div>
            ))}
          </div>
        )}

        {/* Videos Grid */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => (
              <div
                key={video.id}
                className="relative aspect-video bg-brand-card border border-brand-border overflow-hidden cursor-pointer group"
                onClick={() => setVideoLightbox(video.id)}
              >
                <img
                  src={`/images/media/videos/${video.thumbnail}`}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-brand-dark/30 group-hover:bg-brand-dark/10 transition-all duration-300 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full border-2 border-brand-primary flex items-center justify-center group-hover:bg-brand-primary transition-all duration-300">
                    <svg className="w-5 h-5 text-brand-primary group-hover:text-brand-dark ml-1 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 px-3 py-2 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-xs text-brand-primary tracking-wider uppercase truncate" style={{ fontFamily: 'Cinzel, serif' }}>{video.title}</p>
                </div>
                <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-brand-primary opacity-0 group-hover:opacity-60 transition-opacity" />
                <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-brand-primary opacity-0 group-hover:opacity-60 transition-opacity" />
              </div>
            ))}
          </div>
        )}

        {/* Wallpapers placeholder */}
        {activeTab === 'wallpapers' && (
          <div className="text-center py-20 text-brand-muted text-sm tracking-widest uppercase" style={{ fontFamily: 'Cinzel, serif' }}>
            {t(locale, 'coming_soon')}
          </div>
        )}
      </div>

      {/* Screenshot Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-6xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={`/images/media/screenshots/${lightbox}`}
              alt="Crimson Desert Screenshot"
              className="w-full h-auto max-h-[85vh] object-contain"
            />
            {/* 关闭按钮 */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center border border-brand-border text-gray-400 hover:text-brand-primary hover:border-brand-primary transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* 上下张 */}
            <button
              onClick={() => {
                const idx = screenshots.indexOf(lightbox)
                setLightbox(screenshots[(idx - 1 + screenshots.length) % screenshots.length])
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-brand-border text-gray-400 hover:text-brand-primary hover:border-brand-primary transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => {
                const idx = screenshots.indexOf(lightbox)
                setLightbox(screenshots[(idx + 1) % screenshots.length])
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-brand-border text-gray-400 hover:text-brand-primary hover:border-brand-primary transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {/* 计数 */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-brand-muted tracking-widest" style={{ fontFamily: 'Cinzel, serif' }}>
              {screenshots.indexOf(lightbox) + 1} / {screenshots.length}
            </div>
          </div>
        </div>
      )}

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
export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: { locale: params?.locale as Locale },
})
