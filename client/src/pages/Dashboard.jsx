
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { streamService } from '../services/streamService';
import { subscribeToUpdates, unsubscribeFromUpdates } from '../socket/socket';
import { Globe, Bell, Search, CheckCircle, Settings, LogOut, Menu, X, MapPin, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [updates, setUpdates] = useState([]);
  const [language, setLanguage] = useState(user?.preferences?.language || 'EN');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInitialFeed();
    setupRealTimeUpdates();

    return () => {
      unsubscribeFromUpdates();
    };
  }, []);

  const loadInitialFeed = async () => {
    try {
      const response = await streamService.getLiveFeed({ limit: 20 });
      setUpdates(response.data || []);
    } catch (error) {
      console.error('Failed to load feed:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupRealTimeUpdates = () => {
    subscribeToUpdates(({ type, data }) => {
      if (type === 'initial') {
        setUpdates(data);
      } else if (type === 'new') {
        setUpdates(prev => [data, ...prev].slice(0, 50));
      }
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900/95 backdrop-blur border-r border-white/10 transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <Globe className="w-8 h-8 text-blue-400" />
            <h1 className="text-xl font-bold text-white">TruthLens</h1>
          </div>

          <nav className="space-y-2">
            <SidebarLink icon={<Globe />} label="Home" active />
            <SidebarLink icon={<Bell />} label="Live Updates" />
            <SidebarLink icon={<Search />} label="Sources" />
            <SidebarLink icon={<CheckCircle />} label="Fact-Check Summary" />
            <SidebarLink 
              icon={<Settings />} 
              label="Settings" 
              onClick={() => navigate('/settings')} 
            />
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Navbar */}
        <nav className="bg-slate-900/95 backdrop-blur border-b border-white/10 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-white"
            >
              {sidebarOpen ? <X /> : <Menu />}
            </button>

            <div className="flex items-center gap-2 text-gray-400">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">
                {user?.location?.city ? `${user.location.city}, ${user.location.country}` : 'Location not set'}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded text-white text-sm focus:outline-none"
              >
                <option value="EN">EN</option>
                <option value="HI">HI</option>
                <option value="FR">FR</option>
                <option value="ES">ES</option>
              </select>

              <button className="text-white hover:text-blue-400">
                <Bell className="w-5 h-5" />
              </button>

              <button onClick={handleLogout} className="text-white hover:text-red-400">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </nav>

        {/* Dashboard Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Live Updates Feed */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-2xl font-bold text-white mb-4">Live Updates</h2>
              {updates.length === 0 ? (
                <div className="text-gray-400 text-center py-12">
                  No updates available at the moment
                </div>
              ) : (
                updates.map(update => (
                  <UpdateCard key={update._id} update={update} />
                ))
              )}
            </div>

            {/* Fact Check Sidebar */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-4">Fact Check Timeline</h2>
              <div className="space-y-3">
                {updates.slice(0, 8).map(update => (
                  <FactCheckCard key={update._id} update={update} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SidebarLink = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      active
        ? 'bg-blue-600 text-white'
        : 'text-gray-400 hover:bg-white/5 hover:text-white'
    }`}
  >
    <span className="w-5 h-5">{icon}</span>
    <span>{label}</span>
  </button>
);

const UpdateCard = ({ update }) => {
  const getStatusColor = (status) => {
    return status === 'verified' ? 'text-green-400' : 'text-red-400';
  };

  const getStatusIcon = (status) => {
    return status === 'verified' ? <CheckCircle className="w-6 h-6 text-green-400" /> : <AlertCircle className="w-6 h-6 text-red-400" />;
  };

  return (
    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:bg-white/10 transition">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full">
            {update.category}
          </span>
          <span className="text-xs text-gray-500">{update.source}</span>
          {update.location && (
            <span className="text-xs text-gray-500">
              📍 {update.location.city}, {update.location.country}
            </span>
          )}
        </div>
        {getStatusIcon(update.status)}
      </div>

      <p className="text-white text-lg mb-3">{update.claim}</p>

      <div className="flex items-center justify-between text-sm flex-wrap gap-2">
        <span className={`font-semibold ${getStatusColor(update.status)}`}>
          {update.status === 'verified' ? '✅ Verified' : '⚠️ Misinformation Detected'}
        </span>
        <span className="text-gray-500">by {update.verifiedBy}</span>
      </div>

      <div className="mt-3 text-xs text-gray-500">
        {new Date(update.timestamp).toLocaleString()}
      </div>
    </div>
  );
};

const FactCheckCard = ({ update }) => (
  <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-4 hover:bg-white/10 transition">
    <div className="flex items-start gap-3">
      {update.status === 'verified' ? (
        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
      ) : (
        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
      )}
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm mb-1 line-clamp-2">{update.claim}</p>
        <p className="text-xs text-gray-500">{update.verifiedBy}</p>
      </div>
    </div>
  </div>
);

export default Dashboard;