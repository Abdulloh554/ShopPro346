import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import AboutUs from "../pages/AboutUs";
import Like from "../pages/Like";
import Card from "../pages/Card";
import Login from "../pages/Login";
import Register from "../pages/Register";
import LoginAdmin from "../pages/admin/LoginAdmin";
import ProtectedRoute from "../pages/admin/ProtectedRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ProductManagement from "../pages/admin/ProductManagement";
import UserManagement from "../pages/admin/UserManagement";
import CarouselManagement from "../pages/admin/CarouselManagement";
import SellerDashboard from "../pages/seller/SellerDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children:[
      {
        index: true,
        element:<Home/>,
      },  
      {
        path:"/contact",
        element:<Contact/>,
      },
      {
        path:"/aboutus",
        element:<AboutUs/>,
      },
      {
        path:"/like",
        element:<Like/>
      },
      {
        path:"/card",
        element:<Card/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/register",
        element:<Register/>
      },
    ]
  },
  {
    path:"/admin-login",
    element:<LoginAdmin/>
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "products",
        element: <ProductManagement />,
      },
      {
        path: "users",
        element: <UserManagement />,
      },
      {
        path: "carousels",
        element: <CarouselManagement />,
      },
      {
        path: "orders",
        element: <SellerDashboard />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
