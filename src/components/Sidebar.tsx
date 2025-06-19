import React from 'react';
import { RegoExample } from '../types/rego';
import { FileCode, BookOpen, Shield, Server, Filter, Zap } from 'lucide-react';

interface SidebarProps {
  examples: RegoExample[];
  selectedExample: string;
  onSelectExample: (id: string) => void;
}

const categoryIcons = {
  'Basic': BookOpen,
  'RBAC': Shield,
  'Kubernetes': Server,
  'Data Protection': Filter,
  'Advanced': Zap,
};

export const Sidebar: React.FC<SidebarProps> = ({
  examples,
  selectedExample,
  onSelectExample,
}) => {
  const categorizedExamples = examples.reduce((acc, example) => {
    if (!acc[example.category]) {
      acc[example.category] = [];
    }
    acc[example.category].push(example);
    return acc;
  }, {} as Record<string, RegoExample[]>);

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileCode className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Rego Editor</h1>
            <p className="text-sm text-gray-500">Policy Language Demo</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {Object.entries(categorizedExamples).map(([category, categoryExamples]) => {
          const Icon = categoryIcons[category] || FileCode;
          
          return (
            <div key={category} className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Icon className="w-4 h-4 text-gray-500" />
                <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                  {category}
                </h3>
              </div>
              
              <div className="space-y-1">
                {categoryExamples.map((example) => (
                  <button
                    key={example.id}
                    onClick={() => onSelectExample(example.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${
                      selectedExample === example.id
                        ? 'bg-blue-50 border border-blue-200 shadow-sm'
                        : 'hover:bg-gray-50 border border-transparent'
                    }`}
                  >
                    <div className="font-medium text-sm text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {example.title}
                    </div>
                    <div className="text-xs text-gray-500 line-clamp-2">
                      {example.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};