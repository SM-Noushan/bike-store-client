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
import Dashboard from "@/component/layout/Dashboard";
import { createBrowserRouter } from "react-router-dom";

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

  // Dashboard
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <Error404 />,
    children: [
      { index: true, element: <Profile /> },

      // Customer Routes
      {
        path: "my-orders",
        element: <Dashboard role={[USER_ROLE.customer]} />,
        children: [{ index: true, element: <MyOrders /> }],
      },

      // Admin Routes
      {
        path: "",
        element: <Dashboard role={[USER_ROLE.admin]} />,
        children: [
          { path: "users", element: "<Profile />" },
          { path: "bikes", element: "<Bikes />" },
          { path: "orders", element: "<Orders />" },
        ],
      },
    ],
  },
]);

export default router;
