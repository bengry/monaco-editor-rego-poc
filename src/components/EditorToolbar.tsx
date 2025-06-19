import React from 'react';
import { 
  Sun, 
  Moon, 
  Save, 
  Download, 
  Copy, 
  Settings,
  Play,
  RotateCcw
} from 'lucide-react';
import { EditorSettings } from '../types/rego';

interface EditorToolbarProps {
  settings: EditorSettings;
  onSettingsChange: (settings: Partial<EditorSettings>) => void;
  onSave: () => void;
  onDownload: () => void;
  onCopy: () => void;
  onRun: () => void;
  onReset: () => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  settings,
  onSettingsChange,
  onSave,
  onDownload,
  onCopy,
  onRun,
  onReset,
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <button
          onClick={onRun}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Play className="w-4 h-4 mr-2" />
          Evaluate
        </button>
        
        <button
          onClick={onReset}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onCopy}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          title="Copy code"
        >
          <Copy className="w-4 h-4" />
        </button>
        
        <button
          onClick={onSave}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          title="Save file"
        >
          <Save className="w-4 h-4" />
        </button>
        
        <button
          onClick={onDownload}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          title="Download file"
        >
          <Download className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        <button
          onClick={() => onSettingsChange({ 
            theme: settings.theme === 'light' ? 'dark' : 'light' 
          })}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          title="Toggle theme"
        >
          {settings.theme === 'light' ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4" />
          )}
        </button>

        <button
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          title="Editor settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};