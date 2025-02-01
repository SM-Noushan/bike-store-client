import App from "../App";
import Home from "@/pages/public/Home";
import AboutUs from "@/pages/public/AboutUs";
import Products from "@/pages/public/Products";
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
        path: "products",
        element: <Products />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
    ],
  },
]);

export default router;
