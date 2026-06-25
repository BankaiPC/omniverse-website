import type { FC } from 'react';

interface Synergy {
  title: string;
  description: string;
}

const SYNERGIES: Synergy[] = [
  {
    title: 'Caja durante el desarrollo',
    description:
      'El juego (MVP) tarda 12 meses en lanzar, gracias a un workflow de desarrollo acelerado con IA. La academia factura desde el mes 3, extendiendo el runway efectivo del capital invertido.',
  },
  {
    title: 'Pipeline de talento propio',
    description:
      'Los mejores alumnos tienen acceso preferencial al estudio, contratados por mérito demostrado, 20–30% por debajo del mercado.',
  },
  {
    title: 'El estudio es el aula',
    description:
      'UE5, XCN, blockchain propietaria, launcher — tecnología real y activa como material docente, sin coste adicional.',
  },
  {
    title: 'Proyectos al launcher',
    description:
      'Un alumno destacado puede lanzar su proyecto en el ecosistema del launcher de Omniverse: distribución, exposición, comunidad orgánica.',
  },
  {
    title: 'Marca compartida',
    description:
      'Formarse en el estudio que construyó Omniverse Games y XCN es un diferencial de CV que ninguna certificación replica.',
  },
];

interface ScenarioRow {
  label: string;
  esc0: string;
  esc1: string;
  esc2: string;
}

const SCENARIOS: ScenarioRow[] = [
  { label: 'Inversión SAFE total', esc0: '€2.000.000', esc1: '€2.200.000', esc2: '€2.700.000' },
  { label: 'Equity', esc0: '17,5%', esc1: '17,5%', esc2: '17,5%' },
  { label: 'Post-money', esc0: '€11.429.000', esc1: '€12.571.000', esc2: '€15.429.000' },
  { label: 'Burn mensual combinado', esc0: '~€140.000', esc1: '~€158.000', esc2: '~€205.000' },
  { label: 'Ingresos pre-lanzamiento', esc0: '€0/mes', esc1: '~€13.000/mes', esc2: '~€55.000/mes' },
  { label: 'Runway efectivo', esc0: '~14,3 meses', esc1: '~15–16 meses', esc2: '~15,5 meses' },
  { label: 'Ingresos Año 1 (base)', esc0: '€5.223.366', esc1: '€5.368.366', esc2: '€5.673.366' },
  { label: 'Parte socio Año 1 (17,5%)', esc0: '€746.963', esc1: '€769.564', esc2: '€815.561' },
  { label: 'Parte socio Año 3 (17,5%)', esc0: '~€1.200.000', esc1: '~€1.256.500', esc2: '~€1.396.500' },
  { label: 'Break-even academia', esc0: 'N/A', esc1: 'Mes 8–10', esc2: 'Mes 18–22' },
];

const InvestorsContent: FC = () => {
  return (
    <main style={{ background: '#0A0A0B', color: '#E5E5E5' }} className="min-h-screen">
      <header className="flex items-center justify-between px-6 md:px-10 py-6">
        <span className="font-quantum tracking-[0.15em] text-sm">OMNIVERSE GAMES</span>
        <span
          className="text-xs tracking-[0.2em] uppercase border px-3 py-1"
          style={{ color: '#6D28D9', borderColor: '#27272A', borderRadius: '4px' }}
        >
          ACCESO CONFIDENCIAL
        </span>
      </header>

      <section className="px-6 py-12 max-w-5xl mx-auto">
        <p className="text-xs tracking-[0.25em] uppercase font-quantum mb-4" style={{ color: '#6D28D9' }}>
          ACADEMIA
        </p>
        <h1 className="text-3xl md:text-5xl font-quantum mb-6" style={{ color: '#E5E5E5' }}>
          Estudio + Academia
        </h1>
        <p className="text-sm md:text-base leading-relaxed mb-12 max-w-2xl" style={{ color: '#9B9BA3' }}>
          La academia en solitario es un bootcamp más. Dentro del ecosistema Omniverse Games es la
          única en España donde se aprende con un stack AA real y activo — UE5 en producción, XCN
          en blockchain real. La regla es simple: la academia nunca existe sin el estudio.
        </p>

        {/* Sinergias */}
        <h2 className="font-quantum text-xs tracking-widest uppercase mb-4" style={{ color: '#E5E5E5' }}>
          Por qué la combinación cambia el modelo
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px mb-16" style={{ background: '#27272A' }}>
          {SYNERGIES.map((s) => (
            <div key={s.title} className="p-6" style={{ background: '#111113' }}>
              <h3 className="font-quantum text-xs tracking-widest uppercase mb-3" style={{ color: '#E5E5E5' }}>
                {s.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: '#A1A1AA' }}>
                {s.description}
              </p>
            </div>
          ))}
        </div>

        {/* Comparativa de escenarios */}
        <h2 className="font-quantum text-xs tracking-widest uppercase mb-4" style={{ color: '#E5E5E5' }}>
          Los tres escenarios
        </h2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-xs md:text-sm border-collapse">
            <thead>
              <tr style={{ borderBottom: '1px solid #27272A' }}>
                <th className="text-left py-3 pr-4" style={{ color: '#9B9BA3' }}></th>
                <th className="text-left py-3 pr-4" style={{ color: '#E5E5E5' }}>
                  Esc. 0 · Solo Estudio
                </th>
                <th className="text-left py-3 pr-4" style={{ color: '#6D28D9' }}>
                  Esc. 1 · Academia Lean (UA)
                </th>
                <th className="text-left py-3 pr-4" style={{ color: '#E5E5E5' }}>
                  Esc. 2 · Academia Full (Mutxamel)
                </th>
              </tr>
            </thead>
            <tbody>
              {SCENARIOS.map((row) => (
                <tr key={row.label} style={{ borderBottom: '1px solid #1A1A1D' }}>
                  <td className="py-3 pr-4" style={{ color: '#9B9BA3' }}>{row.label}</td>
                  <td className="py-3 pr-4" style={{ color: '#E5E5E5' }}>{row.esc0}</td>
                  <td className="py-3 pr-4" style={{ color: '#E5E5E5' }}>{row.esc1}</td>
                  <td className="py-3 pr-4" style={{ color: '#E5E5E5' }}>{row.esc2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs leading-relaxed mb-16 max-w-2xl" style={{ color: '#71717A' }}>
          Escenario 1: incremento de €200K (+10%) sobre el plan base, break-even de la academia en
          8–10 meses, ~€700.000/año en ingresos académicos en Año 3. Escenario 2: incremento de €700K
          (+35%), break-even en 18–22 meses, nave propia como activo tangible, capacidad para 300+
          alumnos/año.
        </p>

        {/* Recomendación */}
        <div className="border p-8 md:p-10 mb-16" style={{ borderColor: '#27272A', borderRadius: '4px' }}>
          <h3 className="font-quantum text-xs tracking-widest uppercase mb-4" style={{ color: '#6D28D9' }}>
            Recomendación
          </h3>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#E5E5E5' }}>
            Para un inversor ya convencido del estudio: <strong>Escenario 1</strong> es la decisión
            óptima — incremento mínimo, ingresos desde el mes 3, break-even independiente en menos
            de un año.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: '#9B9BA3' }}>
            Para la posición más sólida posible: <strong>Escenario 2</strong> combina estudio +
            academia + activo inmobiliario, con retorno recurrente en Año 3 que recupera el capital
            adicional antes que el propio break-even del estudio.
          </p>
        </div>
      </section>

      {/* Mining Pool */}
      <section className="px-6 py-12 max-w-5xl mx-auto border-t" style={{ borderColor: '#27272A' }}>
        <p className="text-xs tracking-[0.25em] uppercase font-quantum mb-4" style={{ color: '#6D28D9' }}>
          BLOCKCHAIN XCN
        </p>
        <h2 className="text-2xl md:text-3xl font-quantum mb-6" style={{ color: '#E5E5E5' }}>
          Nodo XCN propio + Pool de Minería
        </h2>

        <div className="grid md:grid-cols-3 gap-px mb-6" style={{ background: '#27272A' }}>
          <div className="p-6" style={{ background: '#111113' }}>
            <p className="text-[10px] tracking-widest uppercase mb-2" style={{ color: '#71717A' }}>
              Responsable
            </p>
            <p className="text-sm font-quantum" style={{ color: '#E5E5E5' }}>Ilya (Blockchain)</p>
          </div>
          <div className="p-6" style={{ background: '#111113' }}>
            <p className="text-[10px] tracking-widest uppercase mb-2" style={{ color: '#71717A' }}>
              Prioridad
            </p>
            <p className="text-sm font-quantum" style={{ color: '#E5E5E5' }}>Crítica</p>
          </div>
          <div className="p-6" style={{ background: '#111113' }}>
            <p className="text-[10px] tracking-widest uppercase mb-2" style={{ color: '#71717A' }}>
              Sprint
            </p>
            <p className="text-sm font-quantum" style={{ color: '#E5E5E5' }}>Sprint 2 · Mes 1</p>
          </div>
        </div>

        <div className="border p-8" style={{ borderColor: '#27272A', borderRadius: '4px' }}>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#E5E5E5' }}>
            Pool de minería del desarrollador activo desde el mes 1–2. Genera ingresos pasivos
            inmediatos, sin esperar al lanzamiento del juego.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-lg font-quantum" style={{ color: '#6D28D9' }}>150 XCN/hora</p>
              <p className="text-[10px] tracking-widest uppercase mt-1" style={{ color: '#71717A' }}>
                Developer Fee · transferido automáticamente a la wallet del estudio
              </p>
            </div>
            <div>
              <p className="text-lg font-quantum" style={{ color: '#6D28D9' }}>3%</p>
              <p className="text-[10px] tracking-widest uppercase mt-1" style={{ color: '#71717A' }}>
                Fee del pool
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default InvestorsContent;
