import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
      {discount > 0 && (
        <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          {discount}% OFF
        </div>
      )}

      <div className="relative aspect-square bg-gradient-to-br from-blue-500/10 to-blue-600/5 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <svg viewBox="0 0 200 200" className="w-full h-full group-hover:scale-110 transition-transform duration-500">
            <defs>
              <linearGradient id={`grad-${product.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D4FF" />
                <stop offset="100%" stopColor="#0080FF" />
              </linearGradient>
              <filter id={`glow-${product.id}`}>
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            <ellipse cx="70" cy="100" rx="30" ry="45" fill={`url(#grad-${product.id})`} opacity="0.9" filter={`url(#glow-${product.id})`}/>
            <ellipse cx="130" cy="100" rx="30" ry="45" fill={`url(#grad-${product.id})`} opacity="0.9" filter={`url(#glow-${product.id})`}/>

            <ellipse cx="70" cy="100" rx="18" ry="26" fill="#000000"/>
            <ellipse cx="130" cy="100" rx="18" ry="26" fill="#000000"/>

            <circle cx="70" cy="100" r="7" fill="#00D4FF"/>
            <circle cx="130" cy="100" r="7" fill="#00D4FF"/>

            <path d="M 70 65 Q 100 50 130 65" stroke={`url(#grad-${product.id})`} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M 70 135 Q 100 150 130 135" stroke={`url(#grad-${product.id})`} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-sm">
          <button
            onClick={() => onViewDetails(product)}
            className="px-6 py-2 bg-white text-black rounded-full font-semibold text-sm hover:bg-blue-400 transition-colors"
          >
            Quick View
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-blue-400 font-medium uppercase tracking-wide">
              {product.category}
            </span>
            {!product.inStock && (
              <span className="text-xs text-red-400 font-medium">Out of Stock</span>
            )}
          </div>
          <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-sm text-gray-400 line-clamp-2">{product.description}</p>
        </div>

        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < Math.floor(product.rating) ? 'fill-blue-400 text-blue-400' : 'text-gray-600'}
            />
          ))}
          <span className="text-sm text-gray-400 ml-2">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="flex items-end justify-between pt-4 border-t border-white/10">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className="p-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
