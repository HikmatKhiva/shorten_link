import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import ProtectRoute from "./middleware/ProtectRoute";
import LoginLayout from "./layouts/LoginLayout";
import { Suspense, lazy } from "react";
import LoadingPage from "./components/LoadingPage";
const LinksPage = lazy(() => import("./pages/LinksPage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const CreateLink = lazy(() => import("./pages/CreateLink"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const routes = createBrowserRouter([
  {
    path: "/",
    errorElement: (
      <Suspense fallback={<LoadingPage />}>
        <ErrorPage />,
      </Suspense>
    ),
    element: (
      <ProtectRoute>
        <Layout />
      </ProtectRoute>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <LinksPage />
          </Suspense>
        ),
      },
      {
        path: "/create",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <CreateLink />,
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <PageNotFound />,
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <LoginLayout />,
    errorElement: (
      <Suspense fallback={<LoadingPage />}>
        <ErrorPage />,
      </Suspense>
    ),
    children: [
      {
        path: "/login",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <RegisterPage />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <PageNotFound />,
          </Suspense>
        ),
      },
    ],
  },
]);
export const Routes = () => <RouterProvider router={routes} />;
