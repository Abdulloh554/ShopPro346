import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import SellerLayout from "../layouts/SellerLayout";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import AboutUs from "../pages/AboutUs";
import Like from "../pages/Like";
import Card from "../pages/Card";
import Login from "../pages/Login";
import Register from "../pages/Register";

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
    path: "/admin",
    element: <AdminLayout />,
  },
  {
    path: "/seller",
    element: <SellerLayout />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
