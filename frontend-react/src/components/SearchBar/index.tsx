
import { RiSearchLine } from "react-icons/ri";

interface Props {
  onSearch: (filteredContents: any[]) => void;
  contents: any[];
  base: string;
}

export const SearchBar: React.FC<Props> = ({ onSearch, contents, base }) => {

  const handleSearch = (searchQuery: string): void => {
    if (searchQuery === "") {
      onSearch(contents); 
      return;
    }

    const filteredProducts = contents.filter((content) =>
      content[base].toLowerCase().includes(searchQuery.toLowerCase())
    );

    onSearch(filteredProducts); 
  };

  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:items-center md:justify-center">
      <div className="relative flex items-center w-full md:w-auto">
        <input
          onChange={(e) => handleSearch(e.currentTarget.value)}
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-1 border border-lightpurple text-gray rounded-md 
                    hover:ring-2 hover:ring-lighter
                    focus:outline-none focus:ring-lightpurple"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <RiSearchLine className="text-gray" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
