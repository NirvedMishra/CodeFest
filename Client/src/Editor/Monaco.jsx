/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import monokai from 'monaco-themes/themes/Monokai.json';
import nightOwl from 'monaco-themes/themes/Night Owl.json';
import chromeDevTools from 'monaco-themes/themes/Chrome DevTools.json';
import active4D from 'monaco-themes/themes/Active4D.json';

const Monaco = ({ file, language, onCodeChange, fontSize, theme }) => {
  const [code, setCode] = useState(file);
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

  return (
    <div className="h-[97vh] w-full flex flex-col relative">
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
    </div>
  );
};

export default Monaco;
