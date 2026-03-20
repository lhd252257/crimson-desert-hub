import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '@/components/Layout'
import { Locale, locales, t } from '@/lib/i18n'

const worldConfig: Record<string, { icon: string; titleKey: string }> = {
  map:       { icon: '🗺️', titleKey: 'nav_world_map' },
  lore:      { icon: '📖', titleKey: 'nav_world_lore' },
  locations: { icon: '📍', titleKey: 'nav_world_locations' },
}

// ── Lore data ─────────────────────────────────────────────────────────────────

const loreSections = [
  {
    title: 'A War-Torn World',
    titleZh: '战火蹂躏的世界',
    body: 'The continent of Pywel has been ravaged by endless conflict. Kingdoms rise and fall, mercenary bands carve out territory, and the common people suffer under the boots of whoever holds power. Into this chaos steps Kliff, son of the legendary Greymanes captain Martinus, carrying the weight of his father\'s legacy and the desperate hope of those who have nowhere else to turn.',
    bodyZh: 'Pywel大陆饱受无尽战乱的蹂躏。王国兴衰更迭，雇佣兵团割据一方，普通百姓在当权者的铁蹄下苦苦挣扎。在这片混乱中，传奇灰鬃队长Martinus之子Kliff踏上征途，肩负父亲的遗志，承载着走投无路之人最后的希望。',
  },
  {
    title: 'A Struggle of All for All',
    titleZh: '众人之争，为众人而战',
    body: 'No single faction holds dominion over Pywel. The Greymanes mercenary company, the noble houses of Demeniss, the tribal warriors of the eastern reaches, and the shadowy forces of the Abyss all vie for control. Alliances shift like sand. The only constant is that those with power seek more of it — and those without must fight or perish.',
    bodyZh: '没有任何一方势力能统治整个Pywel。灰鬃雇佣兵团、Demeniss的贵族世家、东部的部落战士，以及深渊的神秘势力，各方都在争夺控制权。联盟如流沙般变幻无常。唯一不变的是：有权者渴望更多权力，无权者则必须战斗，否则只有灭亡。',
  },
  {
    title: 'Mercenaries Wanted',
    titleZh: '雇佣兵招募令',
    body: 'The Greymanes are more than a fighting force — they are a family forged in blood and battle. Founded by Martinus, the company built its reputation on taking the jobs no one else would: protecting villages from monsters, escorting refugees through war zones, and standing against tyrants when no army would. Now, with Martinus gone and Kliff at the helm, the Greymanes must decide what they stand for in a world that has grown darker.',
    bodyZh: '灰鬃不仅仅是一支战斗力量——他们是一个在血与战火中锻造的家族。由Martinus创立，这支雇佣兵团以承接无人敢接的任务而声名远播：保护村庄免遭怪物侵袭，护送难民穿越战区，在无军队敢于抗争时挺身对抗暴君。如今，Martinus已逝，Kliff执掌帅印，灰鬃必须在这个愈发黑暗的世界中抉择自己的立场。',
  },
  {
    title: 'Tread Carefully',
    titleZh: '步步为营',
    body: 'Pywel hides dangers beyond mortal armies. The Abyss — a realm of shadow and corrupted power — bleeds into the world through cracks in reality called Abyss Nexuses. Creatures twisted by Abyss energy stalk the wilderness. And somewhere in the darkness, a force is deliberately widening those cracks. Kliff and the Greymanes are not just fighting a war. They are fighting to keep the world itself from being consumed.',
    bodyZh: 'Pywel隐藏着超越凡人军队的危险。深渊——一个充满阴影与腐化力量的领域——通过被称为深渊节点的现实裂缝渗入世界。被深渊能量扭曲的生物在荒野中游荡。而在黑暗的某处，一股力量正在刻意扩大这些裂缝。Kliff和灰鬃不仅仅是在打一场战争，他们是在阻止整个世界被吞噬。',
  },
]

const loreFactoids = [
  { en: 'Kliff is the son of Martinus, the legendary founder of the Greymanes mercenary company.', zh: 'Kliff是传奇灰鬃雇佣兵团创始人Martinus之子。' },
  { en: 'The King of Demeniss has fallen into a mysterious coma, creating a dangerous power vacuum across the continent.', zh: 'Demeniss国王陷入神秘昏迷，在大陆上造成了危险的权力真空。' },
  { en: 'Crimson Desert is set in the same universe as Black Desert Online, serving as a prequel to that game\'s events.', zh: '《深红沙漠》与《黑色沙漠Online》处于同一宇宙，是后者故事的前传。' },
  { en: 'The Abyss Nexuses are not natural phenomena — someone or something is deliberately opening them.', zh: '深渊节点并非自然现象——某人或某物正在刻意开启它们。' },
  { en: 'Pywel contains over 400 quests and 75 boss encounters across its seven regions.', zh: 'Pywel大陆七个地区共有400余个任务和75场BOSS战。' },
  { en: 'The game features 29 types of mounts, including horses, camels, and fantastical creatures.', zh: '游戏拥有29种坐骑，包括马匹、骆驼和奇幻生物。' },
]

// ── Locations data ────────────────────────────────────────────────────────────

type Region = {
  name: string
  nameZh: string
  desc: string
  descZh: string
  features: string[]
  featuresZh: string[]
}

const regions: Region[] = [
  {
    name: 'Hernand',
    nameZh: '赫尔南德',
    desc: 'The starting region of Crimson Desert. A fertile lowland territory marked by rolling hills, farming villages, and the remnants of old battlefields. Hernand is where Kliff and the Greymanes first establish their foothold, and where players learn the fundamentals of combat and exploration.',
    descZh: '《深红沙漠》的起始地区。这片肥沃的低地领土以连绵丘陵、农耕村庄和古战场遗迹为特色。赫尔南德是Kliff和灰鬃最初建立据点之处，也是玩家学习战斗和探索基础的地方。',
    features: ['Starting area', 'Farming villages', 'Tutorial quests', 'First Abyss Nexus'],
    featuresZh: ['起始区域', '农耕村庄', '新手任务', '第一个深渊节点'],
  },
  {
    name: 'Pailune',
    nameZh: '派卢恩',
    desc: 'A coastal region dominated by trade ports and fishing communities. Pailune is a hub of commerce and intrigue — merchants, smugglers, and naval factions all compete for control of its lucrative sea lanes. The region features dramatic cliffs, hidden sea caves, and the largest market in Pywel.',
    descZh: '以贸易港口和渔业社区为主的沿海地区。派卢恩是商业与阴谋的中心——商人、走私者和海军派系都在争夺其利润丰厚的海上航线。该地区拥有壮观的悬崖、隐秘的海洞，以及Pywel最大的集市。',
    features: ['Trade ports', 'Sea caves', 'Naval faction quests', 'Largest market in Pywel'],
    featuresZh: ['贸易港口', '海洞', '海军派系任务', 'Pywel最大集市'],
  },
  {
    name: 'Demeniss',
    nameZh: '德梅尼斯',
    desc: 'The political heart of Pywel. Home to the royal court and the great noble houses, Demeniss is a land of grand castles, political intrigue, and simmering civil war. With the king in a mysterious coma, the noble factions are tearing the region apart in their scramble for power.',
    descZh: 'Pywel的政治中心。德梅尼斯是王室宫廷和大贵族世家的所在地，这片土地上矗立着宏伟城堡，充斥着政治阴谋，内战一触即发。随着国王陷入神秘昏迷，贵族派系在争权夺利中将这片地区撕裂。',
    features: ['Royal capital', 'Noble faction quests', 'Castle sieges', 'King\'s coma storyline'],
    featuresZh: ['王都', '贵族派系任务', '攻城战', '国王昏迷主线'],
  },
  {
    name: 'Delesyia',
    nameZh: '德莱西亚',
    desc: 'A vast forested region home to ancient ruins and mysterious tribes. Delesyia is one of the most dangerous areas in Pywel — its dense canopy hides predators, Abyss-corrupted creatures, and the remnants of a civilization that vanished long before the current age.',
    descZh: '一片广袤的森林地区，遍布古代遗迹和神秘部落。德莱西亚是Pywel最危险的地区之一——茂密的林冠下隐藏着掠食者、被深渊腐化的生物，以及远早于当前时代便已消失的文明遗迹。',
    features: ['Ancient ruins', 'Tribal quests', 'Dense forest exploration', 'High-level enemies'],
    featuresZh: ['古代遗迹', '部落任务', '密林探索', '高等级敌人'],
  },
  {
    name: 'Akapen',
    nameZh: '阿卡彭',
    desc: 'A harsh desert and badlands region in the south. Akapen is sparsely populated but rich in rare minerals and Abyss energy. Bandit clans and mercenary groups fight over its resources, and the extreme environment makes survival itself a challenge.',
    descZh: '南部严酷的沙漠和荒地地区。阿卡彭人烟稀少，但富含稀有矿物和深渊能量。盗匪部落和雇佣兵团为争夺资源而厮杀，极端的环境使生存本身就是一大挑战。',
    features: ['Desert survival mechanics', 'Rare mineral mining', 'Bandit faction quests', 'Abyss energy deposits'],
    featuresZh: ['沙漠生存机制', '稀有矿物采集', '盗匪派系任务', '深渊能量矿脉'],
  },
  {
    name: 'Kweiden',
    nameZh: '奎登',
    desc: 'A mountainous northern region known for its harsh winters and fierce warrior clans. Kweiden\'s people are proud and independent, having resisted every attempt at conquest. The region holds some of the most powerful optional bosses in the game and rewards thorough exploration.',
    descZh: '以严酷冬季和凶猛战士部落著称的北部山地地区。奎登人民骄傲而独立，抵御了每一次征服企图。该地区拥有游戏中最强大的部分可选BOSS，并奖励彻底探索的玩家。',
    features: ['Mountain traversal', 'Warrior clan quests', 'Powerful optional bosses', 'Unique cold-weather gear'],
    featuresZh: ['山地穿越', '战士部落任务', '强力可选BOSS', '独特寒地装备'],
  },
  {
    name: 'Ulsrund',
    nameZh: '乌尔斯伦德',
    desc: 'The endgame region and the epicenter of Abyss activity in Pywel. Ulsrund is a blighted land where the boundary between the physical world and the Abyss has nearly collapsed. The most powerful enemies, the deepest dungeons, and the final chapters of the main story all converge here.',
    descZh: '游戏后期地区，也是Pywel深渊活动的震中。乌尔斯伦德是一片被诅咒的土地，物质世界与深渊之间的边界几近崩溃。最强大的敌人、最深邃的地下城，以及主线故事的最终章节都在此汇聚。',
    features: ['Endgame content', 'Abyss dungeons', 'Final story chapters', 'Highest-tier loot'],
    featuresZh: ['后期内容', '深渊地下城', '主线最终章', '最高级战利品'],
  },
]

// ── Lore page ─────────────────────────────────────────────────────────────────

function LorePage({ locale }: { locale: Locale }) {
  const isZh = locale === 'zh'
  return (
    <div className="container py-12 max-w-4xl">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-px flex-1 bg-brand-border" />
        <h1 className="text-xl tracking-[0.3em] uppercase text-brand-primary" style={{ fontFamily: 'Cinzel, serif' }}>
          {t(locale, 'nav_world_lore')}
        </h1>
        <div className="h-px flex-1 bg-brand-border" />
      </div>
      <p className="text-center text-brand-muted text-xs tracking-widest uppercase mb-12" style={{ fontFamily: 'Cinzel, serif' }}>
        {isZh ? 'Pywel大陆的历史、传说与深渊之谜' : 'The history, legends, and Abyss mysteries of Pywel'}
      </p>

      {/* Story sections */}
      <div className="space-y-6 mb-12">
        {loreSections.map((s) => (
          <div key={s.title} className="bg-brand-card border border-brand-border overflow-hidden">
            <div className="bg-black/30 border-b border-brand-border px-5 py-3">
              <span className="text-brand-primary text-xs font-bold tracking-widest uppercase" style={{ fontFamily: 'Cinzel, serif' }}>
                {isZh ? s.titleZh : s.title}
              </span>
            </div>
            <div className="px-5 py-4">
              <p className="text-gray-400 text-sm leading-relaxed">{isZh ? s.bodyZh : s.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lore factoids */}
      <div className="border border-brand-border p-6">
        <div className="text-brand-primary text-xs tracking-widest uppercase mb-4 font-bold" style={{ fontFamily: 'Cinzel, serif' }}>
          {isZh ? '世界观要点' : 'Key Lore Facts'}
        </div>
        <ul className="space-y-2">
          {loreFactoids.map((f, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
              <span className="text-brand-primary mt-0.5 shrink-0">▸</span>
              {isZh ? f.zh : f.en}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ── Locations page ────────────────────────────────────────────────────────────

function LocationsPage({ locale }: { locale: Locale }) {
  const isZh = locale === 'zh'
  return (
    <div className="container py-12">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-px flex-1 bg-brand-border" />
        <h1 className="text-xl tracking-[0.3em] uppercase text-brand-primary" style={{ fontFamily: 'Cinzel, serif' }}>
          {t(locale, 'nav_world_locations')}
        </h1>
        <div className="h-px flex-1 bg-brand-border" />
      </div>
      <p className="text-center text-brand-muted text-xs tracking-widest uppercase mb-12" style={{ fontFamily: 'Cinzel, serif' }}>
        {isZh ? 'Pywel大陆的七大地区' : 'Seven regions across the continent of Pywel'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {regions.map((r, i) => (
          <div key={r.name} className="bg-brand-card border border-brand-border overflow-hidden hover:border-brand-primary/50 transition-colors">
            <div className="flex items-center gap-3 bg-black/30 border-b border-brand-border px-5 py-3">
              <span className="text-brand-primary text-xs font-bold" style={{ fontFamily: 'Cinzel, serif' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-white font-bold" style={{ fontFamily: 'Cinzel, serif' }}>
                {isZh ? r.nameZh : r.name}
              </span>
              {isZh && <span className="text-brand-muted text-xs ml-1">{r.name}</span>}
            </div>
            <div className="p-5 space-y-3">
              <p className="text-gray-400 text-sm leading-relaxed">{isZh ? r.descZh : r.desc}</p>
              <div className="flex flex-wrap gap-2">
                {(isZh ? r.featuresZh : r.features).map((f) => (
                  <span key={f} className="text-xs bg-black/40 border border-brand-border px-2 py-1 text-brand-muted">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Page entry ────────────────────────────────────────────────────────────────

export default function WorldPage({ locale, slug }: { locale: Locale; slug: string }) {
  const cfg = worldConfig[slug]
  const title = cfg ? t(locale, cfg.titleKey) : slug

  if (slug === 'lore') {
    return (
      <Layout locale={locale} title={title}>
        <LorePage locale={locale} />
      </Layout>
    )
  }

  if (slug === 'locations') {
    return (
      <Layout locale={locale} title={title}>
        <LocationsPage locale={locale} />
      </Layout>
    )
  }

  return (
    <Layout locale={locale} title={title}>
      <div className="container py-12 max-w-4xl">
        <div className="text-5xl mb-4">{cfg?.icon}</div>
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-gray-400 text-lg">{t(locale, 'coming_soon')}</p>
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = Object.keys(worldConfig)
  return {
    paths: locales.flatMap((locale) => slugs.map((slug) => ({ params: { locale, slug } }))),
    fallback: false,
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: { locale: params?.locale as Locale, slug: params?.slug as string },
})
