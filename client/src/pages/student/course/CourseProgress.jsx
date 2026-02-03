import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCourseProgressQuery } from "@/features/api/purchaseApi";
import { Loader2, PlayCircle, Lock, CheckCircle, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const CourseProgress = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCourseProgressQuery(courseId);
  const [currentLecture, setCurrentLecture] = useState(null);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
      </div>
    );

  if (isError)
    return (
      <div className="p-10 text-center text-red-500">
        Error loading course progress. Please ensure you are logged in and
        enrolled.
      </div>
    );

  const course = data?.course;
  const lectures = course?.lectures || [];
  // Default to first lecture if none selected
  const activeLecture = currentLecture || lectures[0];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-gray-900 text-white py-4 px-6 md:px-10 flex items-center justify-between shadow-md z-10">
        <h1 className="text-xl font-bold truncate">{course?.courseTitle}</h1>
        
        <div className="flex items-center gap-4">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            // 3. Use the lowercase navigate function here
            onClick={() => navigate(`/course-detail/${courseId}`)}
            className="text-gray-300 hover:text-white hover:bg-gray-800"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to Course
          </Button>

          <div className="text-sm bg-blue-600 px-3 py-1 rounded-full">
            {lectures.length} Lectures
          </div>
        </div>
      </div>
      {/* 2. Main Body: Below the header */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Main Video Area: Individual Scroll */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
              {activeLecture?.videoUrl ? (
                <video
                  key={activeLecture._id}
                  controls
                  className="w-full h-full"
                  src={activeLecture.videoUrl}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-white">
                  <p>Select a lecture to play</p>
                </div>
              )}
            </div>

            <div className="mt-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {activeLecture?.lectureTitle || "Welcome to the Course"}
              </h2>
              {/* Added prose for HTML description */}
              <div
                className="mt-4 text-gray-600 leading-relaxed prose prose-zinc max-w-none"
                dangerouslySetInnerHTML={{ __html: course?.description }}
              />
            </div>
          </div>
        </div>

        {/* Sidebar: Lecture List: Individual Scroll */}
        <div className="w-full lg:w-96 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="p-6 border-b sticky top-0 bg-white z-10">
            <h2 className="font-bold text-lg">Course Content</h2>
            <p className="text-sm text-gray-500">Select a lecture</p>
          </div>

          <div className="divide-y">
            {lectures.map((lecture, index) => (
              <button
                key={lecture._id}
                onClick={() => setCurrentLecture(lecture)}
                className={`w-full flex items-center gap-4 p-4 text-left transition-colors hover:bg-gray-50 ${
                  activeLecture?._id === lecture._id
                    ? "bg-blue-50 border-l-4 border-blue-600"
                    : ""
                }`}
              >
                <div className="shrink-0">
                  {activeLecture?._id === lecture._id ? (
                    <PlayCircle className="h-6 w-6 text-blue-600" />
                  ) : (
                    <div className="h-6 w-6 rounded-full border-2 flex items-center justify-center text-xs font-bold text-gray-400">
                      {index + 1}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p
                    className={`text-sm font-medium ${activeLecture?._id === lecture._id ? "text-blue-700" : "text-gray-700"}`}
                  >
                    {lecture.lectureTitle}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
