import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Package, Settings, Eye } from 'lucide-react';
import Logo from '../components/Logo';
import { useAuth } from '../lib/useAuth';
import { signOut } from '../lib/supabase';
import AdminProductsPanel from '../components/admin/AdminProductsPanel';
import AdminBannerPanel from '../components/admin/AdminBannerPanel';
import AdminSettingsPanel from '../components/admin/AdminSettingsPanel';

type Tab = 'products' | 'banner' | 'settings';

export default function AdminDashboard() {
  const { user, isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('products');
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    navigate('/admin/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/70 border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Logo className="w-8 h-8" />
              <div>
                <h1 className="text-lg font-bold">smart i Admin</h1>
                <p className="text-xs text-blue-400">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="flex pt-16">
        <aside className="w-64 bg-gray-900/50 border-r border-white/10 min-h-screen">
          <nav className="p-6 space-y-2">
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'products'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <Package size={20} />
              Products
            </button>
            <button
              onClick={() => setActiveTab('banner')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'banner'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <Eye size={20} />
              Banner & Promo
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'settings'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <Settings size={20} />
              Settings
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          {activeTab === 'products' && <AdminProductsPanel />}
          {activeTab === 'banner' && <AdminBannerPanel />}
          {activeTab === 'settings' && <AdminSettingsPanel />}
        </main>
      </div>
    </div>
  );
}
