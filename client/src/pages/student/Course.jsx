import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import React from "react";

const Course = () => {
  return (
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img
          src="https://images.ctfassets.net/aq13lwl6616q/7cS8gBoWulxkWNWEm0FspJ/c7eb42dd82e27279307f8b9fc9b136fa/nodejs_cover_photo_smaller_size.png?w=500&fm=webp"
          className="w-full h-42 object-cover rounded-t-lg"
          alt="course"
        />
      </div>
      <CardContent className="px-5 py-4 space-y-3">
        <h1 className="hover:underline font-bold text-lg truncate">
          Nextjs Complete Course in Hindi 2024
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 cursor-pointer">
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="rounded-full"
              />
              <AvatarFallback className="rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white">
                AK
              </AvatarFallback>
            </Avatar>
            <h1 className="font-medium text-sm">Riya</h1>
          </div>
          <Badge className="bg-blue-600 text-white px-3 py-1.5 text-sm font-semibold rounded-full">
            Advance
          </Badge>
        </div>
        <div className="text-lg font-bold">
          <span>₹499</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Course;
