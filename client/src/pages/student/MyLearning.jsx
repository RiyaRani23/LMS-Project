import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const MyLearning = () => {
  // Replace with actual data fetching logic 
  const isLoading = false;
  const MyLearningCourses = []; 

  return (
    <div className='max-w-4xl mx-auto my-24 px-4 md:px-0'>
      <h1 className='font-bold text-2xl uppercase tracking-tight'>My Learning</h1>
      <div className='my-5'>
        {isLoading ? (
          <MyLearningSkeleton />
        ) : MyLearningCourses.length === 0 ? (
          <div className="text-center py-10 border rounded-lg border-dashed">
             <p className="text-muted-foreground">You are not enrolled in any courses yet.</p>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {
            [1,2].map((course, index) => <Course Key={index}/>)
          }
          </div>
        )}
      </div>
    </div>
  )
}

export default MyLearning;

const MyLearningSkeleton = () => (
  <div className="space-y-4">
    {Array.from({ length: 3 }).map((_, index) => (
      <div
        key={index}
        className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border shadow-sm"
      >
        {/* Course Thumbnail Skeleton */}
        <Skeleton className="h-16 w-24 md:h-20 md:w-36 rounded-lg" />

        {/* Course Details Skeleton */}
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-[60%]" />
          <Skeleton className="h-4 w-[40%]" />

          {/* Progress Bar Skeleton */}
          <div className="pt-2">
            <Skeleton className="h-2 w-full rounded-full" />
          </div>
        </div>

        {/* Action Button Skeleton */}
        <Skeleton className="h-9 w-20 md:w-24 rounded-md hidden sm:block" />
      </div>
    ))}
  </div>
);