import React from "react";

interface Props {
  id: string;
  name: string;
  value: string;
  checked?: boolean;
  children: string;
  onChange?: () => void; // Add this line to include onChange prop
}

export const Radio: React.FC<Props> = ({
  id,
  name,
  value,
  checked,
  children,
  onChange, // Add this line to include onChange prop
}) => {
  return (
    <li className="w-full border-b border-deepblue  sm:border-b-0 sm:border-r ">
      <div className="flex items-center ps-3">
        <input
          checked={checked}
          id={id}
          type="radio"
          value={value}
          name={name}
          onChange={onChange} // Add this line to include onChange prop
          className="w-4 h-4 text-deepblue border-lighter hover:cursor-pointer"
        />
        <label
          htmlFor={id}
          className="w-full py-3 ms-2 text-sm font-medium text-deepblue hover:cursor-pointer"
        >
          {children}
        </label>
      </div>
    </li>
  );
};

export default Radio;
