import React from 'react';
import { Mail, Lock, ArrowLeft } from 'lucide-react';

export default function GlassLogin({ onBack }) {
  return (
    <div className="min-h-screen bg-[#0B0D17] relative flex items-center justify-center p-4 overflow-hidden font-sans">
      
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 text-white/50 hover:text-white flex items-center space-x-2 z-50 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to DevSwarm</span>
      </button>

      {/* Background Glowing Orbs */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-[150px] opacity-40 animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-cyan-400 rounded-full mix-blend-screen filter blur-[150px] opacity-30 animate-pulse" />
      
      {/* Glassmorphism Container */}
      <div className="relative z-10 w-full max-w-[420px] p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-3">
             <div className="w-6 h-6 border-4 border-white/80 border-t-transparent rounded-full transform -rotate-45" />
          </div>
          <h1 className="text-xl font-bold tracking-widest text-white uppercase">Lumina</h1>
        </div>

        {/* Headings */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-white/60 text-sm">Sign in to continue</p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-cyan-400" />
              </div>
              <input 
                type="email" 
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                placeholder="Email Address"
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-purple-400" />
              </div>
              <input 
                type="password" 
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                placeholder="Password"
              />
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm mt-4">
            <label className="flex items-center text-white/70 cursor-pointer">
              <input type="checkbox" className="mr-2 rounded border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500 focus:ring-offset-0" />
              Remember me
            </label>
            <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">Forgot Password?</a>
          </div>

          {/* Submit Button */}
          <button 
            type="button"
            className="w-full mt-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transform hover:-translate-y-0.5 transition-all"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-white/60 text-sm mt-8">
          Don't have an account? <a href="#" className="text-white font-semibold hover:underline">Sign Up</a>
        </p>

      </div>
    </div>
  );
}
