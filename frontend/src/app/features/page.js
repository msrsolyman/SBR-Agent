'use client';

import React from 'react';
import { 
  Bot, Network, Database, ShieldAlert, Cpu, Sparkles, 
  MessageSquare, Layers, Star, PhoneCall
} from 'lucide-react';

export default function FeaturesPage() {
  return (
    <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-12 relative z-20">
      
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-wider text-cyan-400 font-bold">Comprehensive Capabilities</span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2">Enterprise Automation Solved</h2>
        <p className="text-slate-400 max-w-lg mx-auto mt-3 text-sm">
          A high-fidelity layout showcasing our visual automation stack and vector chunking telemetry engines.
        </p>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-30">
        
        <div className="glass-panel p-6 rounded-2xl bg-slate-950/20 flex gap-4 items-start">
          <div className="w-12 h-12 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">No-Code Cognitive Builder</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Name avatars, specify categories, configure tones, and choose default models (Gemini, DeepSeek, Claude) using responsive wizard dialog sliders.
            </p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl bg-slate-950/20 flex gap-4 items-start">
          <div className="w-12 h-12 rounded-xl bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
            <Network className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">Visual Automation Canvas</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Arrange triggers, delays, HTTP requests, Loops, and CRM updates on a high-fidelity visual grid connectable via interactive SVG curves.
            </p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl bg-slate-950/20 flex gap-4 items-start">
          <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">Advanced Vector RAG Syncing</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Divide character texts into semantic overlapping segments, compile 32-dimensional term frequency vectors, and query local databases using cosine similarity.
            </p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl bg-slate-950/20 flex gap-4 items-start">
          <div className="w-12 h-12 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">JWT Security & Moderations</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Inject tokens validation filters, rate-limiting guards, role privileges configurations, and audit moderation logs for compromised queries.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
