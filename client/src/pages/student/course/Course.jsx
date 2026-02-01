import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { Link } from "react-router-dom";

const Course = ({ course }) => {
  return (
    <Link to={`/course-detail/${course._id}`}>
      <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="relative">
          <img
            src={course.courseThumbnail}
            className="w-full h-32 object-cover rounded-t-lg"
            alt={course.courseTitle}
            onError={(e) => {
              e.target.src =
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv1ank-wR_C1doFKGVu5XKmO5bg6RTaVub5A&s";
            }}
          />
        </div>
        <CardContent className="px-3 py-2 space-y-1">
          <h1 className="hover:underline font-bold text-lg line-clamp-2 h-12">
            {course.courseTitle}
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="w-10 h-10 cursor-pointer">
                <AvatarImage
                  src={
                    course.creator?.photoUrl || "https://github.com/shadcn.png"
                  }
                  className="rounded-full"
                />
                <AvatarFallback className="text-[10px]">
                  {course.creator?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h1 className="font-medium text-lg">{course.creator?.name}</h1>
            </div>
            <Badge className="bg-blue-600 text-white px-3 py-1.5 text-sm font-semibold rounded-full">
              {course.courseLevel}
            </Badge>
          </div>
          <div className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">
            <span>₹{course.coursePrice}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;
