'use client';

import React, { useState } from 'react';
import { 
  Star, ShoppingBag, Plus, Sparkles, Filter, 
  Search, ArrowUpRight, HelpCircle, CheckCircle2, RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MarketplacePage() {
  const [category, setCategory] = useState('All');
  const [installingId, setInstallingId] = useState(null);

  const [agents, setAgents] = useState([
    { id: 1, name: 'Customer Support Genius', category: 'Support', desc: 'Pre-trained RAG templates synced to ticketing databases.', price: 0, rating: 4.8, reviews: 124, avatar: '🤖' },
    { id: 2, name: 'Shopify Checkout Closer', category: 'Sales', desc: 'Sends abandoned checkout reminders via WhatsApp APIs.', price: 29, rating: 4.9, reviews: 82, avatar: '📈' },
    { id: 3, name: 'Audit Report Validator', category: 'Finance', desc: 'Auto checks spreadsheet discrepancies and drafts reports.', price: 49, rating: 4.7, reviews: 31, avatar: '🧠' },
    { id: 4, name: 'Healthcare Appointment Sync', category: 'Health', desc: 'Schedules patients queries and syncs calendars.', price: 0, rating: 4.5, reviews: 14, avatar: '🏥' },
    { id: 5, name: 'Scraper Inventory Syncer', category: 'Marketing', desc: 'Crawls retail sites and pushes catalog updates to Slack.', price: 19, rating: 4.9, reviews: 92, avatar: '🕸️' }
  ]);

  const handleInstall = (id, name) => {
    setInstallingId(id);
    setTimeout(() => {
      setInstallingId(null);
      
      // Fire confetti celebration!
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
      alert(`[Success] Template "${name}" has been successfully added to your workspace active list!`);
    }, 1500);
  };

  const filteredAgents = category === 'All' 
    ? agents 
    : agents.filter(a => a.category === category);

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 relative z-20">
      
      {/* 1. Page Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">AI Agent Marketplace</h2>
          <p className="text-slate-400 text-xs mt-1">Download pre-trained agent templates designed by top cognitive automation architects.</p>
        </div>

        {/* Filter categories */}
        <div className="flex gap-2 items-center flex-wrap">
          {['All', 'Support', 'Sales', 'Finance', 'Health'].map(cat => (
            <button 
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                category === cat 
                  ? 'bg-violet-600 border-violet-500 text-white shadow-md' 
                  : 'bg-slate-900 border-white/5 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Agent cards list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {filteredAgents.map(agent => (
          <div key={agent.id} className="glass-panel p-6 rounded-2xl flex flex-col justify-between bg-slate-950/20">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                <span className="text-2xl">{agent.avatar}</span>
                <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-violet-500/10 text-violet-400 border border-violet-500/20 uppercase">
                  {agent.category}
                </span>
              </div>

              <h4 className="font-bold text-sm text-slate-100 mb-1">{agent.name}</h4>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">{agent.desc}</p>
              
              {/* Ratings */}
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-6">
                <div className="flex text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                </div>
                <strong>{agent.rating}</strong>
                <span>({agent.reviews} installs)</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-4">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-semibold">Price Tier</span>
                <strong className="text-sm font-bold text-white">
                  {agent.price === 0 ? 'Free' : `$${agent.price} / mo`}
                </strong>
              </div>

              <button 
                onClick={() => handleInstall(agent.id, agent.name)}
                disabled={installingId === agent.id}
                className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-xs font-bold text-white rounded-lg shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 transition-all flex items-center gap-1.5"
              >
                {installingId === agent.id ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                Install Template
              </button>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}
