import type { Lang } from './dictionary';

interface ApiNative {
  command: string;
  feature: string;
  what: string;
}

interface ApiDict {
  eyebrow: string;
  title: string;
  intro: string;
  commandCount: string;
  categoryNames: Record<string, string>;
  nativeTitle: string;
  nativeIntro: string;
  natives: ApiNative[];
  labelSource: string;
  labelExpand: string;
  labelCollapse: string;
  labelNativeBadge: string;
  labelBugNote: string;
}

export const API_DICTIONARY: Record<Lang, ApiDict> = {
  es: {
    eyebrow: 'API',
    title: 'Referencia RPC del nodo',
    intro:
      'Documentación compilada directamente del texto de ayuda real embebido en el código fuente del daemon (github.com/pallas1/Cryptonite, MIT) — cada entrada es lo que el nodo devuelve literalmente al ejecutar help <comando>. Firmas, parámetros, resultados y ejemplos se muestran tal cual, en inglés, como es estándar en documentación técnica de API.',
    commandCount: '74 comandos en 8 categorías. 4 son extensiones propias de Cryptonite, no heredadas de Bitcoin Core.',
    categoryNames: {
      'Overall control/query calls': 'Control y consulta general',
      'P2P networking': 'Red P2P',
      'Block chain and UTXO': 'Blockchain y UTXO',
      'Mining': 'Minería',
      'Raw transactions': 'Transacciones raw',
      'Utility functions': 'Funciones de utilidad',
      'Wallet': 'Cartera',
      'Wallet-enabled mining': 'Minería desde cartera',
    },
    nativeTitle: 'Extensiones propias de Cryptonite',
    nativeIntro:
      'Estos 4 comandos no existen en Bitcoin Core estándar — implementan las features del esquema mini-blockchain descritas en el whitepaper original.',
    natives: [
      {
        command: 'balancesat',
        feature: 'Árbol de Cuentas (Trie)',
        what: 'Consulta histórica de balance/límite en una altura de bloque dada — confirma que el Trie guarda age/limit/futurelimit por dirección, los 3 campos extra que el whitepaper especifica para los Límites de Retiro.',
      },
      {
        command: 'setlimit',
        feature: 'Límites de Retiro',
        what: 'Fija el límite de retiro por dirección (se encola y entra en vigor tras un retraso configurado).',
      },
      {
        command: 'listbalances',
        feature: 'Árbol de Cuentas',
        what: 'Lista balances de varias direcciones en una sola llamada.',
      },
      {
        command: 'setuprawtransaction',
        feature: 'Multisig',
        what: 'Prepara una transacción raw para firma multisignature.',
      },
    ],
    labelSource: 'Fuente',
    labelExpand: 'Ver Arguments / Result / Examples',
    labelCollapse: 'Ocultar detalle',
    labelNativeBadge: 'NATIVO',
    labelBugNote: 'Nota de corrección',
  },
  en: {
    eyebrow: 'API',
    title: 'Node RPC Reference',
    intro:
      'Documentation compiled directly from the real help text embedded in the daemon source code (github.com/pallas1/Cryptonite, MIT) — every entry is exactly what the node returns when you run help <command>. Signatures, parameters, results and examples are shown as-is, in English, as is standard for technical API documentation.',
    commandCount: '74 commands across 8 categories. 4 are Cryptonite-native extensions, not inherited from Bitcoin Core.',
    categoryNames: {
      'Overall control/query calls': 'Overall control/query calls',
      'P2P networking': 'P2P networking',
      'Block chain and UTXO': 'Block chain and UTXO',
      'Mining': 'Mining',
      'Raw transactions': 'Raw transactions',
      'Utility functions': 'Utility functions',
      'Wallet': 'Wallet',
      'Wallet-enabled mining': 'Wallet-enabled mining',
    },
    nativeTitle: 'Cryptonite-native extensions',
    nativeIntro:
      "These 4 commands don't exist in standard Bitcoin Core — they implement the mini-blockchain scheme features described in the original whitepaper.",
    natives: [
      {
        command: 'balancesat',
        feature: 'Account Tree (Trie)',
        what: 'Historical balance/limit query at a given block height — confirms the Trie keeps age/limit/futurelimit per address, the 3 extra fields the whitepaper specifies for Withdrawal Limits.',
      },
      {
        command: 'setlimit',
        feature: 'Withdrawal Limits',
        what: 'Sets the per-address withdrawal limit (queued, takes effect after a configured delay).',
      },
      {
        command: 'listbalances',
        feature: 'Account Tree',
        what: 'Lists balances for multiple addresses in one call.',
      },
      {
        command: 'setuprawtransaction',
        feature: 'Multisig',
        what: 'Prepares a raw transaction for multisignature signing.',
      },
    ],
    labelSource: 'Source',
    labelExpand: 'View Arguments / Result / Examples',
    labelCollapse: 'Hide detail',
    labelNativeBadge: 'NATIVE',
    labelBugNote: 'Correction note',
  },
  ru: {
    eyebrow: 'API',
    title: 'RPC-справочник ноды',
    intro:
      'Документация составлена напрямую из реального текста справки, встроенного в исходный код демона (github.com/pallas1/Cryptonite, MIT) — каждая запись — это именно то, что узел возвращает при вызове help <команда>. Сигнатуры, параметры, результаты и примеры показаны как есть, на английском — это стандарт для технической документации API.',
    commandCount: '74 команды в 8 категориях. 4 — собственные расширения Cryptonite, не унаследованные от Bitcoin Core.',
    categoryNames: {
      'Overall control/query calls': 'Общее управление и запросы',
      'P2P networking': 'P2P-сеть',
      'Block chain and UTXO': 'Блокчейн и UTXO',
      'Mining': 'Майнинг',
      'Raw transactions': 'Raw-транзакции',
      'Utility functions': 'Служебные функции',
      'Wallet': 'Кошелёк',
      'Wallet-enabled mining': 'Майнинг через кошелёк',
    },
    nativeTitle: 'Собственные расширения Cryptonite',
    nativeIntro:
      'Этих 4 команд нет в стандартном Bitcoin Core — они реализуют функции схемы мини-блокчейна, описанные в оригинальном whitepaper.',
    natives: [
      {
        command: 'balancesat',
        feature: 'Дерево аккаунтов (Trie)',
        what: 'Исторический запрос баланса/лимита на заданной высоте блока — подтверждает, что Trie хранит age/limit/futurelimit для каждого адреса — 3 дополнительных поля, которые whitepaper указывает для лимитов вывода.',
      },
      {
        command: 'setlimit',
        feature: 'Лимиты вывода',
        what: 'Устанавливает лимит вывода для адреса (ставится в очередь, вступает в силу после настроенной задержки).',
      },
      {
        command: 'listbalances',
        feature: 'Дерево аккаунтов',
        what: 'Возвращает балансы нескольких адресов за один вызов.',
      },
      {
        command: 'setuprawtransaction',
        feature: 'Мультиподпись',
        what: 'Готовит raw-транзакцию для мультиподписи.',
      },
    ],
    labelSource: 'Источник',
    labelExpand: 'Показать Arguments / Result / Examples',
    labelCollapse: 'Скрыть детали',
    labelNativeBadge: 'NATIVE',
    labelBugNote: 'Примечание об исправлении',
  },
  de: {
    eyebrow: 'API',
    title: 'Node-RPC-Referenz',
    intro:
      'Dokumentation direkt aus dem echten Hilfetext im Quellcode des Daemons zusammengestellt (github.com/pallas1/Cryptonite, MIT) — jeder Eintrag ist exakt das, was der Node bei help <Befehl> zurückgibt. Signaturen, Parameter, Result und Beispiele werden unverändert auf Englisch gezeigt, wie in technischer API-Dokumentation üblich.',
    commandCount: '74 Befehle in 8 Kategorien. 4 sind Cryptonite-eigene Erweiterungen, nicht von Bitcoin Core geerbt.',
    categoryNames: {
      'Overall control/query calls': 'Allgemeine Steuerung & Abfragen',
      'P2P networking': 'P2P-Netzwerk',
      'Block chain and UTXO': 'Blockchain & UTXO',
      'Mining': 'Mining',
      'Raw transactions': 'Raw-Transaktionen',
      'Utility functions': 'Hilfsfunktionen',
      'Wallet': 'Wallet',
      'Wallet-enabled mining': 'Mining über die Wallet',
    },
    nativeTitle: 'Cryptonite-eigene Erweiterungen',
    nativeIntro:
      'Diese 4 Befehle gibt es im Standard-Bitcoin-Core nicht — sie implementieren die Mini-Blockchain-Funktionen aus dem ursprünglichen Whitepaper.',
    natives: [
      {
        command: 'balancesat',
        feature: 'Account Tree (Trie)',
        what: 'Historische Balance-/Limit-Abfrage zu einer bestimmten Blockhöhe — bestätigt, dass der Trie age/limit/futurelimit pro Adresse speichert, die 3 zusätzlichen Felder, die das Whitepaper für Auszahlungslimits vorsieht.',
      },
      {
        command: 'setlimit',
        feature: 'Auszahlungslimits',
        what: 'Setzt das Auszahlungslimit pro Adresse (wird eingereiht, tritt nach einer konfigurierten Verzögerung in Kraft).',
      },
      {
        command: 'listbalances',
        feature: 'Account Tree',
        what: 'Listet die Guthaben mehrerer Adressen in einem einzigen Aufruf auf.',
      },
      {
        command: 'setuprawtransaction',
        feature: 'Multisig',
        what: 'Bereitet eine Raw-Transaktion für eine Multisignatur-Signierung vor.',
      },
    ],
    labelSource: 'Quelle',
    labelExpand: 'Arguments / Result / Examples anzeigen',
    labelCollapse: 'Detail ausblenden',
    labelNativeBadge: 'NATIV',
    labelBugNote: 'Korrekturhinweis',
  },
  zh: {
    eyebrow: 'API',
    title: '节点 RPC 参考文档',
    intro:
      '本文档直接整理自守护进程源码(github.com/pallas1/Cryptonite,MIT 许可)中内置的真实帮助文本——每一条都是节点执行 help <命令> 时返回的原文。签名、参数、返回结果与示例均保持英文原样,这是技术类 API 文档的通行做法。',
    commandCount: '共 74 个命令,分为 8 个类别。其中 4 个是 Cryptonite 独有的扩展,并非继承自 Bitcoin Core。',
    categoryNames: {
      'Overall control/query calls': '通用控制与查询',
      'P2P networking': 'P2P 网络',
      'Block chain and UTXO': '区块链与 UTXO',
      'Mining': '挖矿',
      'Raw transactions': '原始交易',
      'Utility functions': '实用工具函数',
      'Wallet': '钱包',
      'Wallet-enabled mining': '钱包内挖矿',
    },
    nativeTitle: 'Cryptonite 独有扩展',
    nativeIntro: '以下 4 个命令在标准 Bitcoin Core 中并不存在——它们实现了原始白皮书中描述的迷你区块链方案特性。',
    natives: [
      {
        command: 'balancesat',
        feature: '账户树(Trie)',
        what: '查询某个区块高度下地址的历史余额/限额——证实 Trie 确实为每个地址保存了 age/limit/futurelimit,这正是白皮书为提款限额规定的 3 个额外字段。',
      },
      {
        command: 'setlimit',
        feature: '提款限额',
        what: '设置某地址的提款限额(进入队列,在配置的延迟后生效)。',
      },
      {
        command: 'listbalances',
        feature: '账户树',
        what: '一次调用列出多个地址的余额。',
      },
      {
        command: 'setuprawtransaction',
        feature: '多重签名',
        what: '为多重签名准备一笔原始交易。',
      },
    ],
    labelSource: '来源',
    labelExpand: '查看 Arguments / Result / Examples',
    labelCollapse: '收起详情',
    labelNativeBadge: '原生',
    labelBugNote: '修正说明',
  },
};
