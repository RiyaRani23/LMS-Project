import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import EditProfileDialog from "./EditProfileDialog"; // We will create this next
import Course from "../Course";
import ProfileSkeleton from "./ProfileSkeleton";

const Profile = () => {
  const enrolledCourses = [1, 2];
  const isLoading = true; 
  if (isLoading) return <ProfileSkeleton />;

  return (
    <div className="max-w-4xl mx-auto my-24 px-4 md:px-0">
      <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-8">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background shadow-lg">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white text-2xl">
              AK
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1 space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                Name:
              </span>
              <p className="text-gray-900 dark:text-white">Aarav Kumar</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                Email:
              </span>
              <p className="text-gray-900 dark:text-white">
                aarav.kumar@example.com
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                Role:
              </span>
              <p className="uppercase text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 px-2 py-0.5 rounded-full font-bold">
                Student
              </p>
            </div>
          </div>
          <EditProfileDialog />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="font-semibold text-lg mb-4">
          Courses you're enrolled in
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {enrolledCourses.length === 0 ? (
            <h1>You haven't enrolled yet</h1>
          ) : (
            enrolledCourses.map((course, index) => <Course key={index} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
