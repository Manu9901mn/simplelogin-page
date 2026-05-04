/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User } from './types';
import { authService } from './services/authService';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<'login' | 'register'>('login');
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Check for existing session
    const session = authService.getCurrentSession();
    if (session) {
      setUser(session);
    }
    
    // Smooth transition from splash to app
    setTimeout(() => {
      setIsInitializing(false);
    }, 1500);
  }, []);

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    authService.setCurrentSession(null);
    setUser(null);
    setView('login');
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center" id="initializing-screen">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-2">
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">AuthFlow</h1>
        </motion.div>
      </div>
    );
  }

  if (user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 selection:bg-black selection:text-white" id="auth-screen">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-50/50 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-50/50 blur-[120px]" />
      </div>

      <AnimatePresence mode="wait">
        {view === 'login' ? (
          <Login
            key="login-view"
            onLoginSuccess={handleLoginSuccess}
            onSwitchToRegister={() => setView('register')}
          />
        ) : (
          <Register
            key="register-view"
            onRegisterSuccess={() => setView('login')}
            onSwitchToLogin={() => setView('login')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

