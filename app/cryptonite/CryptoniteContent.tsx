import type { FC } from 'react';
import CryptoniteHeroBackground from './CryptoniteHeroBackground';
import LanguageSwitcher from './LanguageSwitcher';
import ApiSection from './ApiSection';
import { DICTIONARY, type Lang } from './dictionary';

interface CryptoniteContentProps {
  lang: Lang;
}

const CryptoniteContent: FC<CryptoniteContentProps> = ({ lang }) => {
  const t = DICTIONARY[lang];

  return (
    <main style={{ background: '#06120D', color: '#E8FFF3' }} className="min-h-screen">
      <header className="flex flex-wrap items-center justify-between gap-3 px-6 md:px-10 py-6">
        <div className="flex items-center gap-3">
          <img src="/cryptonite/coin-logo.png" alt="" width={32} height={32} className="w-8 h-8" />
          <span className="font-bold tracking-[0.15em] text-sm">CRYPTONITE</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs tracking-[0.2em] text-[#39FF8E]/70 border border-[#1C3A2E] px-3 py-1">
            {t.badge}
          </span>
          <LanguageSwitcher current={lang} />
        </div>
      </header>

      <nav className="flex items-center gap-5 px-6 md:px-10 pb-4 overflow-x-auto text-xs tracking-wide whitespace-nowrap">
        <a href="#como-funciona" className="text-[#9CB8AC] hover:text-[#39FF8E] transition-colors duration-200">
          {t.howItWorksEyebrow}
        </a>
        <a href="#equipo" className="text-[#9CB8AC] hover:text-[#39FF8E] transition-colors duration-200">
          {t.teamEyebrow}
        </a>
        <a href="#mercados" className="text-[#9CB8AC] hover:text-[#39FF8E] transition-colors duration-200">
          {t.marketsEyebrow}
        </a>
        <a href="#recursos" className="text-[#9CB8AC] hover:text-[#39FF8E] transition-colors duration-200">
          {t.resourcesEyebrow}
        </a>
        <a href="#integracion" className="text-[#9CB8AC] hover:text-[#39FF8E] transition-colors duration-200">
          {t.integrationEyebrow}
        </a>
        <a href="#api" className="text-[#9CB8AC] hover:text-[#39FF8E] transition-colors duration-200">
          API
        </a>
      </nav>

      <section className="relative min-h-[calc(100vh-2cm)] w-full overflow-hidden flex flex-col items-center justify-center text-center px-6">
        <CryptoniteHeroBackground />

        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-3 text-[#E8FFF3] [text-shadow:0_0_30px_rgba(57,255,142,0.35)]">
            CRYPTONITE
          </h1>
          <p className="text-sm md:text-base tracking-[0.25em] text-[#39FF8E] mb-12">
            {t.tagline}
          </p>

          <img
            src="/cryptonite/coin-logo.png"
            alt="Cryptonite"
            width={224}
            height={224}
            className="w-48 h-48 md:w-56 md:h-56 mb-16"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl w-full">
            {t.features.map((feature) => (
              <div
                key={feature.title}
                className="border border-[#1C3A2E] bg-[#0A1F16] p-5 text-left"
              >
                <h3 className="text-sm font-bold mb-2 text-[#E8FFF3]">{feature.title}</h3>
                <p className="text-xs text-[#9CB8AC] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-xs tracking-[0.25em] text-[#39FF8E] mb-8 text-center">
          {t.howItWorksEyebrow}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {t.architecture.map((layer, i) => (
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
          {t.specs.map((spec) => (
            <div key={spec.label}>
              <p className="text-lg md:text-xl font-bold text-[#39FF8E]">{spec.value}</p>
              <p className="text-[10px] tracking-wide text-[#9CB8AC] mt-1">{spec.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="equipo" className="px-6 py-16 max-w-5xl mx-auto border-t border-[#1C3A2E]">
        <h2 className="text-xs tracking-[0.25em] text-[#39FF8E] mb-8 text-center">
          {t.teamEyebrow}
        </h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          {t.team.map((member) => (
            <div key={member.alias}>
              <p className="text-sm font-bold">{member.alias}</p>
              <p className="text-[11px] text-[#9CB8AC] mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="mercados" className="px-6 py-16 max-w-5xl mx-auto border-t border-[#1C3A2E] text-center">
        <h2 className="text-xs tracking-[0.25em] text-[#39FF8E] mb-6">{t.marketsEyebrow}</h2>
        <div className="flex flex-wrap justify-center gap-4 text-xs">
          <a
            href="https://freiexchange.com/market/XCN/BTC"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#1C3A2E] px-4 py-2 hover:border-[#39FF8E] transition-colors duration-200"
          >
            {t.marketFrei}
          </a>
          <a
            href="https://coinmarketcap.com/currencies/cryptonite/historical-data/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#1C3A2E] px-4 py-2 hover:border-[#39FF8E] transition-colors duration-200"
          >
            {t.marketCmc}
          </a>
        </div>
      </section>

      <section id="recursos" className="px-6 py-16 max-w-5xl mx-auto border-t border-[#1C3A2E] text-center">
        <h2 className="text-xs tracking-[0.25em] text-[#39FF8E] mb-6">{t.resourcesEyebrow}</h2>
        <div className="flex flex-wrap justify-center gap-4 text-xs">
          <a
            href="https://cryptonite.info/files/mbc-scheme-rev3.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#1C3A2E] px-4 py-2 hover:border-[#39FF8E] transition-colors duration-200"
          >
            {t.resourceWhitepaper}
          </a>
          <a
            href="https://github.com/pallas1/Cryptonite"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#1C3A2E] px-4 py-2 hover:border-[#39FF8E] transition-colors duration-200"
          >
            {t.resourceGithub}
          </a>
          <a
            href="https://bitcointalk.org/index.php?topic=1801595.0"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#1C3A2E] px-4 py-2 hover:border-[#39FF8E] transition-colors duration-200"
          >
            {t.resourceBitcointalk}
          </a>
          <a
            href="https://cryptonite.info"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#1C3A2E] px-4 py-2 hover:border-[#39FF8E] transition-colors duration-200"
          >
            {t.resourceOriginal}
          </a>
        </div>
      </section>

      <section id="integracion" className="px-6 py-16 max-w-4xl mx-auto border-t border-[#1C3A2E]">
        <p className="text-xs tracking-[0.25em] text-[#39FF8E] mb-3 text-center">
          {t.integrationEyebrow}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
          {t.integrationTitle}
        </h2>
        <p className="text-xs text-[#9CB8AC] mb-10 text-center max-w-xl mx-auto">
          {t.integrationSubtitle}
        </p>

        <div className="space-y-4">
          {t.integrationPhases.map((phase) => (
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

      <ApiSection lang={lang} />
    </main>
  );
};

export default CryptoniteContent;
