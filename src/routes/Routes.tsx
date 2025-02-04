import App from "../App";
import Home from "@/pages/public/Home";
import Bike from "@/pages/public/Bike";
import Bikes from "@/pages/public/Bikes";
import Profile from "@/pages/user/Profile";
import MyOrders from "@/pages/user/Orders";
import MyCart from "@/pages/public/MyCart";
import AboutUs from "@/pages/public/AboutUs";
import Error404 from "@/pages/public/Error404";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "@/component/layout/Sidebar/SidebarLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "bikes",
        element: <Bikes />,
      },
      {
        path: "bike/:id",
        element: <Bike />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "my-cart",
        element: <MyCart />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: <Profile />,
      },{
        path: "my-orders",
        element: <MyOrders />,
      }
    ],
  },
]);

export default router;
