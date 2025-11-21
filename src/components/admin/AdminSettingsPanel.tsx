import { useState, useEffect } from 'react';
import { supabase, getCurrentUser } from '../../lib/supabase';
import { Save, Key } from 'lucide-react';

export default function AdminSettingsPanel() {
  const [tagline, setTagline] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState<any>(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  useEffect(() => {
    fetchSettings();
    getUser();
  }, []);

  const getUser = async () => {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
  };

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'site_tagline')
        .maybeSingle();

      if (error) throw error;
      if (data) setTagline(data.value);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTagline = async () => {
    setSaving(true);
    setSuccess('');

    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          key: 'site_tagline',
          value: tagline,
          type: 'string',
          updated_at: new Date().toISOString()
        }, { onConflict: 'key' });

      if (error) throw error;
      setSuccess('Tagline updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error saving tagline:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwords.new !== passwords.confirm) {
      alert('Passwords do not match');
      return;
    }

    if (passwords.new.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwords.new
      });

      if (error) throw error;
      setSuccess('Password changed successfully!');
      setShowChangePassword(false);
      setPasswords({ current: '', new: '', confirm: '' });
      setTimeout(() => setSuccess(''), 3000);
    } catch (error: any) {
      alert(error.message);
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
        <h2 className="text-3xl font-bold text-white mb-2">Settings</h2>
        <p className="text-gray-400">Manage site settings and your account</p>
      </div>

      {success && (
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400">
          {success}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-6">Site Tagline</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="Hear Smart. Live Smart."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-2">Displayed in header and brand areas</p>
            </div>

            <button
              onClick={handleSaveTagline}
              disabled={saving}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Save size={20} />
              {saving ? 'Saving...' : 'Save Tagline'}
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-6">Account Information</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-400 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-2">Contact support to change email</p>
            </div>

            <button
              onClick={() => setShowChangePassword(!showChangePassword)}
              className="w-full py-3 bg-white/5 border border-white/10 text-white rounded-lg font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <Key size={20} />
              {showChangePassword ? 'Cancel Password Change' : 'Change Password'}
            </button>

            {showChangePassword && (
              <form onSubmit={handleChangePassword} className="space-y-4 pt-4 border-t border-white/10">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                  <input
                    type="password"
                    value={passwords.new}
                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                  <input
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                >
                  Update Password
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-white mb-4">System Information</h3>
        <div className="space-y-2 text-sm text-gray-400">
          <p>Admin Panel Version: 1.0.0</p>
          <p>Database: Supabase PostgreSQL</p>
          <p>Last Updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
