import React from 'react';
import { motion } from 'motion/react';
import { LogOut, Layout, User, Settings, Bell, Calendar, ShieldCheck } from 'lucide-react';
import { User as UserType } from '../types';

interface DashboardProps {
  user: UserType;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" id="dashboard-container">
      {/* Top Navigation */}
      <nav className="h-16 bg-white border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-10" id="dashboard-nav">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
            <Layout className="text-white" size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight">AuthFlow</span>
        </div>

        <div className="flex items-center gap-6">
          <button className="text-gray-400 hover:text-black transition-colors relative" id="nav-notifications">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          <div className="h-8 w-px bg-gray-100"></div>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-900 leading-none">{user.name}</p>
              <p className="text-xs text-gray-500 mt-1">{user.email}</p>
            </div>
            <button
              onClick={onLogout}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-red-600 transition-all group"
              title="Logout"
              id="logout-btn"
            >
              <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        <header className="mb-10">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold text-gray-900"
            id="welcome-msg"
          >
            Welcome back, {user.name.split(' ')[0]}!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 mt-2"
          >
            Here's what's happening with your account today.
          </motion.p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10" id="stats-grid">
          {[
            { label: 'Account Security', value: 'Strong', icon: ShieldCheck, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Member Since', value: new Date(user.createdAt).toLocaleDateString(), icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Active Sessions', value: '1', icon: User, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4"
              id={`stat-card-${idx}`}
            >
              <div className={`p-3 ${stat.bg} rounded-2xl`}>
                <stat.icon className={stat.color} size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
            id="profile-section"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-lg">Your Profile</h3>
              <button className="text-sm font-semibold text-gray-400 hover:text-black transition-colors flex items-center gap-1 group">
                Edit Details
                <Settings size={14} className="group-hover:rotate-45 transition-transform" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-4xl font-bold text-gray-300">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{user.name}</h4>
                  <p className="text-gray-500">{user.email}</p>
                  <div className="mt-2 flex gap-2">
                    <span className="px-2 py-1 bg-gray-100 rounded text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Verified</span>
                    <span className="px-2 py-1 bg-black rounded text-[10px] font-bold text-white uppercase tracking-tighter">Pro Member</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Language</span>
                  <span className="font-medium">English (US)</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">TimeZone</span>
                  <span className="font-medium">UTC+00:00</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Notification Preference</span>
                  <span className="font-medium">Email only</span>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-black text-white rounded-3xl p-8 flex flex-col justify-between"
            id="cta-section"
          >
            <div>
              <h3 className="text-3xl font-bold leading-tight">Secure your account even further.</h3>
              <p className="text-white/60 mt-4 max-w-sm">
                Enable Two-Factor Authentication (2FA) to add an extra layer of security to your data and personal information.
              </p>
            </div>
            <div className="mt-12">
              <button className="px-8 py-4 bg-white text-black rounded-xl font-bold hover:bg-gray-100 transition-colors inline-flex items-center gap-2 group">
                Setup 2FA
                <ShieldCheck size={20} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </motion.section>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-8 border-t border-gray-100 text-center text-gray-400 text-sm mt-auto">
        &copy; {new Date().getFullYear()} AuthFlow System. All rights reserved.
      </footer>
    </div>
  );
};
