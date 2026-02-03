import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCourseProgressQuery,
  useUpdateLectureProgressMutation,
} from "@/features/api/purchaseApi";
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
  
  const { data, isLoading, isError } = useGetCourseProgressQuery(courseId);
  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [currentLecture, setCurrentLecture] = useState(null);

  if (isLoading) return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
    </div>
  );

  if (isError) return <div className="p-10 text-center text-red-500">Error loading progress.</div>;

  const course = data?.course;
  const lectures = course?.lectures || [];
  const completedLectures = data?.progress?.completedLectures || [];
  const activeLecture = currentLecture || lectures[0];

  // Logic to check if current lecture is done
  const isCompleted = completedLectures.some((id) => String(id) === String(activeLecture?._id));

  const handleToggleStatus = async () => {
    try {
      await updateLectureProgress({
        courseId,
        lectureId: activeLecture._id,
      }).unwrap();
      toast.success("Progress updated!");
    } catch (err) {
      toast.error("Failed to update progress.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Header */}
      <div className="bg-gray-900 text-white py-4 px-6 md:px-10 flex items-center justify-between shadow-md z-10">
        <h1 className="text-xl font-bold truncate">{course?.courseTitle}</h1>
        <div className="flex items-center gap-4">
          <Button
            onClick={handleToggleStatus}
            variant={isCompleted ? "outline" : "default"}
            className={`transition-all duration-300 ${
              isCompleted ? "border-emerald-500 text-emerald-600 bg-emerald-50 hover:bg-emerald-100" : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isCompleted ? (
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 fill-emerald-500 text-white" />
                <span>Completed</span>
              </div>
            ) : ("Mark as Completed")}
          </Button>

          <Button variant="ghost" size="sm" onClick={() => navigate(`/course-detail/${courseId}`)} className="text-gray-300 hover:text-white hover:bg-gray-800">
            <ChevronLeft className="h-5 w-5 mr-1" /> Back to Course
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Main Video Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
              {activeLecture?.videoUrl ? (
                <video key={activeLecture._id} controls className="w-full h-full" src={activeLecture.videoUrl} />
              ) : (
                <div className="flex items-center justify-center h-full text-white"><p>Select a lecture</p></div>
              )}
            </div>

            <div className="mt-6">
              <h2 className="text-3xl font-bold text-gray-900">{activeLecture?.lectureTitle}</h2>
              <div className="mt-4 text-gray-600 prose prose-zinc max-w-none" dangerouslySetInnerHTML={{ __html: course?.description }} />
            </div>
          </div>
        </div>

        {/* Sidebar: Lecture List */}
        <div className="w-full lg:w-96 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="p-6 border-b sticky top-0 bg-white z-10">
            <h2 className="font-bold text-lg">Course Content</h2>
            <p className="text-sm text-indigo-500">{completedLectures.length} / {lectures.length} Completed</p>
          </div>

          <div className="divide-y">
            {lectures.map((lecture, index) => {
              const isLectureDone = completedLectures.some((id) => String(id) === String(lecture._id));
              const isActive = activeLecture?._id === lecture._id;

              return (
                <button
                  key={lecture._id}
                  onClick={() => setCurrentLecture(lecture)}
                  className={`w-full flex items-center gap-4 p-4 text-left transition-colors ${isActive ? "bg-blue-50 border-l-4 border-blue-600" : "hover:bg-gray-50"}`}
                >
                  <div className="shrink-0">
                    {isLectureDone ? (
                      <CheckCircle className="h-6 w-6 text-emerald-500" />
                    ) : isActive ? (
                      <PlayCircle className="h-6 w-6 text-blue-600" />
                    ) : (
                      <div className="h-6 w-6 rounded-full border-2 flex items-center justify-center text-xs font-bold text-gray-400">
                        {index + 1}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${isLectureDone ? "text-emerald-700" : "text-gray-700"}`}>
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
