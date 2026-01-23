import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import EditProfileDialog from "./EditProfileDialog";
import Course from "../Course";
import ProfileSkeleton from "./ProfileSkeleton";
import { useLoadUserQuery } from "@/features/api/authApi";

const Profile = () => {
  const { data, isLoading, isError } = useLoadUserQuery();

  if (isLoading) return <ProfileSkeleton />;

  // Handle error or unauthenticated state
  if (isError || !data?.success) {
    return (
      <div className="max-w-4xl mx-auto my-24 px-4 text-center">
        <h1 className="text-red-500 font-bold text-xl">Session Expired</h1>
        <p className="text-gray-600 dark:text-gray-400">Please log in to view your profile.</p>
      </div>
    );
  }

  const {user} = data;

  return (
    <div className="max-w-4xl mx-auto my-24 px-4 md:px-0">
      <h1 className="font-bold text-2xl text-center md:text-left dark:text-white">PROFILE</h1>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-8">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background shadow-lg">
            <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} alt="profile" />
            <AvatarFallback className="rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white text-2xl uppercase">
              {user?.name?.substring(0, 2) || "AK"}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1 space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Name:</span>
              <p className="text-gray-900 dark:text-white capitalize">{user?.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Email:</span>
              <p className="text-gray-900 dark:text-white">{user?.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Role:</span>
              <p className="uppercase text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 px-3 py-1 rounded-full font-bold">
                {user?.role.toUpperCase}
              </p>
            </div>
          </div>
          <EditProfileDialog user={user} />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="font-semibold text-lg mb-6 dark:text-white">
          Courses you're enrolled in
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {user?.enrolledCourses?.length === 0 ? (
            <p className="text-gray-500">You haven't enrolled in any courses yet.</p>
          ) : (
            user?.enrolledCourses?.map((course) => (
              <Course key={course._id} course={course} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;