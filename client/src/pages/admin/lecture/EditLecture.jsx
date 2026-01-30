import { Link, useParams } from "react-router-dom";
import LectureTab from "./LectureTab";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const EditLecture = () => {
  const { courseId } = useParams();

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Link to={`/admin/course/${courseId}/lecture`}>
            <Button variant="outline" size="icon" className="rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="font-bold text-xl">Edit Lecture</h1>
        </div>
      </div>
      <LectureTab />
    </div>
  );
};

export default EditLecture;
