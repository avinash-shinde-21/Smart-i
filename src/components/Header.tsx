import { ShoppingCart, Search, Menu, User } from 'lucide-react';
import Logo from './Logo';
import { CartItem } from '../types/product';

interface HeaderProps {
  cartItems: CartItem[];
  onCartClick: () => void;
}

export default function Header({ cartItems, onCartClick }: HeaderProps) {
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/70 border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <Logo className="w-10 h-10" />
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wider">smart i</h1>
              <p className="text-xs text-blue-400">Hear Smart. Live Smart.</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-gray-300 hover:text-blue-400 transition-colors">Home</a>
            <a href="#products" className="text-gray-300 hover:text-blue-400 transition-colors">Products</a>
            <a href="#categories" className="text-gray-300 hover:text-blue-400 transition-colors">Categories</a>
            <a href="#about" className="text-gray-300 hover:text-blue-400 transition-colors">About</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-300 hover:text-blue-400 transition-colors">
              <Search size={20} />
            </button>
            <button className="p-2 text-gray-300 hover:text-blue-400 transition-colors">
              <User size={20} />
            </button>
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-300 hover:text-blue-400 transition-colors"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 text-gray-300 hover:text-blue-400 transition-colors">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
