import React from 'react';
import { LayoutDashboard, Terminal, Activity, Zap, Plus, Cpu } from 'lucide-react';
import { ViewMode } from '../App';
import { useAppStore } from '../services/AppContext';
import { APP_DOMAINS } from '../types';

interface SidebarProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const { 
    config, 
    updateConfig, 
    isProcessing, 
    generateAllDescriptions, 
    resetApps,
    selectedDomains,
    toggleDomainSelection,
    generateAppsFromSelectedDomains
  } = useAppStore();

  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col h-full overflow-hidden">
      <div className="p-6 shrink-0">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded bg-sovereign-900 flex items-center justify-center border border-sovereign-500/30">
            <Activity className="w-5 h-5 text-sovereign-400" />
          </div>
          <span className="font-bold text-slate-100 tracking-tight">Sovereign AI</span>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => onViewChange('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              currentView === 'dashboard' 
                ? 'bg-sovereign-900/50 text-sovereign-400 border border-sovereign-500/20' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Matrix View
          </button>
          <button
            onClick={() => onViewChange('terminal')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              currentView === 'terminal' 
                ? 'bg-sovereign-900/50 text-sovereign-400 border border-sovereign-500/20' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Terminal className="w-4 h-4" />
            Console Output
          </button>
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-2">
         <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
                <Cpu className="w-4 h-4 text-sovereign-400" />
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Genesis Engine
                </label>
            </div>
            <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                Select domains to seed the generator with original concepts.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
                {APP_DOMAINS.map(domain => (
                    <button
                        key={domain}
                        onClick={() => toggleDomainSelection(domain)}
                        className={`text-[10px] px-2 py-1 rounded border transition-all ${
                            selectedDomains.includes(domain)
                                ? 'bg-sovereign-500/20 border-sovereign-500 text-sovereign-200'
                                : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                        }`}
                    >
                        {domain}
                    </button>
                ))}
            </div>
            <button
                onClick={generateAppsFromSelectedDomains}
                disabled={isProcessing || selectedDomains.length === 0}
                className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md text-xs font-bold transition-all border ${
                     isProcessing || selectedDomains.length === 0
                     ? 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
                     : 'bg-slate-800 border-sovereign-500/50 text-sovereign-400 hover:bg-sovereign-900/50'
                }`}
            >
                <Plus className="w-3 h-3" />
                Spawn Concepts
            </button>
         </div>

         <div className="border-t border-slate-800 pt-6">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-3">
                Refinement
            </label>
            
            <div className="space-y-4">
                <div>
                <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Word Limit</span>
                    <span className="text-sovereign-400 font-mono">{config.maxTokens}</span>
                </div>
                <input
                    type="range"
                    min="50"
                    max="1000"
                    step="50"
                    value={config.maxTokens}
                    onChange={(e) => updateConfig('maxTokens', Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sovereign-500"
                />
                </div>

                <div>
                <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Creativity</span>
                    <span className="text-sovereign-400 font-mono">{config.temperature}</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={config.temperature}
                    onChange={(e) => updateConfig('temperature', Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sovereign-500"
                />
                </div>
            </div>
        </div>
      </div>

      <div className="p-6 border-t border-slate-800 shrink-0 space-y-2">
        <button
          onClick={generateAllDescriptions}
          disabled={isProcessing}
          className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-bold shadow-lg shadow-sovereign-900/20 transition-all ${
            isProcessing 
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-sovereign-600 hover:bg-sovereign-500 text-white'
          }`}
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              Run Generator
            </>
          )}
        </button>

        <button
          onClick={resetApps}
          disabled={isProcessing}
          className="w-full py-2 px-4 rounded-md text-xs font-medium text-slate-500 hover:text-slate-300 transition-colors"
        >
          Reset State
        </button>
      </div>
    </aside>
  );
};