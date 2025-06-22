import type monaco from "monaco-editor";

export const regoLanguageDefinition: monaco.languages.IMonarchLanguage = {
  tokenizer: {
    root: [
      // Package declaration - transition to package state
      [/\bpackage\b/, "keyword", "@package"],

      // Control flow keywords
      [/\b(if|else)\b/, "string.key"],

      // Policy decision keywords
      [/\b(allow|deny)\b/, "type"],

      // Other keywords
      [/\b(import|as|some|every|with|default|not|in|contains)\b/, "keyword"],

      // Built-in functions
      [
        /\b(count|sum|max|min|sort|all|any|sprintf|concat|startswith|endswith|substring|replace|split|trim|upper|lower|time|json|yaml|base64|hex|crypto|http|net|regex|glob|walk|type_name|to_number|is_number|is_string|is_boolean|is_array|is_object|is_null|is_set)\b/,
        "keyword.builtin",
      ],

      // Built-in variables (data and input)
      [/\b(data|input)\b/, "variable.language"],

      // Operators
      [/[=!<>]=?/, "operator"],
      [/[+\-*/%]/, "operator"],
      [/[&|^~]/, "operator"],
      [/:=/, "operator"],

      // Numbers
      [/\d+\.?\d*/, "number"],

      // Strings
      [/"([^"\\]|\\.)*$/, "string.invalid"],
      [/"/, "string", "@string_double"],
      [/'([^'\\]|\\.)*$/, "string.invalid"],
      [/'/, "string", "@string_single"],

      // Comments
      [/#.*$/, "comment"],

      // Brackets
      [/[{}()[\]]/, "delimiter.bracket"],
      [/[;,.]/, "delimiter"],

      // Identifiers
      [/[a-zA-Z_$][\w$]*/, "identifier"],

      // Whitespace
      [/\s+/, "white"],
    ],

    // Package name state - handles package name highlighting
    package: [
      // Skip whitespace
      [/\s+/, "white"],
      // Package name (can contain dots for nested packages)
      [/[a-zA-Z_$][\w$]*(\.[a-zA-Z_$][\w$]*)*/, "type.identifier", "@pop"],
      // If we encounter anything else, pop back to root
      [/./, "", "@pop"],
    ],

    string_double: [
      [/[^\\"]+/, "string"],
      [/\\./, "string.escape"],
      [/"/, "string", "@pop"],
    ],

    string_single: [
      [/[^\\']+/, "string"],
      [/\\./, "string.escape"],
      [/'/, "string", "@pop"],
    ],
  },
};

export const regoLanguageConfiguration: monaco.languages.LanguageConfiguration = {
  comments: {
    lineComment: "#",
  },
  brackets: [
    ["{", "}"],
    ["[", "]"],
    ["(", ")"],
  ],
  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
  ],
};
