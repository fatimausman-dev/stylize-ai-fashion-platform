import React from "react";
import { Button } from "..";

interface PaginationProps {
  contents: any[];
  currentPage: number;
  contentsPerPage: { sm: number; md: number; lg: number };
  handlePageChange: (pageNumber: number) => void;
  totalPages: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  contents,
  currentPage,
  contentsPerPage,
  handlePageChange,
  totalPages,
}) => {
  const buttons = [];

  for (let i = 1; i <= totalPages; i++) {
    buttons.push(
      <li key={i}>
        <Button
          onClick={() => handlePageChange(i)}
          style={`px-4 h-8 ms-0 leading-tight rounded-none 
            hover:transform-none hover:text-deepblue
            ${i === currentPage ? '' : 'bg-deepblue bg-opacity-50'}`}
        >
          {i}
        </Button>
      </li>
    );
  }

  return (
    <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
      {/* Showing the current range of products */}
      <span className="text-sm font-normal text-gray mb-4 md:mb-0 block w-full md:inline md:w-auto">
        Showing <span className="font-semibold text-deepblue">{Math.min((currentPage - 1) * contentsPerPage.md + 1, contents.length)}</span>-
        <span className="font-semibold text-deepblue">{Math.min(currentPage * contentsPerPage.md, contents.length)}</span> of <span className="font-semibold text-gray-900">{contents.length}</span>
      </span>
      
      {/* Pagination buttons */}
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        {buttons}
      </ul>
    </nav>
  );
};

export default Pagination;
