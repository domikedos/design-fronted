export function registerTolkLanguage(monaco: typeof import('monaco-editor')) {
  // Register the language
  monaco.languages.register({ id: 'tolk' });

  // Register a tokens provider for the language
  monaco.languages.setMonarchTokensProvider('tolk', {
    defaultToken: '',
    tokenPostfix: '.tolk',

    tokenizer: {
      root: [
        // Comments
        [/\/\/(.*)/, 'comment.line.double-slash'],
        [/\/\*/, 'comment.block', '@comment'],
        
        // Strings
        [/"/, 'string.quoted.double', '@string_double'],
        
        // Numbers
        [/(-?([\d]+|0x[\da-fA-F]+|0b[01]+))\b/, 'constant.numeric'],
        
        // Keywords
        [/\b(do|if|try|else|while|break|throw|catch|return|assert|repeat|continue|asm|builtin|match)\b/, 'keyword.control'],
        [/\b(import|export|true|false|null|redef|mutate|tolk|as|is|!is)\b/, 'keyword.other'],
        
        // Types
        [/\b(type|enum|int|cell|void|bool|slice|tuple|builder|continuation|never|coins|int\d+|uint\d+)\b/, 'storage.type'],
        
        // Modifiers
        [/\b(global|const|var|val|fun|get|struct)\b/, 'storage.modifier'],
        
        // Annotations
        [/@\w+/, 'entity.name.type'],
        
        // Functions
        [/(`[^`]+`|[a-zA-Z$_][a-zA-Z0-9$_]*)(?=\()/, 'entity.name.function'],
        
        // Variables
        [/\bself\b/, 'variable.language'],
        [/`[^`]+`|[a-zA-Z$_][a-zA-Z0-9$_]*/, 'variable.name'],
        
        // Operators
        [/(\+|-|\*|\/|%|\?|:|,|;|\(|\)|\[|\]|{|}|=|<|>|!|&|\||\^|==|!=|<=|>=|<<|>>|&&|\|\||~\/|\^\/|\+=|-=|\*=|\/=|%=|&=|\|=|\^=|->|<=>|~>>|\^>>|<<=|>>=|=>)/, 'keyword.operator'],
        
        // Whitespace
        [/[ \t\r\n]+/, 'white']
      ],
      
      comment: [
        [/[^\/*]+/, 'comment.block'],
        [/\*\//, 'comment.block', '@pop'],
        [/[\/*]/, 'comment.block']
      ],
      
      string_double: [
        [/[^\\"]+/, 'string.quoted.double'],
        [/"/, 'string.quoted.double', '@pop']
      ]
    }
  });

  // Define the language configuration
  monaco.languages.setLanguageConfiguration('tolk', {
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
      { open: '"', close: '"' }
    ],
    surroundingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"' }
    ],
    folding: {
      markers: {
        start: /^\s*\{\s*$/,
        end: /^\s*\}\s*$/
      }
    }
  });
} 