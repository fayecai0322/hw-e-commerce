import { lazy, Suspense, type ReactNode } from "react";
import { createHashRouter } from "react-router-dom";
import { Spinner } from "../components/ui/Spinner";
import RouteErrorBoundary from "../components/errors/RouteErrorBoundary";

import GlobalErrorPage from "../components/errors/GlobalErrorPage";
import RootLayout from "../components/layout/RootLayout";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";

const Home = lazy(() => import("../features/products/pages/Home"));
const Products = lazy(() => import("../features/products/pages/Products"));
const ProductDetail = lazy(
  () => import("../features/products/pages/ProductDetail"),
);
const Cart = lazy(() => import("../features/cart/pages/Cart"));
const Login = lazy(() => import("../features/auth/pages/Login"));
const Signup = lazy(() => import("../features/auth/pages/Signup"));
const Settings = lazy(() => import("../features/settings/pages/Settings"));

const withRouteBoundary = (name: string, element: ReactNode) => (
  <RouteErrorBoundary name={name}>
    <Suspense fallback={<Spinner />}>{element}</Suspense>
  </RouteErrorBoundary>
);

export const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <GlobalErrorPage />,
    children: [
      { index: true, element: withRouteBoundary("Home", <Home />) },
      {
        path: "products",
        element: withRouteBoundary("Products", <Products />),
      },
      {
        path: "products/:id",
        element: withRouteBoundary("ProductDetail", <ProductDetail />),
      },
      { path: "login", element: withRouteBoundary("Login", <Login />) },
      { path: "signup", element: withRouteBoundary("Signup", <Signup />) },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "cart",
            element: withRouteBoundary("Cart", <Cart />),
          },
          {
            path: "settings",
            element: withRouteBoundary("Settings", <Settings />),
          },
        ],
      },
    ],
  },
]);
