'use client';

import React, { useState } from 'react';
import { 
  Bot, Zap, Layers, Network, Database, ShieldAlert, Cpu, Sparkles, 
  ArrowRight, CheckCircle2, MessageSquare, Play, RefreshCw, Star, 
  PhoneCall, Users, Send, FileText, Globe, Key, HelpCircle
} from 'lucide-react';

export default function LandingPage() {
  const [billingPeriod, setBillingPeriod] = useState('monthly'); // monthly or yearly
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', text: 'Hi! I am the SBR AI Agent. I can scrape websites, execute workflow loops, query databases, and generate Gemini/DeepSeek embeddings. Try asking me a question!' }
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  // Simulated AI Sandbox execution on Home page
  const [demoPrompt, setDemoPrompt] = useState('Scrape my store, find inventory, and WhatsApp customers');
  const [demoExecuting, setDemoExecuting] = useState(false);
  const [demoSteps, setDemoSteps] = useState([
    { id: 1, label: 'Trigger: HTTP Scraper received request', status: 'pending' },
    { id: 2, label: 'KB Engine: Tokenized store products & calculated vectors', status: 'pending' },
    { id: 3, label: 'DeepSeek: Generated personalized promotions prompt', status: 'pending' },
    { id: 4, label: 'Integration: Sent 12 WhatsApp alerts using Node API', status: 'pending' }
  ]);

  const handleRunDemo = () => {
    setDemoExecuting(true);
    // Reset steps to pending
    setDemoSteps(prev => prev.map(s => ({ ...s, status: 'pending' })));

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < demoSteps.length) {
        setDemoSteps(prev => {
          const next = [...prev];
          next[currentStep].status = 'success';
          return next;
        });
        currentStep++;
      } else {
        clearInterval(interval);
        setDemoExecuting(false);
      }
    }, 1200);
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const userText = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userText }]);
    setChatInput('');
    setChatLoading(true);

    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        text: `Executed pipeline simulation for: "${userText}". RAG database successfully matched 3 documentation chunks. Streaming Node response... Done! You can configure more steps inside the /builder tab.` 
      }]);
      setChatLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full max-w-7xl px-4 md:px-8 pt-20 pb-16 flex flex-col items-center text-center overflow-hidden">
        {/* Shimmer badges */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-violet-500/30 text-xs text-violet-300 font-semibold mb-6 shadow-[0_0_15px_rgba(124,58,237,0.15)] pulse-badge">
          <Sparkles className="w-3.5 h-3.5" />
          No-Code Multi-Agent visual automation platform
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none mb-6">
          Create, Deploy & Monetize <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-violet-400 via-indigo-200 to-cyan-400 bg-clip-text text-transparent text-glow">
            AI Agent Pipelines
          </span>
        </h1>

        <p className="max-w-2xl text-slate-400 text-base sm:text-lg md:text-xl mb-10 leading-relaxed">
          The ultimate futuristic SaaS workbench. Chain models like Gemini, DeepSeek, and Claude. Drag-and-drop workflow canvases, sync vector RAG documents, and integrate WhatsApp or Slack in minutes. Zero coding required.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full justify-center px-4">
          <a href="/builder" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 text-white shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:shadow-[0_0_35px_rgba(124,58,237,0.6)] hover:scale-105 transition-all">
            Build Your Agent Free
            <ArrowRight className="w-5 h-5" />
          </a>
          <a href="/canvas" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold glass-panel hover:bg-white/5 border border-white/10 hover:border-white/20 text-slate-200">
            <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
            Interactive Canvas Sandbox
          </a>
        </div>

        {/* Grid Decorative Lines */}
        <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none opacity-20 z-0">
          <div className="w-full h-full bg-[radial-gradient(circle_500px_at_50%_120px,rgba(124,58,237,0.3),transparent)]" />
        </div>
      </section>

      {/* 2. INTERACTIVE AI DEMO ANIMATION */}
      <section className="w-full max-w-5xl px-4 mb-24 relative z-30">
        <div className="glass-panel rounded-2xl border border-white/10 p-6 md:p-8 bg-slate-950/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-cyan-500/10 to-transparent blur-2xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="w-full lg:w-1/2 flex flex-col">
              <span className="text-xs uppercase tracking-wider text-cyan-400 font-bold mb-2">Live Automation Sandbox</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 text-white">Watch Agents Execute Nodes</h2>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Type a natural language instruction below. Our cognitive automation interpreter parses the prompt, constructs a simulated four-step logical pipeline, indexes document coordinates, and streams the visual execution nodes!
              </p>

              {/* Prompt field */}
              <div className="flex gap-2 p-1.5 rounded-xl bg-slate-900/90 border border-white/10 mb-4 focus-within:border-violet-500/50 transition-colors">
                <input 
                  type="text" 
                  value={demoPrompt}
                  onChange={(e) => setDemoPrompt(e.target.value)}
                  placeholder="Ask SBR Agents..." 
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-white focus:outline-none placeholder-slate-500"
                />
                <button 
                  onClick={handleRunDemo}
                  disabled={demoExecuting}
                  className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg text-xs font-semibold text-white shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 transition-all flex items-center gap-1.5"
                >
                  {demoExecuting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3 h-3 fill-white" />}
                  Execute Pipeline
                </button>
              </div>
            </div>

            {/* Visual execution tree panel */}
            <div className="w-full lg:w-1/2 p-5 rounded-xl bg-slate-950/80 border border-white/5 relative">
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping"></div>
                  <span className="text-xs font-semibold text-slate-300">Agent Visual Tracer</span>
                </div>
                <span className="text-[10px] text-slate-500">ID: wf_demo_active</span>
              </div>

              {/* Dynamic steps map */}
              <div className="flex flex-col gap-3 relative">
                {/* Connecting glowing vector line */}
                <div className="absolute left-3.5 top-3.5 bottom-3.5 w-0.5 bg-slate-800 pointer-events-none" />

                {demoSteps.map((step, idx) => (
                  <div key={step.id} className="flex items-center gap-4 relative z-10">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all border ${
                      step.status === 'success' 
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                        : 'bg-slate-900 text-slate-500 border-white/5'
                    }`}>
                      {step.status === 'success' ? '✓' : step.id}
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs font-medium transition-colors ${
                        step.status === 'success' ? 'text-slate-100' : 'text-slate-500'
                      }`}>{step.label}</p>
                    </div>
                    {step.status === 'success' && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold uppercase">
                        Done
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURE SHOWCASE */}
      <section className="w-full max-w-7xl px-4 md:px-8 mb-24">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-wider text-violet-400 font-bold">Unparalleled Performance</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Engineered with Premium Features</h2>
          <p className="text-slate-400 max-w-xl mx-auto mt-3 text-sm">
            Everything your SaaS enterprise needs to build custom cognitive AI models, run visual logic trees, and deploy secure integrations.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="glass-panel p-6 rounded-2xl flex flex-col bg-slate-950/20">
            <div className="w-12 h-12 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-5">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No-Code Agent Wizard</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Step-by-step guides to design AI avatars, adjust temperatures, configure custom personalities, and configure advanced fallback logic.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex flex-col bg-slate-950/20">
            <div className="w-12 h-12 rounded-xl bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5">
              <Network className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Visual Automation Canvas</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Drag-and-drop workspace triggers, delays, HTTP requests, conditions, web scraping, and emails. Connect nodes with interactive SVG wires.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex flex-col bg-slate-950/20">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Advanced Vector RAG</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Sync vector knowledge: PDF, DOCX, CSV, TXT, or web crawl links. Implements semantic indexing and local cosine similarity lookups.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex flex-col bg-slate-950/20">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Multi-Model Pipelines</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Route queries concurrently to Google Gemini Pro, OpenAI GPT-4o, Anthropic Claude, and DeepSeek based on cost or complexity.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex flex-col bg-slate-950/20">
            <div className="w-12 h-12 rounded-xl bg-pink-600/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-5">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Omnichannel Integrations</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Deploy agents in one click to WhatsApp, Slack, Telegram, Messenger, Shopify, WooCommerce, or set standard REST webhook targets.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex flex-col bg-slate-950/20">
            <div className="w-12 h-12 rounded-xl bg-yellow-600/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 mb-5">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Marketplace Store</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Publish your high-performing custom agents. Sell subscriptions or download templates for Sales, support, and marketing fields.
            </p>
          </div>

        </div>
      </section>

      {/* 4. INTEGRATIONS SECTION */}
      <section className="w-full bg-slate-950/30 border-y border-white/5 py-12 mb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-left max-w-md">
            <h4 className="text-lg font-bold text-white mb-1">Omnichannel Automation Ecosystem</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Connect your AI agents with the tools your team relies on daily. Our pipeline interpreter integrates direct hooks out-of-the-box.
            </p>
          </div>

          {/* Scrolling Logos */}
          <div className="flex gap-8 items-center flex-wrap justify-center opacity-70">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/5 text-xs text-slate-300">
              <span>🟢</span> WhatsApp
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/5 text-xs text-slate-300">
              <span>🔵</span> Slack
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/5 text-xs text-slate-300">
              <span>🟣</span> Telegram
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/5 text-xs text-slate-300">
              <span>🔴</span> Gmail
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/5 text-xs text-slate-300">
              <span>🟢</span> Shopify
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/5 text-xs text-slate-300">
              <span>🟣</span> WooCommerce
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRICING SECTION */}
      <section className="w-full max-w-7xl px-4 md:px-8 mb-24 flex flex-col items-center">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-wider text-cyan-400 font-bold">Simple Scalable Invoicing</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Pricing Plans for Every Scale</h2>
          <p className="text-slate-400 mt-2 text-sm">
            Save 20% by subscribing to our yearly billing cycle. Stripe and SSLCommerz Bangladesh integrated.
          </p>

          {/* Selector toggle button */}
          <div className="inline-flex p-1 rounded-xl bg-slate-900/90 border border-white/10 mt-6 gap-1 relative z-30">
            <button 
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                billingPeriod === 'monthly' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Monthly Billing
            </button>
            <button 
              onClick={() => setBillingPeriod('yearly')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                billingPeriod === 'yearly' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Yearly (20% Off)
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full relative z-30">
          
          {/* Plan 1: Free */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between bg-slate-950/20">
            <div>
              <span className="text-xs text-slate-400 font-medium">Free Sandbox</span>
              <h4 className="text-xl font-bold text-white mt-1 mb-3">Starter</h4>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-extrabold text-white">$0</span>
                <span className="text-slate-500 text-xs ml-1">/ forever</span>
              </div>
              <p className="text-slate-400 text-xs mb-6">Test the drag-and-drop workflow visual canvas and build mock AI agents.</p>
              <ul className="flex flex-col gap-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> 2 Active AI Agents</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> 100 Conversations / mo</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> 50,000 Tokens included</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> Basic RAG Uploads</li>
              </ul>
            </div>
            <a href="/builder" className="mt-8 py-2.5 rounded-lg text-xs font-semibold border border-white/10 hover:bg-white/5 text-center text-white transition-colors">
              Get Started Free
            </a>
          </div>

          {/* Plan 2: Pro */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between bg-slate-950/40 border-violet-500/30 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-violet-600 text-[9px] font-bold text-white uppercase tracking-wider shadow-md pulse-badge">
              Popular
            </div>
            <div>
              <span className="text-xs text-violet-400 font-semibold">Scale Operations</span>
              <h4 className="text-xl font-bold text-white mt-1 mb-3">Pro Professional</h4>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-extrabold text-white">
                  {billingPeriod === 'monthly' ? '$29' : '$23'}
                </span>
                <span className="text-slate-500 text-xs ml-1">/ month</span>
              </div>
              <p className="text-slate-400 text-xs mb-6">Unlocks Gemini/DeepSeek APIs, live visual nodes debug, and channel integrations.</p>
              <ul className="flex flex-col gap-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> Unlimited AI Agents</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> 2,500 Conversations / mo</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> 500,000 Tokens included</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> Advanced RAG & Vector crawl</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> WhatsApp & Slack hooks</li>
              </ul>
            </div>
            <a href="/billing" className="mt-8 py-2.5 rounded-lg text-xs font-bold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-center text-white shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all">
              Subscribe Pro
            </a>
          </div>

          {/* Plan 3: Business */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between bg-slate-950/20">
            <div>
              <span className="text-xs text-slate-400 font-medium">For Fast Teams</span>
              <h4 className="text-xl font-bold text-white mt-1 mb-3">Enterprise SaaS</h4>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-extrabold text-white">
                  {billingPeriod === 'monthly' ? '$89' : '$71'}
                </span>
                <span className="text-slate-500 text-xs ml-1">/ month</span>
              </div>
              <p className="text-slate-400 text-xs mb-6">Unlocks team collaboration roles, workspace metrics history, and API Key generation.</p>
              <ul className="flex flex-col gap-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> Everything in Pro</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> 10,000 Conversations / mo</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> 2,000,000 Tokens included</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> Shared team workspaces</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> Webhooks & Developers SDK</li>
              </ul>
            </div>
            <a href="/billing" className="mt-8 py-2.5 rounded-lg text-xs font-semibold border border-white/10 hover:bg-white/5 text-center text-white transition-colors">
              Subscribe Business
            </a>
          </div>

          {/* Plan 4: Enterprise */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between bg-slate-950/20">
            <div>
              <span className="text-xs text-slate-400 font-medium">Custom Solutions</span>
              <h4 className="text-xl font-bold text-white mt-1 mb-3">Custom Scaling</h4>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-extrabold text-white">Custom</span>
              </div>
              <p className="text-slate-400 text-xs mb-6">Dedicated support, on-premise vector indexing, custom SLA limits, and custom billing models.</p>
              <ul className="flex flex-col gap-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> Uncapped tokens / queries</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> Custom voice synthesis</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> Dedicated database indexes</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> SSLCommerz custom routes</li>
              </ul>
            </div>
            <a href="mailto:admin@sbr.ai" className="mt-8 py-2.5 rounded-lg text-xs font-semibold border border-white/10 hover:bg-white/5 text-center text-white transition-colors">
              Contact Sales
            </a>
          </div>

        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="w-full max-w-4xl px-4 md:px-8 mb-24">
        <div className="text-center mb-12">
          <HelpCircle className="w-8 h-8 text-violet-400 mx-auto mb-3" />
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Frequently Answered Questions</h3>
        </div>

        <div className="flex flex-col gap-4">
          <div className="p-5 rounded-xl bg-slate-900/50 border border-white/5">
            <h5 className="font-bold text-sm text-slate-200 mb-2">Do I need to enter API keys to test SBR Agent AI?</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              No! SBR Agent AI includes an integrated robust database sandbox and mock API responders, allowing you to build agents, visual workflow networks, and run RAG upload chunks directly right out-of-the-box. Live settings panels exist when you are ready to configure custom Gemini, OpenAI, or Pinecone credentials.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/50 border border-white/5">
            <h5 className="font-bold text-sm text-slate-200 mb-2">Which local payment gateways are supported in Bangladesh?</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              In addition to global card processing via Stripe, SBR Agent AI has custom integration modules for SSLCommerz (Bangladesh), allowing BKash, Nagad, Rocket, and Visa/Mastercard payments. Checkouts and invoices simulate payment success callback triggers seamlessly.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/50 border border-white/5">
            <h5 className="font-bold text-sm text-slate-200 mb-2">How does the RAG vector indexing operate?</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              When documents are uploaded, our engine divides the text contents into smaller overlapping character segments, calculates numerical vector embeddings based on text terms weights, and saves them locally. Incoming queries undergo a cosine similarity lookup to inject matching segments directly into prompts!
            </p>
          </div>
        </div>
      </section>

      {/* 7. FLOATING CHAT ASSISTANT PREVIEW PANEL */}
      <div className="fixed bottom-20 md:bottom-6 right-6 z-50">
        {!chatOpen ? (
          <button 
            onClick={() => setChatOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-2xl hover:scale-110 hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-all cursor-pointer relative"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-400 border border-slate-950 pulse-badge flex items-center justify-center text-[8px] font-bold text-slate-950">1</span>
          </button>
        ) : (
          <div className="w-80 md:w-96 rounded-2xl glass-panel border border-white/10 bg-slate-950/90 shadow-2xl flex flex-col overflow-hidden">
            
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-violet-950/60 to-slate-950 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-violet-400" />
                <div>
                  <h6 className="text-xs font-bold text-white">SBR AI Agent Sandbox</h6>
                  <span className="text-[9px] text-slate-400">Streaming active model</span>
                </div>
              </div>
              <button 
                onClick={() => setChatOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-semibold bg-white/5 px-2 py-1 rounded"
              >
                Hide
              </button>
            </div>

            {/* Messages box */}
            <div className="p-4 h-64 overflow-y-auto flex flex-col gap-3">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`px-3 py-2 rounded-xl text-xs max-w-[85%] leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-violet-600 text-white rounded-br-none' 
                      : 'bg-slate-900 border border-white/5 text-slate-300 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex gap-1 items-center px-3 py-2 bg-slate-900 border border-white/5 rounded-xl max-w-[50%]">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              )}
            </div>

            {/* Input field */}
            <div className="p-3 bg-slate-900/80 border-t border-white/5 flex gap-2">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                placeholder="Ask bot..." 
                className="flex-1 bg-transparent px-3 py-2 border border-white/5 rounded-lg text-xs text-white focus:outline-none placeholder-slate-500"
              />
              <button 
                onClick={handleSendChat}
                className="w-8 h-8 rounded-lg bg-violet-600 hover:bg-violet-500 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
