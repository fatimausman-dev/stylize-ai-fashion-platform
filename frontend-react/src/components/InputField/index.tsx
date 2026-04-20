import React from "react";

interface Props {
  type: string;
  id: any;
  value: string;
  onChange: any;
  label: string;
  error?: string;
  inputStyle?: string;
  labelStyle?: string;
  required?: boolean; // Add the required prop to the interface
}

export const InputField: React.FC<Props> = ({
  type,
  id,
  value,
  onChange,
  label,
  error,
  inputStyle,
  labelStyle,
  required, // Include required in the props
}) => {
  return (
    <div className={`mb-6 ${error ? "mb-8" : ""}`}>
      <label
        htmlFor={id}
        className={`block text-deepblue text-sm font-bold mb-2 ${labelStyle}`}
      >
        {required ? `*${label}` : `${label}`}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required={required} // Include the required attribute
        className={`bg-lighter border text-deepblue focus:outline-none 
        focus:ring-2 focus:ring-deepblue focus:ring-opacity-50 
        sm:text-sm rounded-lg block w-full p-2.5 
        ${error ? "border-red-500" : "border-lighter"}
        ${inputStyle}`}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1 ">{error}</p>
      )}
    </div>
  );
};

export default InputField;
