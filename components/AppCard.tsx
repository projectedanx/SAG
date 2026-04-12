import React from 'react';
import { AppItem } from '../types';
import { RefreshCw, CheckCircle, AlertCircle, Box, Sparkles, Check, FileText, FileCode, Layers } from 'lucide-react';

interface AppCardProps {
  app: AppItem;
  isSelected?: boolean;
  onGenerate: (id: string) => void;
  onGenerateSpecs?: (id: string) => void;
  onViewSpecs,
  onAudit?: (id: string) => void;
  onAudit?: (id: string) => void;

  onSelect?: (id: string) => void;
}

export const AppCard: React.FC<AppCardProps> = ({ app, isSelected, onGenerate, onGenerateSpecs, onViewSpecs,
  onAudit, onSelect }) => {
  const statusColors = {
    idle: 'border-slate-800 bg-slate-900/50',
    generating: 'border-sovereign-500/50 bg-sovereign-900/10 shadow-[0_0_15px_-3px_rgba(14,165,233,0.3)]',
    completed: 'border-green-500/30 bg-green-900/5',
    failed: 'border-red-500/30 bg-red-900/5',
  };

  const isDeep = app.isDeepBlend;
  const isBlended = app.isBlended;

  const borderClass = isSelected 
    ? 'border-sovereign-400 ring-1 ring-sovereign-400 bg-sovereign-900/20' 
    : isDeep
      ? 'border-indigo-500/40 bg-indigo-900/10'
      : isBlended 
        ? 'border-purple-500/40 bg-purple-900/10'
        : statusColors[app.status];

  return (
    <div 
      className={`relative p-5 rounded-xl border transition-all duration-300 group ${borderClass} ${onSelect ? 'cursor-pointer' : ''}`}
      onClick={() => onSelect && onSelect(app.id)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
            isDeep ? 'bg-indigo-900/30 border-indigo-500/30' :
            isBlended ? 'bg-purple-900/30 border-purple-500/30' : 
            'bg-slate-800 border-slate-700'
          }`}>
            {isDeep ? (
              <Layers className="w-5 h-5 text-indigo-400" />
            ) : isBlended ? (
              <Sparkles className="w-5 h-5 text-purple-400" />
            ) : (
              <Box className="w-5 h-5 text-slate-400" />
            )}
          </div>
          <div>
            <h3 className={`font-semibold ${
              isDeep ? 'text-indigo-200' :
              isBlended ? 'text-purple-200' : 
              'text-slate-200'
            }`}>{app.name}</h3>
            <span className="text-xs text-slate-500 font-mono">ID: {app.id}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
           {isSelected && <div className="bg-sovereign-500 rounded-full p-0.5"><Check className="w-3 h-3 text-white" /></div>}
           {!isSelected && app.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-500" />}
           {!isSelected && app.status === 'failed' && <AlertCircle className="w-4 h-4 text-red-500" />}
           {!isSelected && app.status === 'generating' && <RefreshCw className="w-4 h-4 text-sovereign-400 animate-spin" />}
           {!isSelected && app.status === 'auditing' && <ShieldAlert className="w-4 h-4 text-yellow-500 animate-pulse" />}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">
            {isDeep ? 'Deep Synthesis' : isBlended ? 'Concept Origin' : 'Original'}
          </p>
          <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">{app.originalDescription}</p>
        </div>

        {app.generatedDescription && !app.isBlended && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="h-px bg-slate-800 my-3" />
            <p className="text-xs text-sovereign-400 uppercase font-bold tracking-wider mb-1">Generated</p>
            <p className="text-sm text-slate-200 leading-relaxed font-medium">{app.generatedDescription}</p>
          </div>
        )}

        {app.cfdiScore !== undefined && (
          <div className={`mt-3 pt-3 border-t border-slate-800 flex flex-col gap-1`}>
             <div className="flex items-center gap-2">
                 {app.cfdiScore > 0.15 ? <ShieldAlert className="w-4 h-4 text-red-400" /> : <ShieldCheck className="w-4 h-4 text-green-400" />}
                 <span className={`text-xs font-mono font-bold ${app.cfdiScore > 0.15 ? 'text-red-400' : 'text-green-400'}`}>
                    CFDI: {app.cfdiScore.toFixed(2)}
                 </span>
             </div>
             {app.auditLog && (
                 <p className="text-xs text-slate-500 leading-relaxed italic border-l-2 border-slate-800 pl-2">
                     "{app.auditLog}"
                 </p>
             )}
          </div>
        )}

      </div>

      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
         {/* Spec Button */}
        {app.status !== 'generating' && onGenerateSpecs && onViewSpecs,
  onAudit && (
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    if (app.specification) {
                        onViewSpecs,
  onAudit(app.id);
                    } else {
                        onGenerateSpecs(app.id);
                    }
                }}
                className={`p-1.5 rounded transition-colors ${
                    app.specification 
                    ? 'bg-sovereign-900/50 text-sovereign-400 hover:bg-sovereign-900 hover:text-white border border-sovereign-500/30'
                    : 'bg-slate-800 hover:bg-sovereign-600 hover:text-white text-slate-400'
                }`}
                title={app.specification ? "View Specs" : "Generate Technical Specs"}
            >
                {app.specification ? <FileCode className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />}
            </button>
        )}


        {/* Audit Button */}
        {app.status !== 'generating' && app.status !== 'auditing' && app.specification && onAudit && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAudit(app.id);
            }}
            className="p-1.5 rounded bg-slate-800 hover:bg-sovereign-600 hover:text-white text-slate-400 transition-colors"
            title="Perform Sovereign Audit"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Regenerate Button */}
        {app.status !== 'generating' && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onGenerate(app.id);
            }}
            className="p-1.5 rounded bg-slate-800 hover:bg-sovereign-600 hover:text-white text-slate-400 transition-colors"
            title="Regenerate Description"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};