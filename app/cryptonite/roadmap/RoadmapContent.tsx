import type { FC } from 'react';

interface Phase {
  label: string;
  title: string;
  description: string;
}

const PHASES: Phase[] = [
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

const RoadmapContent: FC = () => {
  return (
    <main style={{ background: '#06120D', color: '#E8FFF3' }} className="min-h-screen">
      <header className="flex items-center justify-between px-6 md:px-10 py-6">
        <div className="flex items-center gap-3">
          <img src="/cryptonite/coin-logo.png" alt="" width={32} height={32} className="w-8 h-8" />
          <span className="font-bold tracking-[0.15em] text-sm">CRYPTONITE</span>
        </div>
        <span className="text-xs tracking-[0.2em] text-[#39FF8E]/70 border border-[#1C3A2E] px-3 py-1">
          ACCESO CONFIDENCIAL
        </span>
      </header>

      <section className="px-6 pt-8 pb-20 max-w-4xl mx-auto">
        <p className="text-xs tracking-[0.25em] text-[#39FF8E] mb-3">ROADMAP</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          XCN dentro del ecosistema Omniverse
        </h1>
        <p className="text-sm text-[#9CB8AC] mb-12 max-w-2xl">
          Borrador interno — fases sujetas a ajuste. No distribuir fuera del
          círculo de bitfreak, inversores y Ilya.
        </p>

        <div className="space-y-4">
          {PHASES.map((phase) => (
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

export default RoadmapContent;
