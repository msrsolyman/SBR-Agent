'use client';

import React, { useState } from 'react';
import { 
  Bot, Send, Paperclip, Mic, Volume2, Plus, Star, Search, 
  Trash2, RefreshCw, Layers, CheckCircle2, ChevronRight, User, Code
} from 'lucide-react';

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState('agt_101'); // agt_101 (Support), agt_102 (Sales)
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState({
    agt_101: [
      { role: 'assistant', text: 'Hello! I am SBR Support Bot running on Google Gemini. I can access document vectors to help answer customer inquiries. Ask me anything!' }
    ],
    agt_102: [
      { role: 'assistant', text: 'Hey there! Ready to score leads and drive retention campaigns? I am DeepSales Closer Bot running on DeepSeek R1.' }
    ]
  });

  const [loading, setLoading] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim() && !attachedFile) return;

    const userText = input;
    const fileLog = attachedFile ? ` [Attached: ${attachedFile}]` : '';
    
    // Add User Message
    setMessages(prev => ({
      ...prev,
      [activeTab]: [...prev[activeTab], { role: 'user', text: userText + fileLog }]
    }));
    
    setInput('');
    setAttachedFile(null);
    setLoading(true);

    // Simulate streaming prompt responder
    setTimeout(() => {
      let botResponse = '';
      if (activeTab === 'agt_101') {
        botResponse = 'Vector lookup successfully searched 3 FAQ document chunks. Direct Answer: SBR Agent AI integrates Stripe checkout and SSLCommerz BD gateway pipelines natively, executing workflow nodes to sync active users databases.';
      } else {
        botResponse = 'DeepSeek Decision: 12 leads scoring completed. Campaign automation trigger executed. Sent personalized WhatsApp promotion links.';
      }

      setMessages(prev => ({
        ...prev,
        [activeTab]: [...prev[activeTab], { role: 'assistant', text: botResponse }]
      }));
      setLoading(false);
    }, 1500);
  };

  const triggerMockVoice = () => {
    setVoiceMode(!voiceMode);
    if (!voiceMode) {
      alert('[SBR Speech Synth] Voice recognition activated. Try speaking your prompt...');
    }
  };

  return (
    <div className="flex-1 w-full min-h-[calc(100vh-68px)] flex bg-slate-950/20 relative z-20">
      
      {/* 1. SIDEBAR: THREADS HISTORY */}
      <div className="hidden md:flex w-64 glass-panel border-r border-white/10 bg-slate-950/70 p-4 flex-col gap-4 shrink-0">
        <div className="flex items-center justify-between">
          <strong className="text-xs uppercase font-extrabold text-white tracking-wider">Agents Chats</strong>
          <button 
            onClick={() => alert('New agent workspace setup in /builder')}
            className="p-1 bg-white/5 hover:bg-white/10 border border-white/5 rounded text-slate-300"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Search threads */}
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/5 text-xs text-slate-400">
          <Search className="w-3.5 h-3.5 text-slate-600" />
          <input type="text" placeholder="Search chats..." className="bg-transparent focus:outline-none w-full text-[10px] text-white" />
        </div>

        {/* Agents threads tabs selectors */}
        <div className="flex flex-col gap-2 mt-2">
          <button 
            onClick={() => setActiveTab('agt_101')}
            className={`p-3 rounded-xl text-left border transition-all flex items-center gap-3 ${
              activeTab === 'agt_101' 
                ? 'bg-violet-600/10 text-white border-violet-500/50 shadow-md' 
                : 'bg-slate-900/60 border-white/5 text-slate-400 hover:bg-slate-900'
            }`}
          >
            <span className="text-lg">🤖</span>
            <div className="flex-1 min-w-0">
              <strong className="text-xs block font-bold truncate">Support Bot</strong>
              <span className="text-[8px] text-slate-500 block truncate">Gemini 1.5 Pro</span>
            </div>
          </button>

          <button 
            onClick={() => setActiveTab('agt_102')}
            className={`p-3 rounded-xl text-left border transition-all flex items-center gap-3 ${
              activeTab === 'agt_102' 
                ? 'bg-cyan-600/10 text-white border-cyan-500/50 shadow-md' 
                : 'bg-slate-900/60 border-white/5 text-slate-400 hover:bg-slate-900'
            }`}
          >
            <span className="text-lg">📈</span>
            <div className="flex-1 min-w-0">
              <strong className="text-xs block font-bold truncate">DeepSales Agent</strong>
              <span className="text-[8px] text-slate-500 block truncate">DeepSeek R1</span>
            </div>
          </button>
        </div>
      </div>

      {/* ==========================================
         2. CENTRAL CHAT FEED PANEL
         ========================================== */}
      <div className="flex-1 flex flex-col justify-between bg-slate-950/10 relative">
        
        {/* Header chat details */}
        <div className="px-6 py-3 border-b border-white/5 bg-slate-950/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">{activeTab === 'agt_101' ? '🤖' : '📈'}</span>
            <div>
              <h4 className="text-xs font-bold text-white">
                {activeTab === 'agt_101' ? 'SBR Support Bot' : 'DeepSales Closer Bot'}
              </h4>
              <span className="text-[9px] text-slate-400">
                Model: <strong className="text-slate-300">{activeTab === 'agt_101' ? 'gemini-1.5-pro' : 'deepseek-coder'}</strong>
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={triggerMockVoice}
              className={`w-8 h-8 rounded-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all ${
                voiceMode ? 'bg-cyan-600 text-white shadow-md' : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <Mic className="w-4 h-4" />
            </button>
            <button 
              onClick={() => alert('[Speech Synth] Text-to-speech toggled successfully.')}
              className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-lg text-slate-300 flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chats Messages Feed container */}
        <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
          {messages[activeTab].map((msg, i) => {
            const isUser = msg.role === 'user';
            return (
              <div key={i} className={`flex gap-3 max-w-[80%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 ${
                  isUser ? 'bg-violet-600 text-white' : 'bg-slate-900 border border-white/5 text-slate-300'
                }`}>
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`p-4 rounded-2xl text-xs leading-relaxed ${
                  isUser 
                    ? 'bg-violet-600 text-white rounded-tr-none shadow-[0_0_15px_rgba(124,58,237,0.15)]' 
                    : 'bg-slate-950/70 border border-white/5 text-slate-300 rounded-tl-none'
                }`}>
                  {msg.text.includes('Code') ? (
                    <div className="flex flex-col gap-2">
                      <p>{msg.text}</p>
                      <div className="bg-slate-950 p-2.5 rounded border border-white/5 font-mono text-[10px] text-cyan-400 flex items-center gap-1.5">
                        <Code className="w-3.5 h-3.5" />
                        node run_interpreter.js --workflow=wf_201
                      </div>
                    </div>
                  ) : msg.text}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 max-w-[50%] mr-auto items-center">
              <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-slate-500">
                <Bot className="w-4 h-4 text-slate-500 animate-spin" />
              </div>
              <div className="flex gap-1 items-center px-4 py-2.5 bg-slate-950/70 border border-white/5 rounded-2xl rounded-tl-none">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}

          {/* Voice active waveforms overlay */}
          {voiceMode && (
            <div className="p-4 rounded-xl bg-cyan-950/15 border border-cyan-500/20 text-center flex flex-col items-center gap-3 mt-4 w-64 mx-auto shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Listening... Speak now</span>
              <div>
                <span className="voice-bar"></span>
                <span className="voice-bar"></span>
                <span className="voice-bar"></span>
                <span className="voice-bar"></span>
                <span className="voice-bar"></span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Floating Glass Input Panel */}
        <form onSubmit={handleSendMessage} className="p-4 bg-gradient-to-t from-slate-950 to-transparent relative z-30">
          
          {attachedFile && (
            <div className="max-w-xs px-2.5 py-1 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20 text-[10px] font-semibold flex items-center justify-between mb-2">
              <span>📎 File Attached: {attachedFile}</span>
              <button type="button" onClick={() => setAttachedFile(null)} className="text-red-400 hover:underline">Remove</button>
            </div>
          )}

          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/90 border border-white/10 focus-within:border-violet-500/50 shadow-2xl transition-colors">
            
            <button 
              type="button" 
              onClick={() => {
                const file = prompt('Enter document name to attach (PDF, DOCX, CSV):', 'product_spec.pdf');
                if (file) setAttachedFile(file);
              }}
              className="w-8 h-8 rounded-lg bg-white/5 text-slate-400 hover:text-white flex items-center justify-center transition-colors hover:scale-105"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Query vector schemas or run visual commands..." 
              className="flex-1 bg-transparent px-3 py-2 text-xs text-white focus:outline-none placeholder-slate-600"
            />

            <button 
              type="submit"
              className="w-8 h-8 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:scale-105 active:scale-95 text-white flex items-center justify-center shadow-md transition-all"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

      </div>

    </div>
  );
}
