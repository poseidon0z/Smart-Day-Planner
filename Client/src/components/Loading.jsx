import React from 'react';

function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-8 border-t-8 border-t-emerald-400 border-white rounded-full animate-spin"></div>
        <div className="text-white mt-4 text-lg font-light">
          Loading AI Insights...
        </div>
      </div>
    </div>
  );
}

export default Loading;
