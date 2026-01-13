import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Download, ArrowRight } from 'lucide-react';
import NeonButton from '../../Components/UI/NeonButton';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';

export default function Landing() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleContinue = async () => {
    setLoading(true);
    // Store access verified and navigate to consent
    sessionStorage.setItem('nexus_access_verified', 'true');
    navigate(createPageUrl('Consent'));
  };

  const handleInstallPWA = () => {
    // PWA install prompt
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt();
      window.deferredPrompt.userChoice.then((choice) => {
        window.deferredPrompt = null;
      });
    } else {
      alert('To install Nexus, use your browser\'s "Add to Home Screen" or "Install" option.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <h1 className="text-6xl font-bold text-white mb-2">
              Nexus
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 mx-auto rounded-full" />
          </motion.div>
          <p className="text-white/60 text-sm">
            Privacy-first student hub
          </p>
        </div>

        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 shadow-2xl">
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-white/80 text-sm mb-4">
                Welcome to Nexus, your privacy-first student hub. All data stays local on your device.
              </p>
            </div>

            <NeonButton
              onClick={handleContinue}
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Enter Nexus'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </NeonButton>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <button
              onClick={handleInstallPWA}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all text-sm"
            >
              <Download className="w-4 h-4" />
              Install Nexus App
            </button>
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