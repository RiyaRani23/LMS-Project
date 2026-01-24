import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, UploadCloud, User } from "lucide-react";
import { useLoadUserQuery } from "@/features/api/authApi";
import { toast } from "sonner";
import { useUpdateUserMutation } from "@/features/api/authApi";

const EditProfileDialog = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const { data, isLoading } = useLoadUserQuery();
  const [updateUser, { isLoading: updateUserIsLoading, isError, isSuccess }] = useUpdateUserMutation();

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
    }
  };

  const {user} = data;
 
  const updateUserHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    }
    
    await updateUser(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Profile updated!");
    }
    if (isError) {
      toast.error(isError.data?.message || "Something went wrong");
    }
  }, [isSuccess, isError, data]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600
    text-white border-none rounded-full px-8 py-2 font-semibold shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40
     transition-all duration-300 hover:shadow-indigo-400/50 hover:-translate-y-0.5 active:scale-95 w-full sm:w-auto"
        >
          Edit Profile
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Student Profile
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            Update your info to stay connected with your courses.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 py-4">
          {/* Name Input Section */}
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-bold text-slate-700 dark:text-slate-300"
            >
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-lg"
            />
          </div>

          {/* Photo Upload Section */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Profile Picture
            </Label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="profilePhoto"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="w-8 h-8 mb-2 text-slate-400" />
                  <p className="text-xs text-slate-500">
                    Click to upload or drag and drop
                  </p>
                </div>
                <Input
                  id="profilePhoto"
                  onChange={onChangeHandler}
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        <DialogFooter>
        <Button
          type="submit" 
          disabled={isLoading}
          onClick={updateUserHandler}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-6 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-[0.98]"
>
   {updateUserIsLoading ? (
    <>
      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      <span className="ml-2">Updating Profile...</span>
    </>
  ) : (
    "Save Changes"
  )}
</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
