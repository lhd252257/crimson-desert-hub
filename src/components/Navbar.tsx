import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, memo } from 'react'
import { Locale, localeNames, locales, t } from '@/lib/i18n'

interface NavItem {
  href: string
  label: string
  children?: { href: string; label: string }[]
}

function Navbar({ locale }: { locale: Locale }) {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const navItems: NavItem[] = [
    { href: `/${locale}/`, label: t(locale, 'nav_home') },
    { href: `/${locale}/news`, label: t(locale, 'nav_news') },
    { href: `/${locale}/media`, label: t(locale, 'nav_media') },
    {
      href: `/${locale}/guides`,
      label: t(locale, 'nav_guides'),
      children: [
        { href: `/${locale}/guides/beginner`, label: t(locale, 'nav_guides_beginner') },
        { href: `/${locale}/guides/combat`, label: t(locale, 'nav_guides_combat') },
        { href: `/${locale}/guides/boss`, label: t(locale, 'nav_guides_boss') },
        { href: `/${locale}/guides/walkthrough`, label: t(locale, 'nav_guides_walkthrough') },
      ],
    },
    { href: `/${locale}/characters`, label: t(locale, 'nav_characters') },
    {
      href: `/${locale}/database`,
      label: t(locale, 'nav_database'),
      children: [
        { href: `/${locale}/database/weapons`, label: t(locale, 'nav_db_weapons') },
        { href: `/${locale}/database/skills`, label: t(locale, 'nav_db_skills') },
        { href: `/${locale}/database/equipment`, label: t(locale, 'nav_db_equipment') },
      ],
    },
    {
      href: `/${locale}/world`,
      label: t(locale, 'nav_world'),
      children: [
        { href: `/${locale}/world/map`, label: t(locale, 'nav_world_map') },
        { href: `/${locale}/world/lore`, label: t(locale, 'nav_world_lore') },
        { href: `/${locale}/world/locations`, label: t(locale, 'nav_world_locations') },
      ],
    },
  ]

  function switchLocale(newLocale: string) {
    const currentPath = router.asPath.replace(`/${locale}`, '')
    router.push(`/${newLocale}${currentPath}`)
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-brand-border"
      style={{ background: 'rgba(13,11,8,0.92)', backdropFilter: 'blur(12px)' }}>
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href={`/${locale}/`} className="flex items-center">
          <img src="/images/logo/logo.png" alt="Crimson Desert Hub" className="h-8 w-auto object-contain" style={{ filter: 'drop-shadow(0 0 8px rgba(200,169,110,0.3))' }} />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0">
          {navItems.map((item) => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.href)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 px-4 py-2 text-xs text-gray-400 hover:text-brand-primary transition-colors tracking-widest uppercase"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                {item.label}
                {item.children && (
                  <svg className="w-2.5 h-2.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </Link>
              {item.children && openDropdown === item.href && (
                <div className="absolute top-full left-0 mt-0 w-52 border border-brand-border shadow-2xl py-1"
                  style={{ background: 'rgba(13,11,8,0.97)' }}>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-5 py-2.5 text-xs text-gray-400 hover:text-brand-primary hover:bg-brand-card2 transition-colors tracking-wider uppercase"
                      style={{ fontFamily: 'Cinzel, serif' }}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right: locale switcher + buy button */}
        <div className="flex items-center gap-3">
          <select
            value={locale}
            onChange={(e) => switchLocale(e.target.value)}
            className="text-xs text-brand-muted rounded px-2 py-1 cursor-pointer border border-brand-border"
            style={{ background: 'transparent' }}
          >
            {locales.map((l) => (
              <option key={l} value={l} style={{ background: '#16130E' }}>{localeNames[l]}</option>
            ))}
          </select>

          <Link
            href={`/${locale}/buy`}
            className="hidden md:inline-flex btn-gold"
          >
            {t(locale, 'nav_buy')}
          </Link>

          <button
            className="md:hidden text-brand-muted hover:text-brand-primary transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-brand-border" style={{ background: 'rgba(13,11,8,0.97)' }}>
          {navItems.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                className="block px-5 py-3 text-xs text-gray-400 hover:text-brand-primary tracking-widest uppercase border-b border-brand-border/40"
                style={{ fontFamily: 'Cinzel, serif' }}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block px-10 py-2.5 text-xs text-gray-500 hover:text-brand-primary tracking-wider uppercase"
                  style={{ fontFamily: 'Cinzel, serif' }}
                  onClick={() => setMenuOpen(false)}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
          <Link
            href={`/${locale}/buy`}
            className="block px-5 py-3 text-xs text-brand-primary tracking-widest uppercase"
            style={{ fontFamily: 'Cinzel, serif' }}
            onClick={() => setMenuOpen(false)}
          >
            {t(locale, 'nav_buy')}
          </Link>
        </div>
      )}
    </nav>
  )
}

export default memo(Navbar)
