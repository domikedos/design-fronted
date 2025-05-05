import * as monaco from 'monaco-editor';

export function registerJestLanguage(monaco: typeof import('monaco-editor')) {
  // Add Jest-specific token rules to TypeScript
  monaco.languages.setMonarchTokensProvider('typescript', {
    defaultToken: '',
    tokenPostfix: '.ts',

    keywords: [
      // TypeScript keywords
      'abstract', 'as', 'async', 'await', 'break', 'case', 'catch', 'class', 'const', 'continue',
      'debugger', 'declare', 'default', 'delete', 'do', 'else', 'enum', 'export', 'extends',
      'false', 'finally', 'for', 'from', 'function', 'get', 'if', 'implements', 'import', 'in',
      'instanceof', 'interface', 'let', 'module', 'new', 'null', 'of', 'package', 'private',
      'protected', 'public', 'return', 'set', 'static', 'super', 'switch', 'this', 'throw',
      'true', 'try', 'type', 'typeof', 'undefined', 'var', 'void', 'while', 'with', 'yield',
      // Jest keywords
      'describe', 'it', 'test', 'expect', 'beforeAll', 'afterAll', 'beforeEach', 'afterEach',
      'toBe', 'toEqual', 'toBeTruthy', 'toBeFalsy', 'toBeNull', 'toBeUndefined', 'toBeDefined',
      'toBeGreaterThan', 'toBeLessThan', 'toBeGreaterThanOrEqual', 'toBeLessThanOrEqual',
      'toBeCloseTo', 'toMatch', 'toContain', 'toThrow', 'toThrowError', 'not', 'resolves', 'rejects',
      'mock', 'spyOn', 'jest', 'fn', 'mockImplementation', 'mockReturnValue', 'mockResolvedValue',
      'mockRejectedValue', 'mockClear', 'mockReset', 'mockRestore'
    ],

    typeKeywords: [
      'any', 'boolean', 'number', 'string', 'void', 'null', 'undefined', 'never', 'object',
      'Promise', 'Array', 'jest', 'Jest', 'Mock', 'SpyInstance'
    ],

    operators: [
      '=', '>', '<', '!', '~', '?', ':', '==', '<=', '>=', '!=', '&&', '||', '++', '--',
      '+', '-', '*', '/', '&', '|', '^', '%', '<<', '>>', '>>>', '+=', '-=', '*=', '/=',
      '&=', '|=', '^=', '%=', '<<=', '>>=', '>>>='
    ],

    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

    tokenizer: {
      root: [
        // Add Jest-specific patterns
        [/describe|it|test|expect|beforeAll|afterAll|beforeEach|afterEach/, 'keyword'],
        [/toBe|toEqual|toBeTruthy|toBeFalsy|toBeNull|toBeUndefined|toBeDefined|toBeGreaterThan|toBeLessThan|toBeGreaterThanOrEqual|toBeLessThanOrEqual|toBeCloseTo|toMatch|toContain|toThrow|toThrowError|not|resolves|rejects/, 'keyword'],
        [/mock|spyOn|jest|fn|mockImplementation|mockReturnValue|mockResolvedValue|mockRejectedValue|mockClear|mockReset|mockRestore/, 'keyword'],
        // Basic TypeScript patterns
        [/[a-z_$][\w$]*/, {
          cases: {
            '@keywords': 'keyword',
            '@default': 'identifier'
          }
        }],
        [/[A-Z][\w\$]*/, 'type.identifier'],
        [/[{}()\[\]]/, '@brackets'],
        [/[<>](?!@symbols)/, '@brackets'],
        [/@symbols/, {
          cases: {
            '@operators': 'operator',
            '@default': ''
          }
        }],
        [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
        [/0[xX][0-9a-fA-F]+/, 'number.hex'],
        [/\d+/, 'number'],
        [/[;,.]/, 'delimiter'],
        [/"/, 'string', '@string_double'],
        [/'/, 'string', '@string_single'],
        [/`/, 'string', '@string_backtick'],
        [/\/\/.*$/, 'comment'],
        [/\/\*/, 'comment', '@comment']
      ],
      comment: [
        [/[^\/*]+/, 'comment'],
        [/\*\//, 'comment', '@pop'],
        [/[\/*]/, 'comment']
      ],
      string_double: [
        [/[^\\"]+/, 'string'],
        [/@escapes/, 'string.escape'],
        [/\\./, 'string.escape.invalid'],
        [/"/, 'string', '@pop']
      ],
      string_single: [
        [/[^\\']+/, 'string'],
        [/@escapes/, 'string.escape'],
        [/\\./, 'string.escape.invalid'],
        [/'/, 'string', '@pop']
      ],
      string_backtick: [
        [/[^\\`]+/, 'string'],
        [/@escapes/, 'string.escape'],
        [/\\./, 'string.escape.invalid'],
        [/`/, 'string', '@pop']
      ]
    }
  });
} 