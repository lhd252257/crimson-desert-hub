import { memo } from 'react'
import Link from 'next/link'
import { Locale, t } from '@/lib/i18n'

function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-brand-border mt-20" style={{ background: '#0D0B08' }}>
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="text-brand-primary font-bold text-lg mb-3 tracking-widest uppercase" style={{ fontFamily: 'Cinzel, serif' }}>
              Crimson Desert Hub
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">{t(locale, 'footer_desc')}</p>
          </div>

          <div>
            <h3 className="text-xs font-semibold mb-4 tracking-widest uppercase text-brand-muted" style={{ fontFamily: 'Cinzel, serif' }}>{t(locale, 'nav_guides')}</h3>
            <ul className="space-y-2.5 text-sm text-gray-500">
              <li><Link href={`/${locale}/guides/beginner`} className="hover:text-brand-primary transition-colors">{t(locale, 'nav_guides_beginner')}</Link></li>
              <li><Link href={`/${locale}/guides/boss`} className="hover:text-brand-primary transition-colors">{t(locale, 'nav_guides_boss')}</Link></li>
              <li><Link href={`/${locale}/guides/walkthrough`} className="hover:text-brand-primary transition-colors">{t(locale, 'nav_guides_walkthrough')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold mb-4 tracking-widest uppercase text-brand-muted" style={{ fontFamily: 'Cinzel, serif' }}>{t(locale, 'nav_database')}</h3>
            <ul className="space-y-2.5 text-sm text-gray-500">
              <li><Link href={`/${locale}/characters`} className="hover:text-brand-primary transition-colors">{t(locale, 'nav_characters')}</Link></li>
              <li><Link href={`/${locale}/database/weapons`} className="hover:text-brand-primary transition-colors">{t(locale, 'nav_db_weapons')}</Link></li>
              <li><Link href={`/${locale}/world/lore`} className="hover:text-brand-primary transition-colors">{t(locale, 'nav_world_lore')}</Link></li>
              <li><Link href={`/${locale}/buy`} className="hover:text-brand-primary transition-colors">{t(locale, 'nav_buy')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-brand-border/50 text-center text-xs text-gray-600 tracking-widest uppercase" style={{ fontFamily: 'Cinzel, serif' }}>
          © {new Date().getFullYear()} CrimsonDesertHub — Fan site, not affiliated with Pearl Abyss
        </div>
      </div>
    </footer>
  )
}

export default memo(Footer)
