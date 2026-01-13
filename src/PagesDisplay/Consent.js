import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils.js';
import NeonButton from '../Components/UI/NeonButton.js';

export default function Consent() {
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if access was verified
    if (!sessionStorage.getItem('nexus_access_verified')) {
      navigate(createPageUrl('Landing'));
    }
  }, [navigate]);

  const handleContinue = () => {
    if (!accepted) return;
    sessionStorage.setItem('nexus_consent_accepted', 'true');
    navigate(createPageUrl('Auth'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Code of Conduct</h1>
            <p className="text-white/50 text-sm">Please read and accept to continue</p>
          </div>
        </div>

        <div className="space-y-4 mb-8 text-white/70 text-sm">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h3 className="font-semibold text-white mb-2">Development Notice</h3>
            <p>
              Nexus is currently in active development. Features may change, and occasional bugs may occur. 
              Your patience and feedback are appreciated.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h3 className="font-semibold text-white mb-2">Access Code Policy</h3>
            <p>
              Your site entry access code grants you personal access to Nexus. Please do not share access codes publicly, 
              as this helps maintain a safe and controlled environment for all users.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h3 className="font-semibold text-white mb-2">Appropriate Use</h3>
            <p>
              Nexus is designed as a productivity and study tool. Use it responsibly and in accordance with your 
              school's policies. Misuse may result in access revocation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h3 className="font-semibold text-white mb-2">Privacy Commitment</h3>
            <p>
              All your personal data including usernames, settings, favorites, and activity is stored locally on your device. 
              You can export or delete your data at any time from the settings page.
            </p>
          </div>
        </div>

        <label className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors mb-6">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-1"
          />
          <span className="text-white text-sm">
            I have read and accept the code of conduct. I understand that Nexus is in development 
            and that I should not publicly share access codes.
          </span>
        </label>

        <div className="flex gap-3">
          <NeonButton
            variant="ghost"
            onClick={() => navigate(createPageUrl('Landing'))}
            className="flex-1"
          >
            Back
          </NeonButton>
          <NeonButton
            variant="primary"
            onClick={handleContinue}
            disabled={!accepted}
            className="flex-1"
          >
            <Check className="w-4 h-4 mr-2" />
            Accept & Continue
          </NeonButton>
        </div>
      </motion.div>
    </div>
  );
}