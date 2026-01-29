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
  const { data: courseData, isSuccess: isGetSuccess } = useGetCourseByIdQuery(courseId);
  const isPublished = "false";
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: ""
  });
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [editCourse, { isSuccess, isLoading, error }] = useEditCourseMutation();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };
  const fileChangeHandler = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const selectThumbnail = (e) => {
  const selectedFile = e.target.files?.[0];
  if (selectedFile) {
    setFile(selectedFile); // Store the actual file for upload
    const fileReader = new FileReader();
    fileReader.onload = () => setPreviewThumbnail(fileReader.result);
    fileReader.readAsDataURL(selectedFile);
  }
};

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

  // 1. Hook to pre-fill data when loading the page
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

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course updated successfully!");
      navigate("/admin/course");
    }
    if (error) {
      toast.error(error.data?.message || "Failed to update course");
    }
  }, [isSuccess, navigate, error]); 


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
          <Button variant="outline" >
            {
              isPublished ? "Unpublished" : "Publish"
            }
          </Button>
          <Button>
            Remove Course
          </Button>
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
           <div>
                    <Label className="font-bold text-lg">Category</Label>
                    <Select onValueChange={selectCategory}>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label>Course Level</Label>
            <Select onValueChange={selectCourseLevel}>
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Select a Course Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Course Level</SelectLabel>
                  <SelectItem value="Beignner">Beginner</SelectItem>      
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Advance">Advance</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label>Course Price (INR)</Label>
            <Input
              type="number"
              name="coursePrice"
              value={input.coursePrice}
              onChange={changeEventHandler}
              placeholder="999"
              className="w-fit"
            />
          </div>
          <div>
            <Label>Course Thumbnail</Label>
            <Input
            type="file"
            accept="image/"
            onChange={selectThumbnail}
            className="fit"
            />
            {
              previewThumbnail && (
                <img src={previewThumbnail} className="w-64 my-2 alt=course Thumnail"/>
              )
            }
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/admin/course")}>Cancel</Button>
          <Button disabled={isLoading} onClick={updateCourseHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
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