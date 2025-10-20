import { useState, useRef } from "react";
import { Delete } from "lucide-react";

const Searchbar = ({ placeholderText, setDebouncedValue }) => {
  const typingTimeout = useRef(null);
  const searchInputRef = useRef(null);

  const [showClear, setShowClear] = useState(false);

  const handleSearchChange = () => {
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      setDebouncedValue(searchInputRef.current.value);
    }, 500);

    const value = searchInputRef.current?.value;
    setShowClear(value.length > 0);
  };

  const resetSearchInput = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
      setShowClear(false);
      setDebouncedValue("");
      searchInputRef.current.focus();
    }
  };

  return (
    <div className="flex flex-1 ">
      <div className="relative w-full">
        <input
          ref={searchInputRef}
          name="search"
          className="outline outline-[#e0e0e0] rounded-md px-5 py-1 w-full focus:outline-2 focus:outline-blue-800"
          placeholder={placeholderText}
          onChange={handleSearchChange}
        />
        {showClear && (
          <Delete
            size={20}
            className="text-[#5f5f5f] active:opacity-70 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={resetSearchInput}
          />
        )}
      </div>
    </div>
  );
};

export default Searchbar;
