import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import { useNavigate, useParams } from "react-router-dom";
import { useEditCourseMutation, useGetCourseByIdQuery } from "@/features/api/courseApi";
import { toast } from "sonner";

const CourseTab = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
  });

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [file, setFile] = useState(null);

  // API Hooks
  const { data: courseData, isSuccess: isGetSuccess, isLoading: isGetLoading } = useGetCourseByIdQuery(courseId);
  const [editCourse, { isSuccess, isLoading: isEditLoading, error }] = useEditCourseMutation();

  // Handle Input Changes
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => setInput({ ...input, category: value });
  const selectCourseLevel = (value) => setInput({ ...input, courseLevel: value });

  const selectThumbnail = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const fileReader = new FileReader();
      fileReader.onload = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(selectedFile);
    }
  };

  // Pre-fill form data
  useEffect(() => {
    if (isGetSuccess && courseData?.course) {
      const course = courseData.course;
      setInput({
        courseTitle: course.courseTitle || "",
        subTitle: course.subTitle || "",
        description: course.description || "",
        category: course.category || "",
        courseLevel: course.courseLevel || "",
        coursePrice: course.coursePrice || "",
      });
      setPreviewThumbnail(course.courseThumbnail || "");
    }
  }, [isGetSuccess, courseData]);

  // Handle Mutation Results
  useEffect(() => {
    if (isSuccess) {
      toast.success("Course updated successfully!");
      navigate("/admin/course");
    }
    if (error) {
      toast.error(error.data?.message || "Failed to update course");
    }
  }, [isSuccess, error, navigate]);

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    if (file) {
      formData.append("courseThumbnail", file);
    }

    await editCourse({ courseId, formData });
  };

  // Loading state for initial data fetch
  if (isGetLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <span className="ml-2">Loading Course Data...</span>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Make changes to your course here. Click save when you're done.
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button variant="outline">
            {courseData?.course?.isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button variant="destructive">Remove Course</Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Label>Title</Label>
          <Input
            type="text"
            name="courseTitle"
            value={input.courseTitle}
            onChange={changeEventHandler}
            placeholder="Ex. Fullstack Developer"
          />
        </div>

        <div className="space-y-1">
          <Label>Subtitle</Label>
          <Input
            type="text"
            name="subTitle"
            value={input.subTitle}
            onChange={changeEventHandler}
            placeholder="Ex. Become a Fullstack Developer from scratch"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-lg font-medium">Detailed Description</Label>
          <RichTextEditor input={input} setInput={setInput} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <Label>Category</Label>
            <Select value={input.category} onValueChange={selectCategory}>
              <SelectTrigger className="w-full bg-gray-50">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Next JS">Next JS</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                  <SelectItem value="Fullstack Development">Fullstack Development</SelectItem>
                  <SelectItem value="MERN Stack">MERN Stack</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label>Course Level</Label>
            <Select value={input.courseLevel} onValueChange={selectCourseLevel}>
              <SelectTrigger className="w-full bg-gray-50">
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Advance">Advance</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label>Price (INR)</Label>
            <Input
              type="number"
              name="coursePrice"
              value={input.coursePrice}
              onChange={changeEventHandler}
              placeholder="999"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Course Thumbnail</Label>
          <Input 
            type="file" 
            accept="image/*" 
            onChange={selectThumbnail} 
            className="w-fit cursor-pointer" 
          />
          {previewThumbnail && (
            <div className="mt-2">
              <img 
                src={previewThumbnail} 
                alt="Course Preview" 
                className="w-64 rounded-md border" 
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 pt-4">
          <Button variant="outline" onClick={() => navigate("/admin/course")}>
            Cancel
          </Button>
          <Button disabled={isEditLoading} onClick={updateCourseHandler}>
            {isEditLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;