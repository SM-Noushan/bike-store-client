import App from "../App";
import Home from "@/pages/public/Home";
import Bikes from "@/pages/public/Bikes";
import MyCart from "@/pages/public/MyCart";
import AboutUs from "@/pages/public/AboutUs";
import Error404 from "@/pages/public/Error404";
import { createBrowserRouter } from "react-router-dom";
import Bike from "@/pages/public/Bike";

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
]);

export default router;
