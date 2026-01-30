import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Edit2, Trash2, PlusCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
const LectureTab = () => {
 
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
              <Switch />
            </div>
        </CardContent>
       
      </Card>
   
  );
};

export default LectureTab;