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

type Tip = { title: string; titleZh: string; body: string; bodyZh: string }

const beginnerTips: Tip[] = [
  {
    title: 'Use Focus to Lock On',
    titleZh: '使用锁定功能',
    body: 'Hold LB (or the equivalent on your platform) to lock onto a target. This keeps the camera fixed on enemies during combat, making it much easier to land attacks and dodge.',
    bodyZh: '长按LB（或对应平台按键）锁定目标。战斗中摄像机会固定在敌人身上，大幅提升攻击和闪避的准确性。',
  },
  {
    title: 'Manage Your Inventory Early',
    titleZh: '尽早管理背包',
    body: 'Complete quests to expand your inventory slots. There is no weight limit, so focus on unlocking more slots. Sell or store items you don\'t need to keep things organized.',
    bodyZh: '完成任务来扩展背包格子。游戏没有重量限制，专注解锁更多格子即可。卖掉或存储不需要的物品保持整洁。',
  },
  {
    title: 'Stealing Requires a Mask',
    titleZh: '偷窃需要戴面具',
    body: 'You must equip a mask before stealing from NPCs. If you get caught, greet NPCs to restore your reputation — ignoring them will make things worse.',
    bodyZh: '从NPC处偷窃前必须装备面具。被抓到后，主动打招呼可以恢复声望——无视NPC只会让情况更糟。',
  },
  {
    title: 'Fast Travel via Abyss Nexus',
    titleZh: '通过深渊节点快速旅行',
    body: 'Look for "Mysterious Energy" question mark icons on the map to find Abyss Nexus points. Activating them unlocks fast travel nodes across Pywel.',
    bodyZh: '在地图上寻找"神秘能量"问号图标来找到深渊节点。激活后可解锁Pywel各地的快速旅行点。',
  },
  {
    title: 'Aerial Travel from Sky Islands',
    titleZh: '从天空岛屿空中旅行',
    body: 'You can glide from sky islands using Damiane\'s Parasol Machine. Hovering doesn\'t drain stamina — only moving does. Spread your wings just before landing to avoid fall damage.',
    bodyZh: '可以用Damiane的机械伞从天空岛屿滑翔。悬停不消耗体力——只有移动才消耗。落地前展开伞可避免坠落伤害。',
  },
  {
    title: 'Skill Tree Has No Prerequisites',
    titleZh: '技能树无前置条件',
    body: 'You can unlock skills in any order — there are no strict prerequisites. Prioritize Health and Stamina upgrades first, then grab Double Jump and Axiom Force (levels 2–3) early.',
    bodyZh: '可以按任意顺序解锁技能——没有严格的前置条件。优先升级生命值和体力，然后尽早获取二段跳和公理之力（2-3级）。',
  },
  {
    title: 'Explore Before Progressing the Story',
    titleZh: '推进主线前先探索',
    body: 'The world is packed with side content. Explore regions thoroughly before advancing the main quest — you\'ll find better gear, skill points, and faction quests that make boss fights easier.',
    bodyZh: '世界中充满支线内容。推进主线前彻底探索各地区——你会找到更好的装备、技能点和派系任务，让BOSS战更轻松。',
  },
  {
    title: 'Upgrade Your Gear Regularly',
    titleZh: '定期升级装备',
    body: 'Visit Blacksmiths to refine your weapons and armor. Aim for Refinement Level 4+ before tackling major bosses. Higher refinement makes a significant difference in damage output.',
    bodyZh: '前往铁匠铺精炼武器和护甲。挑战主要BOSS前争取达到精炼4级以上。更高的精炼等级对伤害输出有显著影响。',
  },
  {
    title: 'Cook and Carry Food',
    titleZh: '烹饪并携带食物',
    body: 'Cooked meat and food items restore health and grant buffs. Always carry at least 100 pieces of roasted meat. You can eat while attacking, so there\'s no reason not to heal mid-fight.',
    bodyZh: '熟肉和食物可以恢复生命值并提供增益。随时携带至少100块烤肉。攻击时也可以进食，所以战斗中没有理由不回血。',
  },
  {
    title: 'Learn to Perfect Dodge',
    titleZh: '学会完美闪避',
    body: 'Dodging at the exact moment an attack lands triggers a Perfect Dodge, slowing time briefly and opening a window for a powerful counter. Practice this against weaker enemies first.',
    bodyZh: '在攻击命中的精确时刻闪避可触发完美闪避，短暂减速时间并开启强力反击窗口。先在弱敌身上练习。',
  },
  {
    title: 'Parrying Staggers Enemies',
    titleZh: '格挡可硬直敌人',
    body: 'Blocking at the right moment parries an attack and staggers the enemy. Parrying is especially effective against human enemies and opens them up for a follow-up combo.',
    bodyZh: '在正确时机格挡可以招架攻击并硬直敌人。格挡对人类敌人尤其有效，并为后续连击创造机会。',
  },
  {
    title: 'Switch Characters for Different Situations',
    titleZh: '根据情况切换角色',
    body: 'Each playable character has unique strengths. Kliff excels at balanced melee, Damiane is fast and versatile with ranged options, and Oongka deals massive AoE damage. Swap based on the encounter.',
    bodyZh: '每个可玩角色都有独特优势。Kliff擅长均衡近战，Damiane快速多变且有远程选项，Oongka造成巨大范围伤害。根据遭遇战切换角色。',
  },
  {
    title: 'Equip Abyss Cores for Powerful Modifiers',
    titleZh: '装备深渊核心获取强力词条',
    body: 'Abyss Cores slot into your weapons and grant powerful passive effects. Find Elowen the Witch as you progress through the story to equip and swap your Abyss Gear loadout.',
    bodyZh: '深渊核心可嵌入武器并提供强力被动效果。随着剧情推进找到女巫Elowen来装备和更换深渊装备配置。',
  },
  {
    title: 'Use the Camp System',
    titleZh: '善用营地系统',
    body: 'Setting up camp lets you rest, cook, and manage your party. Resting at camp restores health and stamina fully. Use it between tough encounters instead of burning through consumables.',
    bodyZh: '扎营可以休息、烹饪和管理队伍。在营地休息可完全恢复生命值和体力。在艰难战斗之间使用，而不是消耗大量消耗品。',
  },
  {
    title: 'Reputation Matters',
    titleZh: '声望很重要',
    body: 'Your reputation with factions affects quest availability and NPC interactions. Avoid unnecessary crimes in settlements, and complete faction quests to build standing with key groups.',
    bodyZh: '与派系的声望影响任务可用性和NPC互动。避免在定居点犯不必要的罪行，完成派系任务来提升与关键团体的地位。',
  },
  {
    title: 'Check the Challenges Menu',
    titleZh: '查看挑战菜单',
    body: 'The Challenges menu tracks combat mastery tasks that reward skill points and gear. Complete them alongside normal play — many unlock naturally as you fight different enemy types.',
    bodyZh: '挑战菜单追踪奖励技能点和装备的战斗精通任务。在正常游玩时顺带完成——许多任务在对抗不同敌人类型时自然解锁。',
  },
  {
    title: 'Horses Need Care Too',
    titleZh: '马匹也需要照料',
    body: 'Your horse can be injured in combat. Carry horse medicine and heal it regularly. A healthy horse is faster and more responsive, which matters a lot during mounted combat.',
    bodyZh: '你的马在战斗中可能受伤。携带马药并定期治疗。健康的马更快更灵敏，在骑乘战斗中非常重要。',
  },
  {
    title: 'Wanted System — Stay Aware',
    titleZh: '通缉系统——保持警觉',
    body: 'Committing crimes raises your Wanted level. Guards will attack on sight at high levels. Either pay off your bounty at a settlement or lay low until it clears.',
    bodyZh: '犯罪会提升通缉等级。等级高时守卫会见面就攻击。在定居点缴清赏金或低调行事直到通缉解除。',
  },
  {
    title: 'Mysterious Energies Unlock Bonuses',
    titleZh: '神秘能量解锁奖励',
    body: 'Collecting Mysterious Energies (the question mark icons) does more than unlock fast travel — they also reveal hidden areas and grant passive bonuses. Prioritize them when exploring new regions.',
    bodyZh: '收集神秘能量（问号图标）不仅解锁快速旅行——还能揭示隐藏区域并提供被动奖励。探索新地区时优先收集。',
  },
  {
    title: 'Don\'t Ignore Faction Quests',
    titleZh: '不要忽视派系任务',
    body: 'Faction quests (side quests tied to groups in Pywel) give unique rewards, lore, and sometimes unlock new characters or abilities. They\'re worth doing before finishing each chapter.',
    bodyZh: '派系任务（与Pywel团体相关的支线任务）提供独特奖励、世界观内容，有时还能解锁新角色或能力。在完成每章前值得去做。',
  },
  {
    title: 'Stamina Management in Combat',
    titleZh: '战斗中的体力管理',
    body: 'Sprinting, dodging, and some attacks consume stamina. Don\'t spam dodge rolls — you\'ll be left vulnerable. Upgrade stamina early and learn enemy attack patterns to dodge only when needed.',
    bodyZh: '冲刺、闪避和部分攻击消耗体力。不要乱刷翻滚——会让你陷入危险。尽早升级体力，学习敌人攻击规律，只在必要时闪避。',
  },
  {
    title: 'Loot Everything',
    titleZh: '拾取所有战利品',
    body: 'Enemies, chests, and the environment drop crafting materials, weapons, and consumables. With no weight limit, there\'s no reason to leave loot behind. Sell duplicates to Blacksmiths for coin.',
    bodyZh: '敌人、宝箱和环境会掉落制作材料、武器和消耗品。没有重量限制，没有理由留下战利品。将重复物品卖给铁匠换取金币。',
  },
  {
    title: 'Save Unique Weapons',
    titleZh: '保留独特武器',
    body: 'Unique weapons dropped by bosses have powerful built-in modifiers and cannot be upgraded with duplicates. Keep them — they\'re often best-in-slot for specific builds even late in the game.',
    bodyZh: 'BOSS掉落的独特武器有强力内置词条，无法用重复品升级。保留它们——即使在游戏后期，它们通常也是特定配装的最佳选择。',
  },
  {
    title: 'Use the Environment',
    titleZh: '利用环境',
    body: 'Pywel\'s world is interactive. Knock enemies off ledges, use explosive barrels, and take high ground for ranged advantage. Environmental kills count toward challenges too.',
    bodyZh: 'Pywel的世界是互动的。将敌人击落悬崖、使用爆炸桶、占据高地获得远程优势。环境击杀也计入挑战进度。',
  },
  {
    title: 'Talk to Everyone',
    titleZh: '与所有人交谈',
    body: 'NPCs often give hints about hidden quests, treasure locations, and lore. Some side quests only trigger after speaking to specific characters. Don\'t rush past settlements.',
    bodyZh: 'NPC经常提供隐藏任务、宝藏位置和世界观的线索。部分支线任务只有与特定角色交谈后才会触发。不要匆忙路过定居点。',
  },
  {
    title: 'Reputation Doesn\'t Matter Much Early',
    titleZh: '游戏初期声望并不重要',
    body: 'When you steal and see your local reputation drop, don\'t panic. Losses from stealing or even killing can be offset just by completing faction quests and main story missions. By Chapter 3 your Hernand reputation will be high naturally — don\'t stress over early slip-ups.',
    bodyZh: '偷窃后看到声望下降不要慌。完成阵营任务和主线剧情就能弥补损失。到了第三章，赫尔南德的声望会自然提升——不必为早期的失误烦恼。',
  },
  {
    title: 'Check the Contribution Shop',
    titleZh: '不要错过贡献商店',
    body: 'High reputation in Hernand unlocks the Contribution Shop in the castle, where you can spend reputation points on powerful weapons, armor, and rare items — no gold required. Complete quests and avoid crimes to build your contribution rank.',
    bodyZh: '在赫尔南德城堡拥有高声望后，可前往贡献商店用声望点数兑换强力武器、盔甲等珍贵物品，无需花费金币。完成任务并避免犯罪即可提升贡献值。',
  },
  {
    title: 'Reload Instead of Going to Jail',
    titleZh: '被抓就读档，不要坐牢',
    body: 'If guards catch you, the best move is to pause and reload your last save rather than accept arrest. This avoids paying the bounty — which can be very expensive depending on your crimes.',
    bodyZh: '被守卫抓住时，最好暂停游戏读取最近存档，而不是乖乖被捕。这样可以避免支付赏金——赏金金额可能相当高昂。',
  },
  {
    title: 'Pay a Penance, Not the Fine',
    titleZh: '缴纳赎罪金，而非罚款',
    body: 'If you want to clear your bounty, the fastest way is to visit a nearby church and pay for an absolution. You still pay, but on your own terms and without sitting through a lengthy arrest sequence.',
    bodyZh: '想清除悬赏的话，最便捷的方式是前往附近教堂购买赦免令。虽然仍需付钱，但可以按自己意愿行事，省去漫长的逮捕流程。',
  },
  {
    title: 'Don\'t Buy What You Can Take',
    titleZh: '能拿的东西不要买',
    body: 'You can buy meat from butchers, or you can loot it from bandit camps for free. Most camps have meat stacked up — clear out the enemies and take it. The same applies to other supplies like cooking oil.',
    bodyZh: '可以从肉铺买肉，也可以直接从土匪营地抢——大多数营地都堆着肉。清场后顺手带走，其他补给如食用油也同理，省下辛苦赚来的金币。',
  },
  {
    title: 'Bounties Are Optional, Not Essential',
    titleZh: '赏金任务是附加项，并非必需',
    body: 'Bounty missions pay well but take a long time. Most targets are far away and must be escorted back alive (killing them halves the reward). Only bother with bounties if you happen to be nearby.',
    bodyZh: '赏金任务奖励丰厚但耗时极长。大多数目标离你很远，还必须活着押送回来（杀死则赏金减半）。只有恰好路过时才值得顺手完成。',
  },
  {
    title: 'Fill Your Pockets with Food Before a Fight',
    titleZh: '战斗前在口袋里装满食物',
    body: 'In Crimson Desert you have full inventory access during combat, including boss fights. Heal freely with food mid-fight. Check descriptions first: grains and meat restore HP, while fruits and berries restore Spirit.',
    bodyZh: '《深红沙漠》中战斗时（包括Boss战）可完全访问物品栏，随时用食物回血。注意查看说明：谷物和肉类恢复生命值，水果和浆果补充精神值。',
  },
  {
    title: 'Cooked Food Is Always Better',
    titleZh: '熟食总是比生食更好',
    body: 'Cooked food is more effective than raw food every time. You unlock basic recipes like roasted meat and roasted grain from the start. Walk up to a campfire, throw on some meat or oats, and get a meal that restores most of your health.',
    bodyZh: '熟食效果始终优于生食。游戏初期就能获得烤肉、烤谷物等基本食谱。走到篝火旁，扔上肉或燕麦，就能得到可以恢复大部分生命值的餐食。',
  },
  {
    title: 'Force Palm Is Your Friend',
    titleZh: '掌力是你的好帮手',
    body: 'You unlock Force Palm early and should use it constantly. It interrupts enemy attacks (including some boss attacks), can hit multiple nearby enemies at once, and — most importantly — lowers the defense of targets it hits, making it essential against high-defense enemies.',
    bodyZh: '游戏初期就能学会掌力，应当频繁使用。它能打断敌人攻击（甚至包括部分Boss攻击），可同时命中多个近身敌人，最重要的是能降低被击中敌人的防御力，对高防御敌人至关重要。',
  },
  {
    title: 'Kick to Create Openings',
    titleZh: '用踢击制造攻击机会',
    body: 'After defeating knight Matthias in the main story, you unlock a powerful kick move. It doesn\'t lower defense, but it knocks enemies back and drops smaller foes to the ground — creating a window to rush in for more damage or escape when overwhelmed.',
    bodyZh: '在主线中击败骑士马蒂亚斯后，解锁踢击技能。踢击不降低防御但会击退敌人，体型较小的敌人还会被打倒在地——为你创造冲上前追加伤害或在危急时撤退的机会。',
  },
]

// ── Boss data ─────────────────────────────────────────────────────────────────

type Boss = {
  name: string
  nameZh: string
  type: 'main' | 'optional'
  chapter?: string
  location: string
  locationZh: string
  reward: string
  rewardZh: string
  strategy: string
  strategyZh: string
}

const bossList: Boss[] = [
  {
    name: 'Matthias',
    nameZh: 'Matthias',
    type: 'main',
    chapter: 'Chapter 1',
    location: 'The First Encounter',
    locationZh: '初次相遇',
    reward: 'Sword of the Lord (unique weapon)',
    rewardZh: '主之剑（独特武器）',
    strategy: 'An aggressive human fighter. Watch for his two-hit combo followed by a grab — dodge sideways on the grab. Parrying his sword strikes staggers him and opens a punish window. Keep your shield up during his charge attack.',
    strategyZh: '一名进攻型人类战士。注意他的二连击后接擒拿——擒拿时向侧面闪避。格挡他的剑击可以硬直他并开启惩罚窗口。他冲锋攻击时保持盾牌举起。',
  },
  {
    name: 'Kailok the Hornsplitter',
    nameZh: '裂角者凯洛克',
    type: 'main',
    chapter: 'Chapter 2',
    location: 'Golden Greed',
    locationZh: '黄金贪欲',
    reward: 'Kailok\'s Horn (crafting material), skill points',
    rewardZh: '凯洛克之角（制作材料），技能点',
    strategy: 'A large beast with sweeping horn attacks. Stay to his side — his frontal charge covers a lot of ground. When he rears up, roll backward to avoid the slam. His horns glow red before an unblockable attack; dodge immediately.',
    strategyZh: '一头拥有横扫角击的大型野兽。待在它侧面——正面冲锋覆盖范围很大。它后仰时向后翻滚避开猛击。角在不可格挡攻击前会发红光，立即闪避。',
  },
  {
    name: 'Reed Devil',
    nameZh: '芦苇恶魔',
    type: 'main',
    chapter: 'Chapter 3',
    location: 'Howling Hill',
    locationZh: '嚎叫山丘',
    reward: 'Reed Devil\'s Mask (unique equipment), coins',
    rewardZh: '芦苇恶魔之面具（独特装备），金币',
    strategy: 'Fast and evasive. Uses poison attacks — bring antidotes or poison-resist gear. He teleports short distances; don\'t chase, wait for him to reappear and punish. His scythe spin is telegraphed by a green glow — back off.',
    strategyZh: '快速且善于闪避。使用毒素攻击——携带解毒剂或抗毒装备。他会短距离传送，不要追击，等他重新出现后惩罚。镰刀旋转前会有绿色光效——后退。',
  },
  {
    name: 'Tenebrum',
    nameZh: '暗影腾布鲁姆',
    type: 'main',
    chapter: 'Chapter 4',
    location: 'The Price of Knowledge',
    locationZh: '知识的代价',
    reward: 'Tenebrum Core (Abyss Gear material)',
    rewardZh: '腾布鲁姆核心（深渊装备材料）',
    strategy: 'A shadow-type boss that splits into copies. Attack the copy with the glowing core — the others deal no damage but can still stagger you. When the arena goes dark, stop moving and listen for audio cues before his lunge.',
    strategyZh: '一个会分裂成复制体的暗影型BOSS。攻击发光核心的那个复制体——其他复制体不造成伤害但仍能硬直你。竞技场变暗时停止移动，在他突进前聆听音效提示。',
  },
  {
    name: 'Kearush the Slayer',
    nameZh: '屠者凯拉什',
    type: 'main',
    chapter: 'Chapter 5',
    location: 'Guest Unbidden',
    locationZh: '不速之客',
    reward: 'Kearush\'s Blade (unique weapon), large coin reward',
    rewardZh: '凯拉什之刃（独特武器），大量金币',
    strategy: 'A heavily armored knight. His attacks are slow but hit hard — one wrong dodge and you\'re dead. Use Spear or Greatsword for poke damage. When his armor cracks (around 50% HP), he speeds up significantly. Save your healing items for phase two.',
    strategyZh: '一名重甲骑士。攻击缓慢但伤害极高——一次错误闪避就可能致命。使用长矛或巨剑进行戳刺伤害。护甲破裂时（约50%血量）他会大幅加速。将治疗道具留到第二阶段。',
  },
  {
    name: 'Crowcaller',
    nameZh: '唤鸦者',
    type: 'main',
    chapter: 'Chapter 6',
    location: 'Cracks in the Shield',
    locationZh: '盾牌的裂缝',
    reward: 'Crowcaller\'s Feather (unique accessory)',
    rewardZh: '唤鸦者之羽（独特饰品）',
    strategy: 'A flying boss that summons crow minions. Use ranged weapons (Rifle or Bow) to deal damage while he\'s airborne. Kill minions quickly — they stack a debuff that reduces your damage. He lands when below 40% HP; switch to melee for the finish.',
    strategyZh: '一个会召唤乌鸦小兵的飞行BOSS。他在空中时使用远程武器（步枪或弓）造成伤害。快速消灭小兵——它们会叠加减少你伤害的减益效果。血量低于40%时他会落地，切换近战收尾。',
  },
  {
    name: 'Cassius Morten',
    nameZh: '卡修斯·莫顿',
    type: 'main',
    chapter: 'Chapter 6',
    location: 'Cracks in the Shield',
    locationZh: '盾牌的裂缝',
    reward: 'Cassius\'s Signet (story reward), major skill point cache',
    rewardZh: '卡修斯印记（剧情奖励），大量技能点',
    strategy: 'The chapter\'s final boss. Two phases: first as a swordsman, then empowered with dark energy. In phase one, parry his thrusts for big punish windows. In phase two, his attacks leave dark pools on the ground — avoid standing in them. Keep moving and use your best Abyss Core loadout.',
    strategyZh: '本章最终BOSS。两个阶段：先是剑客形态，然后被黑暗能量强化。第一阶段格挡他的突刺获得大惩罚窗口。第二阶段攻击会在地面留下黑暗水池——避免站在其中。保持移动并使用最佳深渊核心配置。',
  },
  {
    name: "Marni's Excavatron",
    nameZh: '马尔尼的挖掘机甲',
    type: 'optional',
    location: 'Marni\'s Workshop (side quest)',
    locationZh: '马尔尼工坊（支线任务）',
    reward: 'Excavatron Parts (crafting), coins',
    rewardZh: '挖掘机甲零件（制作材料），金币',
    strategy: 'A mechanical construct. Its drill arm has a long wind-up — dodge to the side, not backward. Destroy the two side cannons first to remove its ranged attacks. After both cannons are down, it becomes purely melee and much easier to handle.',
    strategyZh: '一个机械构造体。钻臂有很长的前摇——向侧面闪避，而非向后。先摧毁两侧炮台以消除远程攻击。两门炮都摧毁后，它变为纯近战，容易处理得多。',
  },
  {
    name: 'Crimson Nightmare',
    nameZh: '深红噩梦',
    type: 'optional',
    location: 'Hidden cave, eastern Pywel',
    locationZh: 'Pywel东部隐藏洞穴',
    reward: 'Nightmare Shard (Abyss Gear), rare dye',
    rewardZh: '噩梦碎片（深渊装备），稀有染料',
    strategy: 'A nightmare creature that inflicts fear debuffs. Fear reduces your damage — eat food that grants mental resistance before the fight. It has no physical weak point; focus on dodging its wide sweeping claws and punishing after each combo ends.',
    strategyZh: '一个施加恐惧减益的噩梦生物。恐惧会降低你的伤害——战前食用提供精神抗性的食物。它没有物理弱点，专注闪避其宽幅横扫爪击，并在每段连击结束后惩罚。',
  },
  {
    name: 'Saigord the Staglord',
    nameZh: '鹿主萨戈德',
    type: 'optional',
    location: 'Howling Hill forest (faction quest)',
    locationZh: '嚎叫山丘森林（派系任务）',
    reward: "Staglord's Shield (unique shield), Staglord's Banner Pike",
    rewardZh: '鹿主之盾（独特盾牌），鹿主旗枪',
    strategy: 'A massive stag-mounted warrior. His mount charges in a straight line — sidestep early. When dismounted (around 60% HP), Saigord fights on foot with a pike. His overhead slam has a large AoE; roll through it rather than away. The shield reward makes this fight very worth doing early.',
    strategyZh: '一名骑乘巨鹿的战士。坐骑直线冲锋——提前侧步躲避。下马后（约60%血量），萨戈德持枪步战。头顶猛击有大范围AOE，向前翻滚穿过而非向后躲。盾牌奖励使这场战斗非常值得尽早完成。',
  },
  {
    name: "Antumbra's Sword",
    nameZh: '安顿布拉之剑',
    type: 'optional',
    location: 'Abyss Nexus dungeon',
    locationZh: '深渊节点地下城',
    reward: 'Antumbra Core (powerful Abyss Gear)',
    rewardZh: '安顿布拉核心（强力深渊装备）',
    strategy: 'A sentient weapon construct. It mirrors your attack patterns — if you spam the same combo, it will counter it. Vary your approach. When it glows white, it\'s charging an unblockable beam; get behind a pillar. The Antumbra Core reward is one of the best in the game.',
    strategyZh: '一个有意识的武器构造体。它会镜像你的攻击模式——如果你重复同一连击，它会反制。变换攻击方式。发白光时正在蓄力不可格挡光束，躲到柱子后面。安顿布拉核心是游戏中最好的奖励之一。',
  },
]

const generalBossTips: { en: string; zh: string }[] = [
  { en: 'Carry 100+ roasted meat — you can eat while attacking, so there\'s no reason to stop healing.', zh: '携带100块以上烤肉——攻击时也可以进食，没有理由停止回血。' },
  { en: 'Upgrade your weapons to Refinement Level 4+ before major bosses. The damage difference is significant.', zh: '挑战主要BOSS前将武器升级到精炼4级以上。伤害差距非常显著。' },
  { en: 'Save unique weapons dropped by bosses — they often have the best modifiers for specific builds.', zh: '保留BOSS掉落的独特武器——它们通常拥有特定配装的最佳词条。' },
  { en: 'Learn the boss\'s attack pattern before committing to offense. Most bosses have a 3–4 hit combo followed by a recovery window.', zh: '在全力进攻前先学习BOSS的攻击规律。大多数BOSS有3-4段连击后跟着一个恢复窗口。' },
  { en: 'Perfect Dodge (dodge at the last moment) slows time and opens a big punish window on most bosses.', zh: '完美闪避（最后时刻闪避）会减速时间，对大多数BOSS开启大惩罚窗口。' },
  { en: 'Equip your best Abyss Core loadout before boss fights — visit Elowen the Witch to swap if needed.', zh: 'BOSS战前装备最佳深渊核心配置——如需更换可前往女巫Elowen处。' },
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
                <div className="text-white font-bold text-sm mb-1" style={{ fontFamily: 'Cinzel, serif' }}>{isZh ? tip.titleZh : tip.title}</div>
                <p className="text-gray-400 text-sm leading-relaxed">{isZh ? tip.bodyZh : tip.body}</p>
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
              {isZh ? tip.zh : tip.en}
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
        <span className="text-white font-bold" style={{ fontFamily: 'Cinzel, serif' }}>{isZh ? boss.nameZh : boss.name}</span>
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
            <span className="text-gray-300">{isZh ? boss.locationZh : boss.location}</span>
          </div>
          <div>
            <span className="text-brand-muted uppercase tracking-widest">{isZh ? '奖励 ' : 'Reward '}</span>
            <span className="text-gray-300">{isZh ? boss.rewardZh : boss.reward}</span>
          </div>
        </div>
        <div>
          <div className="text-brand-primary text-xs tracking-widest uppercase mb-2 font-bold">
            {isZh ? '攻略策略' : 'Strategy'}
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">{isZh ? boss.strategyZh : boss.strategy}</p>
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
