import { Button } from './components/ui/button'


import './App.css'
import { Login } from './pages/Login'
import HeroSection from './pages/student/HeroSection'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import { MainLayout } from './Layout/MainLayout'
import Courses from './pages/student/Courses'
import { MyLearning } from './pages/student/MyLearning'
import { Profile } from './pages/student/Profile'
import { Course } from './pages/student/Course'
import Sidebar from './pages/admin/Sidebar'
import Dashboard from './pages/admin/Dashboard'
import CourseTable from './pages/admin/course/CourseTable'
import AddCourse from './pages/admin/course/AddCourse'
import EditCourse from './pages/admin/course/EditCourse'
import CreateLecture from './pages/admin/Lecture/CreateLecture'
import EditLecture from './pages/admin/Lecture/EditLecture'
import CourseDetails from './pages/student/CourseDetails'
import Progress from './pages/student/CourseProgress'
import SearchPage from './pages/student/SearchPage'
import { AdminRoutes, AuthenticatedUser, ProtectedRoute } from './components/ProtectedRoute'
import PurchaseCourseProtected from './components/PurchaseCourseProtected'
import { ThemeProvider } from './components/ThemeProvider'

function App() {

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element:
            <>
              <HeroSection />
              <Courses />
            </>
        },
        {
          path: "login",
          element: <AuthenticatedUser><Login /></AuthenticatedUser>
        },
        {
          path: "signup",
          element: <AuthenticatedUser><Login /></AuthenticatedUser>
        },
        {
          path: "my-learning",
          element: <ProtectedRoute><MyLearning /></ProtectedRoute>
        },
        {
          path: "profile",
          element: <Profile />
        },
        {
          path: "course-progress/:courseId",
          element: <ProtectedRoute><PurchaseCourseProtected><Progress /></PurchaseCourseProtected></ProtectedRoute>
        },
        {
          path: "course-detail/:courseId",
          element: <ProtectedRoute><CourseDetails /></ProtectedRoute>
        },
        {
          path: "course/search",
          element: <ProtectedRoute><SearchPage /></ProtectedRoute>
        },
        // admin routes start from here
        {
          path: "admin",
          element: <AdminRoutes><Sidebar />,</AdminRoutes>,
          children: [
            {
              path: "dashboard",
              element: <Dashboard />
            },
            {
              path: "course",
              element: <CourseTable />
            },
            {
              path: "course/create",
              element: <AddCourse />
            },
            {
              path: "course/:courseId",
              element: <EditCourse />
            },

            {
              path: "course/:courseId/lecture",
              element: <CreateLecture />
            },
            {
              path: "course/:courseId/lecture/:lectureId",
              element: <EditLecture />
            }
          ]
        }

      ]

    }
  ])


  return (
    <>
      <main className='overflow-y-hidden'>
        <ThemeProvider>
          <RouterProvider router={appRouter} />
        </ThemeProvider>
      </main>

    </>
  )
}

export default App
