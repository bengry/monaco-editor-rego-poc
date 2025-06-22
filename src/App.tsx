import React, { useState, useCallback } from 'react';
import { MonacoEditor } from './components/MonacoEditor';
import { EditorToolbar } from './components/EditorToolbar';
import { Sidebar } from './components/Sidebar';
import { OutputPanel } from './components/OutputPanel';
import { regoExamples } from './data/regoExamples';
import { EditorSettings } from './types/rego';

function App() {
  const [selectedExample, setSelectedExample] = useState('basic-allow');
  const [currentCode, setCurrentCode] = useState(() => {
    const example = regoExamples.find(ex => ex.id === 'basic-allow');
    return example?.code || '';
  });
  const [output, setOutput] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [settings, setSettings] = useState<EditorSettings>({
    theme: 'light',
    fontSize: 14,
    minimap: true,
    lineNumbers: true,
    wordWrap: false,
  });

  const handleSelectExample = useCallback((exampleId: string) => {
    const example = regoExamples.find(ex => ex.id === exampleId);
    if (example) {
      setSelectedExample(exampleId);
      setCurrentCode(example.code);
      setOutput('');
      setHasError(false);
    }
  }, []);

  const handleCodeChange = useCallback((newCode: string) => {
    setCurrentCode(newCode);
  }, []);

  const handleSettingsChange = useCallback((newSettings: Partial<EditorSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const handleSave = useCallback(() => {
    // Simulate save functionality
    const blob = new Blob([currentCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'policy.rego';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [currentCode]);

  const handleDownload = useCallback(() => {
    handleSave();
  }, [handleSave]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  }, [currentCode]);

  const handleRun = useCallback(async () => {
    setIsEvaluating(true);
    setHasError(false);
    
    // Simulate policy evaluation
    try {
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
      
      // Mock evaluation result
      const mockResults = [
        `{
  "allow": true,
  "reason": "User has admin role"
}`,
        `{
  "allow": false,
  "violations": [
    "Missing required permission: write",
    "Resource is not public"
  ]
}`,
        `{
  "allow": true,
  "matched_rules": [
    "rbac.allow",
    "authz.allow"
  ],
  "user": {
    "role": "editor",
    "permissions": ["read", "write"]
  }
}`,
      ];
      
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setOutput(randomResult);
    } catch (error) {
      setHasError(true);
      setOutput(`Error evaluating policy: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsEvaluating(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    const example = regoExamples.find(ex => ex.id === selectedExample);
    if (example) {
      setCurrentCode(example.code);
      setOutput('');
      setHasError(false);
    }
  }, [selectedExample]);

  return (
    <div className="h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar 
        examples={regoExamples}
        selectedExample={selectedExample}
        onSelectExample={handleSelectExample}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <EditorToolbar
          settings={settings}
          onSettingsChange={handleSettingsChange}
          onSave={handleSave}
          onDownload={handleDownload}
          onCopy={handleCopy}
          onRun={handleRun}
          onReset={handleReset}
        />
        
        {/* Editor and Output */}
        <div className="flex-1 flex min-h-0">
          {/* Editor */}
          <div className="flex-1 bg-white">
            <MonacoEditor
              value={currentCode}
              onChange={handleCodeChange}
              settings={settings}
            />
          </div>
          
          <div className='hidden'>
          Output Panel
          <div className="w-96">
            <OutputPanel
              output={output}
              isEvaluating={isEvaluating}
              hasError={hasError}
            />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;