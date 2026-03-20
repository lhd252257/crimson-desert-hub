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

type CharWeapon = { name: string; nameZh: string; type: string; desc: string; descZh: string }
type CharBlock  = { char: string; role: string; roleZh: string; weapons: CharWeapon[] }

const charWeapons: CharBlock[] = [
  {
    char: 'Kliff', role: 'Greymane Captain', roleZh: '灰鬃队长',
    weapons: [
      { name: 'Sword & Shield', nameZh: '剑与盾', type: 'Melee',  desc: 'Balanced attack and block. Default setup with reliable speed and guard.', descZh: '攻守均衡。默认配置，速度和防御都很可靠。' },
      { name: 'Spear',          nameZh: '长矛',   type: 'Melee',  desc: 'Extended reach for keeping distance and controlling groups with sweeping attacks.', descZh: '攻击距离长，可保持距离并用横扫攻击控制人群。' },
      { name: 'Fists',          nameZh: '拳击',   type: 'Melee',  desc: 'Unarmed strikes for close-quarters grappling and combo interruption.', descZh: '徒手近身格斗，适合擒拿和打断连击。' },
    ],
  },
  {
    char: 'Damiane', role: 'Swift Swordswoman', roleZh: '迅捷剑客',
    weapons: [
      { name: 'Greatsword',      nameZh: '巨剑',     type: 'Melee',   desc: 'Heavy two-handed weapon with wide cleaving arcs. Slow but hits entire groups at once.', descZh: '沉重的双手武器，宽幅劈砍弧度大。速度慢但可同时命中整个群体。' },
      { name: 'Rapier',          nameZh: '细剑',     type: 'Melee',   desc: 'Fastest option. Rapid thrusts and parries, often paired with the pistol.', descZh: '最快的选项。快速突刺和格挡，常与手枪配合使用。' },
      { name: 'Rifle',           nameZh: '步枪',     type: 'Ranged',  desc: 'Long-range precision firearm for picking off targets before they close distance.', descZh: '远程精准火器，在敌人靠近前消灭目标。' },
      { name: 'Pistol',          nameZh: '手枪',     type: 'Ranged',  desc: 'Mid-range sidearm used alongside the Rapier in dual-wield combos.', descZh: '中距离副武器，与细剑配合进行双持连击。' },
      { name: 'Parasol Machine', nameZh: '机械伞',   type: 'Special', desc: 'Signature mechanical parasol enabling gliding, aerial attacks, and unique traversal.', descZh: '标志性机械伞，可滑翔、空中攻击和独特穿越。' },
    ],
  },
  {
    char: 'Oongka', role: 'Orc Brawler', roleZh: '兽人斗士',
    weapons: [
      { name: 'Two-Handed Axe', nameZh: '双手巨斧', type: 'Melee',  desc: 'Primary weapon. Devastating cleave that breaks guard and shreds heavy armor.', descZh: '主武器。毁灭性劈砍，可破防并撕碎重甲。' },
      { name: 'Hand Cannon',    nameZh: '手炮',     type: 'Ranged', desc: 'Explosive close-to-mid range cannon. Massive blast radius for area denial.', descZh: '爆炸性近中距离火炮。巨大爆炸半径用于区域封锁。' },
    ],
  },
]

type WeaponType = { name: string; nameZh: string; desc: string; descZh: string }

const weaponTypes: { category: string; categoryZh: string; types: WeaponType[] }[] = [
  {
    category: 'One-Handed',
    categoryZh: '单手武器',
    types: [
      { name: 'Swords',  nameZh: '剑', desc: 'Fast attacks and good defense when paired with a shield, making them reliable in most fights.', descZh: '攻击速度快，配合盾牌防御出色，在大多数战斗中表现稳定可靠。' },
      { name: 'Axes',    nameZh: '斧', desc: 'Deliver slower but heavier hits than swords.', descZh: '攻击速度比剑慢，但每击伤害更重。' },
    ],
  },
  {
    category: 'Two-Handed',
    categoryZh: '双手武器',
    types: [
      { name: 'Spears',      nameZh: '长矛', desc: 'Long reach, allowing you to attack enemies from a safer distance.', descZh: '攻击距离长，可以在更安全的距离攻击敌人。' },
      { name: 'Greataxes',   nameZh: '巨斧', desc: 'Massive damage with wide swings that hit multiple enemies. Feature devastating grounded and jumping AoE attacks.', descZh: '宽幅横扫造成巨大伤害，可同时命中多个敌人。拥有强力的地面和跳跃范围攻击。' },
      { name: 'Greatswords', nameZh: '巨剑', desc: 'Strong damage with wide attacks that knock back enemies far. Slower than swords and require careful timing.', descZh: '宽幅攻击造成强力伤害，可将敌人击飞很远。比剑慢，需要精准把握时机。' },
    ],
  },
  {
    category: 'Ranged',
    categoryZh: '远程武器',
    types: [
      { name: 'Bows',         nameZh: '弓', desc: 'Attack enemies from a safe distance with arrows.', descZh: '用箭矢从安全距离攻击敌人。' },
      { name: 'Pistols',      nameZh: '手枪', desc: 'Fire quickly while staying nimble. Dodge between shots, unlike the stationary charged shots of rifles.', descZh: '射击快速且保持灵活。可在射击间隙闪避，不像步枪需要站立蓄力。' },
      { name: 'Rifles',       nameZh: '步枪', desc: 'High damage at long range with precise shots. Effective with both regular and charged shots.', descZh: '远距离精准射击造成高伤害。普通射击和蓄力射击均有效。' },
      { name: 'Hand Cannons', nameZh: '手炮', desc: 'Fire powerful charged shots that deal heavy damage.', descZh: '发射强力蓄力弹，造成重击伤害。' },
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
  const isZh = locale === 'zh'

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
                  {isZh ? cat.categoryZh : cat.category}
                </span>
              </div>
              <div className="divide-y divide-brand-border/30">
                {cat.types.map((wt) => (
                  <div key={wt.name} className="flex gap-4 px-5 py-3 hover:bg-white/[0.02] transition-colors">
                    <span className="text-white font-bold text-sm w-32 shrink-0">{isZh ? wt.nameZh : wt.name}</span>
                    <span className="text-gray-400 text-sm leading-relaxed">{isZh ? wt.descZh : wt.desc}</span>
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
                <span className="text-brand-muted text-xs tracking-widest uppercase">{isZh ? block.roleZh : block.role}</span>
              </div>
              <div className="divide-y divide-brand-border/30">
                {block.weapons.map((w) => (
                  <div key={w.name} className="grid grid-cols-[160px_80px_1fr] gap-4 px-5 py-3 hover:bg-white/[0.02] transition-colors items-start">
                    <span className="text-white font-bold text-sm">{isZh ? w.nameZh : w.name}</span>
                    <span className={`text-xs font-bold tracking-wide uppercase ${typeColor[w.type] ?? 'text-gray-400'}`}>{w.type}</span>
                    <span className="text-gray-400 text-sm leading-relaxed">{isZh ? w.descZh : w.desc}</span>
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

// ── Skills data ───────────────────────────────────────────────────────────────

type SkillNode = { name: string; nameZh: string; desc: string; descZh: string; recommended?: boolean }
type SkillCategory = { category: string; categoryZh: string; skills: SkillNode[] }

const skillTree: SkillCategory[] = [
  {
    category: 'Survival',
    categoryZh: '生存',
    skills: [
      { name: 'Max Health +1', nameZh: '最大生命值 +1', desc: 'Increases your maximum HP. Take this multiple times — survivability is the most important early investment.', descZh: '提升最大生命值。可多次获取——生存能力是前期最重要的投资。', recommended: true },
      { name: 'Max Health +2', nameZh: '最大生命值 +2', desc: 'Further increases maximum HP. Recommended before tackling Chapter 2 bosses.', descZh: '进一步提升最大生命值。建议在挑战第二章BOSS前获取。', recommended: true },
      { name: 'Max Stamina +1', nameZh: '最大体力 +1', desc: 'Increases your stamina pool, allowing more dodges and sprints before exhaustion.', descZh: '提升体力上限，允许在耗尽前进行更多闪避和冲刺。', recommended: true },
      { name: 'Max Stamina +2', nameZh: '最大体力 +2', desc: 'Further increases stamina. Essential for aggressive combat styles.', descZh: '进一步提升体力。对进攻型战斗风格至关重要。' },
      { name: 'Stamina Recovery Up', nameZh: '体力恢复提升', desc: 'Increases the rate at which stamina regenerates when not in use.', descZh: '提升不使用时体力的恢复速度。' },
    ],
  },
  {
    category: 'Mobility',
    categoryZh: '机动',
    skills: [
      { name: 'Double Jump', nameZh: '二段跳', desc: 'Press jump again while airborne to perform a second jump. Opens up vertical exploration and aerial combat options.', descZh: '在空中再次按跳跃键执行二段跳。开启垂直探索和空中战斗选项。', recommended: true },
      { name: 'Sprint Speed Up', nameZh: '冲刺速度提升', desc: 'Increases movement speed while sprinting.', descZh: '提升冲刺时的移动速度。' },
      { name: 'Dodge Distance Up', nameZh: '闪避距离提升', desc: 'Increases the distance covered by each dodge roll.', descZh: '提升每次翻滚闪避的距离。' },
      { name: 'Aerial Attack', nameZh: '空中攻击', desc: 'Unlocks the ability to perform attacks while airborne. Pairs well with Double Jump.', descZh: '解锁在空中执行攻击的能力。与二段跳配合效果极佳。' },
    ],
  },
  {
    category: 'Combat',
    categoryZh: '战斗',
    skills: [
      { name: 'Axiom Force Lv.1', nameZh: '公理之力 Lv.1', desc: 'Unlocks the Axiom Force ability — a powerful energy burst that deals AoE damage. Core combat skill.', descZh: '解锁公理之力技能——一次强力能量爆发，造成范围伤害。核心战斗技能。', recommended: true },
      { name: 'Axiom Force Lv.2', nameZh: '公理之力 Lv.2', desc: 'Upgrades Axiom Force, increasing damage and expanding the AoE radius.', descZh: '升级公理之力，提升伤害并扩大范围半径。', recommended: true },
      { name: 'Axiom Force Lv.3', nameZh: '公理之力 Lv.3', desc: 'Further upgrades Axiom Force. At this level it can stagger even large enemies.', descZh: '进一步升级公理之力。此等级可硬直大型敌人。' },
      { name: 'Counter Damage Up', nameZh: '反击伤害提升', desc: 'Increases the bonus damage dealt by Counter Attacks after a Timed Guard or Perfect Dodge.', descZh: '提升时机格挡或完美闪避后反击造成的额外伤害。' },
      { name: 'Grapple Damage Up', nameZh: '擒拿伤害提升', desc: 'Increases damage dealt by Grapple throws and slams.', descZh: '提升擒拿投技和摔击造成的伤害。' },
      { name: 'Heavy Attack Charge Speed', nameZh: '重攻击蓄力速度', desc: 'Reduces the time required to fully charge a Heavy Attack.', descZh: '减少重攻击完全蓄力所需时间。' },
    ],
  },
  {
    category: 'Ally',
    categoryZh: '同伴',
    skills: [
      { name: 'Ally Skill Cooldown Down', nameZh: '同伴技能冷却缩减', desc: 'Reduces the cooldown of all Ally Skills, letting you call on your companions more frequently.', descZh: '减少所有同伴技能的冷却时间，让你更频繁地召唤同伴。' },
      { name: 'Ally Skill Damage Up', nameZh: '同伴技能伤害提升', desc: 'Increases the damage dealt by Ally Skills.', descZh: '提升同伴技能造成的伤害。' },
      { name: 'Damiane: Parasol Glide', nameZh: 'Damiane：伞式滑翔', desc: 'Unlocks Damiane\'s Parasol Machine gliding ability for aerial traversal across Pywel.', descZh: '解锁Damiane的机械伞滑翔能力，可在Pywel大陆进行空中穿越。', recommended: true },
    ],
  },
  {
    category: 'Utility',
    categoryZh: '实用',
    skills: [
      { name: 'Inventory Slots +5', nameZh: '背包格子 +5', desc: 'Adds 5 additional inventory slots. There is no weight limit, so more slots means more loot.', descZh: '增加5个背包格子。没有重量限制，格子越多意味着可以携带更多战利品。' },
      { name: 'Inventory Slots +10', nameZh: '背包格子 +10', desc: 'Adds 10 additional inventory slots.', descZh: '增加10个背包格子。' },
      { name: 'Cooking Speed Up', nameZh: '烹饪速度提升', desc: 'Reduces the time required to cook food at camp.', descZh: '减少在营地烹饪食物所需时间。' },
      { name: 'Mount Stamina Up', nameZh: '坐骑体力提升', desc: 'Increases your mount\'s stamina pool for longer rides and mounted combat.', descZh: '提升坐骑体力上限，支持更长时间的骑行和骑乘战斗。' },
      { name: 'Reputation Gain Up', nameZh: '声望获取提升', desc: 'Increases reputation earned from quests and NPC interactions.', descZh: '提升从任务和NPC互动中获得的声望值。' },
    ],
  },
]

const skillPriorityTips = [
  { en: 'Max Health and Max Stamina first — survivability beats everything else early on.', zh: '优先升级最大生命值和最大体力——前期生存能力胜过一切。' },
  { en: 'Double Jump is the single best mobility upgrade — get it as soon as possible.', zh: '二段跳是最佳机动升级——尽快获取。' },
  { en: 'Axiom Force Lv.1 and Lv.2 are must-haves before Chapter 3.', zh: '公理之力1级和2级是第三章前的必备技能。' },
  { en: 'Damiane\'s Parasol Glide unlocks aerial traversal — essential for sky island exploration.', zh: 'Damiane的伞式滑翔解锁空中穿越——对天空岛屿探索至关重要。' },
  { en: 'There are no prerequisites — you can unlock any skill in any order.', zh: '没有前置条件——可以按任意顺序解锁技能。' },
  { en: 'Skill points come from leveling up, completing Challenges, and finding Mysterious Energies.', zh: '技能点来自升级、完成挑战和发现神秘能量。' },
]

// ── Skills page ───────────────────────────────────────────────────────────────

function SkillsPage({ locale }: { locale: Locale }) {
  const isZh = locale === 'zh'
  return (
    <div className="container py-12">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-px flex-1 bg-brand-border" />
        <h1 className="text-xl tracking-[0.3em] uppercase text-brand-primary" style={{ fontFamily: 'Cinzel, serif' }}>
          {t(locale, 'nav_db_skills')}
        </h1>
        <div className="h-px flex-1 bg-brand-border" />
      </div>
      <p className="text-center text-brand-muted text-xs tracking-widest uppercase mb-12" style={{ fontFamily: 'Cinzel, serif' }}>
        {isZh ? 'Kliff的完整技能树 — 无前置条件，自由解锁' : 'Full skill tree for Kliff — no prerequisites, unlock in any order'}
      </p>

      {/* Priority tips */}
      <div className="bg-brand-card border border-brand-border p-6 mb-10">
        <div className="text-brand-primary text-xs tracking-widest uppercase mb-4 font-bold" style={{ fontFamily: 'Cinzel, serif' }}>
          {isZh ? '推荐优先级' : 'Recommended Priority'}
        </div>
        <ul className="space-y-2">
          {skillPriorityTips.map((tip, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
              <span className="text-brand-primary font-bold shrink-0">{i + 1}.</span>
              {isZh ? tip.zh : tip.en}
            </li>
          ))}
        </ul>
      </div>

      {/* Skill tree by category */}
      <div className="space-y-6">
        {skillTree.map((cat) => (
          <div key={cat.category} className="bg-brand-card border border-brand-border overflow-hidden">
            <div className="bg-black/30 border-b border-brand-border px-5 py-3">
              <span className="text-brand-primary text-xs font-bold tracking-widest uppercase" style={{ fontFamily: 'Cinzel, serif' }}>
                {isZh ? cat.categoryZh : cat.category}
              </span>
            </div>
            <div className="divide-y divide-brand-border/30">
              {cat.skills.map((skill) => (
                <div key={skill.name} className="flex gap-4 px-5 py-3 hover:bg-white/[0.02] transition-colors items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-bold text-sm">{isZh ? skill.nameZh : skill.name}</span>
                      {skill.recommended && (
                        <span className="text-xs bg-brand-primary/20 text-brand-primary border border-brand-primary/30 px-2 py-0.5">
                          {isZh ? '推荐' : 'Recommended'}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{isZh ? skill.descZh : skill.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
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
      ) : slug === 'skills' ? (
        <SkillsPage locale={locale} />
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
