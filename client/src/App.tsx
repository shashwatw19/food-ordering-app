import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./auth/Login"
import Signup from "./auth/Signup"
import ForgotPassword from "./auth/ForgotPassword"
import ResetPassword from "./auth/ResetPassword"
import VerifyEmail from "./auth/VerifyEmail"
import MainLayout from "./layout/MainLayout"
import HeroSection from "./components/HeroSection"
import Profile from "./components/Profile"
import SearchPage from "./components/SearchPage"
import Restaurant from "./components/Restaurant"
function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [{
        path: '/',
        element: <HeroSection />,
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path : '/search/:result',
        element : <SearchPage/>
      },
      {
        path : '/restaurant/:id',
        element : <Restaurant/>
      }
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />
    },
    {
      path: "/reset-password",
      element: <ResetPassword />
    },
    {
      path: "/verify",
      element: <VerifyEmail />
    }

  ])

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
