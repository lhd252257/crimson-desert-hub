import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '@/components/Layout'
import { Locale, locales, t } from '@/lib/i18n'

const guideConfig: Record<string, { icon: string; titleKey: string }> = {
  beginner:    { icon: '🗡️', titleKey: 'nav_guides_beginner' },
  combat:      { icon: '⚔️', titleKey: 'nav_guides_combat' },
  boss:        { icon: '💀', titleKey: 'nav_guides_boss' },
  walkthrough: { icon: '📜', titleKey: 'nav_guides_walkthrough' },
}

// ── Beginner tips data ────────────────────────────────────────────────────────

type Tip = { title: string; body: string }

const beginnerTips: Tip[] = [
  {
    title: 'Use Focus to Lock On',
    body: 'Hold LB (or the equivalent on your platform) to lock onto a target. This keeps the camera fixed on enemies during combat, making it much easier to land attacks and dodge.',
  },
  {
    title: 'Manage Your Inventory Early',
    body: 'Complete quests to expand your inventory slots. There is no weight limit, so focus on unlocking more slots. Sell or store items you don\'t need to keep things organized.',
  },
  {
    title: 'Stealing Requires a Mask',
    body: 'You must equip a mask before stealing from NPCs. If you get caught, greet NPCs to restore your reputation — ignoring them will make things worse.',
  },
  {
    title: 'Fast Travel via Abyss Nexus',
    body: 'Look for "Mysterious Energy" question mark icons on the map to find Abyss Nexus points. Activating them unlocks fast travel nodes across Pywel.',
  },
  {
    title: 'Aerial Travel from Sky Islands',
    body: 'You can glide from sky islands using Damiane\'s Parasol Machine. Hovering doesn\'t drain stamina — only moving does. Spread your wings just before landing to avoid fall damage.',
  },
  {
    title: 'Skill Tree Has No Prerequisites',
    body: 'You can unlock skills in any order — there are no strict prerequisites. Prioritize Health and Stamina upgrades first, then grab Double Jump and Axiom Force (levels 2–3) early.',
  },
  {
    title: 'Explore Before Progressing the Story',
    body: 'The world is packed with side content. Explore regions thoroughly before advancing the main quest — you\'ll find better gear, skill points, and faction quests that make boss fights easier.',
  },
  {
    title: 'Upgrade Your Gear Regularly',
    body: 'Visit Blacksmiths to refine your weapons and armor. Aim for Refinement Level 4+ before tackling major bosses. Higher refinement makes a significant difference in damage output.',
  },
  {
    title: 'Cook and Carry Food',
    body: 'Cooked meat and food items restore health and grant buffs. Always carry at least 100 pieces of roasted meat. You can eat while attacking, so there\'s no reason not to heal mid-fight.',
  },
  {
    title: 'Learn to Perfect Dodge',
    body: 'Dodging at the exact moment an attack lands triggers a Perfect Dodge, slowing time briefly and opening a window for a powerful counter. Practice this against weaker enemies first.',
  },
  {
    title: 'Parrying Staggers Enemies',
    body: 'Blocking at the right moment parries an attack and staggers the enemy. Parrying is especially effective against human enemies and opens them up for a follow-up combo.',
  },
  {
    title: 'Switch Characters for Different Situations',
    body: 'Each playable character has unique strengths. Kliff excels at balanced melee, Damiane is fast and versatile with ranged options, and Oongka deals massive AoE damage. Swap based on the encounter.',
  },
  {
    title: 'Equip Abyss Cores for Powerful Modifiers',
    body: 'Abyss Cores slot into your weapons and grant powerful passive effects. Find Elowen the Witch as you progress through the story to equip and swap your Abyss Gear loadout.',
  },
  {
    title: 'Use the Camp System',
    body: 'Setting up camp lets you rest, cook, and manage your party. Resting at camp restores health and stamina fully. Use it between tough encounters instead of burning through consumables.',
  },
  {
    title: 'Reputation Matters',
    body: 'Your reputation with factions affects quest availability and NPC interactions. Avoid unnecessary crimes in settlements, and complete faction quests to build standing with key groups.',
  },
  {
    title: 'Check the Challenges Menu',
    body: 'The Challenges menu tracks combat mastery tasks that reward skill points and gear. Complete them alongside normal play — many unlock naturally as you fight different enemy types.',
  },
  {
    title: 'Horses Need Care Too',
    body: 'Your horse can be injured in combat. Carry horse medicine and heal it regularly. A healthy horse is faster and more responsive, which matters a lot during mounted combat.',
  },
  {
    title: 'Wanted System — Stay Aware',
    body: 'Committing crimes raises your Wanted level. Guards will attack on sight at high levels. Either pay off your bounty at a settlement or lay low until it clears.',
  },
  {
    title: 'Mysterious Energies Unlock Bonuses',
    body: 'Collecting Mysterious Energies (the question mark icons) does more than unlock fast travel — they also reveal hidden areas and grant passive bonuses. Prioritize them when exploring new regions.',
  },
  {
    title: 'Don\'t Ignore Faction Quests',
    body: 'Faction quests (side quests tied to groups in Pywel) give unique rewards, lore, and sometimes unlock new characters or abilities. They\'re worth doing before finishing each chapter.',
  },
  {
    title: 'Stamina Management in Combat',
    body: 'Sprinting, dodging, and some attacks consume stamina. Don\'t spam dodge rolls — you\'ll be left vulnerable. Upgrade stamina early and learn enemy attack patterns to dodge only when needed.',
  },
  {
    title: 'Loot Everything',
    body: 'Enemies, chests, and the environment drop crafting materials, weapons, and consumables. With no weight limit, there\'s no reason to leave loot behind. Sell duplicates to Blacksmiths for coin.',
  },
  {
    title: 'Save Unique Weapons',
    body: 'Unique weapons dropped by bosses have powerful built-in modifiers and cannot be upgraded with duplicates. Keep them — they\'re often best-in-slot for specific builds even late in the game.',
  },
  {
    title: 'Use the Environment',
    body: 'Pywel\'s world is interactive. Knock enemies off ledges, use explosive barrels, and take high ground for ranged advantage. Environmental kills count toward challenges too.',
  },
  {
    title: 'Talk to Everyone',
    body: 'NPCs often give hints about hidden quests, treasure locations, and lore. Some side quests only trigger after speaking to specific characters. Don\'t rush past settlements.',
  },
]

// ── Boss data ─────────────────────────────────────────────────────────────────

type Boss = {
  name: string
  type: 'main' | 'optional'
  chapter?: string
  location: string
  reward: string
  strategy: string
}

const bossList: Boss[] = [
  {
    name: 'Matthias',
    type: 'main',
    chapter: 'Chapter 1',
    location: 'The First Encounter',
    reward: 'Sword of the Lord (unique weapon)',
    strategy: 'An aggressive human fighter. Watch for his two-hit combo followed by a grab — dodge sideways on the grab. Parrying his sword strikes staggers him and opens a punish window. Keep your shield up during his charge attack.',
  },
  {
    name: 'Kailok the Hornsplitter',
    type: 'main',
    chapter: 'Chapter 2',
    location: 'Golden Greed',
    reward: 'Kailok\'s Horn (crafting material), skill points',
    strategy: 'A large beast with sweeping horn attacks. Stay to his side — his frontal charge covers a lot of ground. When he rears up, roll backward to avoid the slam. His horns glow red before an unblockable attack; dodge immediately.',
  },
  {
    name: 'Reed Devil',
    type: 'main',
    chapter: 'Chapter 3',
    location: 'Howling Hill',
    reward: 'Reed Devil\'s Mask (unique equipment), coins',
    strategy: 'Fast and evasive. Uses poison attacks — bring antidotes or poison-resist gear. He teleports short distances; don\'t chase, wait for him to reappear and punish. His scythe spin is telegraphed by a green glow — back off.',
  },
  {
    name: 'Tenebrum',
    type: 'main',
    chapter: 'Chapter 4',
    location: 'The Price of Knowledge',
    reward: 'Tenebrum Core (Abyss Gear material)',
    strategy: 'A shadow-type boss that splits into copies. Attack the copy with the glowing core — the others deal no damage but can still stagger you. When the arena goes dark, stop moving and listen for audio cues before his lunge.',
  },
  {
    name: 'Kearush the Slayer',
    type: 'main',
    chapter: 'Chapter 5',
    location: 'Guest Unbidden',
    reward: 'Kearush\'s Blade (unique weapon), large coin reward',
    strategy: 'A heavily armored knight. His attacks are slow but hit hard — one wrong dodge and you\'re dead. Use Spear or Greatsword for poke damage. When his armor cracks (around 50% HP), he speeds up significantly. Save your healing items for phase two.',
  },
  {
    name: 'Crowcaller',
    type: 'main',
    chapter: 'Chapter 6',
    location: 'Cracks in the Shield',
    reward: 'Crowcaller\'s Feather (unique accessory)',
    strategy: 'A flying boss that summons crow minions. Use ranged weapons (Rifle or Bow) to deal damage while he\'s airborne. Kill minions quickly — they stack a debuff that reduces your damage. He lands when below 40% HP; switch to melee for the finish.',
  },
  {
    name: 'Cassius Morten',
    type: 'main',
    chapter: 'Chapter 6',
    location: 'Cracks in the Shield',
    reward: 'Cassius\'s Signet (story reward), major skill point cache',
    strategy: 'The chapter\'s final boss. Two phases: first as a swordsman, then empowered with dark energy. In phase one, parry his thrusts for big punish windows. In phase two, his attacks leave dark pools on the ground — avoid standing in them. Keep moving and use your best Abyss Core loadout.',
  },
  {
    name: "Marni's Excavatron",
    type: 'optional',
    location: 'Marni\'s Workshop (side quest)',
    reward: 'Excavatron Parts (crafting), coins',
    strategy: 'A mechanical construct. Its drill arm has a long wind-up — dodge to the side, not backward. Destroy the two side cannons first to remove its ranged attacks. After both cannons are down, it becomes purely melee and much easier to handle.',
  },
  {
    name: 'Crimson Nightmare',
    type: 'optional',
    location: 'Hidden cave, eastern Pywel',
    reward: 'Nightmare Shard (Abyss Gear), rare dye',
    strategy: 'A nightmare creature that inflicts fear debuffs. Fear reduces your damage — eat food that grants mental resistance before the fight. It has no physical weak point; focus on dodging its wide sweeping claws and punishing after each combo ends.',
  },
  {
    name: 'Saigord the Staglord',
    type: 'optional',
    location: 'Howling Hill forest (faction quest)',
    reward: "Staglord's Shield (unique shield), Staglord's Banner Pike",
    strategy: 'A massive stag-mounted warrior. His mount charges in a straight line — sidestep early. When dismounted (around 60% HP), Saigord fights on foot with a pike. His overhead slam has a large AoE; roll through it rather than away. The shield reward makes this fight very worth doing early.',
  },
  {
    name: "Antumbra's Sword",
    type: 'optional',
    location: 'Abyss Nexus dungeon',
    reward: 'Antumbra Core (powerful Abyss Gear)',
    strategy: 'A sentient weapon construct. It mirrors your attack patterns — if you spam the same combo, it will counter it. Vary your approach. When it glows white, it\'s charging an unblockable beam; get behind a pillar. The Antumbra Core reward is one of the best in the game.',
  },
]

const generalBossTips = [
  'Carry 100+ roasted meat — you can eat while attacking, so there\'s no reason to stop healing.',
  'Upgrade your weapons to Refinement Level 4+ before major bosses. The damage difference is significant.',
  'Save unique weapons dropped by bosses — they often have the best modifiers for specific builds.',
  'Learn the boss\'s attack pattern before committing to offense. Most bosses have a 3–4 hit combo followed by a recovery window.',
  'Perfect Dodge (dodge at the last moment) slows time and opens a big punish window on most bosses.',
  'Equip your best Abyss Core loadout before boss fights — visit Elowen the Witch to swap if needed.',
]

// ── Combat guide data ─────────────────────────────────────────────────────────

type CombatMechanic = { name: string; nameZh: string; desc: string; descZh: string; tips: string[]; tipsZh: string[] }

const combatMechanics: CombatMechanic[] = [
  {
    name: 'Light Attack',
    nameZh: '轻攻击',
    desc: 'Fast, low-stamina strikes that chain into combos. Tap the attack button repeatedly to execute multi-hit sequences. Light attacks are your bread-and-butter for building pressure and filling gaps between heavier moves.',
    descZh: '快速、低耗体力的攻击，可连接成连击。连续点击攻击键执行多段连击。轻攻击是施压和衔接重攻击的基础。',
    tips: [
      'Chain 3–4 light attacks before finishing with a heavy for maximum damage.',
      'Light attacks can be cancelled into a dodge at any point in the chain.',
      'Some enemies have armor that reduces light attack damage — switch to heavy attacks against them.',
    ],
    tipsZh: [
      '连续3-4次轻攻击后接重攻击，伤害最大化。',
      '轻攻击连击中随时可以取消接翻滚。',
      '部分敌人有护甲会减少轻攻击伤害，对其改用重攻击。',
    ],
  },
  {
    name: 'Heavy Attack',
    nameZh: '重攻击',
    desc: 'Charged strikes that deal high damage and break enemy guard. Hold the attack button to charge. Heavy attacks are slower but stagger most enemies and deal bonus damage to blocking foes.',
    descZh: '蓄力攻击，伤害高且可破防。长按攻击键蓄力。重攻击较慢，但能硬直大多数敌人，对格挡中的敌人造成额外伤害。',
    tips: [
      'Use heavy attacks to break through enemy shields and guards.',
      'A fully charged heavy attack deals roughly 3× the damage of a light attack.',
      'Heavy attacks have hyper armor during the swing — you won\'t flinch from light hits.',
    ],
    tipsZh: [
      '用重攻击破除敌人的盾牌和格挡。',
      '满蓄力重攻击伤害约为轻攻击的3倍。',
      '重攻击挥击过程中有超级护甲，不会被轻攻击打断。',
    ],
  },
  {
    name: 'Timed Guard',
    nameZh: '时机格挡',
    desc: 'Block an attack at the exact moment it lands to perform a Timed Guard. This negates all damage and briefly staggers the attacker, opening a punish window. Requires a shield or weapon with block capability.',
    descZh: '在攻击命中的精确时机格挡，执行时机格挡。可完全抵消伤害并短暂硬直攻击者，创造反击窗口。需要盾牌或具有格挡能力的武器。',
    tips: [
      'The timing window is roughly 0.2 seconds before impact — watch the enemy\'s arm, not their weapon.',
      'A successful Timed Guard costs no stamina, unlike a regular block.',
      'Timed Guard works against most human enemies and some beast attacks, but not unblockable moves (red glow).',
    ],
    tipsZh: [
      '时机窗口约在命中前0.2秒——盯着敌人的手臂，而非武器。',
      '成功的时机格挡不消耗体力，普通格挡则会。',
      '时机格挡对大多数人类敌人和部分野兽攻击有效，但无法格挡不可格挡技能（红色光效）。',
    ],
  },
  {
    name: 'Counter Attack',
    nameZh: '反击',
    desc: 'After a successful Timed Guard or Perfect Dodge, press the attack button immediately to execute a Counter Attack. Counters deal bonus damage and cannot be interrupted. They are the highest damage-per-hit moves in the game.',
    descZh: '成功时机格挡或完美闪避后，立即按攻击键执行反击。反击造成额外伤害且不可被打断，是游戏中单次伤害最高的动作。',
    tips: [
      'Counter Attacks deal 150–200% bonus damage depending on your weapon.',
      'You have about 0.5 seconds after a Timed Guard to trigger the counter.',
      'Counters bypass enemy armor — always counter rather than attacking normally after a parry.',
    ],
    tipsZh: [
      '反击根据武器不同造成150-200%额外伤害。',
      '时机格挡后约有0.5秒触发反击的窗口。',
      '反击可无视敌人护甲——格挡成功后优先反击而非普通攻击。',
    ],
  },
  {
    name: 'Perfect Dodge',
    nameZh: '完美闪避',
    desc: 'Dodge at the last possible moment before an attack lands to trigger a Perfect Dodge. Time slows briefly, giving you a window to counter or reposition. Works against almost all attacks including unblockable ones.',
    descZh: '在攻击命中前的最后时刻闪避，触发完美闪避。时间短暂减速，给你反击或重新定位的窗口。几乎对所有攻击有效，包括不可格挡技能。',
    tips: [
      'Perfect Dodge is your answer to unblockable (red glow) attacks — you cannot block them but you can dodge them.',
      'The slow-motion window lasts about 1 second — use it to land a heavy attack or Counter.',
      'Practice Perfect Dodge on weaker enemies first; the timing is consistent across enemy types.',
    ],
    tipsZh: [
      '完美闪避是应对不可格挡（红色光效）攻击的唯一方式——无法格挡但可以闪避。',
      '慢动作窗口持续约1秒——利用它发动重攻击或反击。',
      '先在弱敌身上练习完美闪避；各类敌人的时机基本一致。',
    ],
  },
  {
    name: 'Grapple',
    nameZh: '擒拿',
    desc: 'When an enemy is staggered or off-balance, a Grapple prompt appears. Press the indicated button to grab the enemy and execute a powerful throw or slam. Grapples deal massive damage and cannot be blocked.',
    descZh: '当敌人被硬直或失去平衡时，出现擒拿提示。按提示键抓住敌人并执行强力投技或摔击。擒拿造成巨大伤害且无法被格挡。',
    tips: [
      'Grapple prompts appear after a successful Timed Guard, heavy attack stagger, or when an enemy stumbles.',
      'Throwing enemies off ledges with a Grapple is an instant kill regardless of their HP.',
      'Some large enemies cannot be grappled — look for the prompt; if it doesn\'t appear, they\'re immune.',
    ],
    tipsZh: [
      '擒拿提示在成功时机格挡、重攻击硬直或敌人踉跄后出现。',
      '用擒拿将敌人扔下悬崖可无视血量直接击杀。',
      '部分大型敌人无法被擒拿——查看提示，若未出现则免疫擒拿。',
    ],
  },
  {
    name: 'Ally Skills',
    nameZh: '同伴技能',
    desc: 'Your party members (Damiane, Oongka, and others) can be called in to perform powerful Ally Skills. These are triggered from the ability wheel and have cooldowns. Ally Skills can turn the tide of difficult fights.',
    descZh: '你的队友（Damiane、Oongka等）可被召唤执行强力同伴技能。通过技能轮盘触发，有冷却时间。同伴技能可在困难战斗中扭转局势。',
    tips: [
      'Save Ally Skills for boss fights or large enemy groups — the cooldowns are long (60–90 seconds).',
      'Damiane\'s Ally Skill deals ranged damage and is best used when you\'re surrounded.',
      'Oongka\'s Ally Skill is a massive AoE slam — position enemies together before triggering it.',
      'Ally Skills cannot be interrupted once activated.',
    ],
    tipsZh: [
      '将同伴技能留给BOSS战或大群敌人——冷却时间较长（60-90秒）。',
      'Damiane的同伴技能造成远程伤害，被包围时最为有效。',
      'Oongka的同伴技能是大范围摔击——触发前先将敌人聚集在一起。',
      '同伴技能一旦激活不可被打断。',
    ],
  },
  {
    name: 'Stamina Management',
    nameZh: '体力管理',
    desc: 'Sprinting, dodging, and some attacks consume stamina. Running out of stamina leaves you vulnerable — you cannot dodge or sprint until it recovers. Stamina regenerates automatically when you stop consuming it.',
    descZh: '冲刺、闪避和部分攻击消耗体力。体力耗尽会使你陷入危险——无法闪避或冲刺直到恢复。停止消耗后体力自动恢复。',
    tips: [
      'Upgrade Stamina in the skill tree early — it\'s one of the most impactful early upgrades.',
      'Don\'t spam dodge rolls; pace yourself and only dodge when you see an attack coming.',
      'Standing still recovers stamina fastest — use brief pauses between enemy combos to recover.',
    ],
    tipsZh: [
      '尽早在技能树中升级体力——这是前期最有价值的升级之一。',
      '不要乱刷翻滚；控制节奏，只在看到攻击时才闪避。',
      '站立不动时体力恢复最快——利用敌人连击间隙短暂停顿来恢复体力。',
    ],
  },
]

const combatFlowSteps = [
  { en: 'Observe the enemy\'s attack pattern for 1–2 hits before committing to offense.', zh: '先观察敌人1-2次攻击规律，再发动进攻。' },
  { en: 'Use light attacks to probe — switch to heavy if they\'re blocking.', zh: '用轻攻击试探——若敌人格挡则改用重攻击。' },
  { en: 'Watch for the Timed Guard window on incoming attacks.', zh: '注意来袭攻击的时机格挡窗口。' },
  { en: 'After a successful guard or Perfect Dodge, immediately Counter Attack.', zh: '成功格挡或完美闪避后，立即执行反击。' },
  { en: 'When the Grapple prompt appears, always take it — it\'s free massive damage.', zh: '出现擒拿提示时务必执行——这是免费的巨额伤害。' },
  { en: 'Save Ally Skills and consumables for when HP drops below 40%.', zh: '将同伴技能和消耗品留到血量低于40%时使用。' },
]

// ── Beginner Guide component ──────────────────────────────────────────────────

function BeginnerGuide({ locale }: { locale: Locale }) {
  const isZh = locale === 'zh'
  return (
    <div className="container py-12 max-w-4xl">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-px flex-1 bg-brand-border" />
        <h1 className="text-xl tracking-[0.3em] uppercase text-brand-primary" style={{ fontFamily: 'Cinzel, serif' }}>
          {t(locale, 'nav_guides_beginner')}
        </h1>
        <div className="h-px flex-1 bg-brand-border" />
      </div>
      <p className="text-center text-brand-muted text-xs tracking-widest uppercase mb-12" style={{ fontFamily: 'Cinzel, serif' }}>
        {isZh ? '25条核心技巧，助你在Pywel大陆站稳脚跟' : '25 essential tips to get started in Pywel'}
      </p>

      <div className="space-y-3">
        {beginnerTips.map((tip, i) => (
          <div key={i} className="bg-brand-card border border-brand-border p-5 hover:border-brand-primary/50 transition-colors">
            <div className="flex items-start gap-4">
              <span className="text-brand-primary font-bold text-sm shrink-0 w-6 text-right" style={{ fontFamily: 'Cinzel, serif' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <div className="text-white font-bold text-sm mb-1" style={{ fontFamily: 'Cinzel, serif' }}>{tip.title}</div>
                <p className="text-gray-400 text-sm leading-relaxed">{tip.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Boss Guide component ──────────────────────────────────────────────────────

function BossGuide({ locale }: { locale: Locale }) {
  const isZh = locale === 'zh'
  const mainBosses = bossList.filter(b => b.type === 'main')
  const optionalBosses = bossList.filter(b => b.type === 'optional')

  return (
    <div className="container py-12 max-w-4xl">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-px flex-1 bg-brand-border" />
        <h1 className="text-xl tracking-[0.3em] uppercase text-brand-primary" style={{ fontFamily: 'Cinzel, serif' }}>
          {t(locale, 'nav_guides_boss')}
        </h1>
        <div className="h-px flex-1 bg-brand-border" />
      </div>
      <p className="text-center text-brand-muted text-xs tracking-widest uppercase mb-12" style={{ fontFamily: 'Cinzel, serif' }}>
        {isZh ? '主线与支线全BOSS攻略策略' : 'Strategies for every main and optional boss in Pywel'}
      </p>

      {/* General tips */}
      <div className="bg-brand-card border border-brand-border p-6 mb-10">
        <div className="text-brand-primary text-xs tracking-widest uppercase mb-4 font-bold" style={{ fontFamily: 'Cinzel, serif' }}>
          {isZh ? '通用战斗技巧' : 'General Boss Tips'}
        </div>
        <ul className="space-y-2">
          {generalBossTips.map((tip, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
              <span className="text-brand-primary mt-0.5 shrink-0">⚔</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Main bosses */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px flex-1 bg-brand-border" />
          <span className="text-brand-primary text-xs tracking-widest uppercase font-bold" style={{ fontFamily: 'Cinzel, serif' }}>
            {isZh ? '主线BOSS' : 'Main Story Bosses'}
          </span>
          <div className="h-px flex-1 bg-brand-border" />
        </div>
        <div className="space-y-4">
          {mainBosses.map((boss) => (
            <BossCard key={boss.name} boss={boss} isZh={isZh} />
          ))}
        </div>
      </div>

      {/* Optional bosses */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px flex-1 bg-brand-border" />
          <span className="text-brand-primary text-xs tracking-widest uppercase font-bold" style={{ fontFamily: 'Cinzel, serif' }}>
            {isZh ? '支线/可选BOSS' : 'Optional Bosses'}
          </span>
          <div className="h-px flex-1 bg-brand-border" />
        </div>
        <div className="space-y-4">
          {optionalBosses.map((boss) => (
            <BossCard key={boss.name} boss={boss} isZh={isZh} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Combat Guide component ────────────────────────────────────────────────────

function CombatGuide({ locale }: { locale: Locale }) {
  const isZh = locale === 'zh'
  return (
    <div className="container py-12 max-w-4xl">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-px flex-1 bg-brand-border" />
        <h1 className="text-xl tracking-[0.3em] uppercase text-brand-primary" style={{ fontFamily: 'Cinzel, serif' }}>
          {t(locale, 'nav_guides_combat')}
        </h1>
        <div className="h-px flex-1 bg-brand-border" />
      </div>
      <p className="text-center text-brand-muted text-xs tracking-widest uppercase mb-12" style={{ fontFamily: 'Cinzel, serif' }}>
        {isZh ? '掌握Pywel大陆的战斗系统' : 'Master every mechanic in Pywel\'s combat system'}
      </p>

      {/* Combat Flow */}
      <div className="bg-brand-card border border-brand-border p-6 mb-10">
        <div className="text-brand-primary text-xs tracking-widest uppercase mb-4 font-bold" style={{ fontFamily: 'Cinzel, serif' }}>
          {isZh ? '战斗流程' : 'Combat Flow'}
        </div>
        <ol className="space-y-2">
          {combatFlowSteps.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
              <span className="text-brand-primary font-bold shrink-0 w-5" style={{ fontFamily: 'Cinzel, serif' }}>{i + 1}.</span>
              {isZh ? step.zh : step.en}
            </li>
          ))}
        </ol>
      </div>

      {/* Mechanics */}
      <div className="space-y-4">
        {combatMechanics.map((m) => (
          <div key={m.name} className="bg-brand-card border border-brand-border overflow-hidden hover:border-brand-primary/50 transition-colors">
            <div className="bg-black/30 border-b border-brand-border px-5 py-3">
              <span className="text-white font-bold" style={{ fontFamily: 'Cinzel, serif' }}>{isZh ? m.nameZh : m.name}</span>
            </div>
            <div className="p-5 space-y-3">
              <p className="text-gray-400 text-sm leading-relaxed">{isZh ? m.descZh : m.desc}</p>
              <div>
                <div className="text-brand-primary text-xs tracking-widest uppercase mb-2 font-bold">
                  {isZh ? '技巧' : 'Tips'}
                </div>
                <ul className="space-y-1">
                  {(isZh ? m.tipsZh : m.tips).map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-400 text-sm leading-relaxed">
                      <span className="text-brand-primary mt-0.5 shrink-0">▸</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function BossCard({ boss, isZh }: { boss: Boss; isZh: boolean }) {
  return (
    <div className="bg-brand-card border border-brand-border overflow-hidden hover:border-brand-primary/50 transition-colors">
      <div className="flex items-center gap-3 bg-black/30 border-b border-brand-border px-5 py-3">
        <span className="text-white font-bold" style={{ fontFamily: 'Cinzel, serif' }}>{boss.name}</span>
        {boss.chapter && (
          <span className="text-brand-primary text-xs font-bold tracking-widest uppercase">{boss.chapter}</span>
        )}
        <span className={`ml-auto text-xs font-bold tracking-widest uppercase ${boss.type === 'main' ? 'text-red-400' : 'text-amber-400'}`}>
          {boss.type === 'main' ? (isZh ? '主线' : 'Main') : (isZh ? '支线' : 'Optional')}
        </span>
      </div>
      <div className="p-5 space-y-3">
        <div className="flex flex-wrap gap-4 text-xs">
          <div>
            <span className="text-brand-muted uppercase tracking-widest">{isZh ? '地点 ' : 'Location '}</span>
            <span className="text-gray-300">{boss.location}</span>
          </div>
          <div>
            <span className="text-brand-muted uppercase tracking-widest">{isZh ? '奖励 ' : 'Reward '}</span>
            <span className="text-gray-300">{boss.reward}</span>
          </div>
        </div>
        <div>
          <div className="text-brand-primary text-xs tracking-widest uppercase mb-2 font-bold">
            {isZh ? '攻略策略' : 'Strategy'}
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">{boss.strategy}</p>
        </div>
      </div>
    </div>
  )
}

// ── Page entry ────────────────────────────────────────────────────────────────

export default function GuidePage({ locale, slug }: { locale: Locale; slug: string }) {
  const cfg = guideConfig[slug]
  const title = cfg ? t(locale, cfg.titleKey) : slug

  if (slug === 'beginner') {
    return (
      <Layout locale={locale} title={title}>
        <BeginnerGuide locale={locale} />
      </Layout>
    )
  }

  if (slug === 'boss') {
    return (
      <Layout locale={locale} title={title}>
        <BossGuide locale={locale} />
      </Layout>
    )
  }

  if (slug === 'combat') {
    return (
      <Layout locale={locale} title={title}>
        <CombatGuide locale={locale} />
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
  const slugs = Object.keys(guideConfig)
  return {
    paths: locales.flatMap((locale) => slugs.map((slug) => ({ params: { locale, slug } }))),
    fallback: false,
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: { locale: params?.locale as Locale, slug: params?.slug as string },
})
