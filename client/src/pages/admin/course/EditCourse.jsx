import React from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import CourseTab from "./CourseTab";

const EditCourse = () => {
  const params = useParams();
  const courseId = params.courseId;

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Link to="/admin/course">
            <Button size="icon" variant="outline" className="rounded-full">
              <ArrowLeft size={16} />
            </Button>
          </Link>
          <h1 className="font-bold text-xl">Edit Course Details</h1>
        </div>
        <Link to={`/admin/course/${courseId}/lecture`}>
          <Button variant="link" className="text-indigo-600">
            Go to lectures page
          </Button>
        </Link>
      </div>

      {/* Rendering the Tab Component */}
      <CourseTab />
    </div>
  );
};

export default EditCourse;