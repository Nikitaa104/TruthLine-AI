
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';
import { MapPin, Search } from 'lucide-react';

const SetLocationPage = () => {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const locations = [
    { city: 'New York', country: 'USA' },
    { city: 'London', country: 'UK' },
    { city: 'Tokyo', country: 'Japan' },
    { city: 'Sydney', country: 'Australia' },
    { city: 'Mumbai', country: 'India' },
    { city: 'Paris', country: 'France' },
    { city: 'Berlin', country: 'Germany' },
    { city: 'Toronto', country: 'Canada' },
    { city: 'Dubai', country: 'UAE' },
    { city: 'Singapore', country: 'Singapore' },
    { city: 'Bhopal', country: 'India' },
    { city: 'Delhi', country: 'India' }
  ];

  const filteredLocations = locations.filter(loc =>
    `${loc.city}, ${loc.country}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContinue = async () => {
    if (!selectedLocation) return;

    setLoading(true);
    setError('');

    try {
      const [city, country] = selectedLocation.split(', ');
      await userService.updateLocation({ city, country });
      updateUser({ location: { city, country } });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update location');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-6">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
        <div className="text-center mb-8">
          <MapPin className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">Set Your Location</h2>
          <p className="text-gray-400">Get personalized alerts for your region</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for your location..."
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mb-8 max-h-96 overflow-y-auto space-y-2">
          {filteredLocations.map((loc, idx) => {
            const locationStr = `${loc.city}, ${loc.country}`;
            return (
              <button
                key={idx}
                onClick={() => setSelectedLocation(locationStr)}
                className={`w-full p-4 rounded-lg text-left transition ${
                  selectedLocation === locationStr
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  <span>{locationStr}</span>
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedLocation || loading}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save Location & Continue'}
        </button>
      </div>
    </div>
  );
};

export default SetLocationPage;