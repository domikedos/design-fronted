export function registerFuncLanguage(monaco: typeof import('monaco-editor')) {
  // Register the language
  monaco.languages.register({ id: 'func' });

  // Register a tokens provider for the language
  monaco.languages.setMonarchTokensProvider('func', {
    tokenizer: {
      root: [
        // Keywords
        [/\b(if|ifnot|else|elseif|elseifnot|while|do|until|repeat|return|impure|method_id|forall|asm|inline|inline_ref)\b/, 'keyword'],
        // Boolean literals
        [/\b(false|true)\b/, 'keyword.other'],
        // Types
        [/\b(var|int|slice|tuple|cell|builder|cont|_)(?=[\s\),\[\]])/, 'type'],
        // Numbers
        [/\b(-?([\d]+|0x[\da-fA-F]+))\b/, 'number'],
        // Strings
        [/"[^"]*"([Hhcusa])?/, 'string'],
        // Comments
        [/;;.*$/, 'comment'],
        [/{-/, 'comment', '@comment'],
        [/^\s*#include\s+.*$/, 'directive'],
        [/^\s*#pragma\s+.*$/, 'directive'],
        // Operators
        [/(?<=\s)(<=>|>=|<=|!=|==|\^>>|\~>>|>>|<<|\/%|\^%|\~%|\^\/|\~\/|\+=|-=|\*=|\/=|~\/=|\^\/=|%=|\^%=|<<=|>>=|~>>=|\^>>=|&=|\|=|\^=|\^|=|~|\/|%|-|\*|\+|>|<|&|\||:|\?)(?=\s)/, 'operator'],
        // Functions
        [/(?!")(`([^`]+)`|(\.|~)?((?=_)_|(?={){|(?=})}|(?![_`{}]))([^;,\[\]\(\)\s~.]+))(?=[\(])/, 'function'],
        // Variables
        [/(?!")(`([^`]+)`|((?=_)_|(?={){|(?=})}|(?![_`{}]))([^;,\[\]\(\)\s~.]+))/, 'variable'],
        // Brackets and delimiters
        [/[{}()\[\]]/, '@brackets'],
        [/[;,.]/, 'delimiter'],
      ],
      comment: [
        [/[^-]+/, 'comment'],
        [/-\}/, 'comment', '@pop'],
        [/[-}]/, 'comment']
      ]
    },
  });

  // Define the language configuration
  monaco.languages.setLanguageConfiguration('func', {
    comments: {
      lineComment: ';;',
      blockComment: ['{-', '-}']
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