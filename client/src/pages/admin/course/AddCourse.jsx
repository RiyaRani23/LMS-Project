import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
   const [category, setCategory] = useState("");

   const [createCourse, { data, isLoading, isSuccess, error }] = useCreateCourseMutation();
   const navigate = useNavigate();

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  const createCourseHandler = async () => {
    await createCourse({ courseTitle, category });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course created.");
      navigate("/admin/course"); // Redirect back to dashboard or to edit page
    }
  }, [isSuccess, error]);

  return (
    <div className="flex-1 mx-10 mt-15">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets add course, add some basic course details for your new course
        </h1>
        <p className="text-sm">
          You can change these details later in course edit section.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label className="font-bold text-lg">Title</Label>
          <Input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Your Course Name"
            className="bg-gray-100"
          />
        </div>
        <div>
          <Label className="font-bold text-lg">Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-45 bg-gray-100">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="Next JS">Next JS</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                <SelectItem value="Fullstack Development">Fullstack Development</SelectItem>
                <SelectItem value="MERN Stack">MERN Stack</SelectItem>
                <SelectItem value="Javascript">Javascript</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="Docker">Docker</SelectItem>
                <SelectItem value="MongoDB">MongoDB</SelectItem>
                <SelectItem value="HTML">HTML</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
           <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => navigate("/admin/course")}>
            Back
          </Button>
           <Button disabled={isLoading} onClick={createCourseHandler}
           className="bg-blue-400 hover:bg-blue-500">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create"
            )}
          </Button>  
        </div>
      </div>
    </div>
  );
};

export default AddCourse;