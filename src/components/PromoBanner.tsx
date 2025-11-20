import { Eye } from 'lucide-react';

export default function PromoBanner() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-blue-500/20 to-blue-600/20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0, 212, 255, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 p-12 lg:p-16 border border-blue-400/30 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-3 mb-6">
              <Eye size={40} className="text-white" />
              <span className="text-white text-5xl font-bold">smart i</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Protected by the Evil Eye.
              <br />
              <span className="text-blue-200">Powered by Innovation.</span>
            </h2>

            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Every smart i product is designed with our signature evil-eye technology
              for enhanced audio protection and superior sound clarity.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl">
                Shop Limited Edition
              </button>
              <button className="px-8 py-4 bg-blue-800/50 backdrop-blur-sm text-white rounded-full font-semibold border border-white/20 hover:bg-blue-700/50 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
