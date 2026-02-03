import React from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import { useGetCourseDetailWithPurchaseStatusQuery } from "@/features/api/purchaseApi"; // Correct hook
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlayCircle, Lock, BookOpen, Clock } from "lucide-react";
import BuyCourseButton from "@/components/BuyCourseButton";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // 1. Use the combined query hook
  const { data, isLoading, isError } = useGetCourseDetailWithPurchaseStatusQuery(courseId);

  if (isLoading) return <p className="text-center py-10 font-medium">Loading course details...</p>;
  
  if (isError || !data)
    return (
      <p className="text-center py-10 text-red-500 font-medium">
        Error loading course. Please try again later.
      </p>
    );

  // 2. Destructure data from the combined response
  const { course, purchased } = data;

  return (
    <div className="space-y-10 mt-3 px-4 md:px-0 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gray-800 w-full text-white p-8 rounded-2xl flex flex-col md:flex-row gap-8 items-center shadow-xl">
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl md:text-4xl font-extrabold">{course.courseTitle}</h1>
          <p className="text-gray-400 text-lg">
            {course.subTitle || "Master this course from scratch with real-world projects."}
          </p>
          <div className="flex items-center gap-3">
            <Badge className="bg-blue-600 uppercase text-[10px]">{course.courseLevel}</Badge>
            <span className="text-sm text-gray-300">
              Created by <span className="text-blue-400 font-bold">{course.creator?.name}</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <BookOpen size={16} /> {course.lectures?.length} Lectures
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} /> Last updated {new Date(course.updatedAt).toLocaleDateString()}
            </div>
          </div>
          <p className="text-sm">Students enrolled: {course.enrolledStudents?.length || 0}</p>
        </div>

        {/* Purchase Card */}
        <Card className="w-full md:w-80 shadow-2xl border-none overflow-hidden">
          <img
            src={course.courseThumbnail}
            alt="thumbnail"
            className="w-full h-44 object-cover"
          />
          <CardContent className="p-5 space-y-2">
            <h1 className="text-emerald-600 font-bold line-clamp-1">{course.courseTitle}</h1>
            <Separator className="my-2" />
            <div className="text-2xl font-bold text-zinc-600">₹{course.coursePrice}</div>
          </CardContent>
          <CardFooter className="flex justify-center p-4 pt-0">
            {/* 3. Conditional rendering based on 'purchased' flag */}
            {purchased ? (
              <Button 
                onClick={() => navigate(`/course-progress/${courseId}`)} 
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                Continue Course
              </Button>
            ) : (
              <BuyCourseButton courseId={courseId} />
            )}
          </CardFooter>
        </Card>
      </div>

      {/* Course Content & Description */}
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 space-y-12 pb-20">
          <section>
            <h2 className="text-2xl font-bold mb-4">About this course</h2>
            <div
              className="prose prose-zinc max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: course.description || "No description provided." }}
            />
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Course Content</h2>
              <span className="text-sm text-gray-500 font-medium">
                {course.lectures?.length} lectures
              </span>
            </div>

            <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              {course.lectures?.map((lecture, index) => (
                <div
                  key={lecture._id}
                  className="group flex items-center justify-between p-5 border-b last:border-none bg-white hover:bg-zinc-50 transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-zinc-400 text-sm font-mono w-4">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <PlayCircle size={20} className="text-blue-600" />
                    </div>
                    <span className="font-semibold text-zinc-800">{lecture.lectureTitle}</span>
                  </div>

                  <div className="flex items-center">
                    {/* Show unlocked icon if purchased, otherwise show preview/lock status */}
                    {purchased || lecture.isPreviewFree ? (
                      <Badge className="bg-emerald-100 text-emerald-700 border-none">
                        {purchased ? "Available" : "Free Preview"}
                      </Badge>
                    ) : (
                      <div className="flex items-center gap-1 text-zinc-400">
                        <Lock size={16} />
                        <span className="text-[10px] font-bold uppercase">Locked</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
