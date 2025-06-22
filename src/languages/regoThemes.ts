import type monaco from "monaco-editor";

export const regoLightTheme: monaco.editor.IStandaloneThemeData = {
  base: "vs",
  inherit: true,
  rules: [
    // Package names
    { token: "type.identifier", foreground: "2E8B57" }, // Sea Green

    // Control flow keywords (if, else) - using string.key token for distinctive color
    { token: "string.key", foreground: "FF6B35" }, // Orange Red

    // Policy decision keywords (allow, deny) - using type token for distinctive color
    { token: "type", foreground: "228B22" }, // Forest Green

    // Built-in variables (data, input)
    { token: "variable.language", foreground: "9932CC" }, // Dark Orchid

    // Regular keywords
    { token: "keyword", foreground: "0000FF" }, // Blue (default)

    // Built-in functions
    { token: "keyword.builtin", foreground: "800080" }, // Purple

    // Comments
    { token: "comment", foreground: "008000" }, // Green

    // Strings
    { token: "string", foreground: "A31515" }, // Dark Red

    // Numbers
    { token: "number", foreground: "098658" }, // Dark Green

    // Operators
    { token: "operator", foreground: "000000" }, // Black

    // Identifiers
    { token: "identifier", foreground: "000000" }, // Black
  ],
  colors: {},
};

export const regoDarkTheme: monaco.editor.IStandaloneThemeData = {
  base: "vs-dark",
  inherit: true,
  rules: [
    // Package names
    { token: "type.identifier", foreground: "7FFFD4" }, // Aquamarine

    // Control flow keywords (if, else) - using string.key token for distinctive color
    { token: "string.key", foreground: "FF7F50" }, // Coral

    // Policy decision keywords (allow, deny) - using type token for distinctive color
    { token: "type", foreground: "32CD32" }, // Lime Green

    // Built-in variables (data, input)
    { token: "variable.language", foreground: "DDA0DD" }, // Plum

    // Regular keywords
    { token: "keyword", foreground: "569CD6" }, // Light Blue (VS Code default)

    // Built-in functions
    { token: "keyword.builtin", foreground: "C586C0" }, // Light Purple

    // Comments
    { token: "comment", foreground: "6A9955" }, // Green

    // Strings
    { token: "string", foreground: "CE9178" }, // Light Brown

    // Numbers
    { token: "number", foreground: "B5CEA8" }, // Light Green

    // Operators
    { token: "operator", foreground: "D4D4D4" }, // Light Gray

    // Identifiers
    { token: "identifier", foreground: "D4D4D4" }, // Light Gray
  ],
  colors: {},
};
