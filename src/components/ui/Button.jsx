'use client'

import { forwardRef } from 'react'

const Button = forwardRef(({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
  type = 'button',
  ...props
}, ref) => {
  
  const getButtonStyles = () => {
    const baseStyle = "px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    const variantStyles = {
      primary: "bg-blue-900 hover:bg-blue-800 text-white focus:ring-blue-500",
      secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500",
      outline: "border border-blue-900 text-blue-900 hover:bg-blue-50 focus:ring-blue-500",
      danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
    };
    
    const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : "";
    
    return `${baseStyle} ${variantStyles[variant]} ${disabledStyle} ${className}`;
  };
  
  return (
    <button
      ref={ref}
      type={type}
      className={getButtonStyles()}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;