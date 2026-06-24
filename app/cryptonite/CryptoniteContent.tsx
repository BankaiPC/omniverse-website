import type { FC } from 'react';

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

const INTEGRATION_PHASES: IntegrationPhase[] = [
  {
    label: 'FASE 1',
    title: 'Transición',
    description:
      'Consolidación técnica y de marca de Cryptonite bajo Omniverse Games.',
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
    description:
      'Exchange exclusivo del ecosistema Omniverse para XCN y los activos del juego.',
  },
  {
    label: 'FASE 4',
    title: 'Expansión',
    description:
      'Nuevos casos de uso para XCN dentro y fuera del ecosistema Omniverse.',
  },
];

const ARCHITECTURE: ArchitectureLayer[] = [
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
];

const SPECS: Spec[] = [
  { value: '1 min', label: 'TIEMPO DE BLOQUE' },
  { value: 'M7', label: 'ALGORITMO POW' },
  { value: '64-bit', label: 'GRANULARIDAD DE SUMINISTRO' },
  { value: 'Dinámicos', label: 'RECOMPENSA, TAMAÑO Y DIFICULTAD' },
];

const TEAM: TeamMember[] = [
  { alias: 'bitfreak (J.D. Bruce)', role: 'Creador del esquema mini-blockchain' },
  { alias: 'Pallas', role: 'Desarrollo principal' },
  { alias: 'sekker2k4', role: 'Comunidad y redes' },
  { alias: 'enexus', role: 'Builds para Windows' },
];

const FEATURES: Feature[] = [
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
];

const CryptoniteContent: FC = () => {
  return (
    <main style={{ background: '#06120D', color: '#E8FFF3' }} className="min-h-screen">
      <header className="flex items-center justify-between px-6 md:px-10 py-6">
        <div className="flex items-center gap-3">
          <img src="/cryptonite/coin-logo.png" alt="" width={32} height={32} className="w-8 h-8" />
          <span className="font-bold tracking-[0.15em] text-sm">CRYPTONITE</span>
        </div>
        <span className="text-xs tracking-[0.2em] text-[#39FF8E]/70 border border-[#1C3A2E] px-3 py-1">
          PREVIEW PRIVADA
        </span>
      </header>

      <section className="flex flex-col items-center text-center px-6 pt-12 pb-20">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-3 text-[#E8FFF3] [text-shadow:0_0_30px_rgba(57,255,142,0.35)]">
          CRYPTONITE
        </h1>
        <p className="text-sm md:text-base tracking-[0.25em] text-[#39FF8E] mb-12">
          LA PRIMERA MINI-BLOCKCHAIN
        </p>

        <img
          src="/cryptonite/coin-logo.png"
          alt="Cryptonite"
          width={224}
          height={224}
          className="w-48 h-48 md:w-56 md:h-56 mb-16"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl w-full">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="border border-[#1C3A2E] bg-[#0A1F16] p-5 text-left"
            >
              <h3 className="text-sm font-bold mb-2 text-[#E8FFF3]">{feature.title}</h3>
              <p className="text-xs text-[#9CB8AC] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-xs tracking-[0.25em] text-[#39FF8E] mb-8 text-center">
          CÓMO FUNCIONA
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ARCHITECTURE.map((layer, i) => (
            <div key={layer.title} className="border border-[#1C3A2E] bg-[#0A1F16] p-5">
              <span className="text-2xl font-bold text-[#39FF8E]/40">0{i + 1}</span>
              <h3 className="text-sm font-bold mt-2 mb-2">{layer.title}</h3>
              <p className="text-xs text-[#9CB8AC] leading-relaxed">{layer.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 max-w-5xl mx-auto border-t border-[#1C3A2E]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {SPECS.map((spec) => (
            <div key={spec.label}>
              <p className="text-lg md:text-xl font-bold text-[#39FF8E]">{spec.value}</p>
              <p className="text-[10px] tracking-wide text-[#9CB8AC] mt-1">{spec.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 max-w-5xl mx-auto border-t border-[#1C3A2E]">
        <h2 className="text-xs tracking-[0.25em] text-[#39FF8E] mb-8 text-center">EQUIPO</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {TEAM.map((member) => (
            <div key={member.alias}>
              <p className="text-sm font-bold">{member.alias}</p>
              <p className="text-[11px] text-[#9CB8AC] mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 max-w-5xl mx-auto border-t border-[#1C3A2E] text-center">
        <h2 className="text-xs tracking-[0.25em] text-[#39FF8E] mb-6">MERCADOS</h2>
        <div className="flex flex-wrap justify-center gap-4 text-xs">
          <a
            href="https://freiexchange.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#1C3A2E] px-4 py-2 hover:border-[#39FF8E] transition-colors duration-200"
          >
            Listada en FreiExchange
          </a>
          <a
            href="https://coinmarketcap.com/currencies/cryptonite/historical-data/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#1C3A2E] px-4 py-2 hover:border-[#39FF8E] transition-colors duration-200"
          >
            Histórico en CoinMarketCap
          </a>
        </div>
      </section>

      <section className="px-6 py-16 max-w-5xl mx-auto border-t border-[#1C3A2E] text-center">
        <h2 className="text-xs tracking-[0.25em] text-[#39FF8E] mb-6">RECURSOS</h2>
        <div className="flex flex-wrap justify-center gap-4 text-xs">
          <a
            href="https://cryptonite.info/files/mbc-scheme-rev3.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#1C3A2E] px-4 py-2 hover:border-[#39FF8E] transition-colors duration-200"
          >
            Whitepaper (PDF)
          </a>
          <a
            href="https://github.com/pallas1/Cryptonite"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#1C3A2E] px-4 py-2 hover:border-[#39FF8E] transition-colors duration-200"
          >
            GitHub
          </a>
          <a
            href="https://cryptonite.info"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#1C3A2E] px-4 py-2 hover:border-[#39FF8E] transition-colors duration-200"
          >
            Sitio original
          </a>
        </div>
      </section>

      <section className="px-6 py-16 max-w-4xl mx-auto border-t border-[#1C3A2E]">
        <p className="text-xs tracking-[0.25em] text-[#39FF8E] mb-3 text-center">
          INTEGRACIÓN
        </p>
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
          XCN dentro del ecosistema Omniverse
        </h2>
        <p className="text-xs text-[#9CB8AC] mb-10 text-center max-w-xl mx-auto">
          Borrador interno — fases sujetas a ajuste.
        </p>

        <div className="space-y-4">
          {INTEGRATION_PHASES.map((phase) => (
            <div
              key={phase.label}
              className="border border-[#1C3A2E] bg-[#0A1F16] p-6 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6"
            >
              <span className="text-xs tracking-[0.2em] text-[#39FF8E] shrink-0 w-20">
                {phase.label}
              </span>
              <div>
                <h3 className="text-base font-bold mb-1">{phase.title}</h3>
                <p className="text-sm text-[#9CB8AC] leading-relaxed">
                  {phase.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default CryptoniteContent;
