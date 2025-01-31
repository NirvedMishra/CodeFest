// LeftSidebar.js
import { FolderTree, FileText, Settings, MessageSquare } from 'lucide-react';

const LeftSidebar = () => (
  <div className="h-full flex flex-col">
    {/* File Explorer Header */}
    <div className="flex items-center justify-between p-3 border-b border-gray-700">
      <h2 className="font-semibold text-gray-200">File Explorer</h2>
      <button className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-gray-200">
        <Settings size={16} />
      </button>
    </div>

    {/* File Tree */}
    <div className="flex-1 overflow-y-auto p-2">
      <div className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded text-gray-300 hover:text-gray-100">
        <FolderTree size={16} />
        <span>src</span>
      </div>
      <div className="ml-4">
        <div className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded text-gray-300 hover:text-gray-100">
          <FileText size={16} />
          <span>index.js</span>
        </div>
        <div className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded text-gray-300 hover:text-gray-100">
          <FileText size={16} />
          <span>App.js</span>
        </div>
      </div>
    </div>

    {/* AI Chat Section */}
    <div className="border-t border-gray-700">
      <div className="p-3">
        <div className="flex items-center gap-2 text-gray-300 hover:text-gray-100">
          <MessageSquare size={16} />
          <span>AI Chat</span>
        </div>
      </div>
    </div>
  </div>
);

export default LeftSidebar;