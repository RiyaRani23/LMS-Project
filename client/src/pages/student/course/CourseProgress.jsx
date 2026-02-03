import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCourseProgressQuery,
  useToggleLectureProgressMutation,
} from "@/features/api/courseProgressApi"; 
import {
  Loader2,
  PlayCircle,
  CheckCircle,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CourseProgress = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  // Hooks
  const { data, isLoading, isError } = useGetCourseProgressQuery(courseId);
  const [toggleLectureProgress] = useToggleLectureProgressMutation();
  const [currentLecture, setCurrentLecture] = useState(null);

  // Loading & Error States
  if (isLoading) return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
    </div>
  );

  if (isError) return (
    <div className="p-10 text-center text-red-500 font-medium">
      Error loading course progress. Please ensure you are enrolled.
    </div>
  );

  // Data Extraction
  const course = data?.course;
  const lectures = course?.lectures || [];
  const completedLectures = data?.progress?.completedLectures || [];
  const activeLecture = currentLecture || lectures[0];

  // Logic Helpers
  const isCompleted = completedLectures.some((id) => String(id) === String(activeLecture?._id));
  const progressPercentage = lectures.length > 0 
    ? Math.round((completedLectures.length / lectures.length) * 100) 
    : 0;

  // Handler: Toggle Completion
  const handleToggleStatus = async () => {
    try {
      await toggleLectureProgress({
        courseId,
        lectureId: activeLecture._id,
      }).unwrap();
      toast.success(isCompleted ? "Lecture marked as incomplete" : "Lecture completed!");
    } catch (err) {
      toast.error("Failed to update progress.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-gray-900 text-white py-4 px-6 md:px-10 flex items-center justify-between shadow-md z-10">
        <h1 className="text-xl font-bold truncate max-w-md">{course?.courseTitle}</h1>
        <div className="flex items-center gap-4">
          <Button
            onClick={handleToggleStatus}
            variant={isCompleted ? "outline" : "default"}
            className={`transition-all duration-300 ${
              isCompleted 
              ? "border-emerald-500 text-emerald-600 bg-emerald-50 hover:bg-emerald-100" 
              : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isCompleted ? (
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 fill-emerald-500 text-white" />
                <span>Completed</span>
              </div>
            ) : ("Mark as Completed")}
          </Button>

          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(`/course-detail/${courseId}`)} 
            className="text-gray-300 hover:text-white hover:bg-gray-800"
          >
            <ChevronLeft className="h-5 w-5 mr-1" /> Back to Course
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Main Content: Video Player & Description */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl ring-1 ring-gray-200">
              {activeLecture?.videoUrl ? (
                <video 
                  key={activeLecture._id} // ✅ Forces video refresh on change
                  controls 
                  className="w-full h-full" 
                  src={activeLecture.videoUrl} 
                />
              ) : (
                <div className="flex items-center justify-center h-full text-white">
                  <p>Video content is unavailable.</p>
                </div>
              )}
            </div>

            <div className="mt-6 border-b pb-6">
              <h2 className="text-3xl font-bold text-gray-900">{activeLecture?.lectureTitle}</h2>
            </div>

            <div className="mt-6">
               <h3 className="text-lg font-semibold mb-2">About this Course</h3>
               <div 
                 className="text-gray-600 prose prose-zinc max-w-none" 
                 dangerouslySetInnerHTML={{ __html: course?.description }} 
               />
            </div>
          </div>
        </div>

        {/* Sidebar: Curriculum & Progress */}
        <div className="w-full lg:w-96 bg-white border-l border-gray-200 flex flex-col">
          <div className="p-6 border-b bg-white">
            <h2 className="font-bold text-lg mb-4">Course Content</h2>
            
            {/* 📊 Progress Bar Section */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium text-gray-500">
                <span>{progressPercentage}% Complete</span>
                <span>{completedLectures.length}/{lectures.length}</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {lectures.map((lecture, index) => {
              const isLectureDone = completedLectures.some((id) => String(id) === String(lecture._id));
              const isActive = activeLecture?._id === lecture._id;

              return (
                <button
                  key={lecture._id}
                  onClick={() => setCurrentLecture(lecture)}
                  className={`w-full flex items-center gap-4 p-4 text-left transition-all ${
                    isActive 
                    ? "bg-blue-50 border-l-4 border-blue-600" 
                    : "hover:bg-gray-50 border-l-4 border-transparent"
                  }`}
                >
                  <div className="shrink-0">
                    {isLectureDone ? (
                      <CheckCircle className="h-6 w-6 text-emerald-500 fill-emerald-50" />
                    ) : isActive ? (
                      <PlayCircle className="h-6 w-6 text-blue-600 animate-pulse" />
                    ) : (
                      <div className="h-6 w-6 rounded-full border-2 border-gray-200 flex items-center justify-center text-xs font-bold text-gray-400">
                        {index + 1}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className={`text-sm font-medium truncate ${isLectureDone ? "text-emerald-700" : "text-gray-700"} ${isActive ? "text-blue-900 font-bold" : ""}`}>
                      {lecture.lectureTitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;