import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Course from "./Course";
import { useGetPublishedCoursesQuery } from "@/features/api/courseApi";

const Courses = () => {
  const { data, isLoading, isError } = useGetPublishedCoursesQuery();

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        <p>Failed to load courses. Please login.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-3xl text-center mb-10 ">Our Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))
            : data?.courses?.map((course) => (
                <Course key={course._id} course={course} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;

//Shimmer for Course

const CourseSkeleton = () => {
  return (
    <div
      className="max-w-sm rounded-2xl border border-slate-200 dark:border-slate-800 
      bg-white dark:bg-slate-900 p-4 shadow-sm"
    >
      {/* Course Thumbnail */}
      <Skeleton className="h-40 w-full rounded-xl" />

      {/* Title */}
      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      {/* Instructor */}
      <div className="flex items-center gap-3 mt-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-4 w-1/3" />
      </div>

      {/* CTA Button */}
      <Skeleton className="h-10 w-full rounded-full mt-5" />
    </div>
  );
};
