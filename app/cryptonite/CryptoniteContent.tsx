import type { FC } from 'react';
import DiamondLogo from './DiamondLogo';

interface Feature {
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    title: 'Cryptonite Chain',
    description: 'Red propia diseñada para transacciones ligeras y rápidas.',
  },
  {
    title: 'Micro Blockchain',
    description: 'Arquitectura compacta, pensada para volumen alto sin fricción.',
  },
  {
    title: 'Microtransacciones',
    description: 'Pagos mínimos con coste casi nulo.',
  },
  {
    title: 'Transacciones Inmutables',
    description: 'Cada movimiento queda registrado de forma permanente y verificable.',
  },
];

const CryptoniteContent: FC = () => {
  return (
    <main style={{ background: '#06120D', color: '#E8FFF3' }} className="min-h-screen">
      <header className="flex items-center justify-between px-6 md:px-10 py-6">
        <div className="flex items-center gap-3">
          <DiamondLogo size={32} />
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

        <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full border-2 border-[#1C3A2E] flex items-center justify-center mb-16">
          <div className="absolute inset-2 rounded-full border border-[#39FF8E]/30" />
          <DiamondLogo size={80} />
        </div>

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
