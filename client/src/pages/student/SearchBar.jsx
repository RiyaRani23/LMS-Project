import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", query);
    // Add your search logic here
  };

  return (
    <form 
      onSubmit={handleSearch}
      className="flex items-center bg-white border border-slate-200 shadow-xl shadow-blue-900/5 rounded-full p-1.5 md:p-2 max-w-2xl w-full mx-auto group focus-within:ring-4 focus-within:ring-blue-100 transition-all duration-300"
    >
      <div className="flex items-center flex-1 px-4">
        <Search className="text-blue-600 mr-2 shrink-0" size={20} />
        <input
          type="text"
          placeholder="Search for courses, skills, or mentors..."
          className="w-full bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400 text-sm md:text-base"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Optional: Divider for Desktop */}
      <div className="hidden md:block h-8 w-[1px] bg-slate-200 mx-2" />

      {/* Optional: Filter/Category dropdown or icon */}
      <div className="hidden md:flex items-center px-4 text-slate-500 hover:text-blue-600 cursor-pointer transition-colors">
        <span className="text-sm font-medium mr-2">All Categories</span>
      </div>

      <button 
        type="submit"
        className="bg-blue-600 hover:bg-emerald-500 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-medium transition-all active:scale-95 shadow-md shadow-blue-200"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;