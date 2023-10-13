import React from "react";

const Loading = () => {
  return (
    <div className="justify-center items-center flex overflow-x-hidden min-h-[875px] inset-0 z-50 outline-none focus:outline-none bg-white absolute">
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-velvet-blue/70"></div>
        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-velvet-blue/70"></div>
        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-velvet-blue/70"></div>
      </div>
    </div>
  );
};

export default Loading;
