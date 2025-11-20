import { X, Star, ShoppingCart, Check } from 'lucide-react';
import { Product } from '../types/product';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
  if (!isOpen || !product) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10">
          <div className="sticky top-0 bg-gray-900 border-b border-white/10 p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Product Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={24} className="text-gray-400" />
            </button>
          </div>

          <div className="p-6 lg:p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 flex items-center justify-center p-12">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    <linearGradient id="modal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00D4FF" />
                      <stop offset="100%" stopColor="#0080FF" />
                    </linearGradient>
                    <filter id="modal-glow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  <ellipse cx="70" cy="100" rx="35" ry="50" fill="url(#modal-grad)" opacity="0.9" filter="url(#modal-glow)"/>
                  <ellipse cx="130" cy="100" rx="35" ry="50" fill="url(#modal-grad)" opacity="0.9" filter="url(#modal-glow)"/>

                  <ellipse cx="70" cy="100" rx="20" ry="28" fill="#000000"/>
                  <ellipse cx="130" cy="100" rx="20" ry="28" fill="#000000"/>

                  <circle cx="70" cy="100" r="8" fill="#00D4FF"/>
                  <circle cx="130" cy="100" r="8" fill="#00D4FF"/>

                  <path d="M 70 60 Q 100 40 130 60" stroke="url(#modal-grad)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  <path d="M 70 140 Q 100 160 130 140" stroke="url(#modal-grad)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                </svg>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-sm text-blue-400 font-medium uppercase tracking-wide">
                    {product.category}
                  </span>
                  <h3 className="text-3xl font-bold text-white mt-2">{product.name}</h3>

                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < Math.floor(product.rating) ? 'fill-blue-400 text-blue-400' : 'text-gray-600'}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-white">${product.price}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm font-semibold rounded-full">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>

                <p className="text-gray-400 leading-relaxed">{product.description}</p>

                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Key Features</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-400 text-sm">
                        <Check size={16} className="text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <h4 className="text-white font-semibold">Specifications</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">Driver</span>
                      <p className="text-white font-medium">{product.specs.driver}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Battery</span>
                      <p className="text-white font-medium">{product.specs.battery}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Connectivity</span>
                      <p className="text-white font-medium">{product.specs.connectivity}</p>
                    </div>
                    {product.specs.waterproof && (
                      <div>
                        <span className="text-gray-500">Waterproof</span>
                        <p className="text-white font-medium">{product.specs.waterproof}</p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  disabled={!product.inStock}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={20} />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
