import App from "../App";
import Home from "@/pages/public/Home";
import Bike from "@/pages/public/Bike";
import Bikes from "@/pages/public/Bikes";
import Profile from "@/pages/user/Profile";
import MyOrders from "@/pages/user/Orders";
import MyCart from "@/pages/public/MyCart";
import AboutUs from "@/pages/public/AboutUs";
import Error404 from "@/pages/public/Error404";
import { USER_ROLE } from "@/constants/Constant";
import ManageUsers from "@/pages/admin/ManageUsers";
import ManageBikes from "@/pages/admin/ManageBikes";
import Dashboard from "@/component/layout/Dashboard";
import { createBrowserRouter } from "react-router-dom";
import { ManageOrders } from "@/pages/admin/ManageOrders";

const router = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    element: <App />,
    errorElement: <Error404 />,
    children: [
      { index: true, element: <Home /> },
      { path: "bikes", element: <Bikes /> },
      { path: "bike/:id", element: <Bike /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "my-cart", element: <MyCart /> },
    ],
  },

  // Protected Routes
  // Shared Routes
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <Error404 />,
    children: [{ index: true, element: <Profile /> }],
  },
  // Customer Routes
  {
    path: "/dashboard",
    element: <Dashboard role={[USER_ROLE.customer]} />,
    errorElement: <Error404 />,
    children: [{ path: "my-orders", element: <MyOrders /> }],
  },
  // Admin Routes
  {
    path: "/dashboard",
    element: <Dashboard role={[USER_ROLE.admin]} />,
    errorElement: <Error404 />,
    children: [
      { path: "users", element: <ManageUsers /> },
      { path: "bikes", element: <ManageBikes /> },
      { path: "orders", element: <ManageOrders /> },
    ],
  },
]);

export default router;
