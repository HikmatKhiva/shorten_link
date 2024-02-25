import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import LazyLoad from "./layouts/LazyLoad";
import ProtectRoute from "./middleware/ProtectRoute";
import LoginLayout from "./layouts/LoginLayout";
import ErrorPage from "./pages/ErrorPage";
import PageNotFound from "./pages/PageNotFound";
export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: (
      <ProtectRoute>
        <Layout />
      </ProtectRoute>
    ),
    children: [
      {
        path: "/",
        element: <LazyLoad pageName="../pages/LinksPage" />,
      },
      {
        path: "/create",
        element: <LazyLoad pageName="../pages/CreateLink" />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
  {
    path: "/",
    element: <LoginLayout />,
    children: [
      {
        path: "/login",
        element: <LazyLoad pageName="../pages/auth/LoginPage" />,
      },
      {
        path: "/register",
        element: <LazyLoad pageName="../pages/auth/RegisterPage" />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);
