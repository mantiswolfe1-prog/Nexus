import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Key, AlertCircle, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { storage, session } from '../Components/Storage/clientStorage.js';
import NeonButton from '../Components/UI/NeonButton.js';
import { Input } from '../Components/UI/input.js';

export default function Auth() {
  const [accessCode, setAccessCode] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const ADMIN_CODE = '0915';

  useEffect(() => {
    if (!sessionStorage.getItem('nexus_consent_accepted')) {
      navigate(createPageUrl('Landing'));
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const code = accessCode.trim();

      if (!code) {
        setError('Please enter an access code');
        setLoading(false);
        return;
      }

      if (code.length < 5 || code.length > 20) {
        setError('Access code must be 5-20 characters');
        setLoading(false);
        return;
      }

      // Admin login - skip storage check
      if (code === ADMIN_CODE) {
        session.set(ADMIN_CODE, remember, true);
        navigate(createPageUrl('AdminDashboard'));
        return;
      }

      // Initialize storage for normal users
      await storage.init();
      const existingUser = await storage.loadUser(code);
      
      if (existingUser) {
        // Returning user - login with existing data
        session.set(code, remember, false);
        navigate(createPageUrl('Dashboard'));
      } else {
        // New user - auto-create account with this access code
        const username = `Nexus_${code.slice(0, 4).toUpperCase()}`;
        await storage.saveUser(username, code);
        
        await storage.saveSettings({
          theme: { background: '#0a0a0f', accent: '#00f0ff', text: '#ffffff' },
          background: { type: 'soft-particle-drift', particleCount: 50, speed: 0.5, opacity: 0.4, blur: 2 },
          performance: { targetFPS: 60, ramLimit: 1024, animationScale: 1, widgetLimit: 3, adaptivePerf: true, showFPS: false },
          games: { fullscreenOnLaunch: true, escToClose: true, lazyLoadStrength: 'medium' },
          widgets: { enabled: false, spotify: false, youtube: false, tiktok: false, autoDisable: true },
          aiTools: { enabled: false, autoSuggest: true },
          lowEndMode: false
        });

        session.set(code, remember, false);
        navigate(createPageUrl('Dashboard'));
      }
    } catch (err) {
      setError('Failed to authenticate. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <h1 className="text-5xl font-bold text-white mb-2">Nexus</h1>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 mx-auto rounded-full" />
            </motion.div>
            <p className="text-white/60 text-sm">Privacy-first student hub</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2 text-center">
                Enter your Nexus access code
              </label>
              <Input
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Access code (5-20 characters)"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 text-center text-lg"
                required
                autoFocus
                disabled={loading}
              />
              <p className="text-xs text-white/40 mt-2 text-center">
                New? Just enter any code to create your account.
              </p>
            </div>

            <label className="flex items-center justify-center gap-2 text-sm text-white/60 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="rounded"
                disabled={loading}
              />
              Remember me on this device
            </label>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <NeonButton
              type="submit"
              variant="primary"
              className="w-full h-12"
              disabled={loading}
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full mr-2"
                  />
                  Authenticating...
                </>
              ) : (
                <>
                  <Key className="w-5 h-5 mr-2" />
                  Enter Nexus
                </>
              )}
            </NeonButton>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center text-xs text-white/30">
            All data stored locally. No account required.
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <a
            href={createPageUrl('Privacy')}
            className="text-white/40 hover:text-white/60 text-sm transition-colors inline-flex items-center gap-2"
          >
            <Shield className="w-3 h-3" />
            Privacy & Security
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}