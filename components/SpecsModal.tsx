import React from 'react';
import { X, Copy, Check } from 'lucide-react';
import { AppItem } from '../types';

interface SpecsModalProps {
  app: AppItem;
  onClose: () => void;
}

export /**
 * A modal overlay displaying the deep deterministic Technical Specification of an application persona.
 * Translates the generated Markdown into structural UI, rendering the KPIs, architecture, and
 * any 'Symbolic Scars' created through Causal Sculpting.
 *
 * @param {SpecsModalProps} props - The component props.
 * @param {AppItem | null} props.app - The application persona currently active in the modal.
 * @param {() => void} props.onClose - Callback to dismiss the modal and return to the Epistemic Matrix.
 * @returns {JSX.Element | null} The rendered specification modal or null if no app is active.
 */
const SpecsModal: React.FC<SpecsModalProps> = ({ app, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!app.specification) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(app.specification || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/50 rounded-t-xl">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded bg-sovereign-900/30 flex items-center justify-center border border-sovereign-500/20">
                <span className="font-mono text-xs text-sovereign-400">MD</span>
             </div>
             <div>
                <h3 className="text-lg font-medium text-slate-200">Technical Specifications</h3>
                <p className="text-xs text-slate-500 font-mono">APP-ID: {app.id}</p>
             </div>
          </div>
          <div className="flex items-center gap-2">
            <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors border border-slate-700"
            >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy Markdown'}
            </button>
            <button 
                onClick={onClose}
                className="p-2 rounded-md hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition-colors"
            >
                <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-6 font-mono text-sm text-slate-300 bg-slate-950">
           <pre className="whitespace-pre-wrap leading-relaxed max-w-none prose prose-invert prose-sm">
             {app.specification}
           </pre>
        </div>
      </div>
    </div>
  );
};