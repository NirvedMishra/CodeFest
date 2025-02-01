import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Editor from "./Editor/Editor.jsx";
import Login from "./Authentication/Login.jsx";
import PrivateRoute from "./router/PrivateRoute.jsx";
import Register from "./Authentication/Register.jsx";
import LoginRoute from "./router/LoginRoute.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path="/" element={<App />}>
      <Route path="/Editor" element={<PrivateRoute><Editor /></PrivateRoute>} />
      <Route path="/Login" element={<LoginRoute><Login /></LoginRoute>} />
      <Route path="/register" element={<LoginRoute><Register /></LoginRoute>} />
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />

  </StrictMode>
);
