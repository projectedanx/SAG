import React, { useEffect, useRef } from 'react';
import { useAppStore } from '../services/AppContext';

export const TerminalView: React.FC = () => {
  const { logs } = useAppStore();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="w-full max-w-5xl mx-auto h-full flex flex-col">
       <div className="mb-4">
          <h2 className="text-2xl font-light text-slate-100">System Logs</h2>
          <p className="text-slate-500 mt-1">Real-time generator output stream.</p>
        </div>

      <div className="flex-1 bg-slate-900 rounded-lg border border-slate-800 font-mono text-sm p-4 overflow-y-auto shadow-inner relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sovereign-500/20 to-transparent opacity-50" />
        
        {logs.map((log, idx) => (
          <div key={idx} className="mb-2 flex items-start group">
            <span className="text-slate-600 mr-4 select-none shrink-0 w-24">{log.timestamp}</span>
            <div className={`flex-1 break-all ${
              log.type === 'error' ? 'text-red-400' :
              log.type === 'success' ? 'text-green-400' :
              log.type === 'system' ? 'text-sovereign-400 font-bold' :
              'text-slate-300'
            }`}>
              <span className="mr-2 opacity-50 select-none">{'>'}</span>
              {log.message}
            </div>
          </div>
        ))}
        
        <div ref={endRef} />
        
        {logs.length === 0 && (
            <div className="text-slate-600 italic">No logs available. Initialize system to begin.</div>
        )}
      </div>
    </div>
  );
};