import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Check, X, ExternalLink, Shield, Crown } from 'lucide-react';
import NeonButton from '../UI/NeonButton.js';
import { storage, session } from '../Storage/clientStorage.js';

export default function DiscordVerification({ role, onVerify }) {
  const [discordId, setDiscordId] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');

  const getRoleBadge = () => {
    switch (role) {
      case 'owner':
        return { icon: Crown, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', label: 'Owner' };
      case 'admin':
        return { icon: Shield, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', label: 'Admin' };
      case 'verified':
        return { icon: Check, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', label: 'Verified' };
      default:
        return { icon: MessageCircle, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', label: 'Guest' };
    }
  };

  const handleVerify = async () => {
    setVerifying(true);
    setError('');

    try {
      if (!discordId.trim()) {
        setError('Please enter your Discord ID');
        setVerifying(false);
        return;
      }

      // In production, this would make an API call to verify Discord membership
      // For now, we'll simulate it
      await new Promise(resolve => setTimeout(resolve, 1500));

      const accessCode = session.get();
      storage.saveUserRole(accessCode, {
        role: 'verified',
        verified: true,
        discordId: discordId.trim()
      });

      // Update session
      session.set(accessCode, true, 'verified');

      if (onVerify) onVerify('verified');
      
      alert('✅ Discord verification successful! You now have access to more features.');
      window.location.reload();
    } catch (err) {
      setError('Verification failed. Please try again or contact support.');
      console.error(err);
    } finally {
      setVerifying(false);
    }
  };

  const badge = getRoleBadge();
  const BadgeIcon = badge.icon;

  return (
    <div className="space-y-4">
      {/* Current Role Badge */}
      <div className={`p-4 rounded-xl ${badge.bg} border ${badge.border}`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-black/20`}>
            <BadgeIcon className={`w-5 h-5 ${badge.color}`} />
          </div>
          <div>
            <h4 className={`font-medium ${badge.color}`}>Current Role: {badge.label}</h4>
            <p className="text-xs text-white/60 mt-1">
              {role === 'guest' && 'Demo mode - Explore what Nexus has to offer!'}
              {role === 'verified' && 'Full access to all user features'}
              {role === 'admin' && 'Administrative privileges'}
              {role === 'owner' && 'Full system control'}
            </p>
          </div>
        </div>
      </div>

      {/* Verification Section (only for guests) */}
      {role === 'guest' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-white/5 border border-white/10"
        >
          <h4 className="text-white font-medium mb-2">Verify with Discord</h4>
          <p className="text-white/60 text-sm mb-4">
            Love what you see? Join our Discord community and verify to unlock your personal account with saves, premium games, and exclusive features!
          </p>

          <div className="space-y-3">
            <a
              href="https://discord.gg/nexushub"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] transition-colors text-white"
            >
              <span className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Join Nexus Discord
              </span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <div>
              <label className="block text-white/70 text-sm mb-2">
                Your Discord User ID
              </label>
              <input
                type="text"
                value={discordId}
                onChange={(e) => setDiscordId(e.target.value)}
                placeholder="e.g., 123456789012345678"
                className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/10 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                disabled={verifying}
              />
              <p className="text-xs text-white/40 mt-1">
                Find your ID: Settings → Advanced → Enable Developer Mode → Right-click your profile → Copy ID
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                <X className="w-4 h-4" />
                {error}
              </div>
            )}

            <NeonButton
              onClick={handleVerify}
              disabled={verifying || !discordId.trim()}
              className="w-full"
            >
              {verifying ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full mr-2"
                  />
                  Verifying...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Verify Discord Membership
                </>
              )}
            </NeonButton>
          </div>
        </motion.div>
      )}

      {/* Feature Access Info */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <h4 className="text-white font-medium mb-3">
          {role === 'guest' ? 'What You Can Try' : 'Your Access'}
        </h4>
        {role === 'guest' && (
          <p className="text-xs text-white/50 mb-3">
            Guest mode lets you explore Nexus features. Verify to save progress and unlock everything!
          </p>
        )}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-400" />
            <span className="text-white/70">Settings & Customization</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-400" />
            <span className="text-white/70">Media Player & Videos</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-400" />
            <span className="text-white/70">Games Demo</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-400" />
            <span className="text-white/70">Study Tools</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-400" />
            <span className="text-white/70">Browse All Features</span>
          </div>
          <div className={`flex items-center gap-2 mt-3 pt-3 border-t border-white/10 ${role === 'guest' ? 'opacity-50' : ''}`}>
            {role === 'guest' ? <X className="w-4 h-4 text-orange-400" /> : <Check className="w-4 h-4 text-green-400" />}
            <span className="text-white/70">Save Progress & Settings</span>
          </div>
          <div className={`flex items-center gap-2 ${role === 'guest' ? 'opacity-50' : ''}`}>
            {role === 'guest' ? <X className="w-4 h-4 text-orange-400" /> : <Check className="w-4 h-4 text-green-400" />}
            <span className="text-white/70">Full Games Library</span>
          </div>
          <div className={`flex items-center gap-2 ${role === 'guest' ? 'opacity-50' : ''}`}>
            {role === 'guest' ? <X className="w-4 h-4 text-orange-400" /> : <Check className="w-4 h-4 text-green-400" />}
            <span className="text-white/70">Social Features & Chat</span>
          </div>
          <div className={`flex items-center gap-2 ${role === 'guest' ? 'opacity-50' : ''}`}>
            {role === 'guest' ? <X className="w-4 h-4 text-orange-400" /> : <Check className="w-4 h-4 text-green-400" />}
            <span className="text-white/70">Premium Study Resources</span>
          </div>
        </div>
      </div>
    </div>
  );
}
