import { Box, Container, Typography, Paper, Select, MenuItem, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import Editor, { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { registerFuncLanguage } from '../languages/func';
import { registerTactLanguage } from '../languages/tact';
import { registerTolkLanguage } from '../languages/tolk';
import { registerJestLanguage } from '../languages/jest';

// Initialize language support
loader.init().then((monaco) => {
  // Register languages
  registerFuncLanguage(monaco);
  registerTactLanguage(monaco);
  registerTolkLanguage(monaco);
  registerJestLanguage(monaco);

  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: true,
  });

  // Define theme
  monaco.editor.defineTheme('oneDarkPro', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '5C6370', fontStyle: 'italic' },
      { token: 'keyword.control', foreground: 'C678DD' },
      { token: 'keyword.other', foreground: 'C678DD' },
      { token: 'storage.type', foreground: 'E5C07B' },
      { token: 'storage.modifier', foreground: 'E5C07B' },
      { token: 'string', foreground: '98C379' },
      { token: 'number', foreground: 'D19A66' },
      { token: 'entity.name.function', foreground: '61AFEF' },
      { token: 'entity.name.type', foreground: '61AFEF' },
      { token: 'directive', foreground: '98C379' },
      { token: 'variable.language', foreground: 'E06C75' },
      { token: 'variable.name', foreground: 'E06C75' },
      { token: 'keyword.operator', foreground: '56B6C2' }
    ],
    colors: {
      'editor.background': '#1A1B26',
      'editor.foreground': '#ABB2BF',
      'editor.lineHighlightBackground': '#24283B',
      'editor.selectionBackground': '#2D3F76',
      'editor.inactiveSelectionBackground': '#2D3F76',
      'editor.lineHighlightBorder': '#24283B',
      'editorCursor.foreground': '#528BFF',
      'editorWhitespace.foreground': '#3B4048',
      'editor.lineNumbers.foreground': '#565F89',
      'editor.lineNumbers.activeForeground': '#7AA2F7'
    }
  });
});

// Mock data - replace with actual API call
const MOCK_PROBLEM = {
  id: 1,
  name: "Simple Storage",
  difficulty: "Easy",
  description: `Implement a simple storage contract that can store and retrieve a value.

The contract should have the following functionality:
1. Store a value
2. Retrieve the stored value
3. Clear the stored value

Example:
\`\`\`
Input: store(42)
Output: Success

Input: get()
Output: 42

Input: clear()
Output: Success

Input: get()
Output: null
\`\`\``,
  initialCode: `#pragma version >=0.2.0;

contract SimpleStorage {
    int storedData;
    
    init() {
        storedData = 0;
    }
    
    receive("store") {
        storedData = 0; // TODO: Implement storage
    }
    
    get fun get() int {
        return storedData;
    }
}`,
  testCode: `import { Cell, beginCell, Address } from "ton-core";
import { SimpleStorage } from "./SimpleStorage";

describe("SimpleStorage", () => {
  let contract: SimpleStorage;
  
  beforeEach(() => {
    contract = new SimpleStorage();
  });
  
  it("should store and retrieve value", () => {
    // TODO: Implement test
  });
});`
};

const languages = [
  { value: 'func', label: 'FunC' },
  { value: 'tact', label: 'Tact' },
  { value: 'tolk', label: 'Tolk' }
];

const STORAGE_KEY = 'toncode_editor_state';

interface EditorState {
  func: string;
  tact: string;
  tolk: string;
  jest: string;
}

const getInitialCode = (): EditorState => {
  const savedState = localStorage.getItem(STORAGE_KEY);
  if (savedState) {
    return JSON.parse(savedState);
  }
  return {
    func: MOCK_PROBLEM.initialCode,
    tact: MOCK_PROBLEM.initialCode,
    tolk: MOCK_PROBLEM.initialCode,
    jest: MOCK_PROBLEM.testCode
  };
};

const formatDescription = (text: string) => {
  const parts = text.split(/```([\s\S]*?)```/);
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      // This is a code block
      return (
        <Box
          key={index}
          component="pre"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            padding: '16px',
            borderRadius: '8px',
            margin: '16px 0',
            overflowX: 'auto',
            fontFamily: 'monospace',
            fontSize: '14px',
            lineHeight: '1.5',
            color: '#ABB2BF'
          }}
        >
          {part}
        </Box>
      );
    }
    // This is regular text
    return (
      <Typography
        key={index}
        component="span"
        sx={{
          whiteSpace: 'pre-wrap',
          color: 'text.primary',
          '& code': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            padding: '2px 4px',
            borderRadius: '4px',
            fontFamily: 'monospace'
          }
        }}
      >
        {part}
      </Typography>
    );
  });
};

export default function Problem() {
  const { id } = useParams();
  const [selectedLanguage, setSelectedLanguage] = useState('func');
  const [editorState, setEditorState] = useState<EditorState>(getInitialCode);
  const [testCode, setTestCode] = useState(MOCK_PROBLEM.testCode);
  const [testEditorHeight, setTestEditorHeight] = useState(300);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startHeight = useRef(0);
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    
    // Register languages when editor is mounted
    registerFuncLanguage(monaco);
    registerTactLanguage(monaco);
    registerTolkLanguage(monaco);
    registerJestLanguage(monaco);
  };

  const handleLanguageChange = (event: any) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    
    // Update editor language
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, getLanguageId(newLanguage));
      }
    }
  };

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setEditorState(prev => {
        const newState = {
          ...prev,
          [selectedLanguage]: value
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
        return newState;
      });
    }
  };

  const handleTestCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setTestCode(value);
    }
  };

  const getLanguageId = (lang: string) => {
    switch (lang) {
      case 'func':
        return 'func';
      case 'tact':
        return 'tact';
      case 'tolk':
        return 'tolk';
      default:
        return 'typescript';
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startY.current = e.clientY;
    startHeight.current = testEditorHeight;
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    
    const deltaY = e.clientY - startY.current;
    const newHeight = Math.max(100, Math.min(600, startHeight.current + deltaY));
    setTestEditorHeight(newHeight);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Problem Description */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Paper
            sx={{
              p: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.035)',
              borderRadius: '8px',
              boxShadow: 'none',
              border: 'none'
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
              {MOCK_PROBLEM.id}. {MOCK_PROBLEM.name}
            </Typography>
            <Typography
              sx={{
                color: MOCK_PROBLEM.difficulty === 'Easy' ? '#4CAF50' : 
                       MOCK_PROBLEM.difficulty === 'Medium' ? '#FFC107' : '#F44336',
                fontWeight: 500,
                mb: 3
              }}
            >
              {MOCK_PROBLEM.difficulty}
            </Typography>
            <Typography
              variant="body1"
              component="div"
              sx={{
                color: 'text.primary'
              }}
            >
              {formatDescription(MOCK_PROBLEM.description)}
            </Typography>
          </Paper>
        </Box>

        {/* Code Editor */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Paper
            sx={{
              p: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.035)',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: 'none',
              border: 'none'
            }}
          >
            <Box sx={{ pl: 1, pr: 1, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <Select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                sx={{
                  fontSize: 14,
                  color: 'text.primary',
                  '& .MuiSelect-select': {
                    py: 1
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                  }
                }}
              >
                {languages.map((lang) => (
                  <MenuItem key={lang.value} value={lang.value} sx={{ fontSize: 14 }}>
                    {lang.label}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box sx={{ height: '300px' }}>
              <Editor
                height="100%"
                language={getLanguageId(selectedLanguage)}
                value={editorState[selectedLanguage as keyof EditorState]}
                onChange={handleCodeChange}
                onMount={handleEditorDidMount}
                theme="oneDarkPro"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </Box>
          </Paper>

          <Paper
            sx={{
              p: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.035)',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: 'none',
              border: 'none'
            }}
          >
            <Box sx={{ pl: 2, pt: 1, pr: 2, pb: 1, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 400, fontSize: 14 }}>
                Custom tests
              </Typography>
            </Box>
            <Box sx={{ height: `${testEditorHeight}px`, position: 'relative' }}>
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  cursor: 'row-resize',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  '&:active': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  }
                }}
                onMouseDown={handleMouseDown}
              />
              <Editor
                height="100%"
                defaultLanguage="typescript"
                value={testCode}
                onChange={handleTestCodeChange}
                theme="oneDarkPro"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  quickSuggestions: false,
                  parameterHints: { enabled: false },
                  suggestOnTriggerCharacters: false,
                  acceptSuggestionOnEnter: 'off',
                  tabCompletion: 'off',
                  wordBasedSuggestions: 'off'
                }}
              />
            </Box>
          </Paper>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              sx={{
                color: 'text.primary',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)'
                }
              }}
            >
              Test
            </Button>
            <Button
              variant="contained"
              sx={{
                borderRadius: '6px !important',
                background: '#0088CC !important',
                color: '#FFFFFF !important',
                fontSize: '1.125rem',
                fontWeight: 400,
                lineHeight: '18px',
                padding: '0px 16px !important',
                transition: 'all 0.2s ease-in-out !important',
                '&:hover': {
                  borderRadius: '8px !important',
                  background: '#006699 !important',
                }
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
} 