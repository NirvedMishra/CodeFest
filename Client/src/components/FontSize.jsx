/* eslint-disable react/prop-types */
const FontSize = ({ fontSize, onFontSizeChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-gray-200">Font Size: {fontSize}</span>
      <div className="flex items-center gap-2 mx-auto">
        <button
          onClick={() => onFontSizeChange(-2)}
          className="px-3 py-1 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-600 transition-transform transform hover:scale-105"
        >
          -
        </button>
        <button
          onClick={() => onFontSizeChange(2)}
          className="px-3 py-1 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-600 transition-transform transform hover:scale-105"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default FontSize;
