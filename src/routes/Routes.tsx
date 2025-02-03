import App from "../App";
import Home from "@/pages/public/Home";
import Bikes from "@/pages/public/Bikes";
import MyCart from "@/pages/public/MyCart";
import AboutUs from "@/pages/public/AboutUs";
import Error404 from "@/pages/public/Error404";
import { createBrowserRouter } from "react-router-dom";

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
