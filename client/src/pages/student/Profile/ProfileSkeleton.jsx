import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto my-24 px-4 md:px-0">
      {/* Title Skeleton */}
      <Skeleton className="h-8 w-40 mb-8 mx-auto md:mx-0" />

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-8">
        <div className="flex flex-col items-center gap-4">
          {/* Avatar Skeleton */}
          <Skeleton className="h-24 w-24 md:h-32 md:w-32 rounded-full" />
        </div>

        <div className="flex-1 space-y-4 w-full">
          <div className="space-y-3">
            {/* Info Rows Skeletons */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>
          {/* Edit Button Skeleton */}
          <Skeleton className="h-10 w-28 rounded-md" />
        </div>
      </div>

      {/* Courses Section Skeleton */}
      <div className="mt-12">
        <Skeleton className="h-6 w-56 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3 border p-4 rounded-xl">
              <Skeleton className="h-40 w-full rounded-lg" /> 
              <Skeleton className="h-4 w-3/4" />             
              <Skeleton className="h-4 w-1/2" />              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;