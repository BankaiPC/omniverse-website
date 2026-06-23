import type { FC } from 'react';

interface Feature {
  title: string;
  description: string;
}

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
    </main>
  );
};

export default CryptoniteContent;
