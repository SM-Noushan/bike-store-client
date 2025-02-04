import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { store } from "./app/store.ts";
import router from "./routes/Routes.tsx";
import { Toaster } from "./components/ui/sonner.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster duration={2500} theme="dark" position="top-center" />
    </Provider>
  </StrictMode>
);
