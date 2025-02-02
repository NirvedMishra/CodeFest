import { Play } from "lucide-react";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const RightSidebar = ({ code, language }) => {
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const backend_Url = import.meta.env.VITE_BACKEND_URL;

  const getLanguageId = (language) => {
    // Judge0 language IDs
    const languageMap = {
      python: 71,
      javascript: 63,
      cpp: 54,
      java: 62,
      typescript: 74,
      go: 60,
      rust: 73,
      csharp: 51,
    };
    return languageMap[language] || 71;
  };

  const decodeBase64 = (str) => {
    try {
      return atob(str);
    } catch (e) {
      console.log(e);
      return str;
    }
  };

  const executeCode = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${backend_Url}/api/v1/judge0/execute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          sourceCode: code,
          languageId: getLanguageId(language),
          input: "",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Handling the decoded output from the result.data object
      const stdout = result.data.stdout ? decodeBase64(result.data.stdout) : "";
      const stderr = result.data.stderr ? decodeBase64(result.data.stderr) : "";
      const compile_output = result.data.compile_output
        ? decodeBase64(result.data.compile_output)
        : "";
      const status = result.data.status?.description || "Unknown Status";

      const finalOutput = [
        `Status: ${status}`,
        stdout && `Program Output:\n${stdout}`,
        stderr && `Runtime Error:\n${stderr}`,
        compile_output && `Compilation Error:\n${compile_output}`,
      ]
        .filter(Boolean)
        .join("\n\n");

      setOutput(finalOutput || "No output");
    } catch (error) {
      setOutput("Error executing code: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        <h2 className="font-semibold text-gray-200">Output</h2>
        <div className="flex gap-2">
          <button
            onClick={executeCode}
            disabled={isLoading}
            className="p-2 hover:bg-gray-700 rounded text-white hover:text-gray-200 flex items-center gap-2"
          >
            <Play size={16} />
            {isLoading ? "Running..." : "Run"}
          </button>
        </div>
      </div>
      <div className="flex-1 p-4 bg-gray-900">
        <pre className="text-gray-300 font-mono text-sm whitespace-pre-wrap">
          {output || "Click Run to execute code"}
        </pre>
      </div>
    </div>
  );
};

export default RightSidebar;
