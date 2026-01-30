import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useCreateLectureMutation, useGetCourseLecturesQuery } from "@/features/api/courseApi";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [createLecture, { isLoading, isSuccess, error }] = useCreateLectureMutation();
  const { data: lectureData, isLoading: lectureLoading } = useGetCourseLecturesQuery(courseId);

  const createLectureHandler = async () => {
    if (!lectureTitle) {
      toast.error("Lecture title is required");
      return;
    }
    await createLecture({ courseId, lectureTitle });
  };

  useEffect(() => {
    if (isSuccess) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLectureTitle("");
      toast.success("Lecture created successfully!");
    }
    if (error) {
      toast.error(error.data?.message || "Failed to create lecture");
    }
  }, [isSuccess, error]);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Let's add a lecture, add some basic details for your new lecture
        </h1>
        <p className="text-sm">
          You can upload videos and add descriptions in the lecture edit section.
        </p>
      </div>

      <div className="space-y-4">
        {/* Title Input */}
        <div>
          <Label className="font-bold text-lg">Lecture Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Ex. Introduction to React Hooks"
            className="bg-gray-100"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            Back to Course
          </Button>
          <Button 
            disabled={isLoading} 
            onClick={createLectureHandler}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create Lecture"
            )}
          </Button>
        </div>

        <div className="mt-10">
          <h2 className="font-bold text-lg mb-4">Existing Lectures</h2>
           {lectureLoading ? (
            <div className="flex items-center gap-2 text-gray-500">
                <Loader2 className="h-4 w-4 animate-spin" /> 
                Loading lectures...
            </div>
          ) : (
            <div className="space-y-2 ">
              {lectureData?.lectures?.length > 0 ? (
                lectureData.lectures.map((lecture, index) => (
                  <div 
                    key={lecture._id} 
                    className="flex items-center justify-between p-4 bg-gray-200 border rounded-lg"
                  >
                    <span className="font-medium">
                        Lecture {index + 1}: {lecture.lectureTitle}
                    </span>
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-blue-600"
                        onClick={() => navigate(`${lecture._id}`)}
                    >
                        Edit
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">No lectures added yet.</p>
              )}
            </div> 
           )} 
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;