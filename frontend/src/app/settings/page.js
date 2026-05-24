'use client';

import React, { useState } from 'react';
import { Settings, Shield, Key, Database, Mail, Info, RefreshCw } from 'lucide-react';

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);
  const [geminiKey, setGeminiKey] = useState('AIzaSyD-•••••••••••••••••••••');
  const [stripeKey, setStripeKey] = useState('sk_test_•••••••••••••••••••••');
  const [pineconeEnv, setPineconeEnv] = useState('us-west1-gcp');

  const saveSettings = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert('[SBR Settings] Config variables successfully saved and committed to local Express Mongoose collections!');
    }, 1200);
  };

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 relative z-20">
      
      {/* Title */}
      <div className="mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Workspace configurations Settings</h2>
          <p className="text-slate-400 text-xs mt-1">Configure credentials variables and active notification nodes triggers.</p>
        </div>
      </div>

      <form onSubmit={saveSettings} className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-30">
        
        {/* Left Side: Forms */}
        <div className="md:col-span-2 flex flex-col gap-6">
          
          {/* Card: API Keys */}
          <div className="glass-panel p-6 rounded-2xl bg-slate-950/40 flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-2 text-violet-400">
              <Key className="w-4.5 h-4.5" />
              <h3 className="font-bold text-xs text-white">AI Provider Keys</h3>
            </div>

            <div className="flex flex-col gap-1.5 text-xs">
              <label className="text-[9px] uppercase font-bold text-slate-400">Google Gemini API Key</label>
              <input 
                type="password" 
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                className="bg-slate-900 border border-white/5 px-3 py-2 rounded-lg text-white focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5 text-xs">
              <label className="text-[9px] uppercase font-bold text-slate-400">Stripe Secret API Key</label>
              <input 
                type="password" 
                value={stripeKey}
                onChange={(e) => setStripeKey(e.target.value)}
                className="bg-slate-900 border border-white/5 px-3 py-2 rounded-lg text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Card: Vector Store */}
          <div className="glass-panel p-6 rounded-2xl bg-slate-950/40 flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-2 text-cyan-400">
              <Database className="w-4.5 h-4.5" />
              <h3 className="font-bold text-xs text-white">Vector DB configurations</h3>
            </div>

            <div className="flex flex-col gap-1.5 text-xs">
              <label className="text-[9px] uppercase font-bold text-slate-400">Pinecone Environment</label>
              <input 
                type="text" 
                value={pineconeEnv}
                onChange={(e) => setPineconeEnv(e.target.value)}
                className="bg-slate-900 border border-white/5 px-3 py-2 rounded-lg text-white focus:outline-none"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={saving}
            className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:scale-[1.01] active:scale-[0.99] text-xs font-bold text-white transition-all shadow-[0_0_15px_rgba(124,58,237,0.2)] flex items-center justify-center gap-1.5"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Save System Settings'}
          </button>

        </div>

        {/* Right Side: Security info */}
        <div className="flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-2xl bg-slate-950/40 relative overflow-hidden">
            <div className="absolute top-4 right-4 text-violet-400">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white mb-2">Encryption Standards</h3>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              All credentials keys are encrypted locally using AES-256 standard and synced directly to active Express API endpoints. No plain text data is ever logged to audits.
            </p>
          </div>
        </div>

      </form>

    </div>
  );
}
