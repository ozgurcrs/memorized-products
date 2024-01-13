import { FC, ReactNode } from "react";
import { Product } from "../../models";
import { Card } from "./Card";
import styles from "./cards.module.scss";

interface ICard {
  products: Product[];
}

export const Cards: FC<ICard> = ({ products }): ReactNode => {
  return (
    <div className={styles["cards-container"]}>
      {products.map(
        ({ id, title, status, variants, image, options }: Product) => (
          <Card
            key={id}
            id={id}
            title={title}
            status={status}
            variants={variants}
            image={image}
            price={variants[0].price}
            options={options}
          />
        )
      )}
    </div>
  );
};
