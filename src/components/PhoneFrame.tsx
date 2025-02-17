import React from 'react';

export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4">
      <div className="relative w-[390px]">
        {/* Phone Frame */}
        <div className="absolute inset-0 bg-black rounded-[3rem] shadow-2xl pointer-events-none">
          {/* Status Bar */}
          <div className="absolute top-0 inset-x-0 h-7 bg-black rounded-t-[3rem] flex items-center justify-between px-8">
            <div className="text-white text-xs">9:41</div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full border border-white"></div>
              <div className="w-4 h-4 rounded-full border border-white"></div>
              <div className="w-6 h-3 rounded-md border border-white"></div>
            </div>
          </div>
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-b-2xl"></div>
          </div>
          {/* Side Button */}
          <div className="absolute top-20 -right-1 w-1 h-12 bg-gray-800 rounded-r shadow-lg"></div>
          {/* Volume Buttons */}
          <div className="absolute top-20 -left-1 w-1 h-8 bg-gray-800 rounded-l shadow-lg mb-2"></div>
          <div className="absolute top-32 -left-1 w-1 h-8 bg-gray-800 rounded-l shadow-lg"></div>
          {/* Home Indicator */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-600 rounded-full"></div>
        </div>
        {/* Screen Content */}
        <div className="relative bg-white dark:bg-gray-900 rounded-[2.5rem] h-[800px] overflow-hidden [transform-style:preserve-3d]">
          {children}
        </div>
      </div>
    </div>
  );
}
