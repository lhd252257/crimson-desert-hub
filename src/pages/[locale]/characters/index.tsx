import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '@/components/Layout'
import { Locale, locales, t } from '@/lib/i18n'

export default function CharactersPage({ locale }: { locale: Locale }) {
  const characters = [
    {
      slug: 'kliff',
      name: 'Kliff',
      role: t(locale, 'char_kliff_role'),
      description: t(locale, 'char_kliff_desc'),
      image: '/images/04.jpg',
      skills: ['char_kliff_skill1', 'char_kliff_skill2', 'char_kliff_skill3', 'char_kliff_skill4'],
    },
    {
      slug: 'damiane',
      name: 'Damiane',
      role: locale === 'zh' ? '迅捷剑客' : 'Swift Swordswoman',
      description: locale === 'zh'
        ? 'Damiane是一位精通多种武器的多才多艺战士，擅长使用巨剑、细剑、步枪、手枪和她标志性的机械伞。她的机械伞不仅是武器，更是滑翔工具，让她能够在Pywel大陆的天空岛屿间自由穿梭。'
        : 'Damiane is a versatile fighter proficient with Greatsword, Rapier, Rifle, Pistol, and her signature Parasol Machine. The mechanical parasol doubles as a gliding tool, letting her traverse sky islands and strike from above.',
      image: '/images/05.jpg',
      skills: [],
    },
    {
      slug: 'oongka',
      name: 'Oongka',
      role: t(locale, 'char_oongka_role'),
      description: t(locale, 'char_oongka_desc'),
      image: '/images/06.jpg',
      skills: ['char_oongka_skill1', 'char_oongka_skill2', 'char_oongka_skill3', 'char_oongka_skill4'],
    },
    {
      slug: 'yann',
      name: 'Yann',
      role: t(locale, 'char_yann_role'),
      description: t(locale, 'char_yann_desc'),
      image: '/images/08.jpg',
      skills: ['char_yann_skill1', 'char_yann_skill2', 'char_yann_skill3', 'char_yann_skill4'],
    },
    {
      slug: 'naira',
      name: 'Naira',
      role: t(locale, 'char_naira_role'),
      description: t(locale, 'char_naira_desc'),
      image: '/images/07.jpg',
      skills: ['char_naira_skill1', 'char_naira_skill2', 'char_naira_skill3', 'char_naira_skill4'],
    },
  ]

  const skillsMap: Record<string, Record<string, string[]>> = {
    kliff: {
      en: ['Son of Martinus, legendary founder of the Greymanes mercenary company', 'Master swordsmanship with Sword & Shield, Spear, and Fists', 'Combat leadership and tactical decision-making', 'Ability to inspire and unite scattered allies'],
      zh: ['传奇灰鬃雇佣兵团创始人Martinus之子', '精通剑盾、长矛和徒手格斗', '战斗领导力与战术决策能力', '激励和团结分散盟友的能力'],
    },
    damiane: {
      en: ['Parasol Machine for gliding, aerial attacks, and sky island traversal', 'Dual-wield Rapier and Pistol for rapid close-to-mid range combos', 'Greatsword for wide cleaving arcs against groups', 'Rifle for long-range precision before enemies close distance'],
      zh: ['机械伞用于滑翔、空中攻击和天空岛屿穿越', '细剑与手枪双持，快速近中距离连击', '巨剑大范围横扫，对付敌人群体', '步枪远程精准射击，在敌人靠近前消灭目标'],
    },
    oongka: {
      en: ['Exceptional combat skills and battlefield awareness', 'Deep knowledge of Pywel\'s terrain and dangers', 'Loyalty and dedication to the Grey Mane cause', 'Survival expertise in harsh environments'],
      zh: ['卓越的战斗技能和战场意识', '对Pywel地形和危险的深入了解', '对灰鬃事业的忠诚和奉献', '在恶劣环境中的生存专业知识'],
    },
    yann: {
      en: ['Strategic thinking and political acumen', 'Diplomatic negotiation skills', 'Knowledge of Pywel\'s factions and politics', 'Resource gathering and management'],
      zh: ['战略思维和政治敏锐度', '外交谈判技巧', '对Pywel派系和政治的了解', '资源收集和管理'],
    },
    naira: {
      en: ['Versatile combat techniques and adaptability', 'Expertise with multiple weapon types', 'Courage and willingness to face danger', 'Team coordination and support capabilities'],
      zh: ['多才多艺的战斗技巧和适应性', '多种武器类型的专业知识', '面对危险的勇气和意愿', '团队协调和支持能力'],
    },
  }

  const getSkills = (slug: string) => {
    const map = skillsMap[slug]
    if (!map) return []
    return map[locale] ?? map['en'] ?? []
  }

  return (
    <Layout locale={locale} title={t(locale, 'nav_characters')} description="Meet the playable characters of Crimson Desert.">
      <div className="container py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px flex-1 bg-brand-border" />
          <h1 className="text-xl tracking-[0.3em] uppercase text-brand-primary" style={{ fontFamily: 'Cinzel, serif' }}>
            {t(locale, 'nav_characters')}
          </h1>
          <div className="h-px flex-1 bg-brand-border" />
        </div>
        <p className="text-center text-brand-muted text-xs tracking-widest uppercase mb-12" style={{ fontFamily: 'Cinzel, serif' }}>
          {t(locale, 'char_intro')}
        </p>

        {/* Characters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {characters.map((char) => (
            <div key={char.slug} className="bg-brand-card border border-brand-border overflow-hidden hover:border-brand-primary transition-colors group">
              <div className="aspect-video overflow-hidden">
                <img
                  src={char.image}
                  alt={char.name}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              </div>
              <div className="p-6">
                <div className="text-brand-primary text-xs tracking-widest uppercase mb-1" style={{ fontFamily: 'Cinzel, serif' }}>{char.role}</div>
                <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Cinzel, serif' }}>{char.name}</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{char.description}</p>
                <div className="border-t border-brand-border pt-4">
                  <div className="text-brand-primary text-xs tracking-widest uppercase mb-3" style={{ fontFamily: 'Cinzel, serif' }}>
                    {t(locale, 'char_skills_title')}
                  </div>
                  <ul className="space-y-1">
                    {getSkills(char.slug).map((skill, i) => (
                      <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                        <span className="text-brand-primary mt-0.5">⚔</span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Faction Section */}
        <div className="border border-brand-border p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-brand-border" />
            <h2 className="text-xl tracking-[0.3em] uppercase text-brand-primary" style={{ fontFamily: 'Cinzel, serif' }}>
              {t(locale, 'char_faction_title')}
            </h2>
            <div className="h-px flex-1 bg-brand-border" />
          </div>
          <div className="space-y-4 max-w-3xl mx-auto">
            <p className="text-gray-400 leading-relaxed">{t(locale, 'char_faction_desc1')}</p>
            <p className="text-gray-400 leading-relaxed">{t(locale, 'char_faction_desc2')}</p>
            <p className="text-gray-300 leading-relaxed italic">{t(locale, 'char_faction_desc3')}</p>
          </div>
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
