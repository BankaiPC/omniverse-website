import ParticleSwarm from "./components/ParticleSwarm";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Particle Swarm Background */}
      <ParticleSwarm />
      
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6">
        <div className="text-white text-2xl font-normal tracking-wider font-quantum">
          OMNIVERSE STUDIOS
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#" className="text-white hover:text-orange-400 transition-colors border-b-2 border-orange-400 pb-1">
            Inicio
          </a>
          <a href="#" className="text-white hover:text-orange-400 transition-colors">
            Proyectos
          </a>
          <a href="#" className="text-white hover:text-orange-400 transition-colors">
            Equipo
          </a>
          <a href="#" className="text-white hover:text-orange-400 transition-colors">
            Carreras
          </a>
          <a href="#" className="text-white hover:text-orange-400 transition-colors">
            Contacto
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-wider font-quantum">
          OMNIVERSE STUDIOS
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white mb-4 tracking-wide font-gaming">
          CREAMOS UNIVERSOS INMERSIVOS
        </p>
        <p className="text-lg md:text-xl text-white mb-12 tracking-wide">
          Donde cada batalla cuenta una historia épica
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-6 mb-16">
          <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-black px-8 py-4 rounded-full text-lg font-semibold hover:from-orange-400 hover:to-yellow-400 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-orange-500/25">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Explorar Proyectos
          </button>
          <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-black px-8 py-4 rounded-full text-lg font-semibold hover:from-orange-400 hover:to-yellow-400 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-orange-500/25">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
            Únete al Equipo
          </button>
        </div>

        {/* Special Project Button */}
        <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-black px-6 py-3 rounded-full text-sm font-semibold hover:from-orange-400 hover:to-yellow-400 transition-all duration-300 shadow-lg hover:shadow-orange-500/25">
          Ver The Primordial Battlezone
        </button>
      </main>

      {/* Bottom Info */}
      <div className="relative z-10 flex justify-between items-end p-6">
        <div className="flex items-center gap-2 text-white">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm">Sistema en línea</span>
        </div>
        <div className="text-right text-white">
          <div className="text-4xl font-bold text-yellow-400">2025</div>
          <div className="text-sm">Año de lanzamiento</div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 text-white text-xs opacity-70 z-10">
        <p>Click and drag to attract • Right click to repulse • Mouse-wheel click for time dilation</p>
      </div>
    </div>
  );
}
