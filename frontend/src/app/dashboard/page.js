'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bot, Zap, Cpu, Users, Layers, Activity, TrendingUp, DollarSign,
  Play, StopCircle, RefreshCw, Star, ArrowUpRight, Search, Plus
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [runStats, setRunStats] = useState({
    tokenUsage: 142380,
    tokenLimit: 500000,
    activeAgents: 4,
    conversationsCount: 928,
    costSavingsUsd: 142.50
  });

  const [recentLogs, setRecentLogs] = useState([
    { id: 1, agentName: 'SBR Support Bot', action: 'Answered ticket: "Billing inquiry"', time: '2 mins ago', type: 'info' },
    { id: 2, agentName: 'DeepSales Agent', action: 'Captured WhatsApp Lead + Sync CRM', time: '14 mins ago', type: 'success' },
    { id: 3, agentName: 'WebScraper Node', action: 'Synced 14 products from Shopify to KB', time: '1 hr ago', type: 'system' },
    { id: 4, agentName: 'SBR Support Bot', action: 'Failed condition branch check: "Refund request"', time: '2 hrs ago', type: 'warning' }
  ]);

  const [activeWorkflowActive, setActiveWorkflowActive] = useState(true);

  // Mock Recharts Data
  const chartData = [
    { month: 'Jan', Gemini: 42000, Claude: 24000, OpenAI: 30000, DeepSeek: 12000 },
    { month: 'Feb', Gemini: 50000, Claude: 32000, OpenAI: 40000, DeepSeek: 18000 },
    { month: 'Mar', Gemini: 89000, Claude: 54000, OpenAI: 73000, DeepSeek: 32000 },
    { month: 'Apr', Gemini: 124000, Claude: 90000, OpenAI: 110000, DeepSeek: 54000 },
    { month: 'May', Gemini: 142000, Claude: 115000, OpenAI: 125000, DeepSeek: 92000 }
  ];

  const categoryData = [
    { name: 'Customer Support', value: 45, color: '#7c3aed' },
    { name: 'E-commerce Sales', value: 30, color: '#06b6d4' },
    { name: 'Finance / Audit', value: 15, color: '#4f46e5' },
    { name: 'Healthcare Help', value: 10, color: '#3b82f6' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex-1 min-h-[calc(100vh-68px)] flex items-center justify-center bg-slate-950/20">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-violet-400 animate-spin" />
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Syncing dashboard pipelines...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 relative z-20">
      
      {/* 1. WELCOME HUB & SEARCH */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">System Administrative Hub</h2>
          <p className="text-slate-400 text-xs mt-1">Real-time telemetry and custom multi-agent logic controllers.</p>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          {/* Search bar */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/5 text-xs text-slate-300 w-full sm:w-64 focus-within:border-violet-500/50 transition-colors">
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search pipelines..." 
              className="bg-transparent focus:outline-none w-full placeholder-slate-600 text-xs text-white"
            />
          </div>

          <a href="/builder" className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg text-xs font-bold text-white shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 whitespace-nowrap">
            <Plus className="w-3.5 h-3.5" />
            New Agent
          </a>
        </div>
      </div>

      {/* 2. DYNAMIC TELEMETRY KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* KPI 1: Tokens */}
        <div className="glass-panel p-5 rounded-2xl bg-slate-950/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-violet-600/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase font-bold text-slate-400">Tokens Consumption</span>
            <Cpu className="w-4 h-4 text-violet-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-white">
              {runStats.tokenUsage.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-500">/ {runStats.tokenLimit.toLocaleString()} limit</span>
          </div>
          {/* Bar quota meter */}
          <div className="w-full bg-slate-900 h-1.5 rounded-full mt-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-violet-600 to-indigo-500 h-full rounded-full" 
              style={{ width: `${(runStats.tokenUsage / runStats.tokenLimit) * 100}%` }}
            />
          </div>
        </div>

        {/* KPI 2: Active Agents */}
        <div className="glass-panel p-5 rounded-2xl bg-slate-950/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-600/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase font-bold text-slate-400">Active AI Engines</span>
            <Bot className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-white">{runStats.activeAgents}</span>
            <span className="text-[10px] text-slate-500">Active right now</span>
          </div>
          <p className="text-[10px] text-emerald-400 font-semibold mt-4 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            All systems nominal
          </p>
        </div>

        {/* KPI 3: Conversations */}
        <div className="glass-panel p-5 rounded-2xl bg-slate-950/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase font-bold text-slate-400">Conversations</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-white">
              {runStats.conversationsCount.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-500">Captured this cycle</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-4">
            <span className="text-emerald-400 font-bold">↑ 12%</span> from last cycle
          </p>
        </div>

        {/* KPI 4: Costs Savings */}
        <div className="glass-panel p-5 rounded-2xl bg-slate-950/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-600/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase font-bold text-slate-400">RAG Balance Savings</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-white">
              ${runStats.costSavingsUsd.toFixed(2)}
            </span>
            <span className="text-[10px] text-slate-500">Net savings</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-4">
            Estimated workflow ROI: <strong className="text-slate-200">340%</strong>
          </p>
        </div>

      </div>

      {/* 3. CHART SECTIONS (Recharts integration) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Token consumption chart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl bg-slate-950/40 relative">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="font-bold text-sm text-white">Consumptions History</h4>
              <p className="text-[10px] text-slate-500">Monthly breakdown of multi-model tokens usage.</p>
            </div>
            <TrendingUp className="w-4 h-4 text-violet-400" />
          </div>

          <div className="w-full h-64 text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGemini" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDeepSeek" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" />
                <YAxis stroke="rgba(255,255,255,0.4)" />
                <Tooltip contentStyle={{ backgroundColor: '#090d16', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Legend />
                <Area type="monotone" dataKey="Gemini" stroke="#7c3aed" fillOpacity={1} fill="url(#colorGemini)" />
                <Area type="monotone" dataKey="DeepSeek" stroke="#06b6d4" fillOpacity={1} fill="url(#colorDeepSeek)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category breakdown (Pie chart) */}
        <div className="glass-panel p-6 rounded-2xl bg-slate-950/40">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="font-bold text-sm text-white">Categories Allocations</h4>
              <p className="text-[10px] text-slate-500">Distribution of active AI personas.</p>
            </div>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>

          <div className="w-full h-48 flex items-center justify-center text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#090d16', border: '1px solid rgba(255,255,255,0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Custom legend */}
          <div className="flex flex-col gap-2.5 mt-4">
            {categoryData.map((cat, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></span>
                  <span className="text-slate-300 font-medium">{cat.name}</span>
                </div>
                <span className="text-slate-400 font-bold">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. ACTIVE FLOW CONTROLLER & RECENT LOGS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Dynamic active workflows widgets */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl bg-slate-950/40">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="font-bold text-sm text-white">Primary Visual Automations</h4>
              <p className="text-[10px] text-slate-500">Visual automation pipelines synced to live endpoints.</p>
            </div>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>

          <div className="flex flex-col gap-4">
            
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-white">WhatsApp Lead Scraper</span>
                  <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-widest">
                    Live
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Webhook Input → Custom personality → WhatsApp sending alert.</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="block text-xs font-bold text-slate-300">142 Executions</span>
                  <span className="text-[9px] text-slate-500">Latency: 1.2s</span>
                </div>
                <button 
                  onClick={() => setActiveWorkflowActive(!activeWorkflowActive)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all ${
                    activeWorkflowActive 
                      ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400' 
                      : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400'
                  }`}
                >
                  {activeWorkflowActive ? <StopCircle className="w-4 h-4" /> : <Play className="w-4 h-4 fill-emerald-400" />}
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 flex items-center justify-between flex-wrap gap-4 opacity-70">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-white">CRM Google Sheets Sync</span>
                  <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-slate-800 text-slate-400 border border-slate-700 uppercase tracking-widest">
                    Inactive
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">HTTP trigger → Scrape pricing values → Google sheets append.</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="block text-xs font-bold text-slate-300">0 Executions</span>
                  <span className="text-[9px] text-slate-500">Latency: --</span>
                </div>
                <a href="/canvas" className="w-8 h-8 bg-violet-600/20 rounded-lg flex items-center justify-center hover:bg-violet-600/30 text-violet-400 hover:scale-105 active:scale-95 transition-all">
                  <Plus className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Real-time systems logs */}
        <div className="glass-panel p-6 rounded-2xl bg-slate-950/40">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="font-bold text-sm text-white">Active Logs Telemetry</h4>
              <p className="text-[10px] text-slate-500">Real-time actions audit list.</p>
            </div>
            <button 
              onClick={() => alert('Logs cleared successfully')}
              className="text-[9px] font-semibold text-violet-400 hover:underline"
            >
              Clear
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {recentLogs.map(log => (
              <div key={log.id} className="text-xs border-b border-white/5 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-200 text-[10px]">{log.agentName}</span>
                  <span className="text-[9px] text-slate-500">{log.time}</span>
                </div>
                <p className="text-slate-400 text-[10px] leading-relaxed flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    log.type === 'success' ? 'bg-emerald-500' :
                    log.type === 'warning' ? 'bg-amber-500' :
                    log.type === 'system' ? 'bg-cyan-500' : 'bg-blue-500'
                  }`}></span>
                  {log.action}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
