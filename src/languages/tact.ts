export function registerTactLanguage(monaco: typeof import('monaco-editor')) {
  // Register the language
  monaco.languages.register({ id: 'tact' });

  // Register a tokens provider for the language
  monaco.languages.setMonarchTokensProvider('tact', {
    defaultToken: '',
    tokenPostfix: '.tact',

    keywords: [
      'import', 'from', 'contract', 'extends', 'trait', 'message', 'init', 'receive', 'get', 'fun',
      'let', 'mut', 'if', 'else', 'while', 'repeat', 'until', 'return', 'self', 'as', 'static',
      'inline', 'impure', 'virtual', 'override', 'abstract', 'struct', 'try', 'catch', 'do',
      'foreach', 'in', 'const', 'native', 'bounced', 'external', 'extend', 'public', 'primitive',
      'with'
    ],

    typeKeywords: [
      'Int', 'Bool', 'String', 'Address', 'Cell', 'Slice', 'Builder', 'Contract', 'Map', 'Array',
      'Tuple', 'Optional', 'Coins', 'coins', 'remaining', 'bytes32', 'bytes64', 'int257', 'uint',
      'int'
    ],

    operators: [
      '=', '>', '<', '!', '~', '?', ':', '==', '<=', '>=', '!=',
      '&&', '||', '++', '--', '+', '-', '*', '/', '&', '|', '^', '%',
      '<<', '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=', '^=',
      '%=', '<<=', '>>=', '>>>=', '->', '=>'
    ],

    symbols: /[=><!~?:&|+\-*\/\^%]+/,

    tokenizer: {
      root: [
        // Comments
        [/\/\/.*$/, 'comment'],
        [/\/\*/, 'comment', '@comment'],
        
        // Annotations
        [/@[a-zA-Z_][a-zA-Z0-9_]*/, 'entity.other.attribute-name'],
        
        // Strings
        [/"([^"\\]|\\.)*$/, 'string.invalid'],
        [/'([^'\\]|\\.)*$/, 'string.invalid'],
        [/"/, 'string', '@string_double'],
        [/'/, 'string', '@string_single'],
        
        // Numbers
        [/\b0[xX][0-9a-fA-F]+\b/, 'number.hex'],
        [/\b0[oO][0-7]+\b/, 'number.octal'],
        [/\b0[bB][01]+\b/, 'number.binary'],
        [/\b\d+\b/, 'number'],
        
        // Keywords
        [/\b(if|else|while|repeat|until|return|self|as|static|inline|impure|virtual|override|abstract)\b/, 'keyword'],
        [/\b(import|from|contract|extends|trait|message|init|receive|get|fun|let|mut)\b/, 'keyword.other'],
        [/\b(true|false|null)\b/, 'keyword.other'],
        
        // Types
        [/\b(Int|Bool|String|Address|Cell|Slice|Builder|Contract|Map|Array|Tuple|Optional|Coins)\b/, 'type'],
        
        // Functions
        [/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/, { token: 'entity.name.function' }],
        
        // Variables
        [/\b([a-zA-Z_][a-zA-Z0-9_]*)\b/, 'variable'],
        
        // Operators
        [/[=+\-*/<>!&|]/, 'operator'],
        [/^\s*#pragma\s+.*$/, 'directive'],
        
        // Brackets and delimiters
        [/[{}()\[\]]/, '@brackets'],
        [/[;,.]/, 'delimiter'],
        
        // Whitespace
        [/[ \t\r\n]+/, 'white']
      ],
      
      comment: [
        [/[^\/*]+/, 'comment'],
        [/\*\//, 'comment', '@pop'],
        [/[\/*]/, 'comment']
      ],
      
      string_double: [
        [/[^\\"]+/, 'string'],
        [/"/, 'string', '@pop']
      ],
      
      string_single: [
        [/[^\\']+/, 'string'],
        [/'/, 'string', '@pop']
      ]
    }
  });

  // Define the language configuration
  monaco.languages.setLanguageConfiguration('tact', {
    comments: {
      lineComment: '//',
      blockComment: ['/*', '*/']
    },
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')']
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"' },
      { open: "'", close: "'" }
    ],
    surroundingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"' },
      { open: "'", close: "'" }
    ],
    folding: {
      markers: {
        start: new RegExp('^\\s*//\\s*#?region\\b'),
        end: new RegExp('^\\s*//\\s*#?endregion\\b')
      }
    }
  });
} 