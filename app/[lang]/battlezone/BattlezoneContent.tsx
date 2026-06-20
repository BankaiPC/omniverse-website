'use client';

import { motion } from 'framer-motion';
import GamingButton from '@/components/GamingButton';

interface BattlezoneContentProps {
  lang: 'en' | 'es';
}

interface Race {
  id: string;
  name: string;
  image: string | null;
  tagEs: string;
  tagEn: string;
  descEs: string;
  descEn: string;
  accent: string;
}

const RACES: Race[] = [
  {
    id: 'voidrax',
    name: 'Voidrax',
    image: '/races/voidrax.jpg',
    tagEs: 'Draconianos',
    tagEn: 'Draconians',
    accent: '#EF4444',
    descEs: 'Los primeros en llegar a este universo. Ninguno recuerda nada de antes de despertar aquí — y esa amnesia se convirtió en certeza: toda la creación les pertenece por derecho de nacimiento. Astutos, feroces, conquistadores que no conocen la tregua. Su piel escamosa es casi una armadura en sí misma, pero la cubren con placas de combate por orgullo, no por necesidad.',
    descEn: 'The first to arrive in this universe. None of them remember anything from before waking up here — and that amnesia became certainty: all of creation belongs to them by birthright. Cunning, fierce, conquerors who know no truce. Their scaled skin is almost armor in itself, yet they cover it in combat plating out of pride, not necessity.',
  },
  {
    id: 'elurion',
    name: 'Elurion',
    image: '/races/elurion.jpg',
    tagEs: 'Elfos de Luz',
    tagEn: 'Elves of Light',
    accent: '#FB923C',
    descEs: 'Viven pegados a las estrellas, absorbiendo su luz como otros respiran aire. Se presentan como los seres más bondadosos del Omniverso. La realidad es otra: bajo ese barniz dorado son imperialistas convencidos de que su luz tiene derecho a cubrir cualquier oscuridad ajena. Su tecnología es tan avanzada como su retórica.',
    descEn: 'They live pressed against the stars, absorbing their light the way others breathe air. They present themselves as the kindest beings in the Omniverse. The truth is different: beneath that golden varnish they are imperialists, convinced their light has a right to cover any darkness but their own. Their technology is as advanced as their rhetoric.',
  },
  {
    id: 'umbraxis',
    name: 'Umbraxis',
    image: '/races/umbraxis.jpg',
    tagEs: 'Elfos Oscuros',
    tagEn: 'Dark Elves',
    accent: '#6D28D9',
    descEs: 'La otra mitad de la misma sangre que los Elurion — pero donde unos buscaron las estrellas, los Umbraxis eligieron los márgenes: los confines de las galaxias, para hacer guardia. No es una pose. Son genuinamente altruistas, guardianes de las razas menores frente a los peligros del cosmos profundo. Su culto no es al sol — es a la noche y a la sombra.',
    descEn: 'The other half of the same bloodline as the Elurion — but where one sought the stars, the Umbraxis chose the margins: the edges of galaxies, standing guard. It is not a pose. They are genuinely altruistic, guardians of lesser races against the dangers of deep cosmos. Their cult is not to the sun — it is to night and shadow.',
  },
  {
    id: 'orkvids',
    name: 'Orkvids',
    image: '/races/orkvids.jpg',
    tagEs: 'Orcos Vampiro',
    tagEn: 'Vampire Orcs',
    accent: '#DC2626',
    descEs: 'Una raza forjada en el hambre y la guerra a partes iguales. Lo que tienen de brutalidad en el campo de batalla lo compensan con una jerarquía propia, regida por códigos de sangre que pocos fuera de su raza llegan a comprender.',
    descEn: 'A race forged equally by hunger and war. What they carry in battlefield brutality, they balance with their own hierarchy, governed by blood codes that few outside their race ever come to understand.',
  },
  {
    id: 'mechtrons',
    name: 'Mechtrons',
    image: '/races/mechtrons.jpg',
    tagEs: 'Máquinas',
    tagEn: 'Machines',
    accent: '#22D3EE',
    descEs: 'Tuvieron cuerpos de carne hace milenios. Ya no. Ahora viven imbuidos en chasis robóticos avanzados, y esa transición borró cualquier nostalgia por lo orgánico — su forma de vida consiste en registrar, datar, archivar todo lo que ocurre en el Omniverso. Por eso la Convergencia es, para ellos, la motivación más alta que existe.',
    descEn: 'They had bodies of flesh millennia ago. No longer. Now they live embedded in advanced robotic chassis, and that transition erased any nostalgia for the organic — their way of life is to record, date and archive everything that happens in the Omniverse. That is why the Convergence is, for them, the highest motivation that exists.',
  },
  {
    id: 'solaris',
    name: 'Solaris',
    image: null,
    tagEs: 'Humanos',
    tagEn: 'Humans',
    accent: '#C4C4CC',
    descEs: 'Humanos de ciencia ficción, con colonias repartidas por el sistema solar. Mientras otras razas ven la Convergencia como destino o conquista, los Solaris la ven como lo que es para ellos: un acto cruel impuesto desde fuera. Y han jurado venganza.',
    descEn: 'Sci-fi humans, with colonies spread across the solar system. While other races see the Convergence as destiny or conquest, the Solaris see it for what it is to them: a cruel act imposed from outside. And they have sworn revenge.',
  },
  {
    id: 'frounds',
    name: 'Frounds',
    image: null,
    tagEs: 'Comerciantes',
    tagEn: 'Traders',
    accent: '#9B9BA3',
    descEs: 'Seres de estatura media, comerciantes natos del Omniverso. No son guerreros ni conquistadores — son la red que conecta a todas las demás razas a través del intercambio. Se les conocerá sobre todo en la tienda online, donde comercian con todo tipo de objetos.',
    descEn: 'Medium-height beings, born traders of the Omniverse. They are neither warriors nor conquerors — they are the network connecting every other race through exchange. You will mostly encounter them in the online store, trading every kind of item.',
  },
];

const PILLARS_ES = [
  { title: 'Third-Person Shooter', desc: 'Combate directo, táctico y visceral en tercera persona. Cada raza, cada clase, una forma distinta de pelear.' },
  { title: 'RPG Competitivo', desc: 'Progresión real de personaje sobre una base PvP competitiva — no cosmética, no superficial.' },
  { title: 'Unreal Engine', desc: 'Construido sobre Unreal Engine para fidelidad visual y rendimiento de última generación.' },
  { title: 'Blockchain Propia', desc: 'Economía de activos digitales sobre nuestra propia cadena. Sin Ethereum, sin intermediarios.' },
];

const PILLARS_EN = [
  { title: 'Third-Person Shooter', desc: 'Direct, tactical, visceral third-person combat. Every race, every class, a different way to fight.' },
  { title: 'Competitive RPG', desc: 'Real character progression built on a competitive PvP foundation — not cosmetic, not surface-level.' },
  { title: 'Unreal Engine', desc: 'Built on Unreal Engine for next-generation visual fidelity and performance.' },
  { title: 'Own Blockchain', desc: 'Digital asset economy on our own chain. No Ethereum, no middlemen.' },
];

const ROADMAP_ES = [
  { phase: 'Concepto', desc: 'Lore, razas y diseño de mundo en desarrollo activo.', status: 'current' },
  { phase: 'Alpha', desc: 'Primeras builds jugables, pruebas internas de combate y clases.', status: 'upcoming' },
  { phase: 'Beta', desc: 'Apertura a comunidad, ajuste de balance y economía.', status: 'upcoming' },
  { phase: 'Lanzamiento', desc: 'Launcher público, wallet integrada, primera temporada competitiva.', status: 'upcoming' },
];

const ROADMAP_EN = [
  { phase: 'Concept', desc: 'Lore, races and world design in active development.', status: 'current' },
  { phase: 'Alpha', desc: 'First playable builds, internal combat and class testing.', status: 'upcoming' },
  { phase: 'Beta', desc: 'Community opens up, balance and economy tuning.', status: 'upcoming' },
  { phase: 'Launch', desc: 'Public launcher, integrated wallet, first competitive season.', status: 'upcoming' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' as const } },
};

export default function BattlezoneContent({ lang }: BattlezoneContentProps) {
  const isEs = lang === 'es';
  const pillars = isEs ? PILLARS_ES : PILLARS_EN;
  const roadmap = isEs ? ROADMAP_ES : ROADMAP_EN;

  return (
    <main style={{ background: '#0A0A0B' }}>

      {/* HERO */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden" style={{ background: '#0A0A0B' }}>
        {/* Starfield — static, layered for depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(1px 1px at 12% 18%, #FFFFFF 100%, transparent),
              radial-gradient(1px 1px at 28% 64%, #FFFFFF 100%, transparent),
              radial-gradient(1.5px 1.5px at 41% 8%, #FFFFFF 100%, transparent),
              radial-gradient(1px 1px at 55% 42%, #FFFFFF 100%, transparent),
              radial-gradient(1px 1px at 68% 76%, #FFFFFF 100%, transparent),
              radial-gradient(1.5px 1.5px at 78% 22%, #FFFFFF 100%, transparent),
              radial-gradient(1px 1px at 88% 55%, #FFFFFF 100%, transparent),
              radial-gradient(1px 1px at 6% 82%, #FFFFFF 100%, transparent),
              radial-gradient(1.5px 1.5px at 95% 88%, #FFFFFF 100%, transparent),
              radial-gradient(1px 1px at 35% 92%, #FFFFFF 100%, transparent),
              radial-gradient(1px 1px at 18% 38%, #FFFFFF 100%, transparent),
              radial-gradient(1px 1px at 62% 14%, #FFFFFF 100%, transparent)
            `,
            backgroundRepeat: 'no-repeat',
            opacity: 0.8,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #E5E5E5 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Nebula glows */}
        <div
          className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(109,40,217,0.22) 0%, transparent 70%)', filter: 'blur(90px)' }}
        />
        <div
          className="absolute top-1/2 right-0 w-[500px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 70%)', filter: 'blur(100px)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[450px] h-[350px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(109,40,217,0.16) 0%, transparent 70%)', filter: 'blur(85px)' }}
        />

        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative z-10 max-w-4xl">
          <span
            className="inline-block text-xs font-quantum px-3 py-1 mb-6 tracking-widest uppercase"
            style={{ color: '#A78BFA', border: '1px solid rgba(109,40,217,0.4)' }}
          >
            {isEs ? 'Primer Proyecto — Omniverse Games' : 'First Project — Omniverse Games'}
          </span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-quantum font-bold mb-4" style={{ color: '#E5E5E5' }}>
            OMNIVERSE
          </h1>
          <p className="text-xl md:text-2xl font-quantum tracking-[0.15em] uppercase mb-8" style={{ color: '#9B9BA3' }}>
            {isEs ? 'La Zona de Batalla Primordial' : 'The Primordial Battlezone'}
          </p>

          <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10" style={{ color: '#C4C4CC' }}>
            {isEs
              ? 'Un Third-Person Shooter RPG competitivo construido en Unreal Engine, donde siete razas luchan por un lugar en la divinidad — sobre una economía respaldada por blockchain propia.'
              : 'A competitive RPG Third-Person Shooter built on Unreal Engine, where seven races fight for a place in divinity — backed by an economy on our own blockchain.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <GamingButton>{isEs ? 'Descargar Launcher' : 'Download Launcher'}</GamingButton>
            <GamingButton variant="secondary">{isEs ? 'Unirse a Discord' : 'Join Discord'}</GamingButton>
          </div>
        </motion.div>
      </section>

      {/* LOS INCREADOS */}
      <section className="relative py-20 px-6" style={{ background: '#111113', borderTop: '1px solid #27272A', borderBottom: '1px solid #27272A' }}>
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span className="text-xs font-quantum tracking-widest uppercase mb-4 inline-block" style={{ color: '#6D28D9' }}>
            {isEs ? 'Cosmología' : 'Cosmology'}
          </span>
          <h2 className="text-3xl md:text-5xl font-quantum font-bold mb-8" style={{ color: '#E5E5E5' }}>
            {isEs ? 'Los Increados' : 'The Uncreated'}
          </h2>
          <p className="text-base md:text-lg leading-relaxed mb-5" style={{ color: '#C4C4CC' }}>
            {isEs
              ? 'El Omniverso no es un lugar. Es una espuma — una extensión infinita de burbujas suspendidas en la nada, y cada burbuja es un universo completo: sus propias leyes, su propio tiempo, su propia muerte ya escrita.'
              : 'The Omniverse is not a place. It is a foam — an infinite expanse of bubbles suspended in nothingness, and every bubble is a complete universe: its own laws, its own time, its own death already written.'}
          </p>
          <p className="text-base md:text-lg leading-relaxed mb-5" style={{ color: '#C4C4CC' }}>
            {isEs
              ? 'Los Increados crearon esa espuma — cada burbuja, cada universo, es su obra. Pero se aburrieron de ver cómo esas burbujas vivían y morían sin propósito. Por eso diseñaron la Convergencia: una competición a través de las burbujas donde las razas elegidas demuestran si merecen acompañarlos en la divinidad.'
              : 'The Uncreated made that foam — every bubble, every universe, is their work. But they grew bored watching those bubbles live and die without purpose. So they designed the Convergence: a competition across the bubbles where chosen races prove whether they deserve to join them in divinity.'}
          </p>
          <p className="text-sm italic" style={{ color: '#52525B' }}>
            {isEs ? 'Nadie sabe qué pasa con los que pierden.' : 'No one knows what happens to those who lose.'}
          </p>
        </motion.div>
      </section>

      {/* RAZAS */}
      <section className="py-20 px-6">
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span className="text-xs font-quantum tracking-widest uppercase mb-4 inline-block" style={{ color: '#6D28D9' }}>
            {isEs ? 'Siete Razas, Una Convergencia' : 'Seven Races, One Convergence'}
          </span>
          <h2 className="text-3xl md:text-5xl font-quantum font-bold" style={{ color: '#E5E5E5' }}>
            {isEs ? 'Razas' : 'Races'}
          </h2>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#27272A' }}>
          {RACES.map((race, i) => (
            <motion.div
              key={race.id}
              className="relative group overflow-hidden"
              style={{ background: '#0A0A0B' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.2, ease: 'easeOut', delay: (i % 3) * 0.05 }}
            >
              <div className="h-72 relative overflow-hidden flex items-center justify-center" style={{ background: '#111113', borderBottom: '1px solid #27272A' }}>
                {race.image ? (
                  <img
                    src={race.image}
                    alt={race.name}
                    className="h-full w-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-200"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#3F3F46" strokeWidth="1" className="w-12 h-12">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20c0-3.3 2.7-6 6-6h4c3.3 0 6 2.7 6 6" />
                    </svg>
                    <span className="text-xs uppercase tracking-widest" style={{ color: '#3F3F46' }}>
                      {isEs ? 'Próximamente' : 'Coming Soon'}
                    </span>
                  </div>
                )}
                <div
                  className="absolute top-3 left-3 px-2 py-1 text-[10px] font-quantum uppercase tracking-widest"
                  style={{ background: 'rgba(10,10,11,0.8)', color: race.accent, border: `1px solid ${race.accent}40` }}
                >
                  {isEs ? race.tagEs : race.tagEn}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-quantum mb-3" style={{ color: '#E5E5E5' }}>
                  {race.name}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#C4C4CC' }}>
                  {isEs ? race.descEs : race.descEn}
                </p>
              </div>

              <div
                className="absolute left-0 top-0 w-[2px] h-0 group-hover:h-full transition-all duration-200"
                style={{ background: race.accent }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* PILARES */}
      <section className="py-20 px-6" style={{ background: '#111113', borderTop: '1px solid #27272A', borderBottom: '1px solid #27272A' }}>
        <motion.h2
          className="text-3xl md:text-5xl font-quantum font-bold text-center mb-14"
          style={{ color: '#E5E5E5' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          {isEs ? 'El Juego' : 'The Game'}
        </motion.h2>

        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: '#27272A' }}>
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              className="p-8"
              style={{ background: '#0A0A0B' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.2, ease: 'easeOut', delay: i * 0.05 }}
              whileHover={{ backgroundColor: '#111113' }}
            >
              <h3 className="text-lg font-quantum mb-2" style={{ color: '#E5E5E5' }}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#9B9BA3' }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ROADMAP */}
      <section className="py-20 px-6">
        <motion.h2
          className="text-3xl md:text-5xl font-quantum font-bold text-center mb-14"
          style={{ color: '#E5E5E5' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          Roadmap
        </motion.h2>

        <div className="max-w-3xl mx-auto space-y-px" style={{ background: '#27272A' }}>
          {roadmap.map((r, i) => (
            <motion.div
              key={r.phase}
              className="flex items-start gap-6 p-6"
              style={{ background: '#0A0A0B' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.2, ease: 'easeOut', delay: i * 0.05 }}
            >
              <div
                className="w-2 h-2 mt-2 flex-shrink-0"
                style={{ background: r.status === 'current' ? '#6D28D9' : '#3F3F46' }}
              />
              <div>
                <h3 className="text-base font-quantum mb-1" style={{ color: r.status === 'current' ? '#E5E5E5' : '#9B9BA3' }}>
                  {r.phase}
                </h3>
                <p className="text-sm" style={{ color: '#52525B' }}>{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 px-6 text-center" style={{ background: '#111113', borderTop: '1px solid #27272A' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-2xl md:text-4xl font-quantum font-bold mb-4" style={{ color: '#E5E5E5' }}>
            {isEs ? '¿Listo para la Convergencia?' : 'Ready for the Convergence?'}
          </h2>
          <p className="text-sm md:text-base mb-8 max-w-xl mx-auto" style={{ color: '#9B9BA3' }}>
            {isEs
              ? 'Descarga el launcher y sé el primero en pisar la zona de batalla.'
              : 'Download the launcher and be the first to step into the battlezone.'}
          </p>
          <GamingButton>{isEs ? 'Descargar Launcher' : 'Download Launcher'}</GamingButton>
        </motion.div>
      </section>
    </main>
  );
}
