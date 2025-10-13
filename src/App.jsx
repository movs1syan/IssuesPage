import { Search, Delete, Tag } from "lucide-react";
import { useState } from "react";

const App = () => {
  const [inputTyping, setInputTyping] = useState("");
  return (
    <div className="max-w-[1064px] w-full mx-auto px-4">
      <div className="flex justify-center w-full gap-3 mt-10">
        <div className="flex flex-1 items-stretch">
          <div className="relative w-full">
            <input
              className="border border-[#e0e0e0] rounded-l-md px-3 py-1 w-full focus:outline-none focus:border-blue-800"
              placeholder="Search Issues"
              onChange={(e) => setInputTyping(e.target.value)}
              value={inputTyping}
            />
            {inputTyping.length > 0 && (
              <Delete
                size={20}
                className="text-[#5f5f5f] active:opacity-70 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setInputTyping("")}
              />
            )}
          </div>
          <button className="border border-[#e0e0e0] rounded-r-md px-3 py-1 bg-[#f1f1f1] cursor-pointer active:bg-[#ececec] hover:bg-[#f3f3f3]">
            <Search size={20} className="text-[#5f5f5f]" />
          </button>
        </div>
        <div className="flex">
          <button className="flex items-center border border-[#e0e0e0] rounded-md px-3 py-1 font-semibold bg-[#f1f1f1] cursor-pointer active:bg-[#ececec] hover:bg-[#f3f3f3]">
            <Tag size={20} className="text-[#5f5f5f] mr-2" />
            Labels
          </button>
        </div>
        <button className="rounded-md px-3 py-1 text-white font-semibold bg-green-700 cursor-pointer hover:bg-[#5e6804] active:bg-green-800">
          New Issue
        </button>
      </div>
    </div>
  );
};

export default App;
