import ReactDOM from "react-dom/client";
import "./index.css";
import { Layout } from "./layouts/index.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index.tsx";
import ProductContextProvider from "./providers/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ProductContextProvider>
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  </ProductContextProvider>
);
