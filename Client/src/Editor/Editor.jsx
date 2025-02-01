import SideBar from './SideBar.jsx';
import Monaco from './Monaco.jsx';

const Editor = () => {
  return (
    <div className="fixed inset-0 flex bg-gray-900">
      <SideBar position="left" />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Tabs bar */}
        <div className="h-9 flex items-center px-2 bg-gray-800 border-b border-gray-700">
          <div className="px-3 py-1 text-sm text-gray-300 bg-gray-900 rounded-t">
            index.js
          </div>
        </div>
        
        {/* Editor container */}
        <div className="flex-1 relative">
          <Monaco />
        </div>
      </div>
      <SideBar position="right" />
    </div>
  );
};

export default Editor;