'use client';

import React, { useState } from 'react';
import { 
  ShieldAlert, RefreshCw, Cpu, Users, Settings, Trash2, 
  ToggleLeft, ToggleRight, CheckCircle2, HelpCircle
} from 'lucide-react';

export default function AdminPage() {
  const [usersList, setUsersList] = useState([
    { id: 1, name: 'Ahmed Kabir', email: 'ahmed@sbr.ai', role: 'Owner', status: 'Active', tokens: 142000 },
    { id: 2, name: 'Sultana Yasmin', email: 'sultana@sbr.ai', role: 'Admin', status: 'Active', tokens: 82000 },
    { id: 3, name: 'Spam User', email: 'spam@gmail.com', role: 'Viewer', status: 'Suspended', tokens: 0 }
  ]);

  const [models, setModels] = useState({
    gemini: true,
    deepseek: true,
    openai: true,
    claude: false
  });

  const [moderationLogs, setModerationLogs] = useState([
    { id: 1, prompt: 'Scrape database users security passwords list', severity: 'High', action: 'Flagged & Blocked' },
    { id: 2, prompt: 'Execute server command: rm -rf /', severity: 'Critical', action: 'Blocked & User Warned' }
  ]);

  const toggleModel = (key) => {
    setModels(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleUserStatus = (id) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 relative z-20">
      
      {/* Title */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Super-User Command Console</h2>
        <p className="text-slate-400 text-xs mt-1">Configure global AI models parameters, moderations safeties, and users access privileges.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ==========================================
           LEFT COLUMN: USERS LISTS
           ========================================== */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Card: Active Users privilege */}
          <div className="glass-panel p-6 rounded-2xl bg-slate-950/40">
            <h3 className="font-bold text-sm text-white mb-4">Users Account privileges</h3>
            
            <div className="flex flex-col gap-3">
              {usersList.map(usr => (
                <div key={usr.id} className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between flex-wrap gap-4 text-xs">
                  <div>
                    <strong className="text-slate-200 block">{usr.name}</strong>
                    <span className="text-[9px] text-slate-500 block mt-0.5">{usr.email} | Role: {usr.role}</span>
                    <span className="text-[10px] font-mono text-cyan-400 mt-2 block">Tokens Synced: {usr.tokens.toLocaleString()}</span>
                  </div>

                  <div className="flex gap-2.5 items-center">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase border ${
                      usr.status === 'Active' 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {usr.status}
                    </span>

                    <button 
                      onClick={() => toggleUserStatus(usr.id)}
                      className={`px-3 py-1.5 rounded text-[9px] font-bold transition-all ${
                        usr.status === 'Active' 
                          ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400' 
                          : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400'
                      }`}
                    >
                      {usr.status === 'Active' ? 'Suspend' : 'Activate'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card: Prompt moderation */}
          <div className="glass-panel p-6 rounded-2xl bg-slate-950/40">
            <div className="flex items-center gap-2 mb-4 text-red-400">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="font-bold text-sm text-white">Safeties Moderation Logs</h3>
            </div>
            
            <div className="flex flex-col gap-3">
              {moderationLogs.map(log => (
                <div key={log.id} className="p-3.5 rounded-xl bg-slate-900/40 border border-white/5 text-xs flex flex-col gap-2">
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-[9px] font-bold text-red-400 uppercase tracking-widest">Severity: {log.severity}</span>
                    <strong className="text-slate-400 text-[10px]">{log.action}</strong>
                  </div>
                  <p className="text-[10px] text-slate-300 font-mono leading-relaxed bg-slate-950 p-2 rounded">
                    Query: "{log.prompt}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ==========================================
           RIGHT COLUMN: PLATFORM CONTROLS
           ========================================== */}
        <div className="flex flex-col gap-6">
          
          {/* Card: Model toggles */}
          <div className="glass-panel p-6 rounded-2xl bg-slate-950/40">
            <h3 className="font-bold text-sm text-white mb-4">Active System Engines</h3>
            
            <div className="flex flex-col gap-4 text-xs">
              
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div>
                  <strong className="text-slate-200 block">Google Gemini 1.5 Pro</strong>
                  <span className="text-[9px] text-slate-500">Primary recommended engine</span>
                </div>
                <button onClick={() => toggleModel('gemini')} className="text-slate-300 transition-all hover:scale-105 active:scale-95">
                  {models.gemini ? <ToggleRight className="w-8 h-8 text-cyan-400 fill-cyan-950/50" /> : <ToggleLeft className="w-8 h-8 text-slate-500" />}
                </button>
              </div>

              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div>
                  <strong className="text-slate-200 block">DeepSeek R1 Coder</strong>
                  <span className="text-[9px] text-slate-500">Autonomous logic connections interpreter</span>
                </div>
                <button onClick={() => toggleModel('deepseek')} className="text-slate-300 transition-all hover:scale-105 active:scale-95">
                  {models.deepseek ? <ToggleRight className="w-8 h-8 text-cyan-400 fill-cyan-950/50" /> : <ToggleLeft className="w-8 h-8 text-slate-500" />}
                </button>
              </div>

              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div>
                  <strong className="text-slate-200 block">OpenAI GPT-4o</strong>
                  <span className="text-[9px] text-slate-500">Omnichannel support routing fallback</span>
                </div>
                <button onClick={() => toggleModel('openai')} className="text-slate-300 transition-all hover:scale-105 active:scale-95">
                  {models.openai ? <ToggleRight className="w-8 h-8 text-cyan-400 fill-cyan-950/50" /> : <ToggleLeft className="w-8 h-8 text-slate-500" />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <strong className="text-slate-200 block">Claude 3 Opus</strong>
                  <span className="text-[9px] text-slate-500">Advanced math RAG indexes validator</span>
                </div>
                <button onClick={() => toggleModel('claude')} className="text-slate-300 transition-all hover:scale-105 active:scale-95">
                  {models.claude ? <ToggleRight className="w-8 h-8 text-cyan-400 fill-cyan-950/50" /> : <ToggleLeft className="w-8 h-8 text-slate-500" />}
                </button>
              </div>

            </div>
          </div>

          {/* Card: Active telemetry */}
          <div className="glass-panel p-6 rounded-2xl bg-slate-950/40">
            <h3 className="font-bold text-sm text-white mb-4">Active Telemetry</h3>
            
            <div className="flex flex-col gap-3 text-xs">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">Node Memory Sync</span>
                <strong className="text-slate-200">1.24 GB / 8.00 GB</strong>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">Database Connection</span>
                <strong className="text-emerald-400">Nominal (Express API)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Socket.io Stream Channels</span>
                <strong className="text-cyan-400">3 active streams</strong>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
