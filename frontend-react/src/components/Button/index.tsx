import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  style?: string;
  onClick?: () => void;
  disabled?: boolean; 
}

export const Button: React.FC<ButtonProps> = ({
  children,
  style,
  onClick,
  type = "button",
  disabled = false, 
}) => {
  const handleClick = () => {
    if (onClick && !disabled) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`
        text-light bg-purple
        font-medium rounded-lg text-sm p-2 text-center inline-flex items-center shadow-md shadow-gray-300 
        hover:scale-[1.02] transition-transform 
        ${style}
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"}
      `}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;