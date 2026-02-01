import React from "react";
import { useParams } from "react-router-dom";
import { useGetCourseByIdQuery } from "@/features/api/courseApi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlayCircle, Lock, BookOpen, Clock } from "lucide-react";

const CourseDetail = () => {
  const { courseId } = useParams();
  const { data, isLoading, isError } = useGetCourseByIdQuery(courseId);

  if (isLoading) return <p className="text-center py-10">Loading course details...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Error loading course.</p>;

  const { course } = data;

  return (
    <div className="mt-20 space-y-10 px-4 md:px-0 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white p-8 rounded-2xl flex flex-col md:flex-row gap-8 items-center shadow-xl">
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl md:text-4xl font-extrabold">{course.courseTitle}</h1>
          <p className="text-gray-400 text-lg">{course.subTitle || "Master this course from scratch with real-world projects."}</p>
          <div className="flex items-center gap-3">
            <Badge className="bg-blue-600">{course.courseLevel}</Badge>
            <span className="text-sm text-gray-300">Created by <span className="text-blue-400 font-bold">{course.creator?.name}</span></span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
             <div className="flex items-center gap-1"><BookOpen size={16}/> {course.lectures?.length} Lectures</div>
             <div className="flex items-center gap-1"><Clock size={16}/> Last updated {new Date(course.updatedAt).toLocaleDateString()}</div>
          </div>
        </div>

        {/* Purchase Card */}
        <Card className="w-full md:w-80 shadow-2xl border-none overflow-hidden">
          <img src={course.courseThumbnail} alt="thumbnail" className="w-full h-44 object-cover" />
          <CardContent className="p-6 space-y-4">
            <div className="text-3xl font-bold">₹{course.coursePrice}</div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Buy Now</Button>
            <p className="text-xs text-center text-gray-500">30-Day Money-Back Guarantee</p>
          </CardContent>
        </Card>
      </div>

      {/* Course Content & Description */}
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <div 
              className="text-gray-700 leading-relaxed" 
              dangerouslySetInnerHTML={{ __html: course.description || "No description provided." }} 
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Course Content</h2>
            <div className="border rounded-xl overflow-hidden">
              {course.lectures?.map((lecture, index) => (
                <div key={lecture._id} className="flex items-center justify-between p-4 border-b last:border-none bg-white hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 font-medium">{index + 1}.</span>
                    <PlayCircle size={20} className="text-blue-600" />
                    <span className="font-medium">{lecture.lectureTitle}</span>
                  </div>
                  {lecture.isPreviewFree ? (
                    <Badge variant="outline" className="text-green-600 border-green-200">Free Preview</Badge>
                  ) : (
                    <Lock size={18} className="text-gray-400" />
                  )}
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