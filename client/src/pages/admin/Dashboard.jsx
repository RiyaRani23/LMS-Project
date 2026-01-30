import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IndianRupee, Users, BookOpen, TrendingUp, Loader2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
 import { useGetCreatorCoursesQuery } from "@/features/api/courseApi";
import CourseTable from "./course/CourseTable";

const Dashboard = () => {
  const { data, isLoading } = useGetCreatorCoursesQuery();

  if (isLoading) return <Loader2 className="animate-spin mx-auto mt-20" />;

  // --- 1. Logic to calculate stats ---
  const courses = data?.courses || [];
  const totalRevenue = courses.reduce((acc, course) => acc + (course.coursePrice * (course.enrolledStudents?.length || 0)), 0);
  const totalSales = courses.reduce((acc, course) => acc + (course.enrolledStudents?.length || 0), 0);
  
  // --- 2. Logic for the Chart (Mock data based on your courses) ---
  const chartData = courses.map(course => ({
    name: course.courseTitle.substring(0, 10) + "...",
    revenue: course.coursePrice * (course.enrolledStudents?.length || 0),
    sales: course.enrolledStudents?.length || 0
  }));

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Instructor Analytics</h1>

      {/* --- Stats Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 dark:bg-blue-900/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">{totalRevenue}</CardTitle>
            <IndianRupee className="h-4 w-4" />
          </CardHeader>
          <CardContent>
           <div className="text-2xl font-bold text-blue-600">₹</div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 dark:bg-green-900/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Total Sales (Enrollments)</CardTitle>
            <Users className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalSales}</div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 dark:bg-purple-900/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">courses.length</div>
          </CardContent>
        </Card>
      </div>

      {/* --- Revenue Graph --- */}
      <Card className="p-4">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="text-indigo-500" /> Revenue per Course
          </CardTitle>
        </CardHeader>
        <CardContent className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
              <Tooltip 
                contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* --- Course List --- */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Course Management</h2>
        <CourseTable  />
      </div>
    </div>
  );
};

export default Dashboard;