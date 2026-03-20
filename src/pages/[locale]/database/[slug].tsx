import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '@/components/Layout'
import { Locale, locales, t } from '@/lib/i18n'

const dbConfig: Record<string, { icon: string; titleKey: string }> = {
  weapons:   { icon: '⚔️', titleKey: 'nav_db_weapons' },
  skills:    { icon: '✨', titleKey: 'nav_db_skills' },
  equipment: { icon: '🛡️', titleKey: 'nav_db_equipment' },
}

// ── Weapon data ──────────────────────────────────────────────────────────────

type WeaponRow = {
  name: string
  type: string
  atk: number
  def: number
  atkSpd: number
  movSpd: number
  crit: number
}

const weaponList: WeaponRow[] = [
  { name: 'Absolute Justice Greatsword', type: 'Two-Handed', atk: 20, def: 0, atkSpd: 0, movSpd: 0, crit: 0 },
  { name: 'Alfonso Spear',               type: 'Two-Handed', atk: 13, def: 0, atkSpd: 0, movSpd: 0, crit: 1 },
  { name: 'Ancient Woodpole',            type: 'Two-Handed', atk: 13, def: 0, atkSpd: 1, movSpd: 0, crit: 0 },
  { name: 'Arlem Warhammer',             type: 'Two-Handed', atk: 14, def: 0, atkSpd: 0, movSpd: 0, crit: 0 },
  { name: 'Balton Hammer',               type: 'One-Handed', atk: 10, def: 0, atkSpd: 0, movSpd: 0, crit: 1 },
  { name: 'Balton Longsword',            type: 'Two-Handed', atk: 14, def: 0, atkSpd: 0, movSpd: 0, crit: 0 },
  { name: 'Bamboo Spear',                type: 'Two-Handed', atk: 13, def: 0, atkSpd: 0, movSpd: 0, crit: 1 },
  { name: 'Bekker Bow',                  type: 'Ranged',     atk: 10, def: 0, atkSpd: 0, movSpd: 0, crit: 1 },
  { name: 'Bekker Dagger',               type: 'Dagger',     atk: 10, def: 0, atkSpd: 1, movSpd: 0, crit: 0 },
  { name: 'Bekker Greataxe',             type: 'Two-Handed', atk: 14, def: 0, atkSpd: 0, movSpd: 0, crit: 0 },
  { name: 'Bekker Greathammer',          type: 'Two-Handed', atk: 14, def: 0, atkSpd: 0, movSpd: 0, crit: 0 },
  { name: 'Bekker Halberd',              type: 'Two-Handed', atk: 13, def: 0, atkSpd: 1, movSpd: 0, crit: 0 },
  { name: 'Bekker Shield',               type: 'Shield',     atk:  0, def: 3, atkSpd: 1, movSpd: 1, crit: 0 },
  { name: 'Bekker Warhammer',            type: 'Two-Handed', atk: 13, def: 0, atkSpd: 0, movSpd: 0, crit: 1 },
  { name: 'Fan-Blade Greataxe',          type: 'Two-Handed', atk: 13, def: 0, atkSpd: 1, movSpd: 0, crit: 0 },
  { name: 'Freesword Halberd',           type: 'Two-Handed', atk: 14, def: 0, atkSpd: 0, movSpd: 0, crit: 0 },
  { name: 'Gilliam Axe',                 type: 'One-Handed', atk: 14, def: 0, atkSpd: 0, movSpd: 0, crit: 0 },
  { name: 'Glenmore Sword',              type: 'One-Handed', atk: 10, def: 0, atkSpd: 1, movSpd: 0, crit: 0 },
  { name: 'Grey Wolf Bow',               type: 'Ranged',     atk: 10, def: 0, atkSpd: 1, movSpd: 0, crit: 0 },
  { name: 'Grey Wolf Wooden Shield',     type: 'Shield',     atk:  0, def: 3, atkSpd: 0, movSpd: 2, crit: 0 },
  { name: 'Medium Staglord Banner Pike', type: 'Two-Handed', atk: 24, def: 0, atkSpd: 0, movSpd: 0, crit: 0 },
  { name: 'Mining Knuckledrill',         type: 'One-Handed', atk: 16, def: 0, atkSpd: 0, movSpd: 0, crit: 0 },
  { name: 'North Wind Trident',          type: 'Two-Handed', atk: 14, def: 0, atkSpd: 0, movSpd: 0, crit: 0 },
  { name: "Rhett's Longsword",           type: 'Two-Handed', atk: 13, def: 0, atkSpd: 1, movSpd: 0, crit: 0 },
  { name: 'Rhinard Cannon',              type: 'Ranged',     atk: 13, def: 0, atkSpd: 0, movSpd: 0, crit: 1 },
  { name: "Shaman's Staff",              type: 'Two-Handed', atk: 13, def: 0, atkSpd: 1, movSpd: 0, crit: 0 },
  { name: 'Shield of Betrayal',          type: 'Shield',     atk:  0, def: 6, atkSpd: 0, movSpd: 0, crit: 0 },
  { name: "Staglord's Shield",           type: 'Shield',     atk:  0, def: 6, atkSpd: 2, movSpd: 0, crit: 0 },
  { name: 'Sword of the Lord',           type: 'One-Handed', atk: 13, def: 0, atkSpd: 2, movSpd: 0, crit: 0 },
  { name: 'Sword of the Wolf',           type: 'One-Handed', atk: 12, def: 0, atkSpd: 0, movSpd: 0, crit: 0 },
  { name: 'Sydmon Round Shield',         type: 'Shield',     atk:  0, def: 5, atkSpd: 0, movSpd: 2, crit: 0 },
  { name: 'Tauria Curved Sword',         type: 'One-Handed', atk: 16, def: 0, atkSpd: 1, movSpd: 0, crit: 0 },
  { name: 'Tournament Spear',            type: 'Two-Handed', atk: 14, def: 0, atkSpd: 0, movSpd: 0, crit: 0 },
  { name: 'Warspike Spear',              type: 'Two-Handed', atk: 14, def: 0, atkSpd: 0, movSpd: 0, crit: 0 },
]

type CharWeapon = { name: string; type: string; desc: string }
type CharBlock  = { char: string; role: string; weapons: CharWeapon[] }

const charWeapons: CharBlock[] = [
  {
    char: 'Kliff', role: 'Greymane Captain',
    weapons: [
      { name: 'Sword & Shield', type: 'Melee',  desc: 'Balanced attack and block. Default setup with reliable speed and guard.' },
      { name: 'Spear',          type: 'Melee',  desc: 'Extended reach for keeping distance and controlling groups with sweeping attacks.' },
      { name: 'Fists',          type: 'Melee',  desc: 'Unarmed strikes for close-quarters grappling and combo interruption.' },
    ],
  },
  {
    char: 'Damiane', role: 'Swift Swordswoman',
    weapons: [
      { name: 'Greatsword',      type: 'Melee',   desc: 'Heavy two-handed weapon with wide cleaving arcs. Slow but hits entire groups at once.' },
      { name: 'Rapier',          type: 'Melee',   desc: "Fastest option. Rapid thrusts and parries, often paired with the pistol." },
      { name: 'Rifle',           type: 'Ranged',  desc: 'Long-range precision firearm for picking off targets before they close distance.' },
      { name: 'Pistol',          type: 'Ranged',  desc: 'Mid-range sidearm used alongside the Rapier in dual-wield combos.' },
      { name: 'Parasol Machine', type: 'Special', desc: 'Signature mechanical parasol enabling gliding, aerial attacks, and unique traversal.' },
    ],
  },
  {
    char: 'Oongka', role: 'Orc Brawler',
    weapons: [
      { name: 'Two-Handed Axe', type: 'Melee',  desc: "Primary weapon. Devastating cleave that breaks guard and shreds heavy armor." },
      { name: 'Hand Cannon',    type: 'Ranged', desc: 'Explosive close-to-mid range cannon. Massive blast radius for area denial.' },
    ],
  },
]

type WeaponType = { name: string; desc: string }

const weaponTypes: { category: string; types: WeaponType[] }[] = [
  {
    category: 'One-Handed',
    types: [
      { name: 'Swords',  desc: 'Fast attacks and good defense when paired with a shield, making them reliable in most fights.' },
      { name: 'Axes',    desc: 'Deliver slower but heavier hits than swords.' },
    ],
  },
  {
    category: 'Two-Handed',
    types: [
      { name: 'Spears',     desc: 'Long reach, allowing you to attack enemies from a safer distance.' },
      { name: 'Greataxes',  desc: 'Massive damage with wide swings that hit multiple enemies. Feature devastating grounded and jumping AoE attacks.' },
      { name: 'Greatswords', desc: 'Strong damage with wide attacks that knock back enemies far. Slower than swords and require careful timing.' },
    ],
  },
  {
    category: 'Ranged',
    types: [
      { name: 'Bows',         desc: 'Attack enemies from a safe distance with arrows.' },
      { name: 'Pistols',      desc: 'Fire quickly while staying nimble. Dodge between shots, unlike the stationary charged shots of rifles.' },
      { name: 'Rifles',       desc: 'High damage at long range with precise shots. Effective with both regular and charged shots.' },
      { name: 'Hand Cannons', desc: 'Fire powerful charged shots that deal heavy damage.' },
    ],
  },
]

const typeColor: Record<string, string> = {
  'One-Handed': 'text-amber-400',
  'Two-Handed': 'text-orange-400',
  'Ranged':     'text-sky-400',
  'Dagger':     'text-purple-400',
  'Shield':     'text-teal-400',
  'Special':    'text-pink-400',
  'Melee':      'text-amber-400',
}

// ── Weapons page ─────────────────────────────────────────────────────────────

function WeaponsPage({ locale }: { locale: Locale }) {
  const statBadge = (val: number, label: string) =>
    val !== 0 ? (
      <span className="text-brand-primary text-xs font-bold">+{val} {label}</span>
    ) : null

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="h-px flex-1 bg-brand-border" />
        <h1 className="text-xl tracking-[0.3em] uppercase text-brand-primary" style={{ fontFamily: 'Cinzel, serif' }}>
          {t(locale, 'nav_db_weapons')}
        </h1>
        <div className="h-px flex-1 bg-brand-border" />
      </div>
      <p className="text-center text-brand-muted text-xs tracking-widest uppercase mb-12" style={{ fontFamily: 'Cinzel, serif' }}>
        {locale === 'zh' ? 'Pywel 大陆的每一把武器 — 近战、远程与特殊武器' : 'Every blade, firearm, and exotic weapon in Pywel'}
      </p>

      {/* Weapon System Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {[
          {
            icon: '🔨',
            title: locale === 'zh' ? '精炼强化' : 'Refinement',
            desc: locale === 'zh'
              ? '前往铁匠铺，使用材料或重复武器精炼普通武器；独特武器需要专属材料。'
              : 'Visit a Blacksmith to refine weapons using gathered materials or duplicates. Unique weapons require specific materials.',
          },
          {
            icon: '💎',
            title: locale === 'zh' ? '深渊装备' : 'Abyss Gear',
            desc: locale === 'zh'
              ? '为武器嵌入深渊装备，获得强力词条。需找到女巫 Elowen 来装备或更换。'
              : 'Slot in Abyss Gear for powerful modifiers. Visit Elowen the Witch to equip or change your loadout.',
          },
          {
            icon: '📦',
            title: locale === 'zh' ? '获取途径' : 'How to Obtain',
            desc: locale === 'zh'
              ? '普通武器可从装备商店购买或在野外拾取；独特武器通过击败BOSS或完成任务获得。'
              : 'Regular weapons from Equipment Shops or loot. Unique weapons earned by defeating bosses or completing quests.',
          },
        ].map((item) => (
          <div key={item.title} className="bg-brand-card border border-brand-border p-5">
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="text-brand-primary text-xs tracking-widest uppercase mb-2" style={{ fontFamily: 'Cinzel, serif' }}>{item.title}</div>
            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Weapon Types */}
      <div className="mb-12">
        <h2 className="text-lg font-bold tracking-widest uppercase text-brand-primary mb-6" style={{ fontFamily: 'Cinzel, serif' }}>
          {locale === 'zh' ? '武器类型' : 'Weapon Types'}
        </h2>
        <div className="space-y-6">
          {weaponTypes.map((cat) => (
            <div key={cat.category} className="bg-brand-card border border-brand-border overflow-hidden">
              <div className="bg-black/30 border-b border-brand-border px-5 py-3">
                <span className="text-brand-primary text-xs font-bold tracking-widest uppercase" style={{ fontFamily: 'Cinzel, serif' }}>
                  {cat.category}
                </span>
              </div>
              <div className="divide-y divide-brand-border/30">
                {cat.types.map((wt) => (
                  <div key={wt.name} className="flex gap-4 px-5 py-3 hover:bg-white/[0.02] transition-colors">
                    <span className="text-white font-bold text-sm w-32 shrink-0">{wt.name}</span>
                    <span className="text-gray-400 text-sm leading-relaxed">{wt.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weapons by Character */}
      <div className="mb-12">
        <h2 className="text-lg font-bold tracking-widest uppercase text-brand-primary mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
          {locale === 'zh' ? '角色专属武器' : 'Weapons by Character'}
        </h2>
        <p className="text-gray-500 text-xs mb-6">
          {locale === 'zh' ? '基于官方发布前公开的实机演示内容' : 'Based on official pre-launch gameplay reveals'}
        </p>
        <div className="space-y-4">
          {charWeapons.map((block) => (
            <div key={block.char} className="bg-brand-card border border-brand-border overflow-hidden">
              <div className="flex items-center gap-3 bg-black/30 border-b border-brand-border px-5 py-3">
                <span className="text-white font-bold">{block.char}</span>
                <span className="text-brand-muted text-xs tracking-widest uppercase">{block.role}</span>
              </div>
              <div className="divide-y divide-brand-border/30">
                {block.weapons.map((w) => (
                  <div key={w.name} className="grid grid-cols-[160px_80px_1fr] gap-4 px-5 py-3 hover:bg-white/[0.02] transition-colors items-start">
                    <span className="text-white font-bold text-sm">{w.name}</span>
                    <span className={`text-xs font-bold tracking-wide uppercase ${typeColor[w.type] ?? 'text-gray-400'}`}>{w.type}</span>
                    <span className="text-gray-400 text-sm leading-relaxed">{w.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Weapon List */}
      <div>
        <h2 className="text-lg font-bold tracking-widest uppercase text-brand-primary mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
          {locale === 'zh' ? '武器完整列表' : 'All Weapons'}
        </h2>
        <p className="text-gray-500 text-xs mb-6">
          {locale === 'zh' ? '数据来源：Game8 武器数据库（2026年3月19日）' : 'Source: Game8 Weapons Database (March 19, 2026)'}
        </p>
        <div className="bg-brand-card border border-brand-border overflow-hidden">
          {/* Table header */}
          <div className="hidden md:grid grid-cols-[1fr_120px_60px_60px_80px_80px_60px] gap-3 px-5 py-3 bg-black/30 border-b border-brand-border text-brand-muted text-xs font-bold tracking-widest uppercase">
            <span>{locale === 'zh' ? '武器名称' : 'Weapon'}</span>
            <span>{locale === 'zh' ? '类型' : 'Type'}</span>
            <span className="text-center">ATK</span>
            <span className="text-center">DEF</span>
            <span className="text-center">ATK SPD</span>
            <span className="text-center">MOV SPD</span>
            <span className="text-center">CRIT</span>
          </div>
          <div className="divide-y divide-brand-border/20">
            {weaponList.map((w) => (
              <div
                key={w.name}
                className="grid grid-cols-1 md:grid-cols-[1fr_120px_60px_60px_80px_80px_60px] gap-1 md:gap-3 px-5 py-3 hover:bg-white/[0.02] transition-colors items-center"
              >
                <span className="text-white font-bold text-sm">{w.name}</span>
                <span className={`text-xs font-bold tracking-wide uppercase ${typeColor[w.type] ?? 'text-gray-400'}`}>{w.type}</span>
                <span className="text-center text-sm text-gray-300">{w.atk > 0 ? w.atk : '—'}</span>
                <span className="text-center text-sm text-gray-300">{w.def > 0 ? w.def : '—'}</span>
                <span className="text-center text-sm text-gray-300">{w.atkSpd > 0 ? `+${w.atkSpd}` : '—'}</span>
                <span className="text-center text-sm text-gray-300">{w.movSpd > 0 ? `+${w.movSpd}` : '—'}</span>
                <span className="text-center text-sm text-gray-300">{w.crit > 0 ? `+${w.crit}` : '—'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Generic coming-soon page ──────────────────────────────────────────────────

function ComingSoonPage({ locale, slug }: { locale: Locale; slug: string }) {
  const cfg = dbConfig[slug]
  const title = cfg ? t(locale, cfg.titleKey) : slug
  return (
    <div className="container py-12 max-w-4xl">
      <div className="text-5xl mb-4">{cfg?.icon}</div>
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-gray-400 text-lg">{t(locale, 'coming_soon')}</p>
    </div>
  )
}

// ── Page entry ────────────────────────────────────────────────────────────────

export default function DatabasePage({ locale, slug }: { locale: Locale; slug: string }) {
  const cfg = dbConfig[slug]
  const title = cfg ? t(locale, cfg.titleKey) : slug
  return (
    <Layout locale={locale} title={title}>
      {slug === 'weapons' ? (
        <WeaponsPage locale={locale} />
      ) : (
        <ComingSoonPage locale={locale} slug={slug} />
      )}
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = Object.keys(dbConfig)
  return {
    paths: locales.flatMap((locale) => slugs.map((slug) => ({ params: { locale, slug } }))),
    fallback: false,
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: { locale: params?.locale as Locale, slug: params?.slug as string },
})
