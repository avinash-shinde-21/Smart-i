import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save } from 'lucide-react';

interface BannerSettings {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
}

export default function AdminBannerPanel() {
  const [banner, setBanner] = useState<BannerSettings>({
    title: '',
    subtitle: '',
    description: '',
    buttonText: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchBannerSettings();
  }, []);

  const fetchBannerSettings = async () => {
    setLoading(true);
    try {
      const keys = ['banner_title', 'banner_subtitle', 'banner_description', 'banner_button_text'];
      const { data, error } = await supabase
        .from('site_settings')
        .select('key, value')
        .in('key', keys);

      if (error) throw error;

      const settings: BannerSettings = {
        title: '',
        subtitle: '',
        description: '',
        buttonText: ''
      };

      data?.forEach(item => {
        if (item.key === 'banner_title') settings.title = item.value;
        else if (item.key === 'banner_subtitle') settings.subtitle = item.value;
        else if (item.key === 'banner_description') settings.description = item.value;
        else if (item.key === 'banner_button_text') settings.buttonText = item.value;
      });

      setBanner(settings);
    } catch (error) {
      console.error('Error fetching banner settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess('');

    try {
      const updates = [
        { key: 'banner_title', value: banner.title },
        { key: 'banner_subtitle', value: banner.subtitle },
        { key: 'banner_description', value: banner.description },
        { key: 'banner_button_text', value: banner.buttonText }
      ];

      for (const update of updates) {
        const { error } = await supabase
          .from('site_settings')
          .upsert({
            key: update.key,
            value: update.value,
            type: 'string',
            updated_at: new Date().toISOString()
          }, { onConflict: 'key' });

        if (error) throw error;
      }

      setSuccess('Banner updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error saving banner:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Banner & Promo</h2>
        <p className="text-gray-400">Edit the promotional banner text and content</p>
      </div>

      {success && (
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400">
          {success}
        </div>
      )}

      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Banner Title</label>
          <input
            type="text"
            value={banner.title}
            onChange={(e) => setBanner({ ...banner, title: e.target.value })}
            placeholder="Protected by the Evil Eye."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-lg"
          />
          <p className="text-xs text-gray-500 mt-1">Main heading text</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Banner Subtitle</label>
          <input
            type="text"
            value={banner.subtitle}
            onChange={(e) => setBanner({ ...banner, subtitle: e.target.value })}
            placeholder="Powered by Innovation."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-lg"
          />
          <p className="text-xs text-gray-500 mt-1">Secondary heading text</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
          <textarea
            value={banner.description}
            onChange={(e) => setBanner({ ...banner, description: e.target.value })}
            placeholder="Every smart i product is designed with our signature evil-eye technology..."
            rows={4}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Banner description text</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Button Text</label>
          <input
            type="text"
            value={banner.buttonText}
            onChange={(e) => setBanner({ ...banner, buttonText: e.target.value })}
            placeholder="Shop Limited Edition"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">CTA button text</p>
        </div>

        <div className="pt-4 border-t border-white/10">
          <h3 className="text-white font-semibold mb-4">Preview</h3>
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 text-white space-y-4">
            <h2 className="text-3xl font-bold">{banner.title}</h2>
            <h3 className="text-xl text-blue-200">{banner.subtitle}</h3>
            <p className="text-blue-100">{banner.description}</p>
            <button className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold text-sm">
              {banner.buttonText}
            </button>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Save size={20} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
