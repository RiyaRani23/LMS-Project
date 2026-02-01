import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useGetCourseByIdQuery } from "@/features/api/courseApi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlayCircle, Lock, BookOpen, Clock } from "lucide-react";
import { useLoadUserQuery } from "@/features/api/authApi";

const CourseDetail = () => {
  const { courseId } = useParams();
  const { data, isLoading, isError } = useGetCourseByIdQuery(courseId);
  const { data: userData } = useLoadUserQuery();
  const user = userData?.user;

  if (isLoading)
    return <p className="text-center py-10">Loading course details...</p>;
  if (isError)
    return (
      <p className="text-center py-10 text-red-500">Error loading course.</p>
    );

  const { course } = data;

  const isEnrolled = course.enrolledStudents?.some(
    (studentId) => studentId === user?._id,
  );

  const handlePurchase = async () => {
  try {
    // For now, we just log it. Later, you will call your 'createCheckoutSession' mutation here.
    console.log("Initiating purchase for course:", courseId);
    
    // Example: toast.info("Redirecting to payment gateway...");
  } catch (error) {
    console.error("Purchase error:", error);
  }
};

  const handleAction = () => {
    if (isEnrolled) {
      Navigate(`/course-progress/${courseId}`); 
    } else {
      handlePurchase(); 
    }
  };

  return (
    <div className="space-y-10 mt-3 px-4 md:px-0 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gray-700 text-white p-8 rounded-2xl flex flex-col md:flex-row gap-8 items-center shadow-xl">
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl md:text-4xl font-extrabold">
            {course.courseTitle}
          </h1>
          <p className="text-gray-400 text-lg">
            {course.subTitle ||
              "Master this course from scratch with real-world projects."}
          </p>
          <div className="flex items-center gap-3">
            <Badge className="bg-blue-600">{course.courseLevel}</Badge>
            <span className="text-sm text-gray-300">
              Created by{" "}
              <span className="text-blue-400 font-bold">
                {course.creator?.name}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <BookOpen size={16} /> {course.lectures?.length} Lectures
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} /> Last updated{" "}
              {new Date(course.updatedAt).toLocaleDateString()}
            </div>
          </div>
          <p>Student enrolled: 10</p>
        </div>

        {/* Purchase Card */}
        <Card className="w-full md:w-80 shadow-2xl border-none overflow-hidden">
          <img
            src={course.courseThumbnail}
            alt="thumbnail"
            className="w-full h-44 object-cover"
          />
          <CardContent className="p-2 space-y-2">
            <h1 className="text-emerald-600 ">{course.courseTitle}</h1>
            <Separator className="my-2" />
            <div className="text-3xl font-bold">₹{course.coursePrice}</div>
            <Button
              onClick={handleAction}
              className={`w-full ${isEnrolled ? "bg-gray-800 hover:bg-gray-900" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {isEnrolled ? "Continue Learning" : "Buy Now"}
            </Button>
            <p className="text-xs text-center text-gray-500">
              30-Day Money-Back Guarantee
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Course Content & Description */}
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 space-y-12">
          {" "}
          {/* Increased vertical spacing between sections */}
          {/* Description Section */}
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              About this course
            </h2>
            <div
              className="prose prose-zinc dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed tracking-tight"
              dangerouslySetInnerHTML={{
                __html: course.description || "No description provided.",
              }}
            />
          </section>
          {/* Course Content Section */}
          <section className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Course Content</h2>
              <span className="text-sm text-gray-500 font-medium">
                {course.lectures?.length} lectures
              </span>
            </div>

            <div className="border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
              {course.lectures?.map((lecture, index) => (
                <div
                  key={lecture._id}
                  className="group flex items-center justify-between p-5 border-b last:border-none bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-zinc-400 text-sm font-mono w-4">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg group-hover:scale-110 transition-transform">
                      <PlayCircle
                        size={20}
                        className="text-blue-600 dark:text-blue-400"
                      />
                    </div>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-blue-600 transition-colors">
                      {lecture.lectureTitle}
                    </span>
                  </div>

                  <div className="flex items-center">
                    {lecture.isPreviewFree ? (
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                        Free Preview
                      </Badge>
                    ) : (
                      <div className="flex items-center gap-1 text-zinc-400">
                        <Lock size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                          Locked
                        </span>
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
