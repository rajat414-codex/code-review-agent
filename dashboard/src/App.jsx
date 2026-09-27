import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { 
  Code2, 
  CheckCircle2, 
  Sparkles, 
  Server, 
  Layers, 
  ArrowLeft, 
  TerminalSquare,
  Laptop,
  Tablet,
  Smartphone,
  Maximize2,
  RotateCcw,
  Copy,
  Check,
  ExternalLink,
  Leaf,
  Compass,
  ShieldCheck,
  Cpu,
  Flame,
  Gamepad2,
  Coffee,
  Volume2
} from 'lucide-react';
import { PROTOTYPES } from './prototypes';

const AgentCard = ({ title, icon: Icon, delay, status, generatedCode, details }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const isDone = status === 'done' && generatedCode;

  const handleCopy = (e) => {
    e.stopPropagation();
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 220, damping: 22 }}
      onClick={() => isDone && setIsOpen(!isOpen)}
      className={`p-6 md:p-7 rounded-[2.2rem] backdrop-blur-[36px] border transition-all duration-500 relative overflow-hidden group flex flex-col ${
        status === 'running' 
          ? 'bg-white/[0.12] border-emerald-400/50 shadow-[0_0_40px_rgba(52,211,153,0.25)] animate-pulse' 
          : isDone 
            ? 'bg-white/[0.08] hover:bg-white/[0.13] border-white/25 cursor-pointer shadow-[0_20px_45px_rgba(0,0,0,0.35)] hover:shadow-[0_25px_60px_rgba(52,211,153,0.25)] hover:border-emerald-300/50' 
            : 'bg-white/[0.05] border-white/15 opacity-70'
      }`}
      style={{
        boxShadow: "0 20px 45px 0 rgba(0, 0, 0, 0.4), inset 0 1px 1px 0 rgba(255, 255, 255, 0.35), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2)"
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <motion.div layout className="flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-5">
          <div className={`p-4 rounded-2xl backdrop-blur-2xl border transition-all duration-300 ${
            isDone 
              ? 'bg-emerald-500/25 border-emerald-400/40 text-emerald-300 shadow-[0_0_25px_rgba(52,211,153,0.35)]' 
              : status === 'running'
                ? 'bg-amber-500/25 border-amber-400/40 text-amber-300'
                : 'bg-white/10 border-white/15 text-white/60'
          }`}>
            <Icon size={24} strokeWidth={2.2} />
          </div>
          <div>
            <h3 className="font-goudy text-2xl md:text-3xl text-white tracking-wide font-normal">{title}</h3>
            <p className="text-xs text-emerald-100/75 font-medium tracking-wider uppercase mt-1">
              {status === 'waiting' && 'Awaiting Dispatch • Neural Idle'}
              {status === 'running' && 'Synthesizing Architecture...'}
              {isDone && !isOpen && 'Click to Inspect Synthesized Code ✨'}
              {isDone && isOpen && 'Tap to Collapse'}
            </p>
          </div>
        </div>

        {isDone && (
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[11px] font-bold text-emerald-300 uppercase tracking-widest">
              Ready
            </span>
            <button
              onClick={handleCopy}
              title="Copy code"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all border border-white/15"
            >
              {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
            </button>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {isOpen && isDone && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 20 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="relative z-10 w-full"
          >
            <div className="flex items-center justify-between mb-3 text-emerald-200/80">
              <span className="text-xs font-semibold uppercase tracking-widest flex items-center gap-2">
                <TerminalSquare size={14} className="text-emerald-400" /> {details}
              </span>
              <span className="text-[11px] text-white/50 font-mono">
                {generatedCode ? generatedCode.split('\n').length : 0} lines
              </span>
            </div>
            <div className="bg-[#050c08]/90 rounded-2xl p-5 overflow-auto max-h-[380px] border border-white/10 shadow-inner custom-scrollbar relative">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-300 opacity-60" />
              <pre className="text-[12px] font-mono text-emerald-100/90 whitespace-pre-wrap leading-relaxed selection:bg-emerald-500/40">
                {generatedCode}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function App() {
  const [issue, setIssue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState('waiting');
  const [results, setResults] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [deviceViewport, setDeviceViewport] = useState('desktop');
  const [iframeKey, setIframeKey] = useState(0);
  const [copiedFullCode, setCopiedFullCode] = useState(false);
  const [activePreset, setActivePreset] = useState('sanctuary'); // 'sanctuary' | 'sneaker' | 'game' | 'coffee' | 'custom'
  const sandboxRef = useRef(null);

  const inspirationalChips = [
    { label: "🌲 Misty Alpine Sanctuary", prompt: "Design an ethereal luxury alpine eco-resort sanctuary website with smooth GSAP animations, 3D room tour cards, and biophilic glass aesthetic." },
    { label: "👟 Neo-Kicks Gen-Z Drop", prompt: "Design an ultra-hyped Gen-Z streetwear sneaker drop portal with 3D shoe showcase, interactive colorways, live bag drawer, and kinetic typography." },
    { label: "🎮 3D Cyber-Rift RPG", prompt: "Build an interactive 3D mythical sci-fi gaming portal with character class matrix, stat HUDs, sector breach launch, and synthesized sound effects." },
    { label: "🍵 Zen Botanical Matcha Lab", prompt: "Craft a high-end Japanese matcha botanical tea house website with organic soundscapes, ceremony reservations, and minimalist glassmorphism." }
  ];

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!issue) return;
    
    setIsProcessing(true);
    setStatus('running');
    setResults([]);

    try {
      const response = await fetch('http://localhost:3000/api/swarm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ issue })
      });
      
      const data = await response.json();
      if (data.success) {
        setResults(data.results);
        setActivePreset('custom');
        setIframeKey(prev => prev + 1);
        setTimeout(() => {
          if (sandboxRef.current) {
            sandboxRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 500);
      } else {
        alert("Swarm synthesis failed: " + (data.error || "Unknown"));
      }
    } catch (error) {
      console.error(error);
      alert("Network Error connecting to DevSwarm port 3000. Please ensure backend is running.");
    } finally {
      setIsProcessing(false);
      setStatus('done');
    }
  };

  const getAgentCode = (agentName) => {
    const res = results.find(r => r.agent === agentName);
    return res ? res.code : null;
  };

  const customUiCode = getAgentCode('UI/UX Subagent');

  const getActiveCode = () => {
    if (activePreset === 'custom' && customUiCode) {
      return customUiCode;
    }
    if (activePreset === 'sneaker') {
      return PROTOTYPES.genzSneaker;
    }
    if (activePreset === 'game') {
      return PROTOTYPES.cyberGame;
    }
    if (activePreset === 'coffee') {
      return PROTOTYPES.zenCoffee;
    }
    return PROTOTYPES.natureSanctuary;
  };

  const currentCode = getActiveCode();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopiedFullCode(true);
    setTimeout(() => setCopiedFullCode(false), 2000);
  };

  const handleOpenNewTab = () => {
    const blob = new Blob([currentCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const playHapticChime = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1046.5, ctx.currentTime); // C6
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.36);
    } catch {}
  };

  // Fullscreen Immersive Preview Mode
  if (previewMode) {
    return (
      <div className="h-screen w-screen flex flex-col bg-[#050c08] text-white">
        <div className="p-4 bg-black/60 backdrop-blur-2xl flex items-center justify-between border-b border-white/15 z-50 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setPreviewMode(false)}
              className="flex items-center gap-2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-full transition-all border border-white/15 text-sm font-medium"
            >
              <ArrowLeft size={16} /> Exit Fullscreen
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              VisionOS Full Immersion Studio
            </div>
          </div>

          <div className="flex items-center bg-white/10 p-1 rounded-full border border-white/15 backdrop-blur-xl">
            <button
              onClick={() => { setActivePreset('sanctuary'); setIframeKey(k => k + 1); }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${activePreset === 'sanctuary' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-white/70 hover:text-white'}`}
            >
              🌿 Sanctuary
            </button>
            <button
              onClick={() => { setActivePreset('sneaker'); setIframeKey(k => k + 1); }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${activePreset === 'sneaker' ? 'bg-[#a3e635] text-black shadow-md' : 'text-white/70 hover:text-white'}`}
            >
              👟 Neo-Kicks
            </button>
            <button
              onClick={() => { setActivePreset('game'); setIframeKey(k => k + 1); }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${activePreset === 'game' ? 'bg-cyan-400 text-black shadow-md' : 'text-white/70 hover:text-white'}`}
            >
              ⚔️ Cyber-Rift
            </button>
            <button
              onClick={() => { setActivePreset('coffee'); setIframeKey(k => k + 1); }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${activePreset === 'coffee' ? 'bg-amber-400 text-black shadow-md' : 'text-white/70 hover:text-white'}`}
            >
              🍵 Zen Matcha
            </button>
            {customUiCode && (
              <button
                onClick={() => { setActivePreset('custom'); setIframeKey(k => k + 1); }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${activePreset === 'custom' ? 'bg-fuchsia-400 text-black shadow-md' : 'text-white/70 hover:text-white'}`}
              >
                ✨ AI Build
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white/10 p-1 rounded-full border border-white/15 backdrop-blur-xl">
              <button 
                onClick={() => setDeviceViewport('desktop')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${deviceViewport === 'desktop' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-white/70 hover:text-white'}`}
              >
                <Laptop size={14} /> Desktop
              </button>
              <button 
                onClick={() => setDeviceViewport('tablet')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${deviceViewport === 'tablet' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-white/70 hover:text-white'}`}
              >
                <Tablet size={14} /> Tablet
              </button>
              <button 
                onClick={() => setDeviceViewport('mobile')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${deviceViewport === 'mobile' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-white/70 hover:text-white'}`}
              >
                <Smartphone size={14} /> Mobile
              </button>
            </div>

            <button 
              onClick={() => setIframeKey(k => k + 1)} 
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition text-white/80 hover:text-white border border-white/15"
              title="Reload Frame"
            >
              <RotateCcw size={16} />
            </button>
            <button 
              onClick={handleOpenNewTab} 
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition text-white/80 hover:text-white border border-white/15"
              title="Open in New Tab"
            >
              <ExternalLink size={16} />
            </button>
          </div>
        </div>

        <div className="flex-grow w-full bg-[#030705] flex items-center justify-center p-2 sm:p-4 overflow-hidden">
          <div className={`h-full transition-all duration-500 ease-out flex items-center justify-center shadow-2xl rounded-2xl overflow-hidden border border-white/10 bg-white ${
            deviceViewport === 'desktop' ? 'w-full' :
            deviceViewport === 'tablet' ? 'w-[768px]' : 'w-[390px]'
          }`}>
            <iframe 
              key={iframeKey}
              title="Live Prototype Fullscreen"
              srcDoc={currentCode}
              className="w-full h-full bg-white border-0" 
              sandbox="allow-scripts allow-same-origin allow-modals allow-forms"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Goudy+Bookletter+1911&family=Sorts+Mill+Goudy:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
        
        .font-goudy {
          font-family: 'Sorts Mill Goudy', 'Goudy Bookletter 1911', Garamond, Georgia, serif;
        }
        
        body { 
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif; 
          background-color: #060e0a; 
          color: white;
          overflow-x: hidden;
        }

        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.38); }

        .glass-panel-ios {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(36px) saturate(210%);
          -webkit-backdrop-filter: blur(36px) saturate(210%);
          border: 1px solid rgba(255, 255, 255, 0.22);
          box-shadow: 0 25px 55px 0 rgba(0, 0, 0, 0.45), 
                      inset 0 1px 1px 0 rgba(255, 255, 255, 0.35),
                      inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2);
        }

        .goudy-gradient-title {
          background: linear-gradient(180deg, #ffffff 0%, #ecfdf5 50%, #bbf7d0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Apple Device Simulator Frames */
        .iphone-frame {
          border: 10px solid #1a221e;
          border-radius: 48px;
          box-shadow: 0 25px 60px rgba(0,0,0,0.7), inset 0 0 0 2px rgba(255,255,255,0.2);
          position: relative;
        }
        .ipad-frame {
          border: 12px solid #1a221e;
          border-radius: 36px;
          box-shadow: 0 25px 60px rgba(0,0,0,0.7), inset 0 0 0 2px rgba(255,255,255,0.2);
        }
        .desktop-frame {
          border: 6px solid #1a221e;
          border-radius: 24px;
          box-shadow: 0 25px 60px rgba(0,0,0,0.7);
        }
      `}</style>
      
      {/* Main VisionOS Background Container with Cinematic Nature */}
      <div 
        className="min-h-screen relative flex flex-col items-center py-12 md:py-20 px-4 selection:bg-emerald-500/40 bg-cover bg-center bg-fixed bg-no-repeat"
        style={{ backgroundImage: "url('/nature-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#06100c]/55 backdrop-blur-[5px]" />
        
        {/* Apple Dynamic Light Flares */}
        <div className="absolute top-0 left-0 w-[45rem] h-[45rem] bg-amber-400/[0.12] rounded-full mix-blend-screen filter blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[50rem] h-[50rem] bg-emerald-600/[0.14] rounded-full mix-blend-screen filter blur-[150px] pointer-events-none" />

        {/* ================= APPLE DYNAMIC ISLAND TOP STATUS PILL ================= */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 mb-10 inline-flex items-center gap-4 px-6 py-2 rounded-full glass-panel-ios shadow-2xl"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-semibold text-white tracking-widest uppercase font-mono">Agent OS 2.0</span>
          </div>
          <span className="text-white/30 text-xs">|</span>
          <span className="text-xs text-emerald-200/80 font-medium hidden sm:inline">4 Neural Nodes Active • 60 FPS GSAP</span>
          <span className="text-white/30 text-xs hidden sm:inline">|</span>
          <button 
            onClick={playHapticChime} 
            className="flex items-center gap-1.5 text-xs text-white/70 hover:text-emerald-300 transition"
            title="Play Apple Haptic Chime"
          >
            <Volume2 size={13} className="text-emerald-400" />
            <span>Haptics</span>
          </button>
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
          
          {/* ================= HERO KEYNOTE TITLE ================= */}
          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16 md:mb-20 max-w-5xl"
          >
            <div className="inline-flex items-center gap-2.5 px-5 py-2 mb-6 rounded-full bg-white/[0.09] border border-white/20 backdrop-blur-2xl shadow-lg">
              <Leaf size={15} className="text-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-100 tracking-[0.25em] uppercase">
                Autonomous Multi-Agent Architecture • VisionOS v3.4
              </span>
            </div>

            <h1 className="font-goudy text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-tight goudy-gradient-title leading-[1.05] drop-shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
              Code Review Agent
            </h1>

            <p className="font-goudy italic text-xl sm:text-2xl md:text-3xl text-emerald-100/90 font-light max-w-3xl mx-auto tracking-wide mt-5 leading-relaxed drop-shadow-md">
              “Autonomous Multi-Agent Quality Guard powered by IBM Bob 2.0 — auditing standards, refactoring code, and synthesizing next-gen web experiences.”
            </p>
          </motion.div>

          {/* ================= SEARCH / PROMPT INPUT CAPSULE ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-3xl mx-auto mb-8"
          >
            <form 
              onSubmit={handleSubmit}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/40 via-teal-400/30 to-amber-300/30 rounded-full blur-xl opacity-40 group-hover:opacity-75 transition duration-700" />
              
              <div className="relative flex items-center bg-white/[0.09] hover:bg-white/[0.13] focus-within:bg-white/[0.16] border border-white/25 focus-within:border-emerald-400/60 rounded-full p-2.5 backdrop-blur-3xl shadow-[0_16px_45px_rgba(0,0,0,0.4)] transition-all duration-300">
                <div className="pl-6 text-emerald-300/80">
                  <Compass size={24} className="animate-spin-slow" />
                </div>
                
                <input
                  type="text"
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  placeholder="Describe your vision (e.g. 3D Alpine Sanctuary, Gen-Z Sneaker Drop, RPG Game)..."
                  className="w-full bg-transparent border-none py-4 px-4 text-white placeholder-emerald-100/40 focus:outline-none text-lg md:text-xl font-normal"
                  disabled={isProcessing}
                />
                
                <button
                  type="submit"
                  disabled={isProcessing || !issue}
                  className="bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-bold px-7 md:px-9 py-4 rounded-full transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2.5 shadow-[0_0_25px_rgba(52,211,153,0.4)] text-base shrink-0"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      <span className="hidden sm:inline">Synthesizing...</span>
                    </div>
                  ) : (
                    <>
                      <span>Synthesize</span>
                      <Sparkles size={18} className="text-slate-950" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-2.5 mt-5">
              <span className="text-xs uppercase tracking-widest text-emerald-200/60 font-semibold mr-1">Executive Sparks:</span>
              {inspirationalChips.map((chip, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIssue(chip.prompt)}
                  className="px-3.5 py-1.5 rounded-full bg-white/[0.07] hover:bg-white/[0.14] border border-white/15 text-xs text-white/80 hover:text-emerald-200 transition-all backdrop-blur-xl shadow-sm hover:scale-105"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* ================= 4 SPECIALIZED AGENTS ARCHITECTURE ================= */}
          <div className="w-full max-w-5xl mx-auto my-12">
            <div className="flex items-center justify-between mb-6 px-2">
              <h2 className="font-goudy text-2xl md:text-3xl text-white font-normal flex items-center gap-3">
                <Cpu size={22} className="text-emerald-400" />
                Decentralized Swarm Subagents
              </h2>
              <span className="text-xs tracking-widest uppercase text-emerald-300/80 font-semibold">
                Autonomous Pipeline
              </span>
            </div>

            <LayoutGroup>
              <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <AgentCard 
                  title="UI/UX Architect" 
                  icon={Code2} 
                  delay={0.2} 
                  status={status}
                  generatedCode={getAgentCode('UI/UX Subagent')}
                  details="HTML5 • Tailwind • GSAP • Verified Imagery"
                />
                <AgentCard 
                  title="State Orchestrator" 
                  icon={Layers} 
                  delay={0.3} 
                  status={status}
                  generatedCode={getAgentCode('Frontend Logic Subagent')}
                  details="React 19 • Zustand • TanStack Query"
                />
                <AgentCard 
                  title="Microservice Backend" 
                  icon={Server} 
                  delay={0.4} 
                  status={status}
                  generatedCode={getAgentCode('Backend Subagent')}
                  details="Node.js • Express • Redis • Auth"
                />
                <AgentCard 
                  title="Security Sentinel" 
                  icon={ShieldCheck} 
                  delay={0.5} 
                  status={status}
                  generatedCode={getAgentCode('Debugger Subagent')}
                  details="Jest Suite • PenTest • Vulnerability Patch"
                />
              </motion.div>
            </LayoutGroup>
          </div>

          {/* ================= APPLE EXECUTIVE LIVE PROTOTYPE SANDBOX ================= */}
          <motion.div 
            ref={sandboxRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-6xl mx-auto mt-16 mb-24"
          >
            {/* Header with Apple Segmented Control */}
            <div className="glass-panel-ios rounded-t-[2.5rem] p-6 md:p-8 border-b-0 flex flex-col gap-6">
              
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    VisionOS Interactive Device Sandbox • 60 FPS
                  </div>
                  <h2 className="font-goudy text-3xl md:text-4xl text-white font-normal">
                    Interactive Generation Showcase
                  </h2>
                  <p className="text-sm text-white/60 mt-1">
                    Every card and slide features 100% strictly matched photography and live interactivity.
                  </p>
                </div>

                {/* Apple Device Switcher & Controls */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center bg-black/40 p-1.5 rounded-full border border-white/15 backdrop-blur-xl">
                    <button
                      onClick={() => setDeviceViewport('desktop')}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        deviceViewport === 'desktop' ? 'bg-emerald-500 text-slate-950 shadow-md font-bold' : 'text-white/70 hover:text-white'
                      }`}
                    >
                      <Laptop size={14} /> Studio Display
                    </button>
                    <button
                      onClick={() => setDeviceViewport('tablet')}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        deviceViewport === 'tablet' ? 'bg-emerald-500 text-slate-950 shadow-md font-bold' : 'text-white/70 hover:text-white'
                      }`}
                    >
                      <Tablet size={14} /> iPad Pro M4
                    </button>
                    <button
                      onClick={() => setDeviceViewport('mobile')}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        deviceViewport === 'mobile' ? 'bg-emerald-500 text-slate-950 shadow-md font-bold' : 'text-white/70 hover:text-white'
                      }`}
                    >
                      <Smartphone size={14} /> iPhone 16 Pro
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIframeKey(k => k + 1)}
                      title="Reload Frame"
                      className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition border border-white/15 backdrop-blur-xl"
                    >
                      <RotateCcw size={16} />
                    </button>
                    <button
                      onClick={handleCopyCode}
                      title="Copy Raw HTML"
                      className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition border border-white/15 backdrop-blur-xl relative"
                    >
                      {copiedFullCode ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                    </button>
                    <button
                      onClick={handleOpenNewTab}
                      title="Pop-out in New Window"
                      className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition border border-white/15 backdrop-blur-xl"
                    >
                      <ExternalLink size={16} />
                    </button>
                    <button
                      onClick={() => setPreviewMode(true)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(52,211,153,0.35)] transform hover:scale-105 active:scale-95"
                    >
                      <Maximize2 size={15} />
                      <span>Fullscreen</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Apple Segmented Control Pills */}
              <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-white/10">
                <span className="text-xs uppercase tracking-widest text-emerald-200/70 font-bold mr-1">Gallery:</span>
                
                <button
                  onClick={() => { setActivePreset('sanctuary'); setIframeKey(k => k + 1); }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-2 border ${
                    activePreset === 'sanctuary' 
                      ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200 shadow-[0_0_20px_rgba(52,211,153,0.3)]' 
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <Leaf size={14} className="text-emerald-400" />
                  <span>Biophilic Sanctuary</span>
                </button>

                <button
                  onClick={() => { setActivePreset('sneaker'); setIframeKey(k => k + 1); }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-2 border ${
                    activePreset === 'sneaker' 
                      ? 'bg-lime-500/30 border-lime-400 text-lime-200 shadow-[0_0_20px_rgba(163,230,53,0.3)]' 
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <Flame size={14} className="text-lime-400" />
                  <span>Neo-Kicks Sneaker</span>
                </button>

                <button
                  onClick={() => { setActivePreset('game'); setIframeKey(k => k + 1); }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-2 border ${
                    activePreset === 'game' 
                      ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 shadow-[0_0_20px_rgba(6,182,212,0.3)]' 
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <Gamepad2 size={14} className="text-cyan-400" />
                  <span>Cyber-Rift 2088 RPG</span>
                </button>

                <button
                  onClick={() => { setActivePreset('coffee'); setIframeKey(k => k + 1); }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-2 border ${
                    activePreset === 'coffee' 
                      ? 'bg-amber-500/30 border-amber-400 text-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.3)]' 
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <Coffee size={14} className="text-amber-400" />
                  <span>Zen Matcha Lab</span>
                </button>

                {customUiCode && (
                  <button
                    onClick={() => { setActivePreset('custom'); setIframeKey(k => k + 1); }}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-2 border ${
                      activePreset === 'custom' 
                        ? 'bg-fuchsia-500/30 border-fuchsia-400 text-fuchsia-200 shadow-[0_0_20px_rgba(217,70,239,0.3)] animate-pulse' 
                        : 'bg-white/5 border-white/10 text-fuchsia-300/80 hover:bg-white/10'
                    }`}
                  >
                    <Sparkles size={14} className="text-fuchsia-400" />
                    <span>Custom AI Build</span>
                  </button>
                )}
              </div>

            </div>

            {/* Apple Simulated Device Viewport Canvas */}
            <div className="glass-panel-ios rounded-b-[2.5rem] p-3 sm:p-6 pt-0 overflow-hidden">
              
              {/* Chrome Top Bar */}
              <div className="bg-black/50 backdrop-blur-2xl rounded-2xl px-5 py-3 mb-4 flex items-center justify-between border border-white/10 shadow-inner">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm" />
                </div>

                <div className="flex-grow max-w-md mx-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-xs text-white/60">
                  <span className="text-emerald-400">🔒</span>
                  <span className="font-mono truncate">
                    https://apple.devswarm.os/{activePreset === 'sanctuary' ? 'aethelgard-biophilic' : activePreset === 'sneaker' ? 'neokicks-drop' : activePreset === 'game' ? 'cyber-rift-2088' : activePreset === 'coffee' ? 'zen-botanica' : 'custom-build'}
                  </span>
                </div>

                <span className="text-[11px] font-mono text-emerald-300/80 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-400/20">
                  {deviceViewport === 'desktop' && 'Apple Studio Display (100%)'}
                  {deviceViewport === 'tablet' && 'Apple iPad Pro M4 (768px)'}
                  {deviceViewport === 'mobile' && 'Apple iPhone 16 Pro (390px)'}
                </span>
              </div>

              {/* The Live Interactive Prototype Viewport */}
              <div className="w-full flex items-center justify-center bg-[#020504] rounded-2xl p-2 sm:p-6 min-h-[720px] overflow-hidden border border-white/10 shadow-2xl relative">
                
                {/* Simulated Device Frame */}
                <div className={`transition-all duration-500 ease-out overflow-hidden bg-white relative ${
                  deviceViewport === 'desktop' 
                    ? 'w-full h-[720px] desktop-frame' 
                    : deviceViewport === 'tablet' 
                      ? 'w-[768px] h-[720px] ipad-frame' 
                      : 'w-[390px] h-[720px] iphone-frame'
                }`}>
                  
                  {/* iPhone Dynamic Island Mockup on Mobile */}
                  {deviceViewport === 'mobile' && (
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-end pr-2">
                      <div className="w-2 h-2 rounded-full bg-blue-900/60 mr-1" />
                    </div>
                  )}

                  <iframe 
                    key={iframeKey}
                    title="Live Web Prototype Sandbox"
                    srcDoc={currentCode}
                    className="w-full h-full bg-white border-0" 
                    sandbox="allow-scripts allow-same-origin allow-modals allow-forms"
                  />

                  {/* iPhone Home Indicator Line on Mobile */}
                  {deviceViewport === 'mobile' && (
                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/60 rounded-full z-50 pointer-events-none" />
                  )}
                </div>

              </div>

              {/* Architecture Quality Guarantee */}
              <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-white/50 px-3">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="flex items-center gap-1.5 text-emerald-300 font-medium">
                    <CheckCircle2 size={14} className="text-emerald-400" /> VisionOS Liquid Glass Engine
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-300 font-medium">
                    <CheckCircle2 size={14} className="text-emerald-400" /> 100% Contextual Verified Photography
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-300 font-medium">
                    <CheckCircle2 size={14} className="text-emerald-400" /> Zero Placeholder Policy
                  </span>
                </div>
                <div className="text-[11px] text-white/40 mt-2 sm:mt-0 font-mono">
                  Cupertino Standards • Swarm OS 18
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
}
