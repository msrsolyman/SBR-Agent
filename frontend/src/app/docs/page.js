'use client';

import React, { useState } from 'react';
import { BookOpen, Copy, Code, Terminal, Key, Shield } from 'lucide-react';

export default function DocsPage() {
  const [lang, setLang] = useState('js'); // js, py, curl
  const [copied, setCopied] = useState(false);

  const jsCode = `// Install SBR SDK: npm install sbr-agent-sdk\nimport { SbrAgent } from 'sbr-agent-sdk';\n\nconst agent = new SbrAgent({\n  apiKey: 'sbr_live_••••••••'\n});\n\n// Run custom visual workflow\nconst response = await agent.workflows.execute('wf_201', {\n  leadName: 'Karim Uddin',\n  country: 'Bangladesh'\n});\nconsole.log(response.variables.lastResponse);`;

  const pyCode = `# Install SBR SDK: pip install sbr-agent-sdk\nfrom sbr_agent_sdk import SbrAgent\n\nagent = SbrAgent(\n  api_key="sbr_live_••••••••"\n)\n\n# Run custom visual workflow\nresponse = agent.workflows.execute("wf_201", {\n  "leadName": "Karim Uddin",\n  "country": "Bangladesh"\n})\nprint(response["variables"]["lastResponse"])`;

  const curlCode = `curl -X POST https://api.sbr.ai/v1/workflows/execute \\\n  -H "Authorization: Bearer sbr_live_••••••••" \\\n  -H "Content-Type: application/json" \\\n  -d '{"leadName": "Karim Uddin", "country": "Bangladesh"}'`;

  const copyCode = () => {
    const code = lang === 'js' ? jsCode : lang === 'py' ? pyCode : curlCode;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 relative z-20">
      
      {/* Title */}
      <div className="mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">API Developer Documentation</h2>
          <p className="text-slate-400 text-xs mt-1">Integrate cognitive RAG pipelines and custom visual workflows into your programs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-30">
        
        {/* Left Side: Guides */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Card: SDK */}
          <div className="glass-panel p-6 rounded-2xl bg-slate-950/40">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-6">
              <h3 className="font-bold text-sm text-slate-100">Workflow Executer SDK</h3>
              
              {/* Lang switcher */}
              <div className="inline-flex rounded-lg bg-slate-900 p-0.5 gap-0.5">
                {['js', 'py', 'curl'].map(l => (
                  <button 
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase transition-all ${
                      lang === l ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Code block */}
            <div className="p-4 rounded-xl bg-slate-950 border border-white/5 relative group">
              <button 
                onClick={copyCode}
                className="absolute top-4 right-4 p-1.5 bg-slate-900 border border-white/5 text-slate-400 hover:text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {copied ? '✓' : <Copy className="w-3.5 h-3.5" />}
              </button>
              <pre className="font-mono text-[10px] text-cyan-400 leading-relaxed overflow-x-auto">
                {lang === 'js' ? jsCode : lang === 'py' ? pyCode : curlCode}
              </pre>
            </div>
          </div>

          {/* Card: WebSocket events */}
          <div className="glass-panel p-6 rounded-2xl bg-slate-950/40">
            <h3 className="font-bold text-sm text-slate-100 mb-2">Socket.io Telemetry Channels</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Real-time sockets streams broadcast state updates. Connect to port `5000` and listen to:
            </p>
            <div className="p-4 bg-slate-950 rounded-xl border border-white/5 text-[10px] font-mono flex flex-col gap-2.5">
              <div>
                <strong className="text-violet-400 block">workflow-node-active</strong>
                <span className="text-slate-500 block text-[9px] mt-0.5">Fired when the visual automation canvas highlights active execution rings.</span>
              </div>
              <div>
                <strong className="text-cyan-400 block">message-chunk</strong>
                <span className="text-slate-500 block text-[9px] mt-0.5">Fired during ChatGPT-style streaming responder loops.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Security info */}
        <div className="flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-2xl bg-slate-950/40 relative">
            <h3 className="font-bold text-sm text-white mb-2">Auth Validation</h3>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Express servers guards REST endpoints utilizing standard Bearer token mechanisms. Sign requests using custom generated keys inside the developer playground page.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
