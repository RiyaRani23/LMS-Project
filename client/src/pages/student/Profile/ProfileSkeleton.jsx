import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto my-24 px-4 md:px-0">
      <Skeleton className="h-8 w-40 mb-8 mx-auto md:mx-0 bg-slate-200 dark:bg-slate-800" />

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-8">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-24 w-24 md:h-32 md:w-32 rounded-full bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="flex-1 space-y-4 w-full">
          <div className="space-y-3">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Skeleton className="h-4 w-16 bg-slate-200 dark:bg-slate-800" />
              <Skeleton className="h-4 w-32 bg-slate-100 dark:bg-slate-900" />
            </div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Skeleton className="h-4 w-16 bg-slate-200 dark:bg-slate-800" />
              <Skeleton className="h-4 w-48 bg-slate-100 dark:bg-slate-900" />
            </div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Skeleton className="h-4 w-16 bg-slate-200 dark:bg-slate-800" />
              <Skeleton className="h-6 w-20 rounded-full bg-slate-100 dark:bg-slate-900" />
            </div>
          </div>
          <Skeleton className="h-10 w-28 rounded-md bg-slate-200 dark:bg-slate-800 mx-auto md:mx-0" />
        </div>
      </div>

      <div className="mt-12">
        <Skeleton className="h-6 w-56 mb-4 bg-slate-200 dark:bg-slate-800" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="space-y-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card dark:bg-slate-950 shadow-sm"
            >
              <Skeleton className="h-40 w-full rounded-lg bg-slate-200 dark:bg-slate-800" /> 
              <Skeleton className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800" />             
              <Skeleton className="h-4 w-1/2 bg-slate-100 dark:bg-slate-900" />               
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;