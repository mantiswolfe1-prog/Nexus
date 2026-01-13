import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, Server, HardDrive } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from 'utils';
import GlassCard from '../Components/UI/GlassCard.js';
import NeonButton from '../Components/UI/NeonButton.js';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f] p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.header 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <Link to={createPageUrl('Landing')}>
              <NeonButton variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </NeonButton>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <Shield className="w-8 h-8 text-cyan-400" />
                Privacy & Security
              </h1>
              <p className="text-white/50 mt-1">How Nexus protects your data</p>
            </div>
          </div>
        </motion.header>

        <div className="space-y-6">
          <GlassCard className="p-6" hover={false}>
            <div className="flex items-start gap-3 mb-4">
              <HardDrive className="w-6 h-6 text-cyan-400 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Client-Side Storage</h2>
                <p className="text-white/70 text-sm mb-4">
                  All your personal data is stored locally on your device using encrypted IndexedDB. This includes:
                </p>
                <ul className="list-disc list-inside text-white/60 text-sm space-y-2 ml-4">
                  <li>Username and account code (encrypted)</li>
                  <li>User preferences and settings</li>
                  <li>Favorites and widget positions</li>
                  <li>Theme customizations</li>
                  <li>AI conversation history</li>
                  <li>Local activity logs</li>
                </ul>
                <p className="text-white/70 text-sm mt-4">
                  <strong>You have full control:</strong> Export your data at any time or delete everything with one click from Settings.
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6" hover={false}>
            <div className="flex items-start gap-3 mb-4">
              <Server className="w-6 h-6 text-purple-400 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Minimal Backend</h2>
                <p className="text-white/70 text-sm mb-4">
                  Our backend only handles admin-related features and stores <strong>minimal metadata</strong>:
                </p>
                <ul className="list-disc list-inside text-white/60 text-sm space-y-2 ml-4">
                  <li>Site entry access code validation</li>
                  <li>One-time invite code consumption tracking</li>
                  <li>Ban list identifiers (minimal, non-personal)</li>
                  <li>Admin audit logs (timestamps and admin IDs only)</li>
                </ul>
                <p className="text-white/70 text-sm mt-4">
                  <strong>We NEVER store:</strong> User passwords, OAuth tokens, browsing history, personal activity logs, 
                  or any data beyond what's listed above.
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6" hover={false}>
            <div className="flex items-start gap-3 mb-4">
              <Lock className="w-6 h-6 text-green-400 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">OAuth & Third-Party Services</h2>
                <p className="text-white/70 text-sm mb-4">
                  Nexus uses official OAuth flows for service integrations (Spotify, Google, Discord, etc.):
                </p>
                <ul className="list-disc list-inside text-white/60 text-sm space-y-2 ml-4">
                  <li>OAuth tokens are stored <strong>client-side only</strong></li>
                  <li>You must explicitly consent before any integration</li>
                  <li>Nexus never generates or stores passwords for third-party services</li>
                  <li>All embeds are sandboxed and sanitized</li>
                </ul>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6" hover={false}>
            <div className="flex items-start gap-3 mb-4">
              <Shield className="w-6 h-6 text-cyan-400 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Security Measures</h2>
                <ul className="list-disc list-inside text-white/60 text-sm space-y-2 ml-4">
                  <li>Served over HTTPS with strict CSP enforcement</li>
                  <li>No unsafe script execution</li>
                  <li>Account codes use simple encryption for local storage</li>
                  <li>Regular security audits and updates</li>
                </ul>
              </div>
            </div>
          </GlassCard>

          <motion.div 
            className="text-center pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-white/40 text-sm">
              Questions? Contact your administrator.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}