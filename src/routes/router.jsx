import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import SellerLayout from "../layouts/SellerLayout";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
