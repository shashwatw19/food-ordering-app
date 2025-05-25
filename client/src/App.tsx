import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import ForgotPassword from "./components/auth/ForgotPassword"
import ResetPassword from "./components/auth/ResetPassword"
import VerifyEmail from "./components/auth/VerifyEmail"
import MainLayout from "./layout/MainLayout"
import HeroSection from "./components/HeroSection"
import Profile from "./components/Profile"
import SearchPage from "./components/SearchPage"
import Restaurant from "./components/Restaurant"
import Cart from "./components/Cart"
import RestaurantOwer from "./components/admin/RestaurantOwer"
import AddMenu from "./components/admin/AddMenu"
import Orders from "./components/admin/Orders"
import Success from "./components/Success"
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
      },
      {
        path : '/cart',
        element : <Cart/>
      },
      {
        path : '/order/success',
        element : <Success/>
      },
      // admin functions start here
      {
        path : '/admin/restaurant',
        element : <RestaurantOwer/>
      },
      {
         path : '/admin/addMenu',
        element : <AddMenu/>
      },{
        path : '/admin/order',
        element : <Orders/>
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
