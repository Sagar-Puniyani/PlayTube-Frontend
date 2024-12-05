import React from "react";

export const BigLoader = ({tweet}) => {
  return (
    <div className={`flex ${!tweet?"items-center":""} ${tweet?"mt-5":""} justify-center h-screen`}>
      <div className="w-16 h-16 border-8 border-t-8 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
    </div>
  );
};
