import { ChartBar, SquarePlus } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex bg-gray-200">
      <div className="hidden lg:block w-62.5 sm:w-75 space-y-8 border-r border-gray-300 dark:border-gray-700 h-screen sticky top-0 pt-4">
        <div className="space-y-4 p-5">
          <Link
            to="dashboard"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group"
          >
            <ChartBar size={22} className="text-gray-600 group-hover:text-indigo-600" />
            <span className="font-medium">Dashboard</span>
          </Link>
          
          <Link
            to="course"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group"
          >
            <SquarePlus size={22} className="text-gray-600 group-hover:text-indigo-600" />
            <span className="font-medium">Course</span>
          </Link>
        </div>
      </div>

     <div className="flex-1 p-6 md:p-10 bg-slate-50 dark:bg-[#020817] min-h-screen pt-28"> 
       <div className="max-w-7xl mx-auto"> 
          <Outlet />
  </div>
</div>
    </div>
  );
};

export default Sidebar;