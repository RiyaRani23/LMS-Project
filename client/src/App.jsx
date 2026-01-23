import { createBrowserRouter } from 'react-router-dom'
import './App.css'
import Login from './pages/login.jsx'
import HeroSection from './pages/student/HeroSection'
import MainLayout from './Layout/MainLayout'
import { RouterProvider } from 'react-router'
import Courses from './pages/student/Courses'
import MyLearning from './pages/student/MyLearning'

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
        element:<MyLearning/>
      },
      
    ],
  },
  
])

function App() {

  return (
    <main>
     <RouterProvider router={appRouter}/>
    </main>
  )
}

export default App
