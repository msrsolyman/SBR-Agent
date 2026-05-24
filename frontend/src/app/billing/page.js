'use client';

import React, { useState } from 'react';
import { 
  DollarSign, CheckCircle2, CreditCard, Sparkles, RefreshCw, 
  HelpCircle, ArrowUpRight, Copy, Share2, Award, FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BillingPage() {
  const [gateway, setGateway] = useState('stripe'); // stripe or sslcommerz
  const [selectedPlan, setSelectedPlan] = useState('pro'); // free, pro, business
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // CC States for simulator
  const [ccNum, setCcNum] = useState('');
  const [ccExp, setCcExp] = useState('');
  const [ccCvc, setCcCvc] = useState('');

  // Referral states
  const [copied, setCopied] = useState(false);
  const referralLink = 'https://sbr.ai/ref/ahmed8824';

  const handleSimulatePayment = (e) => {
    e.preventDefault();
    if (!ccNum || !ccExp || !ccCvc) return alert('Enter full card credentials');

    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setPaymentSuccess(true);
      
      // Fire confetti celebration!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 2000);
  };

  const copyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 relative z-20">
      
      {/* Page Title */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Billing & Quota Management</h2>
        <p className="text-slate-400 text-xs mt-1">Select pricing plans, simulate payments, and track active tokens usage.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ==========================================
           LEFT COLUMN: GATEWAY & SIMULATOR
           ========================================== */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Card: Select Gateway */}
          <div className="glass-panel p-6 rounded-2xl bg-slate-950/40">
            <h3 className="font-bold text-sm text-white mb-4">Select Payment Gateway</h3>
            
            <div className="grid grid-cols-2 gap-4 text-xs">
              <button 
                type="button" 
                onClick={() => setGateway('stripe')}
                className={`p-4 rounded-xl text-left border transition-all flex flex-col gap-1.5 ${
                  gateway === 'stripe' 
                    ? 'bg-violet-600/10 text-white border-violet-500/50 shadow-md' 
                    : 'bg-slate-900 border-white/5 text-slate-400 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <strong className="font-extrabold">Stripe Gateway</strong>
                  <span>💳</span>
                </div>
                <span className="text-[10px] text-slate-500">Supports international credit & debit cards.</span>
              </button>

              <button 
                type="button" 
                onClick={() => setGateway('sslcommerz')}
                className={`p-4 rounded-xl text-left border transition-all flex flex-col gap-1.5 ${
                  gateway === 'sslcommerz' 
                    ? 'bg-cyan-600/10 text-white border-cyan-500/50 shadow-md' 
                    : 'bg-slate-900 border-white/5 text-slate-400 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <strong className="font-extrabold">SSLCommerz BD</strong>
                  <span>🇧🇩</span>
                </div>
                <span className="text-[10px] text-slate-500">Supports BKash, Nagad, Rocket and local bank cards.</span>
              </button>
            </div>
          </div>

          {/* Card: CC Payment Simulator */}
          <div className="glass-panel p-6 rounded-2xl bg-slate-950/40 relative">
            <h3 className="font-bold text-sm text-white mb-1">Interactive Billing Checkout</h3>
            <p className="text-[10px] text-slate-500 mb-6">Enter mock card numbers to test immediate Stripe webhook triggers.</p>

            {paymentSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 text-center bg-slate-900/50 rounded-xl border border-emerald-500/20">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 mb-4 animate-bounce">✓</div>
                <h4 className="font-bold text-base text-white">Payment Confirmed!</h4>
                <p className="text-slate-400 text-xs max-w-xs mt-1.5 leading-relaxed">
                  Your Pro account limits have been successfully unlocked. Simulated Stripe webhook events were successfully processed.
                </p>
                <button 
                  onClick={() => setPaymentSuccess(false)}
                  className="mt-6 text-xs text-violet-400 font-semibold hover:underline"
                >
                  Subscribing to another plan?
                </button>
              </div>
            ) : (
              <form onSubmit={handleSimulatePayment} className="flex flex-col gap-4">
                <div className="grid grid-cols-3 gap-2 p-1 bg-slate-900 rounded-lg border border-white/5 mb-2">
                  {['Free ($0)', 'Pro ($29)', 'Business ($89)'].map((p, idx) => {
                    const planName = p.split(' ')[0].toLowerCase();
                    return (
                      <button 
                        key={idx}
                        type="button"
                        onClick={() => setSelectedPlan(planName)}
                        className={`py-1.5 rounded text-[10px] font-semibold transition-all ${
                          selectedPlan === planName ? 'bg-violet-600 text-white' : 'text-slate-400'
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>

                {/* Card input field */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Card Number (Simulate)</label>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-white/5 focus-within:border-violet-500/50 transition-colors">
                    <CreditCard className="w-4 h-4 text-slate-500" />
                    <input 
                      type="text" 
                      required
                      value={ccNum}
                      onChange={(e) => setCcNum(e.target.value)}
                      placeholder="4242 4242 4242 4242 (Type anything)" 
                      className="flex-1 bg-transparent text-xs text-white focus:outline-none placeholder-slate-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Exp Date</label>
                    <input 
                      type="text" 
                      required
                      value={ccExp}
                      onChange={(e) => setCcExp(e.target.value)}
                      placeholder="MM/YY" 
                      className="bg-slate-900 border border-white/5 px-3 py-2 rounded-lg text-xs text-white focus:outline-none focus:border-violet-500/50"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Security CVC</label>
                    <input 
                      type="password" 
                      required
                      value={ccCvc}
                      onChange={(e) => setCcCvc(e.target.value)}
                      placeholder="•••" 
                      className="bg-slate-900 border border-white/5 px-3 py-2 rounded-lg text-xs text-white focus:outline-none focus:border-violet-500/50"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={processing}
                  className="mt-3 w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:scale-[1.01] active:scale-[0.99] text-xs font-bold text-white transition-all shadow-[0_0_15px_rgba(124,58,237,0.3)] flex items-center justify-center gap-1.5"
                >
                  {processing ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Confirm simulated payment'}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* ==========================================
           RIGHT COLUMN: STATS & REFERRAL
           ========================================== */}
        <div className="flex flex-col gap-6">
          
          {/* Card: Active limits quota */}
          <div className="glass-panel p-6 rounded-2xl bg-slate-950/40">
            <h3 className="font-bold text-sm text-white mb-4">Active Plan Usage</h3>
            
            <div className="flex flex-col gap-4 text-xs">
              
              <div>
                <div className="flex justify-between font-semibold text-slate-300 mb-1">
                  <span>Tokens Consumption</span>
                  <span>142,380 / 500,000</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-violet-600 to-indigo-500 h-full rounded-full" style={{ width: '28.4%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-300 mb-1">
                  <span>Conversations limit</span>
                  <span>928 / 2,500</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full" style={{ width: '37.1%' }} />
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 mt-2">
                <span className="text-[10px] text-slate-500 block">Current Billing Period End</span>
                <strong className="text-slate-200 font-bold text-xs mt-1 block">June 24, 2026</strong>
              </div>

            </div>
          </div>

          {/* Card: Referral Hub */}
          <div className="glass-panel p-6 rounded-2xl bg-slate-950/40 relative">
            <div className="absolute top-4 right-4 text-violet-400">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white mb-2">Referral Rewards</h3>
            <p className="text-[10px] text-slate-400 mb-4 leading-relaxed">
              Invite other companies! For every successful team sign-up using your link, we will award you <strong className="text-violet-300">+50,000 monthly bonus tokens</strong> completely free.
            </p>

            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-900 border border-white/5 text-xs text-slate-300 mb-3">
              <input 
                type="text" 
                readOnly
                value={referralLink}
                className="flex-1 bg-transparent px-2.5 py-1 text-slate-400 text-[10px] focus:outline-none"
              />
              <button 
                onClick={copyReferral}
                className="w-8 h-8 rounded-lg bg-violet-600 hover:bg-violet-500 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
              >
                {copied ? '✓' : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <span className="text-[9px] text-slate-500 block">Total Referrals Registered: <strong>4 accounts</strong></span>
          </div>

        </div>

      </div>

    </div>
  );
}
