import React from "react";
import { Loader } from "lucide-react";
const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center">
        {/* {loader } */}
        <div className="w-12 h-12 border-4 border-t-pink-500 border-gray-300 rounded-full animate-spin"></div>
        <p className="mt-3 text-gray-600 font-medium">loading...</p>
      </div>
    </div>
  );
};

export default Loading;
