import React from "react";

interface Props {
  id: string;
  label: string;
  children: React.ReactNode;
  error?: string;
  labelStyle?: string;
}

export const RadioList: React.FC<Props> = ({
  children,
  error,
  label,
  labelStyle,
  id,
}) => {
  return (
    <div className={`mb-6 ${error ? "mb-8" : ""}`}>
      <label
        htmlFor={id}
        className={`block text-deepblue text-sm font-bold mb-2 ${labelStyle}`}
      >
        {label}
      </label>
      <ul className="items-center w-full text-sm font-medium bg-white border border-deepblue rounded-lg sm:flex ">
        {children}
      </ul>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
