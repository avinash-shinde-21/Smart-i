import { Headphones, Volume2, Gamepad2, Zap } from 'lucide-react';

interface CategoryCardProps {
  category: 'wireless' | 'anc' | 'gaming' | 'sports';
  title: string;
  description: string;
  onClick: () => void;
}

const icons = {
  wireless: Headphones,
  anc: Volume2,
  gaming: Gamepad2,
  sports: Zap,
};

export default function CategoryCard({ category, title, description, onClick }: CategoryCardProps) {
  const Icon = icons[category];

  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 p-8 text-left hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-blue-600/5 transition-all duration-300"></div>

      <div className="relative z-10 space-y-4">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon size={32} className="text-blue-400" />
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>

        <div className="flex items-center text-blue-400 text-sm font-medium">
          Explore
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
}
