import React from 'react'

export const Button = ({
    type="button",
    children,
    className="",
    bgColor="blue",
    textColor="text-white",
    isActive=false,
    ...props


}) => {
  return (
    <button type={type} className={`${className} ${bgColor} ${textColor} {...props}`} disabled={isActive}>
        {children}
    </button>
    
  )
}
