import { createBrowserRouter } from "react-router-dom";
import { Home } from "../containers/Home";
import { ErrorBoundary } from "../containers/ErrorBoundary";
import { ProductDetail } from "../containers/ProductDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/detail/:id",
    element: <ProductDetail />,
    errorElement: <ErrorBoundary />,
  },
]);
