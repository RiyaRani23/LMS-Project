import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";
import Filter from "./Filter";
import { Loader2, SearchX } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import SearchResult from "./SearchResult";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const { data, isLoading, isError } = useGetSearchCourseQuery({
    searchQuery: query,
    categories: selectedCategories,
    sortByPrice: sortByPrice,
  });

  const handleFilterChange = (categories, priceOrder) => {
    setSelectedCategories(categories);
    setSortByPrice(priceOrder);
  };

  if (isError)
    return (
      <div className="p-10 text-center text-red-500">
        Error loading search results.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="my-6">
        <h1 className="text-2xl font-bold">
          Results for: <span className="text-blue-600 italic">"{query}"</span>
        </h1>
        <p className="text-gray-500 text-sm">
          {data?.courses?.length || 0} courses found
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Filter Sidebar */}
        <aside className="w-full md:w-64">
          <Filter handleFilterChange={handleFilterChange} />
        </aside>

        {/* Results Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <SearchSkeleton key={i} />
              ))}
            </div>
          ) : data?.courses?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-lg">
              <SearchX size={64} className="text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold text-gray-600">
                No courses found
              </h2>
              <p className="text-gray-400">
                Try searching with different keywords.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {data?.courses?.map((course) => (
                <SearchResult key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SearchSkeleton = () => (
  <div className="flex flex-col gap-4 p-4 border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm transition-all animate-pulse">
    <Skeleton className="h-48 w-full rounded-xl bg-gray-200 dark:bg-slate-800" />

    <div className="space-y-3 px-1">
      <Skeleton className="h-6 w-11/12 rounded bg-gray-200 dark:bg-slate-800" />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full bg-gray-200 dark:bg-slate-800" />
          <Skeleton className="h-4 w-24 rounded bg-gray-200 dark:bg-slate-800" />
        </div>
        <Skeleton className="h-5 w-16 rounded-full bg-gray-200 dark:bg-slate-800" />
      </div>

      <div className="flex items-center justify-between pt-2">
        <Skeleton className="h-7 w-20 rounded-lg bg-gray-200 dark:bg-slate-800" />
        <Skeleton className="h-4 w-12 rounded bg-gray-200 dark:bg-slate-800" />
      </div>
    </div>
  </div>
);

export default SearchPage;
