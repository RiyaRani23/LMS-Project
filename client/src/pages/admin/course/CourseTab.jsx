import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const CourseTab = () => {
  const isPublished = "false";
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    thumbnail: ""
  });
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const navigate = useNavigate;
  const isLoading = false; // We will connect this to RTK Query later

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

  // get file
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if(file){
      setInput({...input, courseThumnail:file});
      const fileReader = new FileReader();
      fileReader.onload = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler =() => {
    console.log(input);
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
          <Button variant="outline" onclick={() => navigate("/admin/course")}>Cancel</Button>
          <Button disabled={isLoading} onclick={updateCourseHandler}>
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