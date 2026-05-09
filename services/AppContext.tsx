import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { AppItem, GenerationConfig, INITIAL_APP_DATA, LogEntry, AppDomain } from '../types';
import { generateAppDescription, generateBlendedConcept, generateConceptsFromDomains, generateAppSpecification, performSovereignAudit, sculptTopologicalPersona } from './geminiService';
import { tokenize, calculateIDF, vectorize, calculateCosineSimilarity, applyHumanPerturbation } from './resonanceEngine';

interface AppContextType {
  apps: AppItem[];
  logs: LogEntry[];
  config: GenerationConfig;
  isProcessing: boolean;
  selectedAppIds: string[];
  selectedDomains: AppDomain[];
  updateConfig: (key: keyof GenerationConfig, value: number) => void;
  generateDescriptionForApp: (id: string) => Promise<void>;
  generateSpecsForApp: (id: string) => Promise<void>;
  auditApp: (id: string) => Promise<void>;
  sculptApp: (id: string, friction: string) => Promise<void>;
  generateAllDescriptions: () => Promise<void>;
  resetApps: () => void;
  purgeApps: () => void;
  addLog: (message: string, type?: LogEntry['type']) => void;
  toggleAppSelection: (id: string) => void;
  toggleDomainSelection: (domain: AppDomain) => void;
  blendSelectedApps: () => Promise<void>;
  clearSelection: () => void;
  generateAppsFromSelectedDomains: () => Promise<void>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setHumanFeedback: (id: string, feedback: 'Resonant' | 'Dissonant' | undefined) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apps, setApps] = useState<AppItem[]>(() => 
    INITIAL_APP_DATA.map((item, index) => ({
      ...item,
      id: `app-${index}`,
      status: 'idle'
    }))
  );

  const [logs, setLogs] = useState<LogEntry[]>([
    { timestamp: new Date().toLocaleTimeString(), message: 'System initialized.', type: 'system' }
  ]);

  const [config, setConfig] = useState<GenerationConfig>({
    maxTokens: 300, // Increased default
    temperature: 0.7
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAppIds, setSelectedAppIds] = useState<string[]>([]);
  const [selectedDomains, setSelectedDomains] = useState<AppDomain[]>([]);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    if (!searchQuery.trim()) {
      // Clear resonance scores if no query
      setApps(prev => prev.map(app => ({ ...app, resonanceScore: undefined })));
      return;
    }

    const corpus = apps.map(app => {
        const text = app.name + ' ' + app.originalDescription + ' ' + (app.specification || '');
        return tokenize(text);
    });

    const idf = calculateIDF(corpus);
    const vocab = Object.keys(idf);

    const queryTokens = tokenize(searchQuery);
    const queryVec = vectorize(queryTokens, vocab, idf);

    setApps(prev => prev.map(app => {
        const appTokens = tokenize(app.name + ' ' + app.originalDescription + ' ' + (app.specification || ''));
        const appVec = vectorize(appTokens, vocab, idf);
        let score = calculateCosineSimilarity(queryVec, appVec);
        score = applyHumanPerturbation(score, app.humanFeedback);

        return { ...app, resonanceScore: score };
    }));

  // We need to carefully update resonance scores without triggering infinite loops
  }, [searchQuery]); // Run only when search query changes
   // for full object to prevent infinite loops, relying on length or explicit updates.


  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    setLogs(prev => [...prev, {
      timestamp: new Date().toLocaleTimeString(),
      message,
      type
    }]);
  }, []);

  const updateConfig = (key: keyof GenerationConfig, value: number) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };


  const setHumanFeedback = useCallback((id: string, feedback: 'Resonant' | 'Dissonant' | undefined) => {
    setApps(prev => prev.map(app => {
      if (app.id !== id) return app;

      const newFeedback = app.humanFeedback === feedback ? undefined : feedback;
      const baseScore = app.resonanceScore ? (app.humanFeedback === 'Resonant' ? app.resonanceScore / 1.618 : (app.humanFeedback === 'Dissonant' ? app.resonanceScore / 0.618 : app.resonanceScore)) : 0;
      const newScore = baseScore > 0 ? applyHumanPerturbation(baseScore, newFeedback) : undefined;

      return {
          ...app,
          humanFeedback: newFeedback,
          resonanceScore: newScore
      };
    }));
    addLog(`Human tacit friction applied to ${id}: ${feedback}`, 'system');
  }, [addLog]);


  const updateAppStatus = (id: string, status: AppItem['status'], updates?: Partial<AppItem>) => {
    setApps(prev => prev.map(app => 
      app.id === id 
        ? { ...app, status, ...updates }
        : app
    ));
  };

  const generateDescriptionForApp = useCallback(async (id: string) => {
    const app = apps.find(a => a.id === id);
    if (!app) return;

    updateAppStatus(id, 'generating');
    addLog(`Generating description for ${app.name}...`, 'info');

    try {
      const desc = await generateAppDescription(app.name, app.originalDescription, config);
      updateAppStatus(id, 'completed', { generatedDescription: desc });
      addLog(`Completed generation for ${app.name}`, 'success');
    } catch (error) {
      console.error(error);
      updateAppStatus(id, 'failed');
      addLog(`Failed to generate for ${app.name}`, 'error');
    }
  }, [apps, config, addLog]);

  const generateSpecsForApp = useCallback(async (id: string) => {
    const app = apps.find(a => a.id === id);
    if (!app) return;

    updateAppStatus(id, 'generating');
    addLog(`Generating Technical Specs for ${app.name}...`, 'info');

    try {
      const specs = await generateAppSpecification(app, config);
      updateAppStatus(id, 'completed', { specification: specs });
      addLog(`Specs generated for ${app.name}`, 'success');
    } catch (error) {
      console.error(error);
      updateAppStatus(id, 'failed');
      addLog(`Failed to generate specs for ${app.name}`, 'error');
    }
  }, [apps, config, addLog]);

    const sculptApp = useCallback(async (id: string, friction: string) => {
    const app = apps.find(a => a.id === id);
    if (!app) return;

    updateAppStatus(id, 'sculpting');
    addLog(`Initiating Topological Causal Sculpting for ${app.name}...`, 'system');

    try {
      const result = await sculptTopologicalPersona(app, friction, config);
      updateAppStatus(id, 'completed', {
        specification: result.specification,
        operationalFriction: friction,
        metabolicCost: result.metabolicCost
      });
      addLog(`Sculpting complete for ${app.name}. Metabolic Cost: ${result.metabolicCost} J/kN`, 'success');
    } catch (error) {
      console.error(error);
      updateAppStatus(id, 'failed');
      addLog(`Sculpting failed for ${app.name}`, 'error');
    }
  }, [apps, config, addLog]);

  const auditApp = useCallback(async (id: string) => {
    const app = apps.find(a => a.id === id);
    if (!app) return;

    updateAppStatus(id, 'auditing');
    addLog(`Initiating Sovereign Audit for ${app.name}...`, 'system');

    try {
      const result = await performSovereignAudit(app, config);
      updateAppStatus(id, 'completed', {
        cfdiScore: result.cfdiScore,
        auditLog: result.auditLog
      });

      const logType = result.cfdiScore > 0.15 ? 'error' : 'success';
      addLog(`Audit complete for ${app.name}. CFDI: ${result.cfdiScore}`, logType);
    } catch (error) {
      console.error(error);
      updateAppStatus(id, 'failed');
      addLog(`Sovereign Audit failed for ${app.name}`, 'error');
    }
  }, [apps, config, addLog]);

  const generateAllDescriptions = useCallback(async () => {
    setIsProcessing(true);
    addLog('Starting batch generation...', 'system');
    
    // Process sequentially to mimic the generator pattern in the Python script
    for (const app of apps) {
      await generateDescriptionForApp(app.id);
      // Small delay for visual effect
      await new Promise(resolve => setTimeout(resolve, 500)); 
    }
    
    setIsProcessing(false);
    addLog('Batch generation completed.', 'success');
  }, [apps, generateDescriptionForApp, addLog]);

  const resetApps = () => {
    setApps(INITIAL_APP_DATA.map((item, index) => ({
      ...item,
      id: `app-${index}`,
      status: 'idle',
      generatedDescription: undefined,
      specification: undefined,
      isBlended: false,
      isDeepBlend: false,
      cfdiScore: undefined,
      auditLog: undefined
    })));
    setSelectedAppIds([]);
    addLog('App states reset to factory defaults.', 'system');
  };

  const purgeApps = () => {
    setApps([]);
    setSelectedAppIds([]);
    addLog('App Matrix purged.', 'system');
  };

  const toggleAppSelection = (id: string) => {
    setSelectedAppIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      if (prev.length >= 2) {
        addLog('Maximum 2 apps can be selected for blending.', 'error');
        return prev;
      }
      return [...prev, id];
    });
  };

  const clearSelection = () => setSelectedAppIds([]);

  const blendSelectedApps = useCallback(async () => {
    if (selectedAppIds.length !== 2) {
      addLog('Exactly 2 apps must be selected to blend.', 'error');
      return;
    }

    const app1 = apps.find(a => a.id === selectedAppIds[0]);
    const app2 = apps.find(a => a.id === selectedAppIds[1]);

    if (!app1 || !app2) return;

    // Deep blend occurs if either parent is a deep blend (propagation) or if both have specifications (creation)
    const isDeepBlend = !!(app1.isDeepBlend || app2.isDeepBlend || (app1.specification && app2.specification));

    setIsProcessing(true);
    addLog(`Initiating ${isDeepBlend ? 'DEEP' : 'Conceptual'} Blend: ${app1.name} + ${app2.name}`, 'system');

    try {
      const result = await generateBlendedConcept(app1, app2, config);
      
      const newApp: AppItem = {
        id: `blend-${Date.now()}`,
        name: result.name,
        originalDescription: result.description, // The concise summary for the card
        generatedDescription: result.description,
        specification: result.specification, // The full deep blended spec
        status: 'completed',
        isBlended: true,
        isDeepBlend
      };

      setApps(prev => [newApp, ...prev]);
      setSelectedAppIds([]);
      addLog(`Blend Successful! Created: ${result.name}`, 'success');
      if (result.specification) {
        addLog(`${isDeepBlend ? 'Deep' : 'Technical'} Specification generated for ${result.name}`, 'success');
      }
    } catch (error) {
      console.error(error);
      addLog('Conceptual Blending failed.', 'error');
    } finally {
      setIsProcessing(false);
    }
  }, [apps, selectedAppIds, config, addLog]);

  const toggleDomainSelection = (domain: AppDomain) => {
    setSelectedDomains(prev => prev.includes(domain) ? prev.filter(d => d !== domain) : [...prev, domain]);
  };

  const generateAppsFromSelectedDomains = useCallback(async () => {
    if (selectedDomains.length === 0) {
      addLog('Please select at least one domain.', 'error');
      return;
    }
    
    setIsProcessing(true);
    addLog(`Genesis Engine started. Domains: ${selectedDomains.join(', ')}`, 'system');

    try {
      const concepts = await generateConceptsFromDomains(selectedDomains, 3);
      
      const newApps: AppItem[] = concepts.map((c, i) => ({
        id: `genesis-${Date.now()}-${i}`,
        name: c.name,
        originalDescription: c.description,
        status: 'idle',
      }));

      setApps(prev => [...newApps, ...prev]);
      addLog(`Genesis complete. ${newApps.length} new apps created.`, 'success');
    } catch (error) {
      addLog('Genesis Engine failed.', 'error');
    } finally {
      setIsProcessing(false);
    }
  }, [selectedDomains, addLog]);

  return (
    <AppContext.Provider value={{
      apps,
      logs,
      config,
      isProcessing,
      selectedAppIds,
      selectedDomains,
      updateConfig,
      generateDescriptionForApp,
      generateSpecsForApp,
      auditApp,
      sculptApp,
      generateAllDescriptions,
      resetApps,
      purgeApps,
      addLog,
      toggleAppSelection,
      toggleDomainSelection,
      blendSelectedApps,
      clearSelection,
      generateAppsFromSelectedDomains,
      searchQuery,
      setSearchQuery,
      setHumanFeedback
    }}>
      {children}
    </AppContext.Provider>
  );
};

/**
 * Custom hook granting deep read/write access to the Epistemic Matrix context.
 * Enables UI components to execute Toplogical Causal Sculpting, Sovereign Audits, and Conceptual Blending.
 *
 * @returns {AppContextType} The current state and mutators of the Sovereign OS matrix.
 * @throws {Error} If called outside of an AppProvider boundary.
 */
export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
};