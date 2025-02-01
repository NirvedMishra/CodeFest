import { Settings } from 'lucide-react';

const RightSidebar = () => (
  <div className="h-full flex flex-col">
    <div className="flex items-center justify-between p-3 border-b border-gray-700">
      <h2 className="font-semibold text-gray-200">Output</h2>
      <button className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-gray-200">
        <Settings size={16} />
      </button>
    </div>
    <div className="flex-1 p-4">
      <div className="text-gray-400">Console output will appear here...</div>
    </div>
  </div>
);

export default RightSidebar;
