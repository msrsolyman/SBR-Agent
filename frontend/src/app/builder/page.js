'use client';

import React, { useState } from 'react';
import { 
  Bot, Settings, Database, MessageSquare, Globe, Plus, Trash2, 
  RefreshCw, CheckCircle2, ChevronRight, Zap, Info, ShieldAlert
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AgentBuilderPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form parameters
  const [name, setName] = useState('New Marketing bot');
  const [avatar, setAvatar] = useState('🤖');
  const [category, setCategory] = useState('Marketing');
  const [description, setDescription] = useState('Drives customer retention campaigns.');

  // AI settings
  const [model, setModel] = useState('gemini-1.5-pro');
  const [temperature, setTemperature] = useState(0.7);
  const [personality, setPersonality] = useState('You are a professional marketing representative. Generate empathetic alerts.');
  const [tone, setTone] = useState('Helpful');
  const [language, setLanguage] = useState('English');

  // Documents KB upload
  const [documents, setDocuments] = useState([
    { id: 1, name: 'SBR Product FAQ.pdf', size: '1.2 MB', chunks: 140 },
    { id: 2, name: 'Shopify Store Crawl', size: 'Link', chunks: 42 }
  ]);
  const [newDocName, setNewDocName] = useState('');
  const [docUploading, setDocUploading] = useState(false);

  // Channels integrated
  const [channels, setChannels] = useState({
    whatsapp: false,
    slack: true,
    telegram: false,
    gmail: false
  });

  const triggerUpload = () => {
    if (!newDocName) return;
    setDocUploading(true);
    setTimeout(() => {
      setDocUploading(false);
      setDocuments(prev => [...prev, { 
        id: Date.now(), 
        name: newDocName, 
        size: '142 KB', 
        chunks: Math.floor(Math.random() * 50) + 10 
      }]);
      setNewDocName('');
    }, 1500);
  };

  const deleteDoc = (id) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  const handlePublish = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Confetti burst!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 1500);
  };

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 relative z-20">
      
      {/* Step Indicators Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-8">
        <div className="flex gap-2 items-center">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white font-bold">W</div>
          <div>
            <h2 className="text-base font-extrabold text-white">AI Agent Wizard Builder</h2>
            <span className="text-[10px] text-slate-500">Step {step} of 5</span>
          </div>
        </div>

        {/* Step flow indicator */}
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold">
          {[1, 2, 3, 4, 5].map((s) => (
            <div 
              key={s} 
              className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                step === s 
                  ? 'bg-violet-600 text-white border-violet-500' 
                  : step > s 
                  ? 'bg-slate-900 border-emerald-500/40 text-emerald-400' 
                  : 'bg-slate-950 border-white/5 text-slate-600'
              }`}
            >
              {step > s ? '✓' : s}
            </div>
          ))}
        </div>
      </div>

      {success ? (
        /* SUCCESS PUBLISH ALERT SCREEN */
        <div className="glass-panel p-8 rounded-2xl bg-slate-950/60 border border-emerald-500/20 text-center py-16">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto mb-6 animate-bounce">✓</div>
          <h3 className="text-2xl font-extrabold text-white">Agent Published Successfully!</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto mt-2 leading-relaxed">
            Your custom cognitive model **"{name}"** is now live and waiting for actions. It has been mounted to the Workspace database and synced to active integrations.
          </p>

          <div className="flex justify-center gap-4 mt-8">
            <a href="/chat" className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-xs font-bold text-white shadow-md hover:scale-105 active:scale-95 transition-all">
              Test Agent Chat Panel
            </a>
            <a href="/dashboard" className="px-6 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 text-xs font-semibold text-slate-300">
              Return Dashboard
            </a>
          </div>
        </div>
      ) : (
        /* WIZARD FORM CARDS */
        <div className="glass-panel p-6 sm:p-8 rounded-2xl bg-slate-950/40 border border-white/5 relative min-h-[420px] flex flex-col justify-between">
          
          <div>
            {/* ==========================================
               STEP 1: AGENT GENERAL PROFILE
               ========================================== */}
            {step === 1 && (
              <div className="flex flex-col gap-4">
                <div>
                  <h4 className="font-bold text-base text-white">1. Agent General Profile</h4>
                  <p className="text-xs text-slate-500">Define your custom robot identity descriptors.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase font-bold text-slate-400">Agent Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sales closer bot" 
                      className="bg-slate-900 border border-white/5 px-3 py-2 rounded-lg text-xs text-white focus:outline-none focus:border-violet-500/50"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase font-bold text-slate-400">Agent Avatar Symbol</label>
                    <input 
                      type="text" 
                      value={avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                      placeholder="🤖, 📈, 💬" 
                      className="bg-slate-900 border border-white/5 px-3 py-2 rounded-lg text-xs text-white focus:outline-none focus:border-violet-500/50"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase font-bold text-slate-400">Category</label>
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="bg-slate-900 border border-white/5 px-3 py-2 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-violet-500/50"
                    >
                      <option>Customer Support</option>
                      <option>Marketing</option>
                      <option>Finance</option>
                      <option>Healthcare</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase font-bold text-slate-400">Functional Description</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what tasks this agent will execute..." 
                    className="bg-slate-900 border border-white/5 px-3 py-2 rounded-lg text-xs text-white focus:outline-none focus:border-violet-500/50 h-24 resize-none"
                  />
                </div>
              </div>
            )}

            {/* ==========================================
               STEP 2: PERSONA TUNERS & LLM
               ========================================== */}
            {step === 2 && (
              <div className="flex flex-col gap-4">
                <div>
                  <h4 className="font-bold text-base text-white">2. AI Persona & Cognitive Engine</h4>
                  <p className="text-xs text-slate-500">Tune target temperature thresholds and custom models personalities.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase font-bold text-slate-400">Cognitive Model</label>
                    <select 
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="bg-slate-900 border border-white/5 px-3 py-2 rounded-lg text-xs text-slate-300 focus:outline-none"
                    >
                      <option value="gemini-1.5-pro">Google Gemini 1.5 Pro</option>
                      <option value="deepseek-coder">DeepSeek R1 Coder</option>
                      <option value="gpt-4o">OpenAI GPT-4o</option>
                      <option value="claude-3-opus">Claude 3 Opus</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[9px] uppercase font-bold text-slate-400">Temperature: {temperature}</label>
                      <span className="text-[8px] font-semibold text-cyan-400">{temperature > 0.7 ? 'Creative' : 'Precise'}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0.1" 
                      max="1.5" 
                      step="0.1"
                      value={temperature}
                      onChange={(e) => setTemperature(parseFloat(e.target.value))}
                      className="w-full bg-slate-900 border border-white/5 px-3 py-2 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase font-bold text-slate-400">Speech Tone</label>
                    <input 
                      type="text" 
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      placeholder="e.g. Empathetic, energetic" 
                      className="bg-slate-900 border border-white/5 px-3 py-2 rounded-lg text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase font-bold text-slate-400">Language</label>
                    <input 
                      type="text" 
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      placeholder="English, Bengali" 
                      className="bg-slate-900 border border-white/5 px-3 py-2 rounded-lg text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase font-bold text-slate-400">Custom System Instruction Prompt</label>
                  <textarea 
                    value={personality}
                    onChange={(e) => setPersonality(e.target.value)}
                    placeholder="Enter instructions that instruct how this bot should formulate answers..." 
                    className="bg-slate-900 border border-white/5 px-3 py-2 rounded-lg text-xs text-white focus:outline-none h-20 resize-none"
                  />
                </div>
              </div>
            )}

            {/* ==========================================
               STEP 3: KNOWLEDGE BASE VECTOR
               ========================================== */}
            {step === 3 && (
              <div className="flex flex-col gap-4">
                <div>
                  <h4 className="font-bold text-base text-white">3. Vector RAG Knowledge Base</h4>
                  <p className="text-xs text-slate-500">Upload document PDF, CSV chunks or crawl website FAQ domains.</p>
                </div>

                {/* Upload row */}
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newDocName}
                    onChange={(e) => setNewDocName(e.target.value)}
                    placeholder="e.g. store_documentation.txt" 
                    className="flex-1 bg-slate-900 border border-white/5 px-3 py-2 rounded-lg text-xs text-white focus:outline-none"
                  />
                  <button 
                    onClick={triggerUpload}
                    disabled={docUploading}
                    className="px-4 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 whitespace-nowrap"
                  >
                    {docUploading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Chunk Vector'}
                  </button>
                </div>

                {/* Documents list */}
                <div className="flex flex-col gap-2.5 mt-2 max-h-40 overflow-y-auto pr-1">
                  {documents.map(doc => (
                    <div key={doc.id} className="p-3 rounded-lg bg-slate-900/60 border border-white/5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span>📄</span>
                        <div>
                          <strong className="text-slate-200 block">{doc.name}</strong>
                          <span className="text-[9px] text-slate-500">Size: {doc.size} | Chunks: {doc.chunks} vectors</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => deleteDoc(doc.id)}
                        className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==========================================
               STEP 4: OMNICHANNEL INTEGRATIONS
               ========================================== */}
            {step === 4 && (
              <div className="flex flex-col gap-4">
                <div>
                  <h4 className="font-bold text-base text-white">4. Channels Integrations</h4>
                  <p className="text-xs text-slate-500">Deploy your custom AI bot directly to active channels.</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-2">
                  {[
                    { id: 'whatsapp', name: '🟢 WhatsApp Cloud API', desc: 'Auto respond to phone text triggers.' },
                    { id: 'slack', name: '🔵 Slack App Connect', desc: 'Sync agents inside workspace threads.' },
                    { id: 'telegram', name: '🟣 Telegram Bot Client', desc: 'Deploy automated live chat clients.' },
                    { id: 'gmail', name: '🔴 Gmail Inbox Manager', desc: 'Draft responsive customer emails.' }
                  ].map(ch => (
                    <div key={ch.id} className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex items-start justify-between gap-4">
                      <div>
                        <strong className="text-xs text-white block">{ch.name}</strong>
                        <span className="text-[9px] text-slate-500 block mt-0.5 leading-snug">{ch.desc}</span>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={channels[ch.id]}
                        onChange={() => setChannels(prev => ({ ...prev, [ch.id]: !prev[ch.id] }))}
                        className="w-4 h-4 text-violet-600 rounded bg-slate-950 border-white/10 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==========================================
               STEP 5: PUBLISH AND SAVE
               ========================================== */}
            {step === 5 && (
              <div className="flex flex-col gap-4">
                <div>
                  <h4 className="font-bold text-base text-white">5. Confirm & Publish Agent</h4>
                  <p className="text-xs text-slate-500">Review model specifications before save validation.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 text-xs flex flex-col gap-2.5">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400">Agent Identifier</span>
                    <strong className="text-slate-200">{name} ({avatar})</strong>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400">Cognitive Model</span>
                    <strong className="text-slate-200">{model} (Temp: {temperature})</strong>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400">Knowledge vector</span>
                    <strong className="text-slate-200">{documents.length} files tokenized</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Active channels</span>
                    <strong className="text-cyan-400">
                      {Object.keys(channels).filter(c => channels[c]).join(', ').toUpperCase() || 'None'}
                    </strong>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 leading-relaxed mt-2 flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                  Publishing saves configurations to Mongoose databases and activates real-time routing controllers inside Express API loops. You can audit logs telemetry immediately.
                </p>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center border-t border-white/5 pt-6 mt-8">
            <button 
              onClick={() => setStep(prev => prev - 1)}
              disabled={step === 1}
              className="px-4 py-2 bg-white/5 border border-white/5 text-[10px] font-semibold text-slate-300 hover:text-white rounded-lg disabled:opacity-40 transition-colors"
            >
              Previous Step
            </button>

            {step < 5 ? (
              <button 
                onClick={() => setStep(prev => prev + 1)}
                className="px-5 py-2 bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-bold rounded-lg flex items-center gap-1 hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(124,58,237,0.2)]"
              >
                Next Step
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button 
                onClick={handlePublish}
                disabled={loading}
                className="px-6 py-2 bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-[10px] font-extrabold rounded-lg flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)]"
              >
                {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Compile & Publish'}
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
