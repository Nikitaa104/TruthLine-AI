
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Search, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <nav className="p-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Globe className="w-8 h-8 text-blue-400" />
          <h1 className="text-2xl font-bold text-white">TruthLens</h1>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 text-white hover:text-blue-300 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </div>
      </nav>

      <main className="flex flex-col items-center justify-center px-6 text-center py-20">
        <h1 className="text-6xl font-bold text-white mb-4">TruthLens</h1>
        <p className="text-3xl text-blue-300 mb-8">
          Real-Time Crisis Misinformation Detector
        </p>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl">
          Stay informed. Stay accurate. Stay safe.
        </p>

        <div className="flex gap-6 mb-16">
          <button
            onClick={() => navigate('/signup')}
            className="px-8 py-4 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition shadow-xl"
          >
            Get Started
          </button>
          <button className="px-8 py-4 bg-white/10 text-white text-lg rounded-lg hover:bg-white/20 transition backdrop-blur">
            Learn More
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
          <FeatureCard
            icon={<Search className="w-12 h-12 text-blue-400" />}
            title="AI-Powered Fact Verification"
            description="Advanced NLP models verify claims in real-time"
          />
          <FeatureCard
            icon={<Globe className="w-12 h-12 text-blue-400" />}
            title="Multilingual Updates"
            description="Get information in your preferred language"
          />
          <FeatureCard
            icon={<Bell className="w-12 h-12 text-blue-400" />}
            title="Real-Time Monitoring"
            description="Instant alerts for crisis situations"
          />
        </div>
      </main>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-white/5 backdrop-blur rounded-xl border border-white/10 hover:bg-white/10 transition">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default LandingPage;