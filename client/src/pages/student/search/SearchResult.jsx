import React from "react";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";

const SearchResult = ({ course }) => {
  return (
    <Link 
      to={`/course-detail/${course._id}`} 
      className="flex flex-col gap-4 p-4 border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all duration-300 group"
    >
      {/* 1. Course Thumbnail */}
      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gray-100">
        <img
          src={course.courseThumbnail}
          alt={course.courseTitle}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <Badge className="absolute top-3 right-3 bg-white/90 text-black hover:bg-white backdrop-blur-sm border-none">
          {course.courseLevel || "All Levels"}
        </Badge>
      </div>

      <div className="flex flex-col gap-3 px-1">
        {/* 2. Title & Instructor */}
        <div className="space-y-1">
          <h2 className="font-bold text-lg text-slate-900 dark:text-slate-100 line-clamp-1">
            {course.courseTitle}
          </h2>
          <div className="flex items-center gap-2">
            <img
              src={course.creator?.photoUrl || "https://github.com/shadcn.png"}
              alt="instructor"
              className="h-6 w-6 rounded-full object-cover"
            />
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {course.creator?.name || "Instructor"}
            </p>
          </div>
        </div>

        {/* 3. Course Stats/Tags */}
        <div className="flex flex-wrap gap-2">
           <Badge variant="secondary" className="bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 border-none">
             {course.category}
           </Badge>
        </div>

        {/* 4. Footer: Pricing */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-50 dark:border-slate-800">
          <div className="flex items-center font-bold text-xl text-slate-900 dark:text-slate-100">
            <IndianRupee size={18} />
            <span>{course.coursePrice}</span>
          </div>
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
            Enroll Now
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SearchResult;