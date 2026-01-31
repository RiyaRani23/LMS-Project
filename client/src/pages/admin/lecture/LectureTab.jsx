import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress"; 
import { useNavigate, useParams } from "react-router-dom";
import { useGetLectureByIdQuery, useRemoveLectureMutation } from "@/features/api/courseApi";
import { toast } from "sonner";

const LectureTab = () => {
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();

  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideo, setUploadVideo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [btnDisable, setBtnDisable] = useState(false);

  const { data: lectureData, isLoading: isGetLoading } = useGetLectureByIdQuery(lectureId);
  const [removeLecture] = useRemoveLectureMutation();

  useEffect(() => {
    if (lectureData?.lecture) {
      setLectureTitle(lectureData.lecture.lectureTitle);
      setIsFree(lectureData.lecture.isPreviewFree);
    }
  }, [lectureData]);

  const fileChangeHandler = (e) => {
  const file = e.target.files[0]; 
  
  if (file) {
    if (file.type.startsWith("video/")) {
      setUploadVideo(file);
      console.log("Selected file:", file.name);
    } else {
      toast.error("Please select a valid video file.");
      e.target.value = null; 
    }
  }
};

  const updateLectureHandler = async () => {
    const formData = new FormData();
    formData.append("lectureTitle", lectureTitle);
    formData.append("isPreviewFree", isFree);
    if (uploadVideo) formData.append("videoFile", uploadVideo);

    setIsUploading(true);
    setBtnDisable(true);

    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/course/${courseId}/lecture/${lectureId}`, 
        formData, 
        {
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Lecture updated!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update lecture");
    } finally {
      setIsUploading(false);
      setBtnDisable(false);
      setUploadProgress(0); // Reset for next time
    }
  };

  if (isGetLoading) return <Loader2 className="animate-spin mx-auto mt-10" />;
 
  return (   
      <Card>
        <CardHeader className="flex justify-between">
            <div>
                <CardTitle className="text-xl">Edit Lecture</CardTitle>
          <CardDescription>
            Make Changes and click save when done.
          </CardDescription>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="destructive">Remove Lecture</Button>
            </div>
          
        </CardHeader>
        <CardContent>
            <div>
                <label>Title</label>
                <Input
                type="text"
                placeholder="Ex. Introduction to JavaScript"
                />
            </div>
            <div className="my-5">
                <label>Video <span className="text-red-500">*</span></label>
                <Input
                type="file"
                accept="video/*"
                placeholder="Ex. Introduction to JavaScript"
                className="w-fit"
                />
            </div>
            <div className="flex items-center space-x-2 my-5">
              <Switch id="airplane-mode"/>
              <Label htmlFor="airplane-mode">Is the video FREE</Label>
            </div>
            <div className="mt-4">
              <Button>Update Lecture</Button>
            </div>
        </CardContent>
       
      </Card>
   
  );
};

export default LectureTab;