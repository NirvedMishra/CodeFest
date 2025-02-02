/* eslint-disable react/prop-types */
import { FolderTree, FileText, Settings, Sun, Moon } from "lucide-react";
import FontSize from "../components/FontSize";
import { useState } from "react";


const LeftSidebar = ({ fontSize, onFontSizeChange, theme, onThemeToggle, onThemeSelect }) => {
  const [isSettingsCollapsed, setIsSettingsCollapsed] = useState(true);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const themes = ['vs-dark', 'vs-light', 'monokai', 'night-owl', 'chrome-devtools', 'active4d'];

  const handleThemeToggle = () => {
    onThemeToggle();
  };
  const handleThemeSelect = (selectedTheme) => {
    onThemeSelect(selectedTheme);
    setIsThemeDropdownOpen(false);
  };


  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        <h2 className="font-semibold text-gray-200">File Explorer</h2>
        <button className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-gray-200">
          <Settings size={16} />
        </button>
      </div>

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

      <div className="border-t border-gray-700 p-3 flex flex-col gap-1 justify-center items-center">
        <button
          onClick={() => setIsSettingsCollapsed(!isSettingsCollapsed)}
          className="w-full px-3 py-1 rounded-lg  bg-gray-700 text-white shadow-md hover:bg-gray-600 transition-transform transform hover:scale-105 flex items-center gap-2"
        >
          <p className="text-white-200 mx-auto">Editor Settings</p>
        </button>
        {!isSettingsCollapsed && (
          <div className="space-y-4 mx-auto">
            <FontSize fontSize={fontSize} onFontSizeChange={onFontSizeChange} />
            <button
              onClick={handleThemeToggle}
              className="w-full px-3 py-1 mx-auto rounded-lg bg-gray-700 text-white shadow-md hover:bg-gray-600 transition-transform transform hover:scale-105 flex items-center gap-2"
            >
              <p className="text-white-200 mx-auto">
                {theme === "vs-dark" ? <Moon size={16} /> : <Sun size={16} />}
              </p>
            </button>
            <button
              onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
              className="w-full px-3 py-1 mx-auto rounded-lg bg-gray-700 text-white shadow-md hover:bg-gray-600 transition-transform transform hover:scale-105 flex items-center gap-2"
            >
              <p
                onClick={() => setIsThemeDropdownOpen(false)}
                className="text-white-200 mx-auto"
              >
                Select Theme
              </p>
            </button>
            {isThemeDropdownOpen && (
              <div className="bg-gray-800 rounded-lg shadow-lg p-2 mt-2">
                {themes.map((themeName) => (
                  <div
                    key={themeName}
                    onClick={() => {
                      handleThemeSelect(themeName);
                    }}
                    className="p-2 hover:bg-gray-700 rounded text-gray-300 hover:text-gray-100 cursor-pointer"
                  >
                    {themeName}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;
