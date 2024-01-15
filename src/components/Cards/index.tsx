import { FC, ReactNode } from "react";
import { Product } from "../../models";
import { Card } from "./Card";
import styles from "./cards.module.scss";

interface ICard {
  products: Product[];
  handleAddProduct: (product: Product) => void;
}

export const Cards: FC<ICard> = ({ products, handleAddProduct }): ReactNode => {
  return (
    <div className={styles["cards-container"]}>
      {products.map((product: Product) => (
        <Card
          key={product.id}
          product={product}
          handleAddProduct={handleAddProduct}
        />
      ))}
    </div>
  );
};
