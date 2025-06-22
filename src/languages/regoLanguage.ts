
import type monaco from 'monaco-editor'

export const regoLanguageDefinition: monaco.languages.IMonarchLanguage = {
    tokenizer: {

        root: [
            // Keywords
            [/\b(package|import|as|if|else|some|every|with|default|allow|deny|not|in|contains)\b/, 'keyword'],

            // Built-in functions
            [/\b(count|sum|max|min|sort|all|any|sprintf|concat|startswith|endswith|substring|replace|split|trim|upper|lower|time|json|yaml|base64|hex|crypto|http|net|regex|glob|walk|type_name|to_number|is_number|is_string|is_boolean|is_array|is_object|is_null|is_set)\b/, 'keyword.builtin'],


            // Keywords (TODO: see if we can/need color them differently?)
            [/\b(data|input)\b/, 'keyword'],

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

export const regoLanguageConfiguration: monaco.languages.LanguageConfiguration = {
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