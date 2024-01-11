import { createContext } from "react";
import { useProductStore } from "../hooks/useProductStore";

export const ProductContext = createContext(
  {} as ReturnType<typeof useProductStore>
);
