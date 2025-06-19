import React from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface OutputPanelProps {
  output: string;
  isEvaluating: boolean;
  hasError: boolean;
}

export const OutputPanel: React.FC<OutputPanelProps> = ({
  output,
  isEvaluating,
  hasError,
}) => {
  const getStatusIcon = () => {
    if (isEvaluating) {
      return <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full" />;
    }
    if (hasError) {
      return <XCircle className="w-4 h-4 text-red-500" />;
    }
    if (output.trim()) {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    return <AlertTriangle className="w-4 h-4 text-gray-400" />;
  };

  const getStatusText = () => {
    if (isEvaluating) return 'Evaluating...';
    if (hasError) return 'Evaluation Error';
    if (output.trim()) return 'Evaluation Complete';
    return 'Ready to Evaluate';
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 border-l border-gray-200">
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-700">Output</h3>
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className="text-xs text-gray-500">{getStatusText()}</span>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-auto">
        {isEvaluating ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-sm text-gray-500">Evaluating Rego policy...</p>
            </div>
          </div>
        ) : output ? (
          <pre className={`text-sm font-mono whitespace-pre-wrap ${
            hasError ? 'text-red-600' : 'text-gray-800'
          }`}>
            {output}
          </pre>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <AlertTriangle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-sm text-gray-500">Click "Evaluate" to run the policy</p>
              <p className="text-xs text-gray-400 mt-2">
                Output will appear here after evaluation
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};