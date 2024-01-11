import { ReactNode } from "react";
import { useProductStore } from "../hooks/useProductStore";
import { ProductContext } from "../context";

const ProductContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ProductContext.Provider value={useProductStore()}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
