import React, { useState } from 'react';
import { useAppStore } from '../services/AppContext';
import { AppCard } from '../components/AppCard';
import { SpecsModal } from '../components/SpecsModal';
import { GitMerge, X, Sparkles, Trash2, Search } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { 
    apps, 
    generateDescriptionForApp,
    generateSpecsForApp,
    auditApp,
    sculptApp,
    selectedAppIds, 
    toggleAppSelection, 
    blendSelectedApps, 
    clearSelection,
    isProcessing,
    purgeApps,
    searchQuery,
    setSearchQuery
  } = useAppStore();

  const [viewingSpecsId, setViewingSpecsId] = useState<string | null>(null);

  const handleViewSpecs = (id: string) => {
    setViewingSpecsId(id);
  };

  const viewingApp = viewingSpecsId ? apps.find(a => a.id === viewingSpecsId) : null;

  return (
    <div className="w-full max-w-7xl mx-auto relative">
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-1">
            <h2 className="text-2xl font-light text-slate-100">Application Matrix</h2>
            <button 
                onClick={purgeApps}
                className="text-xs flex items-center gap-1 text-red-900/50 hover:text-red-400 transition-colors px-2 py-1 rounded hover:bg-red-900/10"
                title="Purge all apps"
            >
                <Trash2 className="w-3 h-3" />
                Purge
            </button>
          </div>
          <p className="text-slate-500 mb-4">
            Manage {apps.length} applications. Select 2 apps to perform <span className="text-sovereign-400">Conceptual Blending</span>.
          </p>

        <div className="w-full md:w-96 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-500" />
            </div>
            <input
                type="text"
                placeholder="Semantic resonance search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-lg pl-10 p-2 focus:ring-sovereign-500 focus:border-sovereign-500 transition-colors"
            />
        </div>

        </div>
        
        {selectedAppIds.length > 0 && (
          <div className="flex items-center gap-3 bg-slate-900 border border-slate-700 p-2 rounded-lg animate-in fade-in slide-in-from-top-2">
            <div className="px-3 py-1 text-xs font-mono text-slate-400 border-r border-slate-700">
              <span className="text-white">{selectedAppIds.length}</span> / 2 Selected
            </div>
            
            <button 
              onClick={blendSelectedApps}
              disabled={selectedAppIds.length !== 2 || isProcessing}
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm font-bold transition-all ${
                selectedAppIds.length === 2 
                  ? 'bg-sovereign-500 hover:bg-sovereign-400 text-white shadow-lg shadow-sovereign-500/20' 
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {isProcessing ? (
                <Sparkles className="w-4 h-4 animate-spin" />
              ) : (
                <GitMerge className="w-4 h-4" />
              )}
              Blend Inputs
            </button>
            
            <button 
              onClick={clearSelection}
              className="p-1.5 hover:bg-slate-800 rounded text-slate-500 hover:text-white"
              title="Clear Selection"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="flex gap-4 text-sm text-slate-500 font-mono self-end">
            <span>Completed: <span className="text-green-400">{apps.filter(a => a.status === 'completed').length}</span></span>
            <span>Blends: <span className="text-purple-400">{apps.filter(a => a.isBlended).length}</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 pb-20">
        {apps.length === 0 ? (
            <div className="col-span-3 flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-800 rounded-2xl bg-slate-900/20">
                <Sparkles className="w-12 h-12 text-slate-700 mb-4" />
                <p className="text-slate-400 font-medium">The Matrix is empty.</p>
                <p className="text-slate-600 text-sm mt-1">Use the Genesis Engine in the sidebar to spawn new concepts.</p>
            </div>
        ) : (
            [...apps].sort((a, b) => (b.resonanceScore || 0) - (a.resonanceScore || 0)).map((app) => (
            <AppCard 
                key={app.id} 
                app={app} 
                isSelected={selectedAppIds.includes(app.id)}
                onSelect={toggleAppSelection}
                onGenerate={generateDescriptionForApp} 
                onGenerateSpecs={generateSpecsForApp}
                onViewSpecs={handleViewSpecs}
                onAudit={auditApp}
                onSculpt={sculptApp}
            />
            ))
        )}
      </div>

      {viewingApp && (
        <SpecsModal 
            app={viewingApp} 
            onClose={() => setViewingSpecsId(null)} 
        />
      )}
    </div>
  );
};