import { ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00D4FF" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium backdrop-blur-sm">
                Next-Gen Audio Technology
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Hear Smart.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                Live Smart.
              </span>
            </h1>

            <p className="text-xl text-gray-400 leading-relaxed">
              Experience the future of audio with our evil-eye inspired technology.
              Protected sound, elevated performance.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2">
                Explore Collection
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/5 backdrop-blur-sm text-white rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-all duration-300">
                Watch Video
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-xl border border-blue-500/30 p-12 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-full h-full animate-float">
                  <defs>
                    <linearGradient id="productGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00D4FF" />
                      <stop offset="100%" stopColor="#0080FF" />
                    </linearGradient>
                    <filter id="productGlow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  <ellipse cx="70" cy="100" rx="35" ry="50" fill="url(#productGradient)" opacity="0.8" filter="url(#productGlow)"/>
                  <ellipse cx="130" cy="100" rx="35" ry="50" fill="url(#productGradient)" opacity="0.8" filter="url(#productGlow)"/>

                  <ellipse cx="70" cy="100" rx="20" ry="28" fill="#000000"/>
                  <ellipse cx="130" cy="100" rx="20" ry="28" fill="#000000"/>

                  <circle cx="70" cy="100" r="8" fill="#00D4FF"/>
                  <circle cx="130" cy="100" r="8" fill="#00D4FF"/>

                  <path d="M 70 60 Q 100 40 130 60" stroke="url(#productGradient)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  <path d="M 70 140 Q 100 160 130 140" stroke="url(#productGradient)" strokeWidth="3" fill="none" strokeLinecap="round"/>

                  <circle cx="72" cy="98" r="3" fill="white" opacity="0.8"/>
                  <circle cx="132" cy="98" r="3" fill="white" opacity="0.8"/>
                </svg>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>
            <div className="absolute -top-4 -left-4 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-blue-500/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
