import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { EditorSettings } from '../types/rego';

interface MonacoEditorProps {
  value: string;
  onChange: (value: string) => void;
  settings: EditorSettings;
}

// Rego language definition
const regoLanguageDefinition = {
  tokenizer: {
    root: [
      // Keywords
      [/\b(package|import|as|if|else|some|every|with|default|allow|deny|not|in|contains)\b/, 'keyword'],
      
      // Built-in functions
      [/\b(count|sum|max|min|sort|all|any|sprintf|concat|startswith|endswith|substring|replace|split|trim|upper|lower|time|json|yaml|base64|hex|crypto|http|net|regex|glob|walk|type_name|to_number|is_number|is_string|is_boolean|is_array|is_object|is_null|is_set)\b/, 'keyword.builtin'],
      
      // Operators
      [/[=!<>]=?/, 'operator'],
      [/[+\-*\/%]/, 'operator'],
      [/[&|^~]/, 'operator'],
      [/:=/, 'operator'],
      
      // Numbers
      [/\d+\.?\d*/, 'number'],
      
      // Strings
      [/"([^"\\]|\\.)*$/, 'string.invalid'],
      [/"/, 'string', '@string_double'],
      [/'([^'\\]|\\.)*$/, 'string.invalid'],
      [/'/, 'string', '@string_single'],
      
      // Comments
      [/#.*$/, 'comment'],
      
      // Brackets
      [/[{}()\[\]]/, 'delimiter.bracket'],
      [/[;,.]/, 'delimiter'],
      
      // Identifiers
      [/[a-zA-Z_$][\w$]*/, 'identifier'],
      
      // Whitespace
      [/\s+/, 'white'],
    ],

    string_double: [
      [/[^\\"]+/, 'string'],
      [/\\./, 'string.escape'],
      [/"/, 'string', '@pop']
    ],

    string_single: [
      [/[^\\']+/, 'string'],
      [/\\./, 'string.escape'],
      [/'/, 'string', '@pop']
    ],
  },
};

// Rego language configuration
const regoLanguageConfiguration = {
  comments: {
    lineComment: '#',
  },
  brackets: [
    ['{', '}'],
    ['[', ']'],
    ['(', ')'],
  ],
  autoClosingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
  ],
  surroundingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
  ],
};

export const MonacoEditor: React.FC<MonacoEditorProps> = ({
  value,
  onChange,
  settings,
}) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor, monaco: typeof import('monaco-editor')) => {
    editorRef.current = editor;

    // Register Rego language
    if (!monaco.languages.getLanguages().some(lang => lang.id === 'rego')) {
      monaco.languages.register({ id: 'rego' });
      monaco.languages.setMonarchTokensProvider('rego', regoLanguageDefinition);
      monaco.languages.setLanguageConfiguration('rego', regoLanguageConfiguration);
    }

    // Add custom theme
    monaco.editor.defineTheme('rego-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: '0000FF', fontStyle: 'bold' },
        { token: 'keyword.builtin', foreground: '8B008B', fontStyle: 'bold' },
        { token: 'string', foreground: '008000' },
        { token: 'comment', foreground: '808080', fontStyle: 'italic' },
        { token: 'number', foreground: 'FF6600' },
        { token: 'operator', foreground: '000000', fontStyle: 'bold' },
        { token: 'identifier', foreground: '000000' },
      ],
      colors: {
        'editor.background': '#FFFFFF',
        'editor.foreground': '#000000',
        'editorLineNumber.foreground': '#999999',
        'editor.selectionBackground': '#ADD6FF',
        'editor.inactiveSelectionBackground': '#E5EBF1',
      }
    });

    monaco.editor.defineTheme('rego-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: '569CD6', fontStyle: 'bold' },
        { token: 'keyword.builtin', foreground: 'C586C0', fontStyle: 'bold' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'operator', foreground: 'D4D4D4', fontStyle: 'bold' },
        { token: 'identifier', foreground: '9CDCFE' },
      ],
      colors: {
        'editor.background': '#1E1E1E',
        'editor.foreground': '#D4D4D4',
        'editorLineNumber.foreground': '#858585',
        'editor.selectionBackground': '#264F78',
        'editor.inactiveSelectionBackground': '#3A3D41',
      }
    });

    // Set initial theme
    monaco.editor.setTheme(settings.theme === 'dark' ? 'rego-dark' : 'rego-light');

    // Focus the editor
    editor.focus();
  };

  useEffect(() => {
    if (editorRef.current) {
      const monaco = (window as any).monaco;
      if (monaco) {
        monaco.editor.setTheme(settings.theme === 'dark' ? 'rego-dark' : 'rego-light');
      }
    }
  }, [settings.theme]);

  const handleEditorChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      onChange(newValue);
    }
  };

  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        language="rego"
        theme={settings.theme === 'dark' ? 'rego-dark' : 'rego-light'}
        value={value}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          fontSize: settings.fontSize,
          minimap: { enabled: settings.minimap },
          lineNumbers: settings.lineNumbers ? 'on' : 'off',
          wordWrap: settings.wordWrap ? 'on' : 'off',
          automaticLayout: true,
          scrollBeyondLastLine: false,
          renderWhitespace: 'selection',
          tabSize: 2,
          insertSpaces: true,
          detectIndentation: false,
          folding: true,
          foldingHighlight: true,
          showFoldingControls: 'always',
          matchBrackets: 'always',
          contextmenu: true,
          mouseWheelZoom: true,
          smoothScrolling: true,
          cursorSmoothCaretAnimation: 'on',
          renderLineHighlight: 'gutter',
          selectionHighlight: true,
          occurrencesHighlight: 'singleFile',
          codeLens: false,
          colorDecorators: true,
          bracketPairColorization: {
            enabled: true,
            independentColorPoolPerBracketType: true,
          },
        }}
      />
    </div>
  );
};