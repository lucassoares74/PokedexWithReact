import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import SearchPage from "./pages/SearchPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Search } from "lucide-react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/Search",
    element: <SearchPage></SearchPage>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
