import React from "react";

export const Loader = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="w-4 h-4 border-2 border-t-2 border-gray-300 border-t-white rounded-full animate-spin"></div>
    </div>
  );
};
