'use client';

import React, { useState } from 'react';
import { Bot, Mail, Lock, Shield, Cpu, Play, CheckCircle2, ChevronRight, User } from 'lucide-react';

export default function AuthPage() {
  const [mode, setMode] = useState('login'); // login, register, onboarding
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Forms states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Onboarding survey variables
  const [orgName, setOrgName] = useState('');
  const [primaryUse, setPrimaryUse] = useState('support');
  const [primaryModel, setPrimaryModel] = useState('gemini-1.5-pro');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Auto redirect to dashboard
      window.location.href = '/dashboard';
    }, 1200);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMode('onboarding');
    }, 1200);
  };

  const triggerOtp = () => {
    if (!email) return alert('Enter your email first');
    setOtpSent(true);
    alert(`[SBR Agent AI System] OTP code sent successfully to ${email}. Simulate code: "8824"`);
  };

  const handleVerifyOtp = () => {
    if (otp === '8824') {
      window.location.href = '/dashboard';
    } else {
      alert('Invalid OTP code. Try "8824"');
    }
  };

  return (
    <div className="flex-1 w-full min-h-[calc(100vh-68px)] flex flex-col lg:flex-row items-center justify-center p-4 md:p-8 bg-slate-950/20">
      
      {/* Visual Split-Screen: Futuristic Brand Card */}
      <div className="hidden lg:flex w-1/2 h-[550px] rounded-2xl glass-panel border border-white/10 bg-gradient-to-tr from-violet-950/40 via-slate-950/90 to-cyan-950/30 p-12 flex-col justify-between overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center font-bold text-white">S</div>
            <span className="font-bold tracking-tight text-white">SBR AGENT AI</span>
          </div>

          <h2 className="text-3xl font-extrabold text-white mb-4 text-glow leading-snug">
            Empower Your Operations <br />
            With Custom AI Agents.
          </h2>
          <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
            Configure prompt personalities, index vector databases via RAG chunk mappings, and chain visual execution workflows without a single line of code.
          </p>
        </div>

        {/* Feature stats summary inside onboarding */}
        <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-6">
          <div>
            <span className="block text-2xl font-extrabold text-white">0</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Code required</span>
          </div>
          <div>
            <span className="block text-2xl font-extrabold text-cyan-400">4+</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">LLM Models</span>
          </div>
          <div>
            <span className="block text-2xl font-extrabold text-violet-400">1 Click</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">WhatsApp Sync</span>
          </div>
        </div>
      </div>

      {/* Auth Panel card */}
      <div className="w-full lg:w-1/2 max-w-md h-[550px] p-6 sm:p-8 rounded-2xl glass-panel bg-slate-950/60 border border-white/5 flex flex-col justify-center relative overflow-hidden lg:ml-6">
        
        {/* ==========================================
           A. LOGIN INTERFACE
           ========================================== */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">Welcome Back</h3>
              <p className="text-xs text-slate-400 mt-1">Access your AI builders workspace console.</p>
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-400">Email Address</label>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-white/5 focus-within:border-violet-500/50 transition-colors">
                <Mail className="w-4 h-4 text-slate-500" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com" 
                  className="flex-1 bg-transparent text-xs text-white focus:outline-none placeholder-slate-600"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] uppercase font-bold text-slate-400">Security Password</label>
                <button type="button" className="text-[9px] text-violet-400 hover:underline">Forgot password?</button>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-white/5 focus-within:border-violet-500/50 transition-colors">
                <Lock className="w-4 h-4 text-slate-500" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••" 
                  className="flex-1 bg-transparent text-xs text-white focus:outline-none placeholder-slate-600"
                />
              </div>
            </div>

            {/* OTP Section (Optional) */}
            {otpSent ? (
              <div className="flex flex-col gap-1.5 bg-slate-900/80 p-3 rounded-lg border border-violet-500/20">
                <label className="text-[10px] uppercase font-bold text-violet-400">OTP Code (8824)</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 4 digit code" 
                    className="flex-1 bg-slate-950 border border-white/10 px-2.5 py-1.5 rounded text-xs text-white focus:outline-none"
                  />
                  <button 
                    type="button" 
                    onClick={handleVerifyOtp}
                    className="px-3 bg-violet-600 hover:bg-violet-500 text-white rounded text-xs font-bold"
                  >
                    Verify
                  </button>
                </div>
              </div>
            ) : (
              <button 
                type="button" 
                onClick={triggerOtp} 
                className="text-left text-[10px] font-semibold text-cyan-400 hover:underline"
              >
                Or login with OTP code instead
              </button>
            )}

            {/* Actions */}
            <button 
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:scale-[1.02] active:scale-[0.98] text-xs font-bold text-white transition-all shadow-[0_0_15px_rgba(124,58,237,0.3)] flex items-center justify-center gap-1.5"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-3 h-3 fill-white" />}
              Sign In Workspace
            </button>

            {/* Social logins */}
            <div className="flex flex-col gap-2.5 border-t border-white/5 pt-4">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button type="button" onClick={() => window.location.href = '/dashboard'} className="py-2 bg-slate-900 hover:bg-white/5 border border-white/5 rounded-lg font-medium text-slate-300 transition-colors text-[10px] flex items-center justify-center gap-1.5">
                  <span>🔵</span> Google Login
                </button>
                <button type="button" onClick={() => window.location.href = '/dashboard'} className="py-2 bg-slate-900 hover:bg-white/5 border border-white/5 rounded-lg font-medium text-slate-300 transition-colors text-[10px] flex items-center justify-center gap-1.5">
                  <span>🔵</span> Facebook Login
                </button>
              </div>

              <div className="text-center text-[10px] text-slate-500 mt-2">
                Don't have an account?{' '}
                <button type="button" onClick={() => setMode('register')} className="text-violet-400 hover:underline font-semibold">
                  Register here
                </button>
              </div>
            </div>
          </form>
        )}

        {/* ==========================================
           B. REGISTRATION INTERFACE
           ========================================== */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-3">
            <div>
              <h3 className="text-xl font-bold text-white">Create Account</h3>
              <p className="text-xs text-slate-400 mt-0.5">Start building custom autonomous pipelines.</p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[9px] uppercase font-bold text-slate-400">Full Name</label>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/5 focus-within:border-violet-500/50 transition-colors">
                <User className="w-3.5 h-3.5 text-slate-500" />
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Mercer" 
                  className="flex-1 bg-transparent text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[9px] uppercase font-bold text-slate-400">Email Address</label>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/5 focus-within:border-violet-500/50 transition-colors">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@sbr.ai" 
                  className="flex-1 bg-transparent text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[9px] uppercase font-bold text-slate-400">Security Password</label>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/5 focus-within:border-violet-500/50 transition-colors">
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="flex-1 bg-transparent text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:scale-[1.01] active:scale-[0.99] text-xs font-bold text-white transition-all shadow-[0_0_15px_rgba(124,58,237,0.2)] flex items-center justify-center gap-1.5"
            >
              {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Register Workspace'}
            </button>

            <div className="text-center text-[10px] text-slate-500 border-t border-white/5 pt-3">
              Already have an account?{' '}
              <button type="button" onClick={() => setMode('login')} className="text-violet-400 hover:underline font-semibold">
                Login here
              </button>
            </div>
          </form>
        )}

        {/* ==========================================
           C. DYNAMIC ONBOARDING WIZARD
           ========================================== */}
        {mode === 'onboarding' && (
          <div className="flex flex-col gap-4 h-full justify-between py-2">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-4">
                <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">Onboarding wizard</span>
                <span className="text-[10px] text-slate-500">Step {onboardingStep} of 3</span>
              </div>

              {/* Onboarding step 1 */}
              {onboardingStep === 1 && (
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-base text-white">Let's configure your workspace</h4>
                  <p className="text-xs text-slate-400">Give your primary workspace an administrative title.</p>
                  
                  <div className="flex flex-col gap-1.5 mt-2">
                    <label className="text-[9px] uppercase font-bold text-slate-400">Workspace title</label>
                    <input 
                      type="text" 
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="e.g. SBR E-Commerce Team" 
                      className="bg-slate-900 border border-white/10 px-3 py-2 rounded-lg text-xs text-white focus:outline-none focus:border-violet-500/50"
                    />
                  </div>
                </div>
              )}

              {/* Onboarding step 2 */}
              {onboardingStep === 2 && (
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-base text-white">Primary use case</h4>
                  <p className="text-xs text-slate-400">Select what you plan to automate first.</p>
                  
                  <div className="flex flex-col gap-2 mt-2">
                    {[
                      { id: 'support', label: '🤖 Customer Support & FAQ bot' },
                      { id: 'sales', label: '📊 Lead scoring & WhatsApp outreach' },
                      { id: 'marketing', label: '🕸️ Social postings & Web scraping' }
                    ].map(u => (
                      <button 
                        key={u.id}
                        type="button"
                        onClick={() => setPrimaryUse(u.id)}
                        className={`p-3 rounded-lg text-left text-xs transition-all border ${
                          primaryUse === u.id 
                            ? 'bg-violet-600/20 text-white border-violet-500/50 shadow-md' 
                            : 'bg-slate-900 border-white/5 text-slate-400 hover:bg-slate-900/60'
                        }`}
                      >
                        {u.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Onboarding step 3 */}
              {onboardingStep === 3 && (
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-base text-white">Select cognitive engine</h4>
                  <p className="text-xs text-slate-400">Choose your default AI model.</p>
                  
                  <div className="flex flex-col gap-2 mt-2">
                    {[
                      { id: 'gemini-1.5-pro', label: '🤖 Google Gemini 1.5 Pro (Recommended)' },
                      { id: 'deepseek-coder', label: '📈 DeepSeek R1 Coder (High Performance)' },
                      { id: 'claude-3-opus', label: '🧠 Anthropic Claude 3 Opus (Advanced Math)' }
                    ].map(m => (
                      <button 
                        key={m.id}
                        type="button"
                        onClick={() => setPrimaryModel(m.id)}
                        className={`p-3 rounded-lg text-left text-xs transition-all border ${
                          primaryModel === m.id 
                            ? 'bg-cyan-600/20 text-white border-cyan-500/50 shadow-md' 
                            : 'bg-slate-900 border-white/5 text-slate-400 hover:bg-slate-900/60'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Wizard Navigation */}
            <div className="flex items-center justify-between border-t border-white/5 pt-4">
              <button 
                type="button"
                disabled={onboardingStep === 1}
                onClick={() => setOnboardingStep(prev => prev - 1)}
                className="px-3 py-1.5 rounded bg-white/5 border border-white/5 text-[10px] text-slate-400 hover:text-white disabled:opacity-40"
              >
                Back
              </button>

              {onboardingStep < 3 ? (
                <button 
                  type="button"
                  onClick={() => setOnboardingStep(prev => prev + 1)}
                  className="px-4 py-1.5 rounded bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-bold flex items-center gap-1 hover:scale-105 active:scale-95 transition-all"
                >
                  Continue
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button 
                  type="button"
                  onClick={() => window.location.href = '/dashboard'}
                  className="px-4 py-1.5 rounded bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-[10px] font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] flex items-center gap-1 hover:scale-105 active:scale-95 transition-all"
                >
                  Launch Workspace
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </button>
              )}
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
