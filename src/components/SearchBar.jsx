import React from "react";
import  { Delete, Search } from "lucide-react";

const SearchBar = ({ placeholderText, setSearchLabel }) => {
  const [search, setSearch] = React.useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
    setSearchLabel(e.target.value);
  };

  return (
    <div className="flex flex-1 items-stretch">
      <div className="relative w-full">
        <input
          className="border border-[#e0e0e0] rounded-l-md px-5 py-1 w-full focus:outline-none focus:border-blue-800"
          placeholder={placeholderText}
          onChange={handleChange}
          value={search}
        />
        {search.length > 0 && (
          <Delete
            size={20}
            className="text-[#5f5f5f] active:opacity-70 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setSearch("")}
          />
        )}
      </div>
      <button className="border border-[#e0e0e0] rounded-r-md px-3 py-1 bg-[#f1f1f1] cursor-pointer active:bg-[#ececec] hover:bg-[#f3f3f3]">
        <Search size={20} className="text-[#5f5f5f]" />
      </button>
    </div>
  );
};

export default SearchBar;