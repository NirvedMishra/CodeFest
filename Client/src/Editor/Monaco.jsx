import { useState } from "react";
import Editor from "@monaco-editor/react";

// Boilerplate Code for Different Languages
const boilerplateCode = {
  javascript: `console.log("Hello, World!");
    // write your code here`,

  python: `print("Hello, World!")
    #write your code here`,

  cpp: 
`#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    // write your code here
    return 0;
}`,

  java: 
`public class Main {
    public static void main(String[] args) {
        // write your code here
        System.out.println("Hello, World!");
    }
}`,

  typescript: `console.log("Hello, TypeScript!");
    // write your code here`,

  go: `
package main
import "fmt"

func main() {
    fmt.Println("Hello, World!")
    // write your code here
}`,

  rust: `fn main() {
    println!("Hello, World!");
    write your code here
}`,

  csharp: `using System;

class Program {
    static void Main() {
        // write your code here
        Console.WriteLine("Hello, World!");
    }
}`,
};

const Monaco = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(boilerplateCode[language]); 

  // Handle language change
  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    setCode(boilerplateCode[selectedLanguage]); // Update with corresponding boilerplate
  };

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Language Selection Dropdown */}
      <div className="p-2 text-white flex justify-between items-center">
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
      </div>

      {/* Monaco Editor */}
      <div className="flex-grow">
        <Editor
          height="100%"
          width="100%"
          language={language}
          theme="vs-dark"
          value={code} // Sets the editor content dynamically
          onChange={(newValue) => setCode(newValue)} // Update state when user types
        />
      </div>
    </div>
  );
};

export default Monaco;
