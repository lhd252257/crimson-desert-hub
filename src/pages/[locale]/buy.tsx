import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '@/components/Layout'
import { Locale, locales, t } from '@/lib/i18n'

export default function BuyPage({ locale }: { locale: Locale }) {
  const isZh = locale === 'zh'
  const editions = [
    {
      name: t(locale, 'buy_standard'),
      price: '$69.99',
      platforms: 'PC (Steam) · PS5 · Xbox Series X|S',
      features: isZh
        ? ['基础游戏', '所有七个地区', '400+任务', '75场BOSS战']
        : ['Base game', 'All seven regions', '400+ quests', '75 boss encounters'],
    },
    {
      name: t(locale, 'buy_deluxe'),
      price: '$79.99',
      platforms: 'PC (Steam) · PS5 · Xbox Series X|S',
      features: isZh
        ? ['基础游戏全部内容', '豪华版独家装备套装', '数字艺术集', '原声音乐']
        : ['Everything in Standard', 'Deluxe exclusive gear set', 'Digital art book', 'Original soundtrack'],
      highlight: true,
    },
  ]

  const faqs = [
    {
      q: isZh ? '游戏有内购或微交易吗？' : 'Are there microtransactions or in-game purchases?',
      a: isZh ? '没有。《深红沙漠》是买断制游戏，没有任何微交易、战斗通行证或付费内容。一次购买，获得完整游戏体验。' : 'No. Crimson Desert is a buy-to-play game with no microtransactions, battle passes, or paid DLC. One purchase, complete experience.',
    },
    {
      q: isZh ? '游戏支持多人模式吗？' : 'Does the game have multiplayer?',
      a: isZh ? '《深红沙漠》是单人游戏，专注于主线剧情和开放世界探索。没有多人或在线功能。' : 'Crimson Desert is a single-player game focused on its story and open world. There is no multiplayer or online component.',
    },
    {
      q: isZh ? '这款游戏和《黑色沙漠Online》有什么关系？' : 'How does this relate to Black Desert Online?',
      a: isZh ? '《深红沙漠》是《黑色沙漠Online》的前传，设定在同一宇宙中，但早于BDO的故事发生。你不需要玩过BDO就能理解剧情。' : 'Crimson Desert is a prequel set in the same universe as Black Desert Online, taking place before BDO\'s events. No prior BDO knowledge is needed to enjoy the story.',
    },
    {
      q: isZh ? '游戏有多少内容？' : 'How much content does the game have?',
      a: isZh ? '游戏包含400+任务、75场BOSS战、7个地区、29种坐骑类型，以及完整的主线剧情。支持14种语言。' : 'The game features 400+ quests, 75 boss encounters, 7 regions, 29 mount types, and a full main story. Supported in 14 languages.',
    },
    {
      q: isZh ? '游戏支持哪些平台？' : 'What platforms is the game on?',
      a: isZh ? 'PC（Steam）、PlayStation 5 和 Xbox Series X|S。' : 'PC (Steam), PlayStation 5, and Xbox Series X|S.',
    },
    {
      q: isZh ? '游戏有多少可玩角色？' : 'How many playable characters are there?',
      a: isZh ? '主要可玩角色是Kliff。Damiane和Oongka作为同伴加入，可在战斗中通过同伴技能系统召唤。' : 'The primary playable character is Kliff. Damiane and Oongka join as companions and can be called in during combat via the Ally Skills system.',
    },
    {
      q: isZh ? '游戏需要持续网络连接吗？' : 'Does the game require an internet connection?',
      a: isZh ? '不需要。《深红沙漠》完全支持离线游玩。' : 'No. Crimson Desert is fully playable offline.',
    },
    {
      q: isZh ? '游戏难度可以调整吗？' : 'Can I adjust the difficulty?',
      a: isZh ? '游戏提供多个难度选项，可在设置中随时调整，不影响成就或奖励。' : 'The game offers multiple difficulty options that can be changed at any time in settings without affecting achievements or rewards.',
    },
  ]

  const requirements = [
    { label: t(locale, 'buy_req_os'), min: 'Windows 10 64-bit', rec: 'Windows 11 64-bit' },
    { label: t(locale, 'buy_req_cpu'), min: 'Intel i5-8600K / Ryzen 5 2600X', rec: 'Intel i7-10700K / Ryzen 7 3700X' },
    { label: t(locale, 'buy_req_ram'), min: '16 GB', rec: '32 GB' },
    { label: t(locale, 'buy_req_gpu'), min: 'GTX 1080 / RX 5700', rec: 'RTX 4070 Super / RX 7900 XT' },
    { label: t(locale, 'buy_req_storage'), min: '70 GB SSD', rec: '70 GB NVMe SSD' },
  ]

  return (
    <Layout locale={locale} title={t(locale, 'nav_buy')}>
      <div className="container py-12 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px flex-1 bg-brand-border" />
          <h1 className="text-xl tracking-[0.3em] uppercase text-brand-primary" style={{ fontFamily: 'Cinzel, serif' }}>
            {t(locale, 'nav_buy')}
          </h1>
          <div className="h-px flex-1 bg-brand-border" />
        </div>
        <p className="text-center text-brand-muted text-xs tracking-widest uppercase mb-12" style={{ fontFamily: 'Cinzel, serif' }}>
          {isZh ? '买断制 · 无微交易 · 完整游戏体验' : 'Buy-to-play · No microtransactions · Complete experience'}
        </p>

        {/* Editions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {editions.map((ed) => (
            <div key={ed.name} className={`bg-brand-card border overflow-hidden ${ed.highlight ? 'border-brand-primary' : 'border-brand-border'}`}>
              {ed.highlight && (
                <div className="bg-brand-primary/20 border-b border-brand-primary px-5 py-2 text-brand-primary text-xs font-bold tracking-widest uppercase text-center" style={{ fontFamily: 'Cinzel, serif' }}>
                  {isZh ? '推荐版本' : 'Recommended'}
                </div>
              )}
              <div className="p-6">
                <div className="text-brand-muted text-xs tracking-widest uppercase mb-1" style={{ fontFamily: 'Cinzel, serif' }}>{ed.platforms}</div>
                <h3 className="text-lg font-bold mb-1" style={{ fontFamily: 'Cinzel, serif' }}>{ed.name}</h3>
                <div className="text-3xl font-bold text-brand-primary mb-4">{ed.price}</div>
                <ul className="space-y-1">
                  {ed.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-gray-400 text-sm">
                      <span className="text-brand-primary">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* System Requirements */}
        <h2 className="text-lg font-bold tracking-widest uppercase text-brand-primary mb-6" style={{ fontFamily: 'Cinzel, serif' }}>
          {t(locale, 'buy_req_title')}
        </h2>
        <div className="bg-brand-card border border-brand-border overflow-hidden mb-12">
          <div className="grid grid-cols-3 bg-black/30 border-b border-brand-border px-5 py-3 text-xs font-bold text-brand-muted tracking-widest uppercase">
            <div></div>
            <div>{t(locale, 'buy_req_min')}</div>
            <div>{t(locale, 'buy_req_rec')}</div>
          </div>
          {requirements.map((req, i) => (
            <div key={req.label} className={`grid grid-cols-3 px-5 py-3 text-sm ${i % 2 === 0 ? '' : 'bg-black/20'}`}>
              <div className="text-brand-muted font-medium">{req.label}</div>
              <div className="text-gray-400">{req.min}</div>
              <div className="text-gray-300">{req.rec}</div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <h2 className="text-lg font-bold tracking-widest uppercase text-brand-primary mb-6" style={{ fontFamily: 'Cinzel, serif' }}>
          {isZh ? '常见问题' : 'FAQ'}
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-brand-card border border-brand-border overflow-hidden">
              <div className="bg-black/30 border-b border-brand-border px-5 py-3">
                <span className="text-white font-bold text-sm">{faq.q}</span>
              </div>
              <div className="px-5 py-4">
                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
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
