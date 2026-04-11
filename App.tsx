import React, { useState } from 'react';
import { Dashboard } from './views/Dashboard';
import { Sidebar } from './components/Sidebar';
import { AppProvider } from './services/AppContext';
import { TerminalView } from './views/TerminalView';
import { LayoutDashboard, Terminal } from 'lucide-react';

export type ViewMode = 'dashboard' | 'terminal';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');

  return (
    <AppProvider>
      <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans">
        <Sidebar currentView={viewMode} onViewChange={setViewMode} />
        
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          <header className="h-16 border-b border-slate-800 flex items-center px-6 bg-slate-900/50 backdrop-blur-sm z-10 justify-between">
            <div className="flex items-center gap-3">
              {viewMode === 'dashboard' ? (
                <LayoutDashboard className="w-5 h-5 text-sovereign-500" />
              ) : (
                <Terminal className="w-5 h-5 text-sovereign-500" />
              )}
              <h1 className="text-lg font-medium tracking-wide">
                {viewMode === 'dashboard' ? 'App Matrix' : 'Generator Console'}
              </h1>
            </div>
            <div className="text-xs text-slate-500 font-mono">
              v1.0.0 • SOVEREIGN_COGNITIVE_OS
            </div>
          </header>

          <div className="flex-1 overflow-auto p-6 scroll-smooth">
            {viewMode === 'dashboard' && <Dashboard />}
            {viewMode === 'terminal' && <TerminalView />}
          </div>
        </main>
      </div>
    </AppProvider>
  );
};

export default App;