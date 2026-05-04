import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, UserPlus, LogIn, AlertCircle, CheckCircle2 } from 'lucide-react';
import { authService } from '../services/authService';

interface RegisterProps {
  onRegisterSuccess: () => void;
  onSwitchToLogin: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onRegisterSuccess, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const existingUser = authService.findUserByEmail(email);
      
      if (existingUser) {
        setError('An account with this email already exists');
        setLoading(false);
      } else {
        const newUser = {
          id: Math.random().toString(36).substring(2, 9),
          name,
          email,
          password,
          createdAt: new Date().toISOString(),
        };
        
        authService.saveUser(newUser);
        setIsSuccess(true);
        setLoading(false);
        
        setTimeout(() => {
          onRegisterSuccess();
        }, 1500);
      }
    }, 1000);
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md p-10 bg-white rounded-3xl shadow-xl border border-gray-100 text-center"
        id="register-success-card"
      >
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="text-green-500" size={40} />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Account Created!</h2>
        <p className="text-gray-500 mb-8">You're all set. Redirecting you to login...</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl border border-gray-100"
      id="register-card"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight" id="register-title">Get Started</h1>
        <p className="text-gray-500 mt-2">Create your account to start exploring</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" id="register-form">
        {error && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm"
            id="register-error"
          >
            <AlertCircle size={18} />
            {error}
          </motion.div>
        )}

        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider ml-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
              placeholder="John Doe"
              id="register-name-input"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider ml-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
              placeholder="name@example.com"
              id="register-email-input"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider ml-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
              placeholder="••••••••"
              id="register-password-input"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-black text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:bg-gray-400"
          id="register-submit-btn"
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            />
          ) : (
            <>
              <UserPlus size={20} />
              Create Account
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <p className="text-gray-500 text-sm">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-black font-semibold hover:underline"
            id="register-login-link"
          >
            Login here
          </button>
        </p>
      </div>
    </motion.div>
  );
};
