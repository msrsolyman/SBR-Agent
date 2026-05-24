'use client';

import React from 'react';
import { Cpu, TrendingUp, BarChart as BarChartIcon, RefreshCw, Layers } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, Cell
} from 'recharts';

export default function AnalyticsPage() {
  const tokenData = [
    { month: 'Jan', Gemini: 42000, DeepSeek: 12000, Claude: 24000 },
    { month: 'Feb', Gemini: 50000, DeepSeek: 18000, Claude: 32000 },
    { month: 'Mar', Gemini: 89000, DeepSeek: 32000, Claude: 54000 },
    { month: 'Apr', Gemini: 124000, DeepSeek: 54000, Claude: 90000 },
    { month: 'May', Gemini: 142000, DeepSeek: 92000, Claude: 115000 }
  ];

  const latencyData = [
    { name: 'Support Bot', latency: 1.2 },
    { name: 'Sales Bot', latency: 1.5 },
    { name: 'Marketing Bot', latency: 0.9 }
  ];

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 relative z-20">
      
      {/* Title */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Active Analytics Telemetry</h2>
        <p className="text-slate-400 text-xs mt-1">Detailed breakdowns of token history and pipeline speed latency indexes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 relative z-30">
        
        {/* Token Area Chart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl bg-slate-950/40">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="font-bold text-sm text-white">Models Quota Consumption</h4>
              <p className="text-[10px] text-slate-500">Monthly token telemetry logs.</p>
            </div>
            <TrendingUp className="w-4 h-4 text-violet-400" />
          </div>

          <div className="w-full h-64 text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tokenData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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

        {/* Latency Bar Chart */}
        <div className="glass-panel p-6 rounded-2xl bg-slate-950/40">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="font-bold text-sm text-white">Mean System Latency</h4>
              <p className="text-[10px] text-slate-500">Average response times in seconds.</p>
            </div>
            <Cpu className="w-4 h-4 text-cyan-400" />
          </div>

          <div className="w-full h-64 text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={latencyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" />
                <YAxis stroke="rgba(255,255,255,0.4)" />
                <Tooltip contentStyle={{ backgroundColor: '#090d16', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Bar dataKey="latency" fill="#06b6d4">
                  <Cell fill="#7c3aed" />
                  <Cell fill="#06b6d4" />
                  <Cell fill="#4f46e5" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
