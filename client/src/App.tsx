import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import ForgotPassword from "./components/auth/ForgotPassword"
import ResetPassword from "./components/auth/ResetPassword"
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
import Loading from "./components/Loading"
import { useUserStore } from "./store/useUserStore"
import { useEffect } from "react"
import JoinWithUs from "./components/JoinWithUs"
import CityFoodCulture from "./components/CityFoodCulture" 
import DeliveredOrdersPage from "./DeliveredOrdersPage"
const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {

  const isAuthenticated = useUserStore((state) => state.isAuthenticated)

  return !isAuthenticated ? <Navigate to={"/login"} /> : children
}
const AdminRoutes = ({ children }: { children: React.ReactNode }) => {
  const user = useUserStore((state) => state.user);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!user?.isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};
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
        element: <ProtectedRoutes>
          <Profile />
        </ProtectedRoutes>
      },
      {
        path: '/search/:location',
        element:
         <SearchPage />
      },
      {
        path: '/restaurant/:id',
        element:
          <ProtectedRoutes>
            <Restaurant />
          </ProtectedRoutes>
      },
      {
        path: '/cart',
        element:
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
      },
      {
        path: '/order/success',
        element:
          <ProtectedRoutes>
            <Success />
          </ProtectedRoutes>
      },
      {
        path: '/order/delivered',
        element:
          <ProtectedRoutes>
            <DeliveredOrdersPage />
          </ProtectedRoutes>
      },
      {
        path: '/admin/restaurant',
        element: 
          <ProtectedRoutes>
              <RestaurantOwer />
          </ProtectedRoutes>
          
    
      },
      {
        path: '/admin/addMenu',
        element:
        <AdminRoutes>
           <AddMenu />
        </AdminRoutes>
      }, {
        path: '/admin/order',
        element: 
        <AdminRoutes>
          <Orders />
        </AdminRoutes>
      },
      ]
    },


    // common routes
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
      path: "/loading",
      element: <Loading />
    },{
      path : '/join',
      element : <JoinWithUs/>
    },
    {
      path : '/cities',
      element : <CityFoodCulture/>
    }

  ])
  const checkAuth = useUserStore((state)=>state.checkAuth)
  useEffect(()=>{ 
      checkAuth()
  },[checkAuth])
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
