import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '@/components/Layout'
import { Locale, locales, t } from '@/lib/i18n'

export default function BuyPage({ locale }: { locale: Locale }) {
  const editions = [
    { name: t(locale, 'buy_standard'), price: '$49.99 / ¥268', platforms: 'PC (Steam)', note: '' },
    { name: t(locale, 'buy_deluxe'), price: '$69.99 / ¥368', platforms: 'PC / PS5 / Xbox', note: '' },
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
        <h1 className="text-4xl font-bold mb-4">{t(locale, 'nav_buy')}</h1>
        <p className="text-gray-400 mb-10">{t(locale, 'buy_intro')}</p>

        <h2 className="text-2xl font-bold mb-6">{t(locale, 'buy_editions')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {editions.map((ed) => (
            <div key={ed.name} className="bg-brand-card border border-brand-border rounded-xl p-6">
              <h3 className="text-xl font-bold mb-2">{ed.name}</h3>
              <div className="text-sm text-gray-400 mb-3">{ed.platforms}</div>
              <div className="text-2xl font-bold text-brand-primary">{ed.price}</div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6">{t(locale, 'buy_req_title')}</h2>
        <div className="bg-brand-card border border-brand-border rounded-xl overflow-hidden">
          <div className="grid grid-cols-3 bg-brand-dark px-6 py-3 text-sm font-semibold text-gray-400">
            <div></div>
            <div>{t(locale, 'buy_req_min')}</div>
            <div>{t(locale, 'buy_req_rec')}</div>
          </div>
          {requirements.map((req, i) => (
            <div key={req.label} className={`grid grid-cols-3 px-6 py-4 text-sm ${i % 2 === 0 ? '' : 'bg-brand-dark/30'}`}>
              <div className="text-gray-400 font-medium">{req.label}</div>
              <div className="text-gray-300">{req.min}</div>
              <div className="text-white">{req.rec}</div>
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
