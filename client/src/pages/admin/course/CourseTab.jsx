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

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    thumbnail: ""
  });

  const isLoading = false; // We will connect this to RTK Query later

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>
          Make changes to your course here. Click save when you're done.
        </CardDescription>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label>Category</Label>
            <Select onValueChange={selectCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="Next JS">Next JS</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                  <SelectItem value="Fullstack Development">Fullstack Development</SelectItem>
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
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Cancel</Button>
          <Button disabled={isLoading}>
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