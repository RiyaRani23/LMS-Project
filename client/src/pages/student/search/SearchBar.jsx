import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom"; 

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate(); 

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/course/search?query=${encodeURIComponent(query.trim())}`);
    if (query.trim()) {  
      navigate(`/course/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="
        flex items-center max-w-2xl w-full mx-auto
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-700
        rounded-full p-1.5 md:p-2
        shadow-xl shadow-emerald-900/5
        transition-all duration-300
        focus-within:ring-4 focus-within:ring-emerald-100 dark:focus-within:ring-emerald-900/40
      "
    >
      <div className="flex items-center flex-1 px-4">
        <Search className="text-purple-600 dark:text-purple-400 mr-2 shrink-0" size={20} />
        <input
          type="text"
          placeholder="Search for courses..."
          className="w-full bg-transparent border-none outline-none text-slate-700 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm md:text-base"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="hidden md:block h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-2" />

      <div className="hidden md:flex items-center px-4 text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition-colors">
        <span className="text-sm font-medium mr-2">All Categories</span>
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-purple-500 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-medium transition-all active:scale-95 shadow-md shadow-emerald-300/40"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;