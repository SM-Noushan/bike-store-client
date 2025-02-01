import App from "../App";
import Home from "@/pages/public/Home";
import Bikes from "@/pages/public/Bikes";
import AboutUs from "@/pages/public/AboutUs";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
    ],
  },
]);

export default router;
