import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import React, { useRef } from "react";
import { EditorSettings } from "../types/rego";
import {
  regoLanguageConfiguration,
  regoLanguageDefinition,
} from "../languages/regoLanguage";

interface MonacoEditorProps {
  value: string;
  onChange: (value: string) => void;
  settings: EditorSettings;
}

export const MonacoEditor: React.FC<MonacoEditorProps> = ({
  value,
  onChange,
  settings,
}) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: typeof import("monaco-editor"),
  ) => {
    editorRef.current = editor;

    // Register Rego language
    if (!monaco.languages.getLanguages().some((lang) => lang.id === "rego")) {
      monaco.languages.register({ id: "rego" });
      monaco.languages.setMonarchTokensProvider("rego", regoLanguageDefinition);
      monaco.languages.setLanguageConfiguration(
        "rego",
        regoLanguageConfiguration,
      );
    }

    // Focus the editor
    editor.focus();
  };

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
        theme={settings.theme === "dark" ? "vs-dark" : "vs-light"}
        value={value}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          fontSize: settings.fontSize,
          minimap: { enabled: settings.minimap },
          lineNumbers: settings.lineNumbers ? "on" : "off",
          wordWrap: settings.wordWrap ? "on" : "off",
          automaticLayout: true,
          scrollBeyondLastLine: false,
          renderWhitespace: "selection",
          tabSize: 2,
          insertSpaces: true,
          detectIndentation: false,
          folding: true,
          foldingHighlight: true,
          showFoldingControls: "always",
          matchBrackets: "always",
          contextmenu: true,
          mouseWheelZoom: true,
          smoothScrolling: true,
          cursorSmoothCaretAnimation: "on",
          renderLineHighlight: "gutter",
          selectionHighlight: true,
          occurrencesHighlight: "singleFile",
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
