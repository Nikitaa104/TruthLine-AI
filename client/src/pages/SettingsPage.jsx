
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';
import { MapPin, ArrowLeft } from 'lucide-react';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [notifications, setNotifications] = useState(user?.preferences?.notifications ?? true);
  const [language, setLanguage] = useState(user?.preferences?.language || 'EN');
  const [selectedSources, setSelectedSources] = useState(user?.preferences?.sources || ['WHO', 'CDC', 'USGS']);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const sources = ['WHO', 'CDC', 'USGS', 'NASA', 'UN', 'Reuters', 'AP News', 'BBC', 'CNN'];

  const handleSavePreferences = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await userService.updatePreferences({
        language,
        notifications,
        sources: selectedSources
      });

      updateUser({
        preferences: {
          language,
          notifications,
          sources: selectedSources
        }
      });

      setMessage({ type: 'success', text: 'Preferences saved successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save preferences' });
    } finally {
      setLoading(false);
    }
  };

  const toggleSource = (source) => {
    setSelectedSources(prev =>
      prev.includes(source)
        ? prev.filter(s => s !== source)
        : [...prev, source]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>

        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-500/20 border border-green-500 text-green-300' 
              : 'bg-red-500/20 border border-red-500 text-red-300'
          }`}>
            {message.text}
          </div>
        )}

        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">Notifications</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 mb-1">Enable Real-Time Notifications</p>
                <p className="text-sm text-gray-500">Receive instant alerts for crisis situations</p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative w-14 h-8 rounded-full transition ${
                  notifications ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  notifications ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>

          {/* Language */}
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">Language</h2>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="EN">English</option>
              <option value="HI">Hindi</option>
              <option value="FR">French</option>
              <option value="ES">Spanish</option>
              <option value="DE">German</option>
              <option value="AR">Arabic</option>
            </select>
          </div>

          {/* Location */}
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">Location</h2>
            <div className="flex items-center gap-2 text-gray-300 mb-4">
              <MapPin className="w-5 h-5" />
              <span>
                {user?.location?.city 
                  ? `${user.location.city}, ${user.location.country}` 
                  : 'Location not set'}
              </span>
            </div>
            <button
              onClick={() => navigate('/set-location')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Change Location
            </button>
          </div>

          {/* Preferred Sources */}
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">Preferred News Sources</h2>
            <p className="text-sm text-gray-400 mb-4">Select sources you trust for fact verification</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {sources.map(source => (
                <button
                  key={source}
                  onClick={() => toggleSource(source)}
                  className={`p-3 rounded-lg border transition ${
                    selectedSources.includes(source)
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {source}
                </button>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSavePreferences}
              disabled={loading}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Save All Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;