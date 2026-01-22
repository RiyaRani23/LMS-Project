import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", query);
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
      {/* Search Input */}
      <div className="flex items-center flex-1 px-4">
        <Search
          className="text-emerald-600 dark:text-emerald-400 mr-2 shrink-0"
          size={20}
        />
        <input
          type="text"
          placeholder="Search for courses, skills, or mentors..."
          className="
            w-full bg-transparent border-none outline-none
            text-slate-700 dark:text-slate-100
            placeholder:text-slate-400 dark:placeholder:text-slate-500
            text-sm md:text-base
          "
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Divider (Desktop) */}
      <div className="hidden md:block h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-2" />

      {/* Category */}
      <div className="hidden md:flex items-center px-4 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer transition-colors">
        <span className="text-sm font-medium mr-2">All Categories</span>
      </div>

      {/* Button */}
      <button
        type="submit"
        className="
          bg-blue-600 hover:bg-emerald-500
          dark:bg-blue-500 dark:hover:bg-emerald-400
          text-white px-6 md:px-8 py-2.5 md:py-3
          rounded-full font-medium
          transition-all active:scale-95
          shadow-md shadow-emerald-300/40 dark:shadow-emerald-900/30
        "
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
