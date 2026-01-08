import React, { useState } from 'react';
import { Building2, Users, ClipboardList, BarChart3 } from 'lucide-react';
import LoginModal from './LoginModal';

const Home = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const features = [
    {
      icon: ClipboardList,
      title: "New Requests",
      description: "Monitor incoming property inquiries and client requests"
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Track performance and engagement metrics"
    },
    {
      icon: Users,
      title: "Client Management",
      description: "Manage customer information and interactions"
    },
    {
      icon: Building2,
      title: "Property Management",
      description: "Organize and oversee property listings"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-40 backdrop-blur-md bg-slate-900/80 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
            <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              RealEstate
            </span>
          </div>
          <button
            onClick={() => setShowLoginModal(true)}
          className="px-4 py-2 sm:px-6 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-500/50"
                >
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-20 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Content */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 sm:mb-20">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent">
                    Manage Your
                  </span>
                  <br />
                  <span className="text-white">Real Estate Business</span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-2xl">
                  Streamline your property inquiries, track customer requests, and grow your real estate business with our powerful admin dashboard.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-500/50 text-sm sm:text-base"
                >
                  Access Dashboard
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-6 sm:pt-8">
                <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-3 sm:p-4">
                  <p className="text-2xl sm:text-3xl font-bold text-blue-400">1000+</p>
                  <p className="text-slate-400 text-xs sm:text-sm">Properties Listed</p>
                </div>
                <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-3 sm:p-4">
                  <p className="text-2xl sm:text-3xl font-bold text-cyan-400">500+</p>
                  <p className="text-slate-400 text-xs sm:text-sm">Active Clients</p>
                </div>
              </div>
            </div>

            {/* Illustration Area */}
            <div className="relative h-64 sm:h-80 lg:h-96 xl:h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-3xl"></div>
              <div className="relative h-full bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-700/50 rounded-2xl backdrop-blur flex items-center justify-center">
                <div className="space-y-4 text-center p-6 sm:p-8">
                  <Building2 className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 text-slate-600 mx-auto opacity-50" />
                  <p className="text-slate-500 text-sm sm:text-base">Admin Dashboard Preview</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="space-y-8 sm:space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Powerful Features</h2>
              <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto">
                Everything you need to manage your real estate business efficiently
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="group bg-slate-800/50 backdrop-blur border border-slate-700/50 hover:border-blue-500/50 rounded-xl p-4 sm:p-6 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/10"
                  >
                    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 group-hover:from-blue-500/40 group-hover:to-cyan-500/40 transition-colors duration-200 mb-3 sm:mb-4">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-slate-400 text-xs sm:text-sm">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </div>
  );
};

export default Home;