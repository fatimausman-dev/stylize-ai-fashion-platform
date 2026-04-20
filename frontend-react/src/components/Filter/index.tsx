import React from "react";

interface Props {
  handleFilter: (selectedFilter: string) => void;
  filterItems: string[];
  isOpen: boolean;
  style?: string;
}

export const Filter: React.FC<Props> = ({ isOpen, filterItems, style, handleFilter }) => {
  if (!isOpen) return null;

  const handleSelectFilter = (item: string) => {
    handleFilter(item);
  };

  return (
    <div className={`-ml-2 absolute z-50 ${style}`}>
      <ul className="bg-light border border-gray rounded-lg shadow-lg mt-2 w-40">
        {filterItems &&
          filterItems.map((item: string) => (
            <li
              className="py-1 pl-3 pr-4 text-gray cursor-pointer rounded-lg hover:text-deepblue hover:bg-deepblue hover:bg-opacity-10"
              onClick={() => handleSelectFilter(item)}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Filter;
