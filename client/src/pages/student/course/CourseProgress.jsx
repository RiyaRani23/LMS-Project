import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCourseProgressQuery } from "@/features/api/purchaseApi";
import { Loader2, PlayCircle, Lock, CheckCircle } from "lucide-react";

const CourseProgress = () => {
  const { courseId } = useParams();
  const { data, isLoading, isError } = useGetCourseProgressQuery(courseId);
  const [currentLecture, setCurrentLecture] = useState(null);

  if (isLoading) return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
    </div>
  );

  if (isError) return <div className="p-10 text-center text-red-500">Error loading course progress. Please ensure you are logged in and enrolled.</div>;

  const course = data?.course;
  const lectures = course?.lectures || [];
  // Default to first lecture if none selected
  const activeLecture = currentLecture || lectures[0];

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      {/* Main Video Area */}
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
            <h1 className="text-2xl font-bold text-gray-900">{activeLecture?.lectureTitle || course?.courseTitle}</h1>
            <p className="mt-4 text-gray-600 leading-relaxed">{course?.description}</p>
          </div>
        </div>
      </div>

      {/* Sidebar: Lecture List */}
      <div className="w-full lg:w-96 bg-white border-l border-gray-200 overflow-y-auto">
        <div className="p-6 border-b">
          <h2 className="font-bold text-lg">Course Content</h2>
          <p className="text-sm text-gray-500">{lectures.length} Lectures</p>
        </div>
        
        <div className="divide-y">
          {lectures.map((lecture, index) => (
            <button
              key={lecture._id}
              onClick={() => setCurrentLecture(lecture)}
              className={`w-full flex items-center gap-4 p-4 text-left transition-colors hover:bg-gray-50 ${
                activeLecture?._id === lecture._id ? "bg-blue-50 border-l-4 border-blue-600" : ""
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
                <p className={`text-sm font-medium ${activeLecture?._id === lecture._id ? "text-blue-700" : "text-gray-700"}`}>
                  {lecture.lectureTitle}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;