import React from 'react';
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
import { Loader2, UploadCloud } from "lucide-react"; 

const EditProfileDialog = () => {
  const isLoading = false; 

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-md border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 transition-all">
          Edit Profile
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Student Profile
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            Update your account details to keep your instructors informed.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 py-4">
          {/* Name Input Section */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Full Name
            </Label>
            <Input 
              id="name" 
              placeholder="Enter your name"
              autoComplete="name"
              defaultValue="Aarav Kumar"
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
                  <p className="text-xs text-slate-500">Click to upload or drag and drop</p>
                </div>
                <Input 
                  id="profilePhoto" 
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
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-6 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
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