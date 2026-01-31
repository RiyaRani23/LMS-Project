import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Trash2, Save } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress"; 
import { useNavigate, useParams } from "react-router-dom";
import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from "@/features/api/courseApi";
import { toast } from "sonner";

const LectureTab = () => {
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();

  // States
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideo, setUploadVideo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [btnDisable, setBtnDisable] = useState(false);

  // RTK Query Hooks
  const { data: lectureData, isLoading: isGetLoading } = useGetLectureByIdQuery(lectureId);
  const [removeLecture, { isLoading: isRemoving }] = useRemoveLectureMutation();
  const [editLecture, {data, isLoading, error, isSuccess}] = useEditLectureMutation();

  // Pre-fill data when fetched
  useEffect(() => {
    if (lectureData?.lecture) {
      setLectureTitle(lectureData.lecture.lectureTitle);
      setIsFree(lectureData.lecture.isPreviewFree);
    }
  }, [lectureData]);

  // Handler: Local file selection
  const fileChangeHandler = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      if (file.type.startsWith("video/")) {
        setUploadVideo(file);
      } else {
        toast.error("Please select a valid video file.");
        e.target.value = null; 
      }
    }
  };

  // Handler: Update API call with progress
  const updateLectureHandler = async () => {
    const formData = new FormData();
    formData.append("lectureTitle", lectureTitle);
    formData.append("isPreviewFree", isFree);
    if (uploadVideo) formData.append("videoFile", uploadVideo);

    setIsUploading(true);
    setBtnDisable(true);

    try {
      const res = await axios.patch(
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
      toast.error(error.response?.data?.message || "Failed to update lecture");
    } finally {
      setIsUploading(false);
      setBtnDisable(false);
      setUploadProgress(0);
    }
  };

  // Handler: Remove lecture
  const removeLectureHandler = async () => {
    if(window.confirm("Are you sure you want to delete this lecture?")) {
        await removeLecture(lectureId);
        toast.success("Lecture removed successfully");
        navigate(`/admin/course/${courseId}/lecture`);
    }
  };

  if (isGetLoading) return <div className="flex justify-center mt-10"><Loader2 className="animate-spin h-8 w-8 text-blue-600" /></div>;
  
  return ( 
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">Edit Lecture</CardTitle>
            <CardDescription>
              Make changes and click save when done.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              disabled={btnDisable || isRemoving} 
              variant="destructive" 
              onClick={removeLectureHandler}
            >
              {isRemoving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />}
              Remove Lecture
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Title Input */}
          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
              placeholder="Ex. Introduction to JavaScript"
            />
          </div>

          {/* Video Selection */}
          <div className="space-y-1">
            <Label>Video <span className="text-red-500">*</span></Label>
            <Input
              type="file"
              accept="video/*"
              onChange={fileChangeHandler}
              className="w-fit cursor-pointer"
            />
          </div>

          {/* Free Preview Switch */}
          <div className="flex items-center space-x-2">
            <Switch 
              id="free-mode" 
              checked={isFree} 
              onCheckedChange={setIsFree} 
            />
            <Label htmlFor="free-mode">Is the video FREE</Label>
          </div>

          {/* Upload Progress Bar */}
          {isUploading && (
            <div className="space-y-2">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-xs text-center text-gray-500">{uploadProgress}% uploaded</p>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-4">
            <Button disabled={btnDisable} onClick={updateLectureHandler} className="bg-blue-500">
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Update Lecture
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
  );
};

export default LectureTab;