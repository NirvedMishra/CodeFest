/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import monokai from 'monaco-themes/themes/Monokai.json';
import nightOwl from 'monaco-themes/themes/Night Owl.json';
import chromeDevTools from 'monaco-themes/themes/Chrome DevTools.json';
import active4D from 'monaco-themes/themes/Active4D.json';

const Monaco = ({ file, language, onCodeChange, fontSize, theme }) => {
  const [code, setCode] = useState(file);
  const [suggestion, setSuggestion] = useState('');
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      // Define themes
      monaco.editor.defineTheme('monokai', monokai);
      monaco.editor.defineTheme('night-owl', nightOwl);
      monaco.editor.defineTheme('chrome-devtools', chromeDevTools);
      monaco.editor.defineTheme('active4d', active4D);

      monaco.editor.setTheme(theme);
    }
  }, [monaco, theme]);

  const handleEditorChange = (value) => {
    setCode(value);
    onCodeChange?.(value);
  };

  const handleCodeSuggestions = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/suggestion/quickfix`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ codeSnippet: code }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }

      const data = await response.json();
      console.log('API Response:', data);
      console.log('Suggestion Text:', data.data.generated_text);
      setSuggestion(data.data.generated_text || 'No suggestion available');
      
      if (suggestion && monaco) {
        const editor = monaco.editor.getEditors()[0];
        if (!editor) return;

        const model = editor.getModel();
        const fullRange = model.getFullModelRange();
        
        editor.executeEdits('quickfix', [{
          range: fullRange,
          text: suggestion,
        }]);
      }
    } catch (error) {
      console.error('Error getting code suggestions:', error);
      setSuggestion('Error getting suggestions');
    }
  };
  
  return (
    <div className="h-[97vh] w-full flex flex-col relative">
      {suggestion && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10 bg-white border border-gray-200 p-4 rounded shadow-lg max-w-md">
          <h3 className="font-bold mb-2">Suggestion:</h3>
          <p className="text-sm">{suggestion}</p>
          <button 
            onClick={() => setSuggestion('')}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
      )}
      <div className="flex-grow">
        <Editor
          height="100%"
          width="100%"
          language={language}
          theme={theme}
          value={code}
          onChange={handleEditorChange}
          options={{ fontSize: fontSize }}
        />
      </div>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10">
        <button 
          onClick={handleCodeSuggestions}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Quick Fixes
        </button>
      </div>
    </div>
  );
};

export default Monaco;
