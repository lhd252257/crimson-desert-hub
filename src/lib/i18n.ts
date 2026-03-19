export const locales = ['en', 'zh', 'ko', 'ja', 'de', 'fr', 'es'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  zh: '简体中文',
  ko: '한국어',
  ja: '日本語',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
}

// UI translations per locale
export const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Navigation
    nav_home: 'Home',
    nav_news: 'News',
    nav_media: 'Media',
    nav_guides: 'Guides',
    nav_characters: 'Characters',
    nav_database: 'Database',
    nav_world: 'World',
    nav_buy: 'Buy Guide',

    // Guides sub
    nav_guides_beginner: 'Beginner Guide',
    nav_guides_combat: 'Combat System',
    nav_guides_boss: 'Boss Guide',
    nav_guides_walkthrough: 'Walkthrough',

    // Database sub
    nav_db_weapons: 'Weapons',
    nav_db_skills: 'Skills',
    nav_db_equipment: 'Equipment',

    // World sub
    nav_world_map: 'Interactive Map',
    nav_world_lore: 'Lore & Story',
    nav_world_locations: 'Locations',

    // Home
    hero_title: 'Crimson Desert — Your Ultimate Fan Hub',
    hero_subtitle: 'Guides, news, characters, lore and more for Pearl Abyss\'s open world action RPG',
    latest_news: 'Latest News',
    read_more: 'Read More',
    release_date: 'Release Date',
    release_date_value: 'March 20, 2026',
    platforms: 'Platforms',
    game_length: 'Story Length',
    game_length_value: '50–80 hours',
    footer_desc: 'Your #1 fan source for Crimson Desert news, guides, and information.',
    section_guides: 'Popular Guides',
    section_characters: 'Characters',
    section_media: 'Media',
    media_subtitle: 'Trailers, gameplay and official videos',
    media_screenshots: 'Screenshots',
    media_videos: 'Videos',
    media_wallpapers: 'Wallpapers',
    media_view_full: 'View Full Size',

    // Characters
    char_intro: 'Crimson Desert features 3 playable characters, each with unique combat styles and abilities.',
    char_mcclaren_role: 'Main Protagonist',
    char_mcclaren_desc: 'Macduff McClaren is the main protagonist — a mercenary leader navigating the war-torn world of Pywel.',

    // Buy Guide
    buy_intro: 'Crimson Desert launches March 20, 2026 on PC (Steam), PS5, and Xbox Series X/S.',
    buy_editions: 'Editions',
    buy_standard: 'Standard Edition',
    buy_deluxe: 'Deluxe Edition',
    buy_req_title: 'PC Requirements',
    buy_req_min: 'Minimum',
    buy_req_rec: 'Recommended',
    buy_req_os: 'OS',
    buy_req_cpu: 'CPU',
    buy_req_ram: 'RAM',
    buy_req_gpu: 'GPU',
    buy_req_storage: 'Storage',

    // World / Lore
    world_intro: 'Crimson Desert is set in the medieval fantasy world of Pywel, a land torn apart by war and political strife.',

    // Common
    coming_soon: 'Coming Soon',
    back_to: 'Back to',
  },

  zh: {
    nav_home: '首页',
    nav_news: '新闻资讯',
    nav_media: '媒体中心',
    nav_guides: '攻略中心',
    nav_characters: '角色图鉴',
    nav_database: '数据库',
    nav_world: '世界观',
    nav_buy: '购买指南',

    nav_guides_beginner: '新手指南',
    nav_guides_combat: '战斗系统',
    nav_guides_boss: 'Boss攻略',
    nav_guides_walkthrough: '主线流程',

    nav_db_weapons: '武器',
    nav_db_skills: '技能',
    nav_db_equipment: '装备',

    nav_world_map: '互动地图',
    nav_world_lore: '剧情/世界观',
    nav_world_locations: '地点图鉴',

    hero_title: '红色沙漠 — 非官方综合粉丝站',
    hero_subtitle: '攻略、资讯、角色、世界观，Pearl Abyss 开放世界动作RPG 全覆盖',
    latest_news: '最新资讯',
    read_more: '阅读更多',
    release_date: '发售日期',
    release_date_value: '2026年3月20日',
    platforms: '平台',
    game_length: '主线时长',
    game_length_value: '50–80小时',
    footer_desc: '红色沙漠非官方粉丝站，提供攻略、资讯与数据库。',
    section_guides: '热门攻略',
    section_characters: '角色介绍',
    section_media: '媒体中心',
    media_subtitle: '预告片、实机演示与官方视频',
    media_screenshots: '游戏截图',
    media_videos: '视频',
    media_wallpapers: '壁纸',
    media_view_full: '查看原图',

    char_intro: '红色沙漠拥有3位可操控角色，各具独特战斗风格与能力。',
    char_mcclaren_role: '主角',
    char_mcclaren_desc: 'Macduff McClaren 是游戏主角，一位在战乱世界 Pywel 中挣扎求存的雇佣兵首领。',

    buy_intro: '红色沙漠将于2026年3月20日在 PC（Steam）、PS5 和 Xbox Series X/S 上发售。',
    buy_editions: '版本',
    buy_standard: '标准版',
    buy_deluxe: '豪华版',
    buy_req_title: 'PC配置要求',
    buy_req_min: '最低配置',
    buy_req_rec: '推荐配置',
    buy_req_os: '操作系统',
    buy_req_cpu: '处理器',
    buy_req_ram: '内存',
    buy_req_gpu: '显卡',
    buy_req_storage: '存储空间',

    world_intro: '红色沙漠的故事发生在中世纪奇幻世界 Pywel，一片被战争与政治纷争撕裂的土地。',

    coming_soon: '即将上线',
    back_to: '返回',
  },

  ko: {
    nav_news: '뉴스',
    nav_guides: '공략',
    nav_characters: '캐릭터',
    nav_database: '데이터베이스',
    nav_world: '세계관',
    nav_buy: '구매 가이드',

    nav_guides_beginner: '초보자 가이드',
    nav_guides_combat: '전투 시스템',
    nav_guides_boss: '보스 공략',
    nav_guides_walkthrough: '메인 스토리',

    nav_db_weapons: '무기',
    nav_db_skills: '스킬',
    nav_db_equipment: '장비',

    nav_world_map: '인터랙티브 맵',
    nav_world_lore: '스토리/세계관',
    nav_world_locations: '지역',

    hero_title: '크림슨 데저트 — 팬 허브',
    hero_subtitle: '공략, 뉴스, 캐릭터, 세계관 — Pearl Abyss 오픈월드 액션 RPG',
    latest_news: '최신 뉴스',
    read_more: '더 읽기',
    release_date: '출시일',
    release_date_value: '2026년 3월 20일',
    platforms: '플랫폼',
    game_length: '스토리 길이',
    game_length_value: '50–80시간',
    footer_desc: '크림슨 데저트 팬 사이트 — 공략, 뉴스, 데이터베이스.',
    section_guides: '인기 공략',
    section_characters: '캐릭터',
    section_media: '미디어',
    media_subtitle: '트레일러, 게임플레이 및 공식 영상',

    char_intro: '크림슨 데저트에는 각자 고유한 전투 스타일을 가진 3명의 플레이어블 캐릭터가 있습니다.',
    char_mcclaren_role: '주인공',
    char_mcclaren_desc: 'Macduff McClaren은 전쟁으로 황폐해진 Pywel 세계를 헤쳐나가는 용병 리더입니다.',

    buy_intro: '크림슨 데저트는 2026년 3월 20일 PC(Steam), PS5, Xbox Series X/S로 출시됩니다.',
    buy_editions: '에디션',
    buy_standard: '스탠다드 에디션',
    buy_deluxe: '디럭스 에디션',
    buy_req_title: 'PC 사양',
    buy_req_min: '최소 사양',
    buy_req_rec: '권장 사양',
    buy_req_os: '운영체제',
    buy_req_cpu: 'CPU',
    buy_req_ram: 'RAM',
    buy_req_gpu: 'GPU',
    buy_req_storage: '저장공간',

    world_intro: '크림슨 데저트는 전쟁과 정치적 혼란으로 찢긴 중세 판타지 세계 Pywel을 배경으로 합니다.',

    coming_soon: '준비 중',
    back_to: '돌아가기',
  },

  ja: {
    nav_news: 'ニュース',
    nav_guides: 'ガイド',
    nav_characters: 'キャラクター',
    nav_database: 'データベース',
    nav_world: '世界観',
    nav_buy: '購入ガイド',

    nav_guides_beginner: '初心者ガイド',
    nav_guides_combat: '戦闘システム',
    nav_guides_boss: 'ボス攻略',
    nav_guides_walkthrough: 'メインストーリー',

    nav_db_weapons: '武器',
    nav_db_skills: 'スキル',
    nav_db_equipment: '装備',

    nav_world_map: 'インタラクティブマップ',
    nav_world_lore: 'ストーリー/世界観',
    nav_world_locations: 'ロケーション',

    hero_title: 'クリムゾン・デザート — ファンハブ',
    hero_subtitle: '攻略、ニュース、キャラクター、世界観 — Pearl Abyss オープンワールドアクションRPG',
    latest_news: '最新ニュース',
    read_more: '続きを読む',
    release_date: '発売日',
    release_date_value: '2026年3月20日',
    platforms: 'プラットフォーム',
    game_length: 'ストーリー時間',
    game_length_value: '50〜80時間',
    footer_desc: 'クリムゾン・デザート ファンサイト — 攻略、ニュース、データベース。',
    section_guides: '人気ガイド',
    section_characters: 'キャラクター',
    section_media: 'メディア',
    media_subtitle: 'トレーラー、ゲームプレイ、公式動画',

    char_intro: 'クリムゾン・デザートには、それぞれ独自の戦闘スタイルを持つ3人のプレイアブルキャラクターがいます。',
    char_mcclaren_role: '主人公',
    char_mcclaren_desc: 'Macduff McClaren は、戦乱の世界 Pywel を生き抜く傭兵リーダーです。',

    buy_intro: 'クリムゾン・デザートは2026年3月20日にPC(Steam)、PS5、Xbox Series X/Sで発売されます。',
    buy_editions: 'エディション',
    buy_standard: 'スタンダードエディション',
    buy_deluxe: 'デラックスエディション',
    buy_req_title: 'PC動作環境',
    buy_req_min: '最低動作環境',
    buy_req_rec: '推奨動作環境',
    buy_req_os: 'OS',
    buy_req_cpu: 'CPU',
    buy_req_ram: 'RAM',
    buy_req_gpu: 'GPU',
    buy_req_storage: 'ストレージ',

    world_intro: 'クリムゾン・デザートは、戦争と政治的混乱に引き裂かれた中世ファンタジー世界 Pywel を舞台にしています。',

    coming_soon: '近日公開',
    back_to: '戻る',
  },

  de: {
    nav_news: 'Neuigkeiten',
    nav_guides: 'Guides',
    nav_characters: 'Charaktere',
    nav_database: 'Datenbank',
    nav_world: 'Welt',
    nav_buy: 'Kaufratgeber',

    nav_guides_beginner: 'Einsteiger-Guide',
    nav_guides_combat: 'Kampfsystem',
    nav_guides_boss: 'Boss-Guide',
    nav_guides_walkthrough: 'Hauptstory',

    nav_db_weapons: 'Waffen',
    nav_db_skills: 'Fähigkeiten',
    nav_db_equipment: 'Ausrüstung',

    nav_world_map: 'Interaktive Karte',
    nav_world_lore: 'Story/Lore',
    nav_world_locations: 'Orte',

    hero_title: 'Crimson Desert — Dein Fan-Hub',
    hero_subtitle: 'Guides, News, Charaktere, Lore — Pearl Abyss Open-World-Action-RPG',
    latest_news: 'Neueste Nachrichten',
    read_more: 'Mehr lesen',
    release_date: 'Erscheinungsdatum',
    release_date_value: '20. März 2026',
    platforms: 'Plattformen',
    game_length: 'Story-Länge',
    game_length_value: '50–80 Stunden',
    footer_desc: 'Deine #1 Fan-Quelle für Crimson Desert News, Guides und Informationen.',
    section_guides: 'Beliebte Guides',
    section_characters: 'Charaktere',
    section_media: 'Medien',
    media_subtitle: 'Trailer, Gameplay und offizielle Videos',

    char_intro: 'Crimson Desert bietet 3 spielbare Charaktere mit einzigartigen Kampfstilen.',
    char_mcclaren_role: 'Hauptprotagonist',
    char_mcclaren_desc: 'Macduff McClaren ist der Hauptprotagonist — ein Söldnerführer in der kriegszerrissenen Welt Pywel.',

    buy_intro: 'Crimson Desert erscheint am 20. März 2026 für PC (Steam), PS5 und Xbox Series X/S.',
    buy_editions: 'Editionen',
    buy_standard: 'Standard Edition',
    buy_deluxe: 'Deluxe Edition',
    buy_req_title: 'PC-Anforderungen',
    buy_req_min: 'Mindestanforderungen',
    buy_req_rec: 'Empfohlene Anforderungen',
    buy_req_os: 'Betriebssystem',
    buy_req_cpu: 'CPU',
    buy_req_ram: 'RAM',
    buy_req_gpu: 'GPU',
    buy_req_storage: 'Speicher',

    world_intro: 'Crimson Desert spielt in der mittelalterlichen Fantasiewelt Pywel, einem von Krieg und politischen Wirren zerrissenen Land.',

    coming_soon: 'Demnächst',
    back_to: 'Zurück zu',
  },

  fr: {
    nav_news: 'Actualités',
    nav_guides: 'Guides',
    nav_characters: 'Personnages',
    nav_database: 'Base de données',
    nav_world: 'Monde',
    nav_buy: 'Guide d\'achat',

    nav_guides_beginner: 'Guide débutant',
    nav_guides_combat: 'Système de combat',
    nav_guides_boss: 'Guide des boss',
    nav_guides_walkthrough: 'Histoire principale',

    nav_db_weapons: 'Armes',
    nav_db_skills: 'Compétences',
    nav_db_equipment: 'Équipement',

    nav_world_map: 'Carte interactive',
    nav_world_lore: 'Histoire/Lore',
    nav_world_locations: 'Lieux',

    hero_title: 'Crimson Desert — Votre Hub Fan',
    hero_subtitle: 'Guides, actualités, personnages, lore — RPG action monde ouvert de Pearl Abyss',
    latest_news: 'Dernières actualités',
    read_more: 'Lire la suite',
    release_date: 'Date de sortie',
    release_date_value: '20 mars 2026',
    platforms: 'Plateformes',
    game_length: 'Durée de l\'histoire',
    game_length_value: '50–80 heures',
    footer_desc: 'Votre source fan #1 pour les news, guides et infos sur Crimson Desert.',
    section_guides: 'Guides populaires',
    section_characters: 'Personnages',
    section_media: 'Médias',
    media_subtitle: 'Bandes-annonces, gameplay et vidéos officielles',

    char_intro: 'Crimson Desert propose 3 personnages jouables avec des styles de combat uniques.',
    char_mcclaren_role: 'Protagoniste principal',
    char_mcclaren_desc: 'Macduff McClaren est le protagoniste principal — un chef mercenaire dans le monde déchiré par la guerre de Pywel.',

    buy_intro: 'Crimson Desert sort le 20 mars 2026 sur PC (Steam), PS5 et Xbox Series X/S.',
    buy_editions: 'Éditions',
    buy_standard: 'Édition Standard',
    buy_deluxe: 'Édition Deluxe',
    buy_req_title: 'Configuration PC',
    buy_req_min: 'Configuration minimale',
    buy_req_rec: 'Configuration recommandée',
    buy_req_os: 'OS',
    buy_req_cpu: 'CPU',
    buy_req_ram: 'RAM',
    buy_req_gpu: 'GPU',
    buy_req_storage: 'Stockage',

    world_intro: 'Crimson Desert se déroule dans le monde médiéval fantastique de Pywel, une terre déchirée par la guerre et les conflits politiques.',

    coming_soon: 'Bientôt disponible',
    back_to: 'Retour à',
  },

  es: {
    nav_news: 'Noticias',
    nav_guides: 'Guías',
    nav_characters: 'Personajes',
    nav_database: 'Base de datos',
    nav_world: 'Mundo',
    nav_buy: 'Guía de compra',

    nav_guides_beginner: 'Guía para principiantes',
    nav_guides_combat: 'Sistema de combate',
    nav_guides_boss: 'Guía de jefes',
    nav_guides_walkthrough: 'Historia principal',

    nav_db_weapons: 'Armas',
    nav_db_skills: 'Habilidades',
    nav_db_equipment: 'Equipamiento',

    nav_world_map: 'Mapa interactivo',
    nav_world_lore: 'Historia/Lore',
    nav_world_locations: 'Ubicaciones',

    hero_title: 'Crimson Desert — Tu Hub Fan',
    hero_subtitle: 'Guías, noticias, personajes, lore — RPG de acción mundo abierto de Pearl Abyss',
    latest_news: 'Últimas noticias',
    read_more: 'Leer más',
    release_date: 'Fecha de lanzamiento',
    release_date_value: '20 de marzo de 2026',
    platforms: 'Plataformas',
    game_length: 'Duración de la historia',
    game_length_value: '50–80 horas',
    footer_desc: 'Tu fuente fan #1 para noticias, guías e información sobre Crimson Desert.',
    section_guides: 'Guías populares',
    section_characters: 'Personajes',
    section_media: 'Medios',
    media_subtitle: 'Tráilers, gameplay y vídeos oficiales',

    char_intro: 'Crimson Desert presenta 3 personajes jugables con estilos de combate únicos.',
    char_mcclaren_role: 'Protagonista principal',
    char_mcclaren_desc: 'Macduff McClaren es el protagonista principal — un líder mercenario en el mundo devastado por la guerra de Pywel.',

    buy_intro: 'Crimson Desert se lanza el 20 de marzo de 2026 en PC (Steam), PS5 y Xbox Series X/S.',
    buy_editions: 'Ediciones',
    buy_standard: 'Edición Estándar',
    buy_deluxe: 'Edición Deluxe',
    buy_req_title: 'Requisitos de PC',
    buy_req_min: 'Requisitos mínimos',
    buy_req_rec: 'Requisitos recomendados',
    buy_req_os: 'SO',
    buy_req_cpu: 'CPU',
    buy_req_ram: 'RAM',
    buy_req_gpu: 'GPU',
    buy_req_storage: 'Almacenamiento',

    world_intro: 'Crimson Desert transcurre en el mundo de fantasía medieval de Pywel, una tierra desgarrada por la guerra y los conflictos políticos.',

    coming_soon: 'Próximamente',
    back_to: 'Volver a',
  },
}

export function t(locale: Locale, key: string): string {
  return translations[locale]?.[key] ?? translations['en'][key] ?? key
}
