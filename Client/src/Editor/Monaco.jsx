import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

// eslint-disable-next-line react/prop-types
const Monaco = ({ file, language, onCodeChange }) => {
  const [code, setCode] = useState(file);

  useEffect(() => {
    setCode(file);
  }, [file]);

  const handleEditorChange = (value) => {
    setCode(value);
    onCodeChange?.(value);
  };

  // // Handle language change
  // const handleLanguageChange = (e) => {
  //   const selectedLanguage = e.target.value;
  //   setLanguage(selectedLanguage);
  //   setCode(boilerplateCode[selectedLanguage]); // Update with corresponding boilerplate
  // };

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Language Selection Dropdown */}
      {/* <div className="p-2 text-white flex justify-between items-center">
        <label className="mr-2">Select Language:</label>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="p-2 rounded  text-white"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="typescript">TypeScript</option>
          <option value="go">Go</option>
          <option value="rust">Rust</option>
          <option value="csharp">C#</option>
        </select>
      </div> */}

      {/* Monaco Editor */}
      <div className="flex-grow">
        <Editor
          height="100%"
          width="100%"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={handleEditorChange}
        />
      </div>
    </div>
  );
};

export default Monaco;
