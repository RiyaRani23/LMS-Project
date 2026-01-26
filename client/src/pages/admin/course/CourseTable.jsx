import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { useGetCreatorCoursesQuery } from "@/features/api/courseApi";

const CourseTable = () => {
  const navigate = useNavigate();
  
  // Fetching data using RTK Query
//   const { data, isLoading } = useGetCreatorCoursesQuery();

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-40">
//         <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
//       </div>
//     );
//   }

  return (
    <div className="bg-white dark:bg-zinc-900 border rounded-xl shadow-sm p-4 mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Manage Courses</h2>
        <Button onClick={() => navigate("create")} size="sm">
          Add New Course
        </Button>
      </div>

      <Table>
        <TableCaption>A list of courses you have created.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {data?.courses?.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="font-medium">
                {course.coursePrice ? `₹${course.coursePrice}` : "Free"}
              </TableCell>
              <TableCell>
                <Badge variant={course.isPublished ? "success" : "secondary"}>
                  {course.isPublished ? "Published" : "Draft"}
                </Badge>
              </TableCell>
              <TableCell className="font-semibold uppercase truncate max-w-[200px]">
                {course.courseTitle}
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => navigate(`/admin/course/${course._id}`)}
                >
                  <Edit size={18} />
                </Button>
              </TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>

      {/* {data?.courses?.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No courses found. Start by creating one!
        </div>
      )} */}
    </div>
  );
};

export default CourseTable;