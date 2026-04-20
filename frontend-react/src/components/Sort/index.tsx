import React from "react";

interface Props {
  handleSort: (selectedFilter: string) => void;
  sortItems: string[];
  isOpen: boolean;
  style?: string;
}

export const Sort: React.FC<Props> = ({ isOpen, sortItems, style, handleSort }) => {
  if (!isOpen) return null;

  const handleSelect = (item: string) => {
    handleSort(item);
  };

  return (
    <div className={`-ml-2 absolute z-50 ${style}`}>
      <ul className="bg-light border border-gray shadow-lg mt-2 w-44">
        {sortItems &&
          sortItems.map((item: string) => (
            <li
              key={item}
              className="py-1 pl-3 pr-4 text-gray cursor-pointer hover:text-deepblue hover:bg-deepblue hover:bg-opacity-10"
              onClick={() => handleSelect(item)}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};
