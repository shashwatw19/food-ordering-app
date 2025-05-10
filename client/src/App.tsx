import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./auth/Login"
import Signup from "./auth/Signup"
import ForgotPassword from "./auth/ForgotPassword"
import ResetPassword from "./auth/ResetPassword"
import VerifyEmail from "./auth/VerifyEmail"
import Navbar from "./components/Navbar"
function App() {
  const appRouter = createBrowserRouter([
    {
    path : "/",
    element : <Navbar/>
    },
    {
      path : "/login",
      element : <Login/>
    },
    {
      path : "/signup",
      element : <Signup/>
    },
    {
      path : "/forgot-password",
      element :  <ForgotPassword/>
    },
    {
      path : "/reset-password",
      element : <ResetPassword/>
    },
    {
      path : "/verify",
      element : <VerifyEmail/>
    }
  
  ])  

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
