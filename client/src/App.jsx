import { createBrowserRouter } from 'react-router-dom'
import './App.css'
import Login from './pages/login.jsx'
import HeroSection from './pages/student/HeroSection'
import MainLayout from './Layout/MainLayout'
import { RouterProvider } from 'react-router'
import Courses from './pages/student/Courses'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile/Profile'
import CourseTable from './pages/admin/course/CourseTable'
import Dashboard from './pages/admin/Dashboard'
import Sidebar from './pages/admin/Sidebar'
import AddCourse from './pages/admin/course/AddCourse'
import EditCourse from './pages/admin/course/EditCourse'
import CreateLecture from './pages/admin/lecture/CreateLecture'
import EditLecture from './pages/admin/lecture/EditLecture'
import { Toaster } from "@/components/ui/sonner";

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout/>,
    children:[
      {
        path:'/',
        element:
        <>
        <HeroSection/>
        <Courses/>
        </>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:"my-learning",
        element:<MyLearning/>
      },
      {
        path:"profile",
        element:<Profile/>
      },
      
      {
         path:"admin",
         element:<Sidebar/>,
         children:[
          {
            path:"dashboard",
            element:<Dashboard/>
          },
          {
            path:"course",
            element:<CourseTable/>
          },
          {
            path:"course/create",
            element:<AddCourse/>
          },
          {
            path:"course/:courseId",
            element:<EditCourse/>
          },
          {
            path:"course/:courseId/lecture",
            element:<CreateLecture/>
          },
           {
            path: "course/:courseId/lecture/:lectureId",
            element: <EditLecture/>,
          },
         ]
      }
      
    ],
  },
  
])

function App() {

  return (
    <main>
     <RouterProvider router={appRouter}/>
     <Toaster />
    </main>
  )
}

export default App
