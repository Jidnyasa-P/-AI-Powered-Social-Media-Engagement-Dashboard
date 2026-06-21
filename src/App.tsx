import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, Sparkles, BookOpen, FileText, ChevronRight, 
  Menu, X, LineChart, Cpu, Award, Globe, ShieldCheck 
} from 'lucide-react';
import DashboardView from './components/DashboardView';
import AiPlaygroundView from './components/AiPlaygroundView';
import AcademyView from './components/AcademyView';
import CareerToolkitView from './components/CareerToolkitView';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'coach' | 'academy' | 'toolkit'>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const menuItems = [
    { id: 'dashboard', label: 'Interactive Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'coach', label: 'AI Copywriting Coach', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'academy', label: 'Marketing Academy', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'toolkit', label: 'System Documentation', icon: <FileText className="w-4 h-4" /> },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans selection:bg-emerald-500/35 selection:text-white antialiased">
      
      {/* Mobile Top Header */}
      <header className="md:hidden bg-slate-900/80 backdrop-blur border-b border-slate-800 p-4 sticky top-0 z-30 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg text-slate-950">
            <LineChart className="w-5 h-5" />
          </div>
          <span className="font-extrabold tracking-tight text-xs uppercase text-emerald-400">Social Insights AI</span>
        </div>

        <button 
          onClick={() => setMobileMenuOpen(prev => !prev)}
          className="p-1 px-2.5 bg-slate-850 border border-slate-800 rounded-lg text-slate-300"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </header>

      {/* Mobile Sidebar Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.15 }}
            className="md:hidden fixed top-14 left-0 w-full bg-slate-900 border-b border-slate-800 p-4 space-y-2 z-20 shadow-2xl"
          >
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeTab === item.id 
                    ? 'text-emerald-400 bg-emerald-500/10 border-l-2 border-emerald-400' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Main Left Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-950 border-r border-slate-900 p-5 justify-between shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="space-y-6">
          {/* Brand/Product identification */}
          <div className="flex items-center gap-3 border-b border-slate-900 pb-5">
            <div className="p-2 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl text-slate-950">
              <LineChart className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">Campaign BI</span>
              <h2 className="font-extrabold text-sm tracking-tight text-slate-100">Social Insights AI</h2>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500 block px-2 mb-2">Navigator</span>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeTab === item.id 
                    ? 'text-emerald-400 bg-emerald-500/10 border-l-2 border-emerald-400 font-bold' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${activeTab === item.id ? 'translate-x-0.5 text-emerald-400' : 'opacity-0'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Footer/Platform active details */}
        <div className="bg-slate-900/60 border border-slate-900 rounded-xl p-3 space-y-2 mt-5">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="text-[9px] uppercase font-bold tracking-wider">Platform Specs</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            This workspace includes an active <strong>Gemini 3.5 proxy</strong> for copywriting scoring and analytics forecasting.
          </p>
          <div className="text-[9px] text-slate-500 font-mono">
            Version: 2.1.5-ElegantDark
          </div>
        </div>
      </aside>

      {/* Right Column Core Body Content */}
      <main className="flex-1 p-5 md:p-8 max-w-7xl mx-auto w-full overflow-y-auto space-y-6">
        
        {/* Dynamic transition layout builder */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'dashboard' && <DashboardView />}
            {activeTab === 'coach' && <AiPlaygroundView />}
            {activeTab === 'academy' && <AcademyView />}
            {activeTab === 'toolkit' && <CareerToolkitView />}
          </motion.div>
        </AnimatePresence>

      </main>
    </div>
  );
}
