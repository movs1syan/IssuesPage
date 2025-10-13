import { Link } from "react-router-dom";
import { Tag } from "lucide-react";
import SearchBar from "./components/SearchBar.jsx";

const App = () => {
  return (
    <div className="max-w-256 w-full mx-auto px-4">
      <div className="flex justify-center w-full gap-3 mt-10">
        <SearchBar placeholderText="Search issues" />
        <div className="flex">
          <Link to="/labels">
            <button className="flex items-center border border-[#e0e0e0] rounded-md px-3 py-1 font-semibold bg-[#f1f1f1] cursor-pointer active:bg-[#ececec] hover:bg-[#f3f3f3]">
              <Tag size={20} className="text-[#5f5f5f] mr-2" />
              Labels
            </button>
          </Link>
        </div>
        <button className="rounded-md px-3 py-1 text-white font-semibold bg-green-700 cursor-pointer hover:bg-[#5e6804] active:bg-green-800">
          New Issue
        </button>
      </div>
    </div>
  );
};

export default App;
