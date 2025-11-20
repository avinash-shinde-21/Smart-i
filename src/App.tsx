import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryCard from './components/CategoryCard';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import ProductModal from './components/ProductModal';
import PromoBanner from './components/PromoBanner';
import Footer from './components/Footer';
import { products } from './data/products';
import { Product, CartItem } from './types/product';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  const categories = [
    {
      id: 'wireless' as const,
      title: 'Wireless',
      description: 'Premium wireless freedom with exceptional sound quality'
    },
    {
      id: 'anc' as const,
      title: 'Active Noise Cancellation',
      description: 'Immerse yourself in pure audio with advanced ANC'
    },
    {
      id: 'gaming' as const,
      title: 'Gaming',
      description: 'Ultra-low latency for competitive gaming performance'
    },
    {
      id: 'sports' as const,
      title: 'Sports',
      description: 'Sweatproof design built for your active lifestyle'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header cartItems={cartItems} onCartClick={() => setIsCartOpen(true)} />

      <Hero />

      <section id="categories" className="py-20 relative">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0, 212, 255, 0.1) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Explore by Category
            </h2>
            <p className="text-xl text-gray-400">
              Find the perfect audio solution for your lifestyle
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(category => (
              <CategoryCard
                key={category.id}
                category={category.id}
                title={category.title}
                description={category.description}
                onClick={() => {
                  setSelectedCategory(category.id);
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                {selectedCategory ? `${categories.find(c => c.id === selectedCategory)?.title} Collection` : 'Featured Products'}
              </h2>
              <p className="text-xl text-gray-400">
                Discover our signature evil-eye audio collection
              </p>
            </div>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="px-6 py-3 bg-white/5 backdrop-blur-sm text-white rounded-xl border border-white/10 hover:bg-white/10 transition-all"
              >
                View All
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onViewDetails={setSelectedProduct}
              />
            ))}
          </div>
        </div>
      </section>

      <PromoBanner />

      <section id="about" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                The Evil Eye
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                  Protects Your Sound
                </span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                At smart i, we blend ancient symbolism with cutting-edge technology.
                Our evil-eye design isn't just aesthetic—it represents our commitment
                to protecting your audio experience from interference and delivering
                pristine, uncompromised sound.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">50K+</div>
                  <div className="text-sm text-gray-500">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">4.8</div>
                  <div className="text-sm text-gray-500">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">15+</div>
                  <div className="text-sm text-gray-500">Products</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-xl border border-blue-500/30 p-12 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    <linearGradient id="aboutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00D4FF" />
                      <stop offset="100%" stopColor="#0080FF" />
                    </linearGradient>
                    <filter id="aboutGlow">
                      <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  <ellipse cx="100" cy="100" rx="70" ry="45"
                    stroke="url(#aboutGradient)" strokeWidth="3" fill="none" filter="url(#aboutGlow)"/>

                  <circle cx="100" cy="100" r="30" fill="url(#aboutGradient)" filter="url(#aboutGlow)"/>

                  <circle cx="100" cy="100" r="18" fill="#000000"/>

                  <circle cx="103" cy="97" r="5" fill="#00D4FF"/>

                  <path d="M 40 70 Q 70 60 100 60" stroke="url(#aboutGradient)" strokeWidth="2.5" fill="none"/>
                  <path d="M 100 60 Q 130 60 160 70" stroke="url(#aboutGradient)" strokeWidth="2.5" fill="none"/>
                  <path d="M 40 130 Q 70 140 100 140" stroke="url(#aboutGradient)" strokeWidth="2.5" fill="none"/>
                  <path d="M 100 140 Q 130 140 160 130" stroke="url(#aboutGradient)" strokeWidth="2.5" fill="none"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />
    </div>
  );
}

export default App;
