// Dropdown.tsx

import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  children: any;
}

export const Dropdown: React.FC<Props> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="">
      <Link
        to="#"
        onClick={toggleDropdown}
        className=""
      >
        {title}
      </Link>
      {isOpen && (
        <ul
          className=""
        >
          {children}
        </ul>
      )}
    </li>
  );
};

export default Dropdown;
