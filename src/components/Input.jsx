import React, { forwardRef, useId } from "react";

const Input = forwardRef(function Input({
    label,
    type = "text",
    placeholder,
    className = "",
    ...props
},ref) {
    const id=useId();
  return(
    <div className="w-full">
        {label && <label htmlFor={id} className="inline-block mb-1 pl-1">
        {label}
        </label>}
       <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`px-3 py-2 bg-[#0E0F0F] text-white outline-none focus:bg-[#222222] duration-200 border border-slate-600 w-full ${className}`}
        ref={ref}
        {...props}
       />
    </div>
  )
});

export {Input}
