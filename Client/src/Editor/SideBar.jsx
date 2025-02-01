import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';

// eslint-disable-next-line react/prop-types
const Sidebar = ({ position = 'left' }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`h-full flex ${position === 'right' ? 'flex-row-reverse' : 'flex-row'}`}>
      <div
        className={`h-full bg-gray-800 border-r border-gray-700 transition-all duration-300 flex flex-col
          ${isCollapsed ? 'w-0 overflow-hidden' : 'w-72'}`}
      >
        {position === 'left' ? <LeftSidebar /> : <RightSidebar />}
      </div>
      
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`p-1 bg-gray-800 border border-gray-700 hover:bg-gray-700 rounded-full shadow-md
          ${position === 'left' ? '-mr-3' : '-ml-3'} my-auto z-10 text-gray-300 hover:text-gray-100`}
      >
        {isCollapsed ? 
          (position === 'left' ? <ChevronRight size={16} /> : <ChevronLeft size={16} />) :
          (position === 'left' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />)
        }
      </button>
    </div>
  );
};

export default Sidebar;