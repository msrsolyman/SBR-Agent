'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Play, StopCircle, RefreshCw, ZoomIn, ZoomOut, Maximize,
  Plus, Settings, Trash2, ArrowRight, Zap, Database, Mail, 
  MessageSquare, Globe, Cpu, Clock, HelpCircle, Code
} from 'lucide-react';

export default function CanvasPage() {
  // Nodes mapping state
  const [nodes, setNodes] = useState([
    { id: 'node_1', type: 'trigger', label: 'Trigger: HTTP Webhook', x: 80, y: 150, data: { url: '/api/v1/hook/sales' } },
    { id: 'node_2', type: 'aiResponse', label: 'Gemini: Personalize Prompt', x: 380, y: 100, data: { prompt: 'Formulate lead greetings: {{leadName}}' } },
    { id: 'node_3', type: 'conditions', label: 'Branch: In Bangladesh?', x: 380, y: 260, data: { variable: 'country', operator: 'equals', value: 'Bangladesh' } },
    { id: 'node_4', type: 'whatsappSend', label: 'WhatsApp: SSLCommerz checkout', x: 680, y: 80, data: { phone: '0182400', message: 'Hello! Complete your pro billing checkout.' } },
    { id: 'node_5', type: 'emailSend', label: 'Gmail: Send Stripe checkout', x: 680, y: 280, data: { to: 'admin@sbr.ai', subject: 'Secure checkout link' } }
  ]);

  // Edges connections mapping
  const [edges, setEdges] = useState([
    { id: 'e1-2', source: 'node_1', target: 'node_2' },
    { id: 'e1-3', source: 'node_1', target: 'node_3' },
    { id: 'e2-4', source: 'node_2', target: 'node_4' },
    { id: 'e3-5', source: 'node_3', target: 'node_5' }
  ]);

  // Settings & Controls
  const [zoom, setZoom] = useState(1);
  const [selectedNodeId, setSelectedNodeId] = useState('node_1');
  const [executing, setExecuting] = useState(false);
  const [activeNodeRunning, setActiveNodeRunning] = useState(null);
  const [debugLogs, setDebugLogs] = useState([]);
  const canvasRef = useRef(null);

  // Drag states
  const [draggingNodeId, setDraggingNodeId] = useState(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e, nodeId) => {
    e.stopPropagation();
    setSelectedNodeId(nodeId);
    setDraggingNodeId(nodeId);
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      dragOffset.current = {
        x: e.clientX - node.x,
        y: e.clientY - node.y
      };
    }
  };

  const handleMouseMove = (e) => {
    if (!draggingNodeId) return;
    
    // Update dragging coordinates
    setNodes(prev => prev.map(node => {
      if (node.id === draggingNodeId) {
        return {
          ...node,
          x: Math.max(20, Math.min(1200, e.clientX - dragOffset.current.x)),
          y: Math.max(20, Math.min(600, e.clientY - dragOffset.current.y))
        };
      }
      return node;
    }));
  };

  const handleMouseUp = () => {
    setDraggingNodeId(null);
  };

  // Add new nodes dynamically
  const addNewNode = (type) => {
    const newId = `node_${Date.now()}`;
    const labelsMap = {
      aiResponse: 'Gemini: Prompt response',
      delay: 'Delay pipeline',
      httpRequest: 'HTTP: API endpoint',
      whatsappSend: 'WhatsApp: Notification',
      emailSend: 'Gmail: Customer alert',
      webSearch: 'WebSearch: Google trends'
    };
    
    const newNode = {
      id: newId,
      type,
      label: labelsMap[type] || 'Custom action',
      x: 150 + Math.random() * 100,
      y: 150 + Math.random() * 100,
      data: {}
    };

    setNodes(prev => [...prev, newNode]);
    
    // Connect to selected node if exists
    if (selectedNodeId) {
      setEdges(prev => [...prev, {
        id: `e-${selectedNodeId}-${newId}`,
        source: selectedNodeId,
        target: newId
      }]);
    }

    setSelectedNodeId(newId);
  };

  const deleteSelectedNode = () => {
    if (!selectedNodeId) return;
    setNodes(prev => prev.filter(n => n.id !== selectedNodeId));
    setEdges(prev => prev.filter(e => e.source !== selectedNodeId && e.target !== selectedNodeId));
    setSelectedNodeId(null);
  };

  // Visual simulation logic runtime
  const runWorkflowDebug = () => {
    if (executing) return;
    setExecuting(true);
    setDebugLogs([]);
    
    const sequence = ['node_1', 'node_2', 'node_3', 'node_4', 'node_5'];
    let idx = 0;

    const interval = setInterval(() => {
      if (idx < sequence.length) {
        const nodeId = sequence[idx];
        const node = nodes.find(n => n.id === nodeId);
        setActiveNodeRunning(nodeId);
        
        if (node) {
          setDebugLogs(prev => [...prev, `[Workflow runtime] Executed: ${node.label} successfully.`]);
        }
        idx++;
      } else {
        clearInterval(interval);
        setActiveNodeRunning(null);
        setExecuting(false);
        setDebugLogs(prev => [...prev, '[Success] Workflow pipeline executions successfully finished!']);
      }
    }, 1500);
  };

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  return (
    <div 
      className="flex-1 w-full min-h-[calc(100vh-68px)] flex bg-slate-950/20 relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      
      {/* 1. LEFT CONTROLS WIDGET PANEL (Add nodes library) */}
      <div className="w-56 glass-panel border-r border-white/10 bg-slate-950/70 p-4 flex flex-col gap-4 relative z-30 shrink-0">
        <div>
          <strong className="text-xs uppercase font-extrabold text-white tracking-wider block">Nodes Library</strong>
          <span className="text-[9px] text-slate-500 block mt-0.5 leading-snug">Click to append to selected node</span>
        </div>

        <div className="flex flex-col gap-2.5">
          <button onClick={() => addNewNode('aiResponse')} className="p-2.5 rounded-lg bg-slate-900 border border-white/5 text-left text-xs font-semibold text-slate-300 hover:text-white hover:border-violet-500/50 hover:bg-violet-950/20 transition-all flex items-center gap-2">
            <Bot className="w-4 h-4 text-violet-400 shrink-0" />
            AI Response
          </button>

          <button onClick={() => addNewNode('httpRequest')} className="p-2.5 rounded-lg bg-slate-900 border border-white/5 text-left text-xs font-semibold text-slate-300 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-950/20 transition-all flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
            HTTP Request
          </button>

          <button onClick={() => addNewNode('whatsappSend')} className="p-2.5 rounded-lg bg-slate-900 border border-white/5 text-left text-xs font-semibold text-slate-300 hover:text-white hover:border-emerald-500/50 hover:bg-emerald-950/20 transition-all flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
            WhatsApp Send
          </button>

          <button onClick={() => addNewNode('emailSend')} className="p-2.5 rounded-lg bg-slate-900 border border-white/5 text-left text-xs font-semibold text-slate-300 hover:text-white hover:border-amber-500/50 hover:bg-amber-950/20 transition-all flex items-center gap-2">
            <Mail className="w-4 h-4 text-amber-400 shrink-0" />
            Email Send
          </button>

          <button onClick={() => addNewNode('delay')} className="p-2.5 rounded-lg bg-slate-900 border border-white/5 text-left text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-500/50 transition-all flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
            Delay Pipeline
          </button>
        </div>

        {/* Dynamic Telemetry Debug Console */}
        <div className="border-t border-white/5 pt-4 mt-auto">
          <strong className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">Live Console</strong>
          <div className="h-40 overflow-y-auto bg-slate-950 p-2 border border-white/5 rounded-lg text-[9px] text-slate-400 leading-normal font-mono">
            {debugLogs.length === 0 ? (
              <span className="text-slate-600 block">Waiting for visual logic trigger execution...</span>
            ) : (
              debugLogs.map((log, i) => <div key={i} className="mb-1 text-slate-300">{log}</div>)
            )}
          </div>
        </div>
      </div>

      {/* ==========================================
         2. CENTRAL CANVAS GRID
         ========================================== */}
      <div 
        ref={canvasRef}
        className="flex-1 h-full overflow-hidden relative cursor-grab active:cursor-grabbing bg-slate-950/10 cyber-grid relative z-20"
        style={{ transform: `scale(${zoom})`, transformOrigin: 'center center', transition: draggingNodeId ? 'none' : 'transform 0.1s ease-out' }}
      >
        {/* Shimmer grid scan lines */}
        <div className="absolute inset-0 pointer-events-none radial-glow-indigo opacity-30" />
        
        {/* Draw edges connection SVG paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {edges.map(edge => {
            const srcNode = nodes.find(n => n.id === edge.source);
            const tgtNode = nodes.find(n => n.id === edge.target);
            if (!srcNode || !tgtNode) return null;

            // Coordinates for SVG lines calculations
            const x1 = srcNode.x + 200; // Output connector
            const y1 = srcNode.y + 24;
            const x2 = tgtNode.x;       // Input connector
            const y2 = tgtNode.y + 24;
            
            // Calculate bezier curves values
            const dx = Math.abs(x2 - x1) * 0.5;
            const pathData = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;

            const isEdgeActive = activeNodeRunning === edge.source || activeNodeRunning === edge.target;

            return (
              <path 
                key={edge.id}
                d={pathData}
                fill="none"
                stroke={isEdgeActive ? '#06b6d4' : '#4f46e5'}
                strokeWidth={isEdgeActive ? 3.5 : 1.5}
                className={isEdgeActive ? 'connector-line' : ''}
                opacity={isEdgeActive ? 1 : 0.6}
              />
            );
          })}
        </svg>

        {/* Render draggable Nodes */}
        {nodes.map(node => {
          const isNodeSelected = selectedNodeId === node.id;
          const isNodeActive = activeNodeRunning === node.id;
          
          return (
            <div 
              key={node.id}
              onMouseDown={(e) => handleMouseDown(e, node.id)}
              className={`absolute w-52 rounded-xl glass-panel p-3 cursor-move border select-none transition-shadow z-20 ${
                isNodeActive 
                  ? 'border-cyan-400 bg-cyan-950/20 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                  : isNodeSelected 
                  ? 'border-violet-500 bg-violet-950/20 shadow-[0_0_15px_rgba(124,58,237,0.3)]'
                  : 'border-white/10 bg-slate-950/70 hover:border-white/20'
              }`}
              style={{ left: node.x, top: node.y }}
            >
              <div className="flex items-center justify-between mb-1.5 border-b border-white/5 pb-1 text-slate-400">
                <div className="flex items-center gap-1">
                  {node.type === 'trigger' && <Zap className="w-3.5 h-3.5 text-amber-400" />}
                  {node.type === 'aiResponse' && <Bot className="w-3.5 h-3.5 text-violet-400" />}
                  {node.type === 'conditions' && <Code className="w-3.5 h-3.5 text-cyan-400" />}
                  {node.type === 'whatsappSend' && <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />}
                  {node.type === 'emailSend' && <Mail className="w-3.5 h-3.5 text-amber-400" />}
                  {node.type === 'delay' && <Clock className="w-3.5 h-3.5 text-slate-400" />}
                  <span className="text-[9px] uppercase tracking-wider font-bold">
                    {node.type}
                  </span>
                </div>
                {isNodeActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                )}
              </div>
              <p className="text-xs font-bold text-slate-100 truncate">{node.label}</p>
            </div>
          );
        })}
      </div>

      {/* ==========================================
         3. RIGHT SIDEBAR NODE SETTINGS CONFIGS
         ========================================== */}
      <div className="w-64 glass-panel border-l border-white/10 bg-slate-950/70 p-4 flex flex-col gap-4 relative z-30 shrink-0">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <div>
            <strong className="text-xs uppercase font-extrabold text-white tracking-wider block">Node Settings</strong>
            <span className="text-[9px] text-slate-500">Edit JSON params values</span>
          </div>
          <button 
            onClick={deleteSelectedNode}
            disabled={!selectedNodeId}
            className="p-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded disabled:opacity-40"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {selectedNode ? (
          <div className="flex flex-col gap-4 text-xs">
            <div className="flex flex-col gap-1">
              <label className="text-[9px] uppercase font-bold text-slate-400">Node Identifier</label>
              <input 
                type="text" 
                value={selectedNode.label}
                onChange={(e) => {
                  const val = e.target.value;
                  setNodes(prev => prev.map(n => n.id === selectedNodeId ? { ...n, label: val } : n));
                }}
                className="bg-slate-900 border border-white/5 px-2.5 py-1.5 rounded text-xs text-white focus:outline-none"
              />
            </div>

            {/* Custom attributes edits per node types */}
            {selectedNode.type === 'trigger' && (
              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase font-bold text-slate-400">Webhook Target Url</label>
                <input 
                  type="text" 
                  value={selectedNode.data.url || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setNodes(prev => prev.map(n => n.id === selectedNodeId ? { ...n, data: { ...n.data, url: val } } : n));
                  }}
                  className="bg-slate-900 border border-white/5 px-2.5 py-1.5 rounded font-mono text-[10px] text-slate-300 focus:outline-none"
                />
              </div>
            )}

            {selectedNode.type === 'aiResponse' && (
              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase font-bold text-slate-400">AI Prompt Instruction</label>
                <textarea 
                  value={selectedNode.data.prompt || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setNodes(prev => prev.map(n => n.id === selectedNodeId ? { ...n, data: { ...n.data, prompt: val } } : n));
                  }}
                  className="bg-slate-900 border border-white/5 px-2.5 py-1.5 rounded text-xs text-white h-24 resize-none focus:outline-none"
                />
              </div>
            )}

            {selectedNode.type === 'whatsappSend' && (
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase font-bold text-slate-400">Recipient Phone</label>
                  <input 
                    type="text" 
                    value={selectedNode.data.phone || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setNodes(prev => prev.map(n => n.id === selectedNodeId ? { ...n, data: { ...n.data, phone: val } } : n));
                    }}
                    className="bg-slate-900 border border-white/5 px-2.5 py-1.5 rounded text-xs text-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase font-bold text-slate-400">Template Message</label>
                  <textarea 
                    value={selectedNode.data.message || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setNodes(prev => prev.map(n => n.id === selectedNodeId ? { ...n, data: { ...n.data, message: val } } : n));
                    }}
                    className="bg-slate-900 border border-white/5 px-2.5 py-1.5 rounded text-xs text-white h-20 resize-none focus:outline-none"
                  />
                </div>
              </div>
            )}

            {selectedNode.type === 'emailSend' && (
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase font-bold text-slate-400">Recipient Email</label>
                  <input 
                    type="text" 
                    value={selectedNode.data.to || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setNodes(prev => prev.map(n => n.id === selectedNodeId ? { ...n, data: { ...n.data, to: val } } : n));
                    }}
                    className="bg-slate-900 border border-white/5 px-2.5 py-1.5 rounded text-xs text-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase font-bold text-slate-400">Subject</label>
                  <input 
                    type="text" 
                    value={selectedNode.data.subject || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setNodes(prev => prev.map(n => n.id === selectedNodeId ? { ...n, data: { ...n.data, subject: val } } : n));
                    }}
                    className="bg-slate-900 border border-white/5 px-2.5 py-1.5 rounded text-xs text-white focus:outline-none"
                  />
                </div>
              </div>
            )}

          </div>
        ) : (
          <span className="text-xs text-slate-600 block text-center py-10">Select a node in canvas to adjust JSON params.</span>
        )}
      </div>

      {/* 4. CANVAS HEADER CONTROL UTILITIES */}
      <div className="absolute top-4 left-64 z-30 flex gap-2">
        <button 
          onClick={runWorkflowDebug}
          disabled={executing}
          className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-violet-600 rounded-lg text-xs font-bold text-white shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 transition-all flex items-center gap-1.5"
        >
          {executing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3 h-3 fill-white" />}
          Run Pipeline
        </button>

        <div className="inline-flex rounded-lg bg-slate-900/90 border border-white/10 p-0.5 gap-0.5">
          <button onClick={() => setZoom(prev => Math.min(1.5, prev + 0.1))} className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-white rounded hover:bg-white/5 transition-colors">
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setZoom(prev => Math.max(0.6, prev - 0.1))} className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-white rounded hover:bg-white/5 transition-colors">
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setZoom(1)} className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-white rounded hover:bg-white/5 transition-colors">
            <Maximize className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
}
