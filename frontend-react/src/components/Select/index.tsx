import React, { ChangeEvent } from 'react';

interface Props {
  options: Option[];
  onChange: (selectedOptions: string | string[]) => void;
  option: string | string[];
  multiple?: boolean;
  required?: boolean;
  error?: string;
  label: string;
  id: string;
  labelStyle?: string;
  styleSelect?: string;
}

interface Option {
  id: string;
  value: string;
  label: string;
}

export const Select: React.FC<Props> = ({
  options,
  option,
  onChange,
  multiple,
  required,
  error,
  id,
  label,
  labelStyle,
  styleSelect,
}) => {

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (multiple) {
      const selectedOptions = Array.from(e.target.selectedOptions, (opt) => opt.value);
      onChange(selectedOptions);
    } else {
      onChange(e.target.value); // This line handles single selection
    }
  };

  return (
    <div className={`mb-6 ${error ? "mb-8" : ""}`}>
      <label
        htmlFor={id}
        className={`block text-deepblue text-sm font-bold mb-2 ${labelStyle}`}
      >
        {label}
      </label>

      <label htmlFor={id} className="sr-only">
        Choose a {label}
      </label>
      <select
        required={required}
        multiple={multiple}
        id={id}
        value={multiple ? (option as string[]) : (option as string)} // Set value based on multiple or single selection
        onChange={handleSelectChange}
        className={`bg-light border border-lightpurple text-sm rounded-lg 
          hover:border-lightpurple block w-full p-2.5 ${styleSelect}`}
      >
        {options && options.map((opt) => (
          <option
            key={opt.id}
            value={opt.value}
            className="hover:cursor-pointer"
          >
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Select;
