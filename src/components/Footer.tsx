import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Logo className="w-12 h-12" />
              <div>
                <h3 className="text-xl font-bold text-white">smart i</h3>
                <p className="text-xs text-blue-400">Hear Smart. Live Smart.</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Next-generation audio technology protected by evil-eye innovation.
              Experience sound like never before.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Wireless Earphones</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">ANC Collection</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Gaming Series</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Sports Edition</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Warranty</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe for exclusive deals and new releases.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
              />
              <button className="p-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
                <Mail size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 smart i. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a href="#" className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
              <Youtube size={20} />
            </a>
          </div>

          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
