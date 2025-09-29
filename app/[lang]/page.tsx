import ParticleSwarm from "@/components/ParticleSwarm";
import Navigation from "@/components/Navigation";
import { getDictionary } from '@/dictionaries';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: 'en' | 'es' }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Particle Swarm Background */}
      {/* <ParticleSwarm /> */}
      
      {/* Navigation */}
      <Navigation 
        title={dict.hero.title}
        navItems={dict.navigation}
        currentLang={lang}
      />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-wider font-quantum">
          {dict.hero.title}
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white mb-4 tracking-wide font-gaming">
          {dict.hero.subtitle}
        </p>
        <p className="text-lg md:text-xl text-white mb-12 tracking-wide">
          {dict.hero.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-6 mb-16">
          <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-black px-8 py-4 rounded-full text-lg font-semibold hover:from-orange-400 hover:to-yellow-400 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-orange-500/25">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            {dict.buttons.exploreProjects}
          </button>
          <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-black px-8 py-4 rounded-full text-lg font-semibold hover:from-orange-400 hover:to-yellow-400 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-orange-500/25">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
            {dict.buttons.joinTeam}
          </button>
        </div>

        {/* Special Project Button */}
        <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-black px-6 py-3 rounded-full text-sm font-semibold hover:from-orange-400 hover:to-yellow-400 transition-all duration-300 shadow-lg hover:shadow-orange-500/25">
          {dict.buttons.viewBattlezone}
        </button>
      </main>

      {/* Bottom Info */}
      <div className="relative z-10 flex justify-between items-end p-6">
        <div className="flex items-center gap-2 text-white">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm">{dict.status.online}</span>
        </div>
        <div className="text-right text-white">
          <div className="text-4xl font-bold text-yellow-400">2025</div>
          <div className="text-sm">{dict.status.launchYear}</div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 text-white text-xs opacity-70 z-10">
        <p>{dict.instructions.mouse}</p>
      </div>
    </div>
  );
}
