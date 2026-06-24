export type Lang = 'es' | 'en' | 'ru' | 'de' | 'zh';

export const LANGUAGES: { code: Lang; label: string }[] = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'de', label: 'DE' },
  { code: 'zh', label: '中' },
];

interface Feature {
  title: string;
  description: string;
}

interface ArchitectureLayer {
  title: string;
  description: string;
}

interface Spec {
  value: string;
  label: string;
}

interface TeamMember {
  alias: string;
  role: string;
}

interface IntegrationPhase {
  label: string;
  title: string;
  description: string;
}

interface Dictionary {
  badge: string;
  tagline: string;
  features: Feature[];
  howItWorksEyebrow: string;
  architecture: ArchitectureLayer[];
  specs: Spec[];
  teamEyebrow: string;
  team: TeamMember[];
  marketsEyebrow: string;
  marketFrei: string;
  marketCmc: string;
  resourcesEyebrow: string;
  resourceWhitepaper: string;
  resourceGithub: string;
  resourceOriginal: string;
  integrationEyebrow: string;
  integrationTitle: string;
  integrationSubtitle: string;
  integrationPhases: IntegrationPhase[];
}

export const DICTIONARY: Record<Lang, Dictionary> = {
  es: {
    badge: 'PREVIEW PRIVADA',
    tagline: 'LA PRIMERA MINI-BLOCKCHAIN',
    features: [
      {
        title: 'Esquema Mini-Blockchain',
        description:
          'Las transacciones antiguas se descartan con el tiempo, así los nodos nuevos sincronizan en minutos y la minería se mantiene descentralizada.',
      },
      {
        title: 'Microtransacciones y Mensajes',
        description:
          'Al no acumular blockchain de forma indefinida, soporta pagos de valor mínimo y mensajes personalizados sin penalizar el tamaño de la red.',
      },
      {
        title: 'Límites de Retiro',
        description:
          'Cada dirección puede limitar cuánto se retira por bloque, dando más confianza en transacciones sin confirmar y reduciendo el riesgo de doble gasto.',
      },
      {
        title: 'Transacciones No Maleables',
        description:
          'El emisor firma el identificador de la transacción, así cualquier alteración lo cambia — evita los problemas de maleabilidad que afectaron a otros proyectos.',
      },
    ],
    howItWorksEyebrow: 'CÓMO FUNCIONA',
    architecture: [
      {
        title: 'Cadena de Prueba',
        description:
          'Conserva solo las cabeceras de bloque recientes con prueba de trabajo. Es la capa que asegura todo lo demás.',
      },
      {
        title: 'Mini-Blockchain',
        description:
          'Guarda las transacciones de los últimos días — lo justo para verificar la actividad reciente sin arrastrar el historial completo.',
      },
      {
        title: 'Árbol de Cuentas',
        description:
          'Un balance con el saldo de cada dirección activa, en vez de derivarlo de transacciones pasadas. Va asegurado por hash dentro de cada bloque.',
      },
    ],
    specs: [
      { value: '1 min', label: 'TIEMPO DE BLOQUE' },
      { value: 'M7', label: 'ALGORITMO POW' },
      { value: '64-bit', label: 'GRANULARIDAD DE SUMINISTRO' },
      { value: 'Dinámicos', label: 'RECOMPENSA, TAMAÑO Y DIFICULTAD' },
    ],
    teamEyebrow: 'EQUIPO',
    team: [
      { alias: 'bitfreak (J.D. Bruce)', role: 'Creador del esquema mini-blockchain' },
      { alias: 'Pallas', role: 'Desarrollo principal' },
      { alias: 'sekker2k4', role: 'Comunidad y redes' },
      { alias: 'enexus', role: 'Builds para Windows' },
    ],
    marketsEyebrow: 'MERCADOS',
    marketFrei: 'Listada en FreiExchange',
    marketCmc: 'Histórico en CoinMarketCap',
    resourcesEyebrow: 'RECURSOS',
    resourceWhitepaper: 'Whitepaper (PDF)',
    resourceGithub: 'GitHub',
    resourceOriginal: 'Sitio original',
    integrationEyebrow: 'INTEGRACIÓN',
    integrationTitle: 'XCN dentro del ecosistema Omniverse',
    integrationSubtitle: 'Borrador interno — fases sujetas a ajuste.',
    integrationPhases: [
      {
        label: 'FASE 1',
        title: 'Transición',
        description: 'Consolidación técnica y de marca de Cryptonite bajo Omniverse Games.',
      },
      {
        label: 'FASE 2',
        title: 'Integración',
        description:
          'XCN pasa a ser la moneda nativa de la economía de Omniverse: The Primordial Battlezone.',
      },
      {
        label: 'FASE 3',
        title: 'Exchange propio',
        description: 'Exchange exclusivo del ecosistema Omniverse para XCN y los activos del juego.',
      },
      {
        label: 'FASE 4',
        title: 'Expansión',
        description: 'Nuevos casos de uso para XCN dentro y fuera del ecosistema Omniverse.',
      },
    ],
  },
  en: {
    badge: 'PRIVATE PREVIEW',
    tagline: 'THE FIRST MINI-BLOCKCHAIN',
    features: [
      {
        title: 'Mini-Blockchain Scheme',
        description:
          'Old transactions are discarded over time, so new nodes sync in minutes and mining stays decentralized.',
      },
      {
        title: 'Microtransactions & Messages',
        description:
          "Since the blockchain doesn't grow indefinitely, it supports tiny payments and custom messages without bloating the network.",
      },
      {
        title: 'Withdrawal Limits',
        description:
          'Each address can cap how much leaves it per block, adding confidence to unconfirmed transactions and lowering double-spend risk.',
      },
      {
        title: 'Unmalleable Transactions',
        description:
          'The sender signs the transaction ID itself, so any change alters it — avoiding the malleability issues that affected other projects.',
      },
    ],
    howItWorksEyebrow: 'HOW IT WORKS',
    architecture: [
      {
        title: 'Proof Chain',
        description:
          "Keeps only the recent block headers with proof-of-work. It's the layer that secures everything else.",
      },
      {
        title: 'Mini-Blockchain',
        description:
          'Holds the last few days of transactions — just enough to verify recent activity without dragging along the full history.',
      },
      {
        title: 'Account Tree',
        description:
          'A ledger with the balance of every active address, instead of deriving it from past transactions. Secured by a hash inside every block.',
      },
    ],
    specs: [
      { value: '1 min', label: 'BLOCK TIME' },
      { value: 'M7', label: 'POW ALGORITHM' },
      { value: '64-bit', label: 'SUPPLY GRANULARITY' },
      { value: 'Dynamic', label: 'REWARD, SIZE & DIFFICULTY' },
    ],
    teamEyebrow: 'TEAM',
    team: [
      { alias: 'bitfreak (J.D. Bruce)', role: 'Creator of the mini-blockchain scheme' },
      { alias: 'Pallas', role: 'Lead development' },
      { alias: 'sekker2k4', role: 'Community & social' },
      { alias: 'enexus', role: 'Windows builds' },
    ],
    marketsEyebrow: 'MARKETS',
    marketFrei: 'Listed on FreiExchange',
    marketCmc: 'History on CoinMarketCap',
    resourcesEyebrow: 'RESOURCES',
    resourceWhitepaper: 'Whitepaper (PDF)',
    resourceGithub: 'GitHub',
    resourceOriginal: 'Original site',
    integrationEyebrow: 'INTEGRATION',
    integrationTitle: 'XCN inside the Omniverse ecosystem',
    integrationSubtitle: 'Internal draft — phases subject to change.',
    integrationPhases: [
      {
        label: 'PHASE 1',
        title: 'Transition',
        description: 'Technical and brand consolidation of Cryptonite under Omniverse Games.',
      },
      {
        label: 'PHASE 2',
        title: 'Integration',
        description:
          'XCN becomes the native currency of the Omniverse: The Primordial Battlezone economy.',
      },
      {
        label: 'PHASE 3',
        title: 'Dedicated exchange',
        description: 'An exclusive Omniverse-ecosystem exchange for XCN and in-game assets.',
      },
      {
        label: 'PHASE 4',
        title: 'Expansion',
        description: 'New use cases for XCN inside and outside the Omniverse ecosystem.',
      },
    ],
  },
  ru: {
    badge: 'ПРИВАТНЫЙ ПРЕДПРОСМОТР',
    tagline: 'ПЕРВЫЙ МИНИ-БЛОКЧЕЙН',
    features: [
      {
        title: 'Схема мини-блокчейна',
        description:
          'Старые транзакции со временем отбрасываются, поэтому новые узлы синхронизируются за минуты, а майнинг остаётся децентрализованным.',
      },
      {
        title: 'Микротранзакции и сообщения',
        description:
          'Поскольку блокчейн не растёт бесконечно, сеть поддерживает платежи минимальной величины и собственные сообщения без увеличения размера сети.',
      },
      {
        title: 'Лимиты вывода',
        description:
          'Каждый адрес может ограничивать сумму вывода за блок, что повышает доверие к неподтверждённым транзакциям и снижает риск двойной траты.',
      },
      {
        title: 'Немалеабельные транзакции',
        description:
          'Отправитель подписывает сам идентификатор транзакции, поэтому любое изменение меняет его — это устраняет проблемы маллеабельности, затронувшие другие проекты.',
      },
    ],
    howItWorksEyebrow: 'КАК ЭТО РАБОТАЕТ',
    architecture: [
      {
        title: 'Цепочка доказательств',
        description:
          'Хранит только заголовки последних блоков с доказательством работы. Это слой, который защищает всё остальное.',
      },
      {
        title: 'Мини-блокчейн',
        description:
          'Хранит транзакции за последние несколько дней — ровно столько, чтобы проверять недавнюю активность, не тащя за собой всю историю.',
      },
      {
        title: 'Дерево аккаунтов',
        description:
          'Реестр с балансом каждого активного адреса вместо вычисления его из прошлых транзакций. Защищён хешем внутри каждого блока.',
      },
    ],
    specs: [
      { value: '1 мин', label: 'ВРЕМЯ БЛОКА' },
      { value: 'M7', label: 'АЛГОРИТМ POW' },
      { value: '64-бит', label: 'ТОЧНОСТЬ ЭМИССИИ' },
      { value: 'Динамические', label: 'НАГРАДА, РАЗМЕР И СЛОЖНОСТЬ' },
    ],
    teamEyebrow: 'КОМАНДА',
    team: [
      { alias: 'bitfreak (J.D. Bruce)', role: 'Создатель схемы мини-блокчейна' },
      { alias: 'Pallas', role: 'Основная разработка' },
      { alias: 'sekker2k4', role: 'Сообщество и соцсети' },
      { alias: 'enexus', role: 'Сборки для Windows' },
    ],
    marketsEyebrow: 'РЫНКИ',
    marketFrei: 'Торгуется на FreiExchange',
    marketCmc: 'История на CoinMarketCap',
    resourcesEyebrow: 'РЕСУРСЫ',
    resourceWhitepaper: 'Белая книга (PDF)',
    resourceGithub: 'GitHub',
    resourceOriginal: 'Оригинальный сайт',
    integrationEyebrow: 'ИНТЕГРАЦИЯ',
    integrationTitle: 'XCN внутри экосистемы Omniverse',
    integrationSubtitle: 'Внутренний черновик — этапы могут измениться.',
    integrationPhases: [
      {
        label: 'ЭТАП 1',
        title: 'Переход',
        description:
          'Техническая и брендовая консолидация Cryptonite под управлением Omniverse Games.',
      },
      {
        label: 'ЭТАП 2',
        title: 'Интеграция',
        description: 'XCN становится основной валютой экономики Omniverse: The Primordial Battlezone.',
      },
      {
        label: 'ЭТАП 3',
        title: 'Собственная биржа',
        description: 'Эксклюзивная биржа экосистемы Omniverse для XCN и игровых активов.',
      },
      {
        label: 'ЭТАП 4',
        title: 'Расширение',
        description: 'Новые варианты применения XCN внутри и за пределами экосистемы Omniverse.',
      },
    ],
  },
  de: {
    badge: 'PRIVATE VORSCHAU',
    tagline: 'DIE ERSTE MINI-BLOCKCHAIN',
    features: [
      {
        title: 'Mini-Blockchain-Schema',
        description:
          'Alte Transaktionen werden mit der Zeit verworfen, sodass neue Knoten in Minuten synchronisieren und das Mining dezentral bleibt.',
      },
      {
        title: 'Mikrotransaktionen & Nachrichten',
        description:
          'Da die Blockchain nicht unbegrenzt wächst, unterstützt sie minimale Zahlungen und eigene Nachrichten, ohne das Netzwerk aufzublähen.',
      },
      {
        title: 'Auszahlungslimits',
        description:
          'Jede Adresse kann begrenzen, wie viel pro Block abgehen darf — das schafft mehr Vertrauen in unbestätigte Transaktionen und senkt das Risiko von Doppelausgaben.',
      },
      {
        title: 'Unveränderliche Transaktions-IDs',
        description:
          'Der Absender signiert die Transaktions-ID selbst, sodass jede Änderung sie verändert — das vermeidet die Malleability-Probleme, die andere Projekte betrafen.',
      },
    ],
    howItWorksEyebrow: 'WIE ES FUNKTIONIERT',
    architecture: [
      {
        title: 'Proof Chain',
        description:
          'Behält nur die Header der letzten Blöcke mit Proof-of-Work. Diese Schicht sichert alles andere ab.',
      },
      {
        title: 'Mini-Blockchain',
        description:
          'Speichert die Transaktionen der letzten Tage — gerade genug, um aktuelle Aktivität zu prüfen, ohne die komplette Historie mitzuschleppen.',
      },
      {
        title: 'Account Tree',
        description:
          'Eine Bilanz mit dem Guthaben jeder aktiven Adresse, statt es aus vergangenen Transaktionen abzuleiten. Durch einen Hash in jedem Block gesichert.',
      },
    ],
    specs: [
      { value: '1 Min.', label: 'BLOCKZEIT' },
      { value: 'M7', label: 'POW-ALGORITHMUS' },
      { value: '64-bit', label: 'SUPPLY-GRANULARITÄT' },
      { value: 'Dynamisch', label: 'BELOHNUNG, GRÖSSE & SCHWIERIGKEIT' },
    ],
    teamEyebrow: 'TEAM',
    team: [
      { alias: 'bitfreak (J.D. Bruce)', role: 'Schöpfer des Mini-Blockchain-Schemas' },
      { alias: 'Pallas', role: 'Hauptentwicklung' },
      { alias: 'sekker2k4', role: 'Community & Social Media' },
      { alias: 'enexus', role: 'Windows-Builds' },
    ],
    marketsEyebrow: 'MÄRKTE',
    marketFrei: 'Gelistet auf FreiExchange',
    marketCmc: 'Historie auf CoinMarketCap',
    resourcesEyebrow: 'RESSOURCEN',
    resourceWhitepaper: 'Whitepaper (PDF)',
    resourceGithub: 'GitHub',
    resourceOriginal: 'Ursprüngliche Website',
    integrationEyebrow: 'INTEGRATION',
    integrationTitle: 'XCN innerhalb des Omniverse-Ökosystems',
    integrationSubtitle: 'Interner Entwurf — Phasen können sich ändern.',
    integrationPhases: [
      {
        label: 'PHASE 1',
        title: 'Übergang',
        description:
          'Technische und markenbezogene Konsolidierung von Cryptonite unter Omniverse Games.',
      },
      {
        label: 'PHASE 2',
        title: 'Integration',
        description:
          'XCN wird zur nativen Währung der Wirtschaft von Omniverse: The Primordial Battlezone.',
      },
      {
        label: 'PHASE 3',
        title: 'Eigene Exchange',
        description: 'Eine exklusive Exchange des Omniverse-Ökosystems für XCN und Spiel-Assets.',
      },
      {
        label: 'PHASE 4',
        title: 'Expansion',
        description: 'Neue Anwendungsfälle für XCN innerhalb und außerhalb des Omniverse-Ökosystems.',
      },
    ],
  },
  zh: {
    badge: '私密预览',
    tagline: '第一个迷你区块链',
    features: [
      {
        title: '迷你区块链方案',
        description: '旧交易会随时间被清除,因此新节点可以在几分钟内完成同步,挖矿也能保持去中心化。',
      },
      {
        title: '微交易与留言',
        description: '由于区块链不会无限增长,网络可以支持极小额支付和自定义留言,而不会增加网络负担。',
      },
      {
        title: '提款限额',
        description: '每个地址可以限制每个区块能转出的金额,从而提高对未确认交易的信心,并降低双重花费的风险。',
      },
      {
        title: '不可篡改的交易',
        description:
          '发送方直接对交易ID本身签名,任何改动都会改变该ID——从而避免了影响其他项目的可塑性问题。',
      },
    ],
    howItWorksEyebrow: '运作原理',
    architecture: [
      {
        title: '证明链',
        description: '仅保留带有工作量证明的最新区块头,是保障其余部分安全的基础层。',
      },
      {
        title: '迷你区块链',
        description: '保存最近几天的交易记录——刚好足够验证近期活动,而不必携带完整的历史记录。',
      },
      {
        title: '账户树',
        description: '直接记录每个活跃地址的余额,而不是从历史交易中推算。每个区块中的哈希值都会对其进行保护。',
      },
    ],
    specs: [
      { value: '1分钟', label: '出块时间' },
      { value: 'M7', label: 'POW 算法' },
      { value: '64位', label: '供应精度' },
      { value: '动态调整', label: '奖励、区块大小与难度' },
    ],
    teamEyebrow: '团队',
    team: [
      { alias: 'bitfreak (J.D. Bruce)', role: '迷你区块链方案的创建者' },
      { alias: 'Pallas', role: '主要开发' },
      { alias: 'sekker2k4', role: '社区与社交媒体' },
      { alias: 'enexus', role: 'Windows 版本构建' },
    ],
    marketsEyebrow: '交易市场',
    marketFrei: '已在 FreiExchange 上市',
    marketCmc: 'CoinMarketCap 历史数据',
    resourcesEyebrow: '资源',
    resourceWhitepaper: '白皮书 (PDF)',
    resourceGithub: 'GitHub',
    resourceOriginal: '官方原站',
    integrationEyebrow: '整合',
    integrationTitle: 'XCN 融入 Omniverse 生态系统',
    integrationSubtitle: '内部草案——阶段安排可能调整。',
    integrationPhases: [
      {
        label: '阶段 1',
        title: '过渡阶段',
        description: '在 Omniverse Games 旗下完成 Cryptonite 的技术与品牌整合。',
      },
      {
        label: '阶段 2',
        title: '整合阶段',
        description: 'XCN 成为《Omniverse: The Primordial Battlezone》游戏经济体系的原生货币。',
      },
      {
        label: '阶段 3',
        title: '专属交易所',
        description: 'Omniverse 生态系统专属交易所,支持 XCN 与游戏内资产交易。',
      },
      {
        label: '阶段 4',
        title: '扩展阶段',
        description: '在 Omniverse 生态系统内外为 XCN 开拓新的应用场景。',
      },
    ],
  },
};
