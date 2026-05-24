'use client';

import React, { useState } from 'react';
import { 
  Key, RefreshCw, Plus, Copy, CheckCircle2, Play, Code, 
  Send, Server, Shield, HelpCircle, ArrowUpRight
} from 'lucide-react';

export default function DeveloperPage() {
  const [keys, setKeys] = useState([
    { id: 1, label: 'Production Website bot', value: 'sbr_live_7c3aed4f46e50ea5e90ea5e9', created: '2026-05-12' },
    { id: 2, label: 'Staging Debug', value: 'sbr_test_8824bc324209d16efab3', created: '2026-05-20' }
  ]);
  const [newKeyLabel, setNewKeyLabel] = useState('');
  const [generating, setGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  // Playground States
  const [reqMethod, setReqMethod] = useState('POST');
  const [reqUrl, setReqUrl] = useState('/api/workflows/wf_201/execute');
  const [reqBody, setReqBody] = useState('{\n  "leadName": "Ahmed Karim",\n  "country": "Bangladesh"\n}');
  const [resStatus, setResStatus] = useState(200);
  const [resJson, setResJson] = useState('{\n  "status": "waiting",\n  "message": "Click Send Request to execute."\n}');
  const [playgroundLoading, setPlaygroundLoading] = useState(false);

  const generateKey = () => {
    if (!newKeyLabel) return;
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setKeys(prev => [...prev, {
        id: Date.now(),
        label: newKeyLabel,
        value: `sbr_live_${Math.random().toString(36).substring(2, 14)}${Math.random().toString(36).substring(2, 14)}`,
        created: new Date().toISOString().split('T')[0]
      }]);
      setNewKeyLabel('');
    }, 1200);
  };

  const copyKey = (id, val) => {
    navigator.clipboard.writeText(val);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const deleteKey = (id) => {
    setKeys(prev => prev.filter(k => k.id !== id));
  };

  const handlePlaygroundSend = (e) => {
    e.preventDefault();
    setPlaygroundLoading(true);
    
    setTimeout(() => {
      setPlaygroundLoading(false);
      setResStatus(200);
      setResJson(JSON.stringify({
        success: true,
        workflowId: "wf_201",
        runTelemetry: {
          latencyMs: 1420,
          nodesExecuted: 3,
          outcome: "success"
        },
        payloadReturned: {
          aiResponse_node_2: "[SBR AI Engine Agent] Executed Gemini Prompt for Ahmed Karim. Decoded RAG inventories successfully.",
          whatsapp_node_3: {
            status: "Delivered",
            phone: "01800000000",
            message: "Hello! Complete your pro billing checkout."
          }
        }
      }, null, 2));
    }, 1500);
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 relative z-20">
      
      {/* Title */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">API & Developer Console</h2>
        <p className="text-slate-400 text-xs mt-1">Generate access keys and execute workflows programmatically via custom REST endpoints.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ==========================================
           LEFT COLUMN: KEYS MANAGER
           ========================================== */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Card: Generatable keys */}
          <div className="glass-panel p-6 rounded-2xl bg-slate-950/40">
            <h3 className="font-bold text-sm text-white mb-4">Secret Access API Keys</h3>
            
            {/* Generate Key Input */}
            <div className="flex gap-2 mb-6">
              <input 
                type="text" 
                value={newKeyLabel}
                onChange={(e) => setNewKeyLabel(e.target.value)}
                placeholder="e.g. Retail Shopify webhook sync" 
                className="flex-1 bg-slate-900 border border-white/5 px-3 py-2 rounded-lg text-xs text-white focus:outline-none"
              />
              <button 
                onClick={generateKey}
                disabled={generating}
                className="px-4 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 whitespace-nowrap"
              >
                {generating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                Create Token
              </button>
            </div>

            {/* Keys Table */}
            <div className="flex flex-col gap-3">
              {keys.map(key => (
                <div key={key.id} className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between flex-wrap gap-4 text-xs">
                  <div>
                    <strong className="text-slate-200 block">{key.label}</strong>
                    <span className="text-[9px] text-slate-500 block mt-0.5">Created: {key.created}</span>
                    <code className="text-[10px] font-mono text-cyan-400 mt-2 block break-all">{key.value}</code>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => copyKey(key.id, key.value)}
                      className="p-2 bg-slate-950 border border-white/5 hover:bg-white/5 text-slate-300 rounded-lg"
                    >
                      {copiedId === key.id ? '✓' : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button 
                      onClick={() => deleteKey(key.id)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg"
                    >
                      Trash
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Card: SDK / curl guides */}
          <div className="glass-panel p-6 rounded-2xl bg-slate-950/40">
            <h3 className="font-bold text-sm text-white mb-2">SDK Curl Guides</h3>
            <p className="text-[10px] text-slate-500 mb-4">Copy headers and tokens structures into your administrative programs.</p>
            
            <div className="p-4 rounded-xl bg-slate-950 border border-white/5 font-mono text-[10px] text-slate-300 leading-relaxed overflow-x-auto">
              curl -X POST https://api.sbr.ai/v1/workflows/execute \<br />
              &nbsp;&nbsp;-H "Authorization: Bearer YOUR_API_KEY" \<br />
              &nbsp;&nbsp;-H "Content-Type: application/json" \<br />
              &nbsp;&nbsp;-d '&#123;"leadName": "Rahim", "email": "rahim@sbr.ai"&#125;'
            </div>
          </div>

        </div>

        {/* ==========================================
           RIGHT COLUMN: API PLAYGROUND
           ========================================== */}
        <div className="glass-panel p-6 rounded-2xl bg-slate-950/40 flex flex-col">
          <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
            <div>
              <h3 className="font-bold text-sm text-white">API Sandbox Playground</h3>
              <span className="text-[9px] text-slate-500">Test workflows payload programmatically</span>
            </div>
            <Server className="w-4 h-4 text-cyan-400" />
          </div>

          <form onSubmit={handlePlaygroundSend} className="flex flex-col gap-4 flex-1">
            <div className="grid grid-cols-3 gap-2">
              <select 
                value={reqMethod} 
                onChange={(e) => setReqMethod(e.target.value)}
                className="bg-slate-900 border border-white/5 p-1.5 rounded text-xs text-slate-300 focus:outline-none"
              >
                <option>POST</option>
                <option>GET</option>
              </select>
              <input 
                type="text" 
                value={reqUrl}
                onChange={(e) => setReqUrl(e.target.value)}
                className="col-span-2 bg-slate-900 border border-white/5 p-1.5 rounded text-[10px] font-mono text-cyan-400 focus:outline-none"
              />
            </div>

            {/* Request Body JSON field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] uppercase font-bold text-slate-400">Request Body JSON</label>
              <textarea 
                value={reqBody}
                onChange={(e) => setReqBody(e.target.value)}
                className="bg-slate-950 border border-white/5 p-2 rounded text-[10px] font-mono text-slate-300 h-24 focus:outline-none resize-none"
              />
            </div>

            <button 
              type="submit"
              disabled={playgroundLoading}
              className="w-full py-2 bg-gradient-to-r from-cyan-600 to-violet-600 hover:scale-[1.01] active:scale-[0.99] text-xs font-bold text-white transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)] flex items-center justify-center gap-1.5"
            >
              {playgroundLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              Send Request
            </button>

            {/* Response JSON Panel */}
            <div className="flex flex-col gap-1.5 flex-1 mt-2">
              <div className="flex justify-between items-center">
                <label className="text-[9px] uppercase font-bold text-slate-400">Response JSON</label>
                <span className="text-[9px] font-bold text-emerald-400 uppercase">Status: {resStatus} OK</span>
              </div>
              <textarea 
                readOnly
                value={resJson}
                className="bg-slate-950 border border-white/5 p-2 rounded text-[10px] font-mono text-emerald-400 h-32 focus:outline-none resize-none flex-1"
              />
            </div>
          </form>
        </div>

      </div>

    </div>
  );
}
