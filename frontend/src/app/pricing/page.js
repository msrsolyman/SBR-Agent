'use client';

import React, { useState } from 'react';
import { CheckCircle2, HelpCircle, ArrowRight, Sparkles, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PricingPage() {
  const [billing, setBilling] = useState('monthly'); // monthly or yearly

  const triggerCheckout = (planName) => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
    alert(`[SBR Invoicing] Simulating checkout redirection for ${planName} plan using Stripe / SSLCommerz.`);
  };

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-12 relative z-20">
      
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-wider text-violet-400 font-bold">Pricing Options</span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2">Scale Your AI Workflows</h2>
        <p className="text-slate-400 max-w-lg mx-auto mt-3 text-sm">
          Choose a subscription cycle that matches your pipeline complexity. Save 20% on yearly plans.
        </p>

        {/* Toggle billing */}
        <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-white/10 mt-6 gap-1 relative z-30">
          <button 
            onClick={() => setBilling('monthly')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              billing === 'monthly' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setBilling('yearly')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              billing === 'yearly' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Yearly (20% Off)
          </button>
        </div>
      </div>

      {/* Cards list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 relative z-30">
        
        {/* Starter Plan */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between bg-slate-950/20">
          <div>
            <span className="text-xs text-slate-400">Sandbox Trial</span>
            <h4 className="text-xl font-bold text-white mt-1 mb-4">Starter</h4>
            <div className="flex items-baseline mb-4">
              <span className="text-3xl font-extrabold text-white">$0</span>
              <span className="text-slate-500 text-xs ml-1">/ forever</span>
            </div>
            <p className="text-slate-400 text-xs mb-6">Test the visual canvas builder with mock databases.</p>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> 2 Active AI Agents</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> 100 Conversations / mo</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> 50k tokens included</li>
            </ul>
          </div>
          <button 
            onClick={() => triggerCheckout('Starter')}
            className="mt-8 w-full py-2.5 rounded-lg text-xs font-semibold border border-white/10 hover:bg-white/5 text-center text-white transition-colors"
          >
            Access Free Sandbox
          </button>
        </div>

        {/* Pro Plan */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between bg-slate-950/40 border-violet-500/30 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-violet-600 text-[9px] font-bold text-white uppercase tracking-wider shadow-md pulse-badge">
            Popular
          </div>
          <div>
            <span className="text-xs text-violet-400 font-semibold">Scale Outreach</span>
            <h4 className="text-xl font-bold text-white mt-1 mb-4">Pro Professional</h4>
            <div className="flex items-baseline mb-4">
              <span className="text-3xl font-extrabold text-white">
                {billing === 'monthly' ? '$29' : '$23'}
              </span>
              <span className="text-slate-500 text-xs ml-1">/ month</span>
            </div>
            <p className="text-slate-400 text-xs mb-6">Unlocks Gemini APIs and visual workflow node debug executions.</p>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> Unlimited AI Agents</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> 2,500 Conversations / mo</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> 500k tokens included</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> WhatsApp & Slack hooks</li>
            </ul>
          </div>
          <button 
            onClick={() => triggerCheckout('Pro')}
            className="mt-8 w-full py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-xs font-bold text-white rounded-lg shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Subscribe Pro Plan
          </button>
        </div>

        {/* Business Plan */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between bg-slate-950/20">
          <div>
            <span className="text-xs text-slate-400">Team Workspaces</span>
            <h4 className="text-xl font-bold text-white mt-1 mb-4">Business</h4>
            <div className="flex items-baseline mb-4">
              <span className="text-3xl font-extrabold text-white">
                {billing === 'monthly' ? '$89' : '$71'}
              </span>
              <span className="text-slate-500 text-xs ml-1">/ month</span>
            </div>
            <p className="text-slate-400 text-xs mb-6">Unlocks multi-user collaboration and developer webhooks playground.</p>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> Everything in Pro</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> 10,000 Conversations / mo</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> 2,000,000 Tokens</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> Shared workspace metrics</li>
            </ul>
          </div>
          <button 
            onClick={() => triggerCheckout('Business')}
            className="mt-8 w-full py-2.5 rounded-lg text-xs font-semibold border border-white/10 hover:bg-white/5 text-center text-white transition-colors"
          >
            Subscribe Business
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between bg-slate-950/20">
          <div>
            <span className="text-xs text-slate-400">High Volume</span>
            <h4 className="text-xl font-bold text-white mt-1 mb-4">Enterprise</h4>
            <div className="flex items-baseline mb-4">
              <span className="text-3xl font-extrabold text-white">Custom</span>
            </div>
            <p className="text-slate-400 text-xs mb-6">Dedicated support, SLAs, and dedicated MongoDB vector indexing databases.</p>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> Uncapped tokens & calls</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> Custom voice synthetics</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> Dedicated database indexes</li>
            </ul>
          </div>
          <a 
            href="mailto:admin@sbr.ai"
            className="mt-8 w-full py-2.5 rounded-lg text-xs font-semibold border border-white/10 hover:bg-white/5 text-center text-white transition-colors block"
          >
            Contact Sales Team
          </a>
        </div>

      </div>

      {/* Feature Checklist Table */}
      <div className="glass-panel p-6 rounded-2xl bg-slate-950/40 relative z-30">
        <h3 className="font-bold text-sm text-white mb-6">Features Comparison Matrix</h3>
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-bold">
                <th className="pb-3">Feature Spec</th>
                <th className="pb-3">Starter</th>
                <th className="pb-3">Pro</th>
                <th className="pb-3">Business</th>
                <th className="pb-3">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="py-3 font-semibold text-slate-100">Visual automation connections</td>
                <td className="py-3">✓</td>
                <td className="py-3">✓</td>
                <td className="py-3">✓</td>
                <td className="py-3">✓</td>
              </tr>
              <tr>
                <td className="py-3 font-semibold text-slate-100">Vector doc chunkings (RAG)</td>
                <td className="py-3">Basic</td>
                <td className="py-3">Advanced</td>
                <td className="py-3">Advanced</td>
                <td className="py-3">Custom indexes</td>
              </tr>
              <tr>
                <td className="py-3 font-semibold text-slate-100">Stripe/SSLCommerz payments</td>
                <td className="py-3">Simulated</td>
                <td className="py-3">Simulated / Live</td>
                <td className="py-3">Simulated / Live</td>
                <td className="py-3">Custom routes</td>
              </tr>
              <tr>
                <td className="py-3 font-semibold text-slate-100">Dedicated SLA</td>
                <td className="py-3">--</td>
                <td className="py-3">--</td>
                <td className="py-3">✓</td>
                <td className="py-3">✓ (24/7 dedicated)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
