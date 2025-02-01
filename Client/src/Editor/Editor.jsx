import SideBar from './SideBar.jsx';
import Monaco from './Monaco.jsx';
import { useState } from 'react';


const Editor = () => {
  const [tabFiles, setTabFiles] = useState([{name:'index.js',content:`console.log("Hello, World!");
    // write your code here`},{name:'main.py',content:`print("Hello, World!")
    #write your code here`}, {name:'hello.cpp',content:`#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    // write your code here
    return 0;
}`},{name:'Main.java',content:   `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        // write your code here
        }
}
        `}] );
  const [activeTab, setActiveTab] = useState(1);
  const getLanguage = (file) => {
    const extension = file.split('.').pop();
    switch (extension) {
      case 'js':
        return 'javascript';
      case 'py':
        return 'python';
      case 'cpp':
        return 'cpp';
      case 'java':
        return 'java';
      case 'ts':
        return 'typescript';
      case 'go':
        return 'go';
      case 'rs':
        return 'rust';
      case 'cs':
        return 'csharp';
      default:
        return 'text';
    }
  };
  return (
    <div className="fixed inset-0 flex bg-gray-900">
      <SideBar position="left" />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Tabs bar */}
        <div className="h-9 flex items-center px-2 bg-gray-800 border-b border-gray-700">
          {tabFiles.length>0 && tabFiles.map((file, index) => (
            <div key={index}className={`cursor-pointer h-8 text-sm text-gray-300 ${index == activeTab? 'bg-gray-700':'bg-gray-800'} border-b-2 border-transparent hover:text-white hover:bg-gray-700 flex flex-row justify-between items-center`}>
            <button className='cursor-pointer h-full w-full px-2'   onClick={()=>{setActiveTab(index)}}  >
              {file.name}
            </button>
            {<button onClick={()=>{
              if(index <= activeTab){
                setActiveTab(activeTab-1);
            
              }
              setTabFiles(tabFiles.filter((_,i)=>i!=index));
            }} className={`w-6 h-6 px-2 mr-1 ml-1 text-sm rounded-full cursor-pointer hover:bg-gray-900 hover:text-white  ${index == activeTab?' text-white': 'text-gray-800' }`}>x</button>}
            </div>
          ))}
        </div>
        
        {/* Editor container */}
        <div className="flex-1 relative">
          {tabFiles.length >0 && <Monaco key={activeTab} file={tabFiles[activeTab].content} language={getLanguage(tabFiles[activeTab].name)}/>}
        </div>
      </div>
      <SideBar position="right" />
    </div>
  );
};

export default Editor;