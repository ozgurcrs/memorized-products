import { FC, ReactNode } from "react";
import styles from "./card.module.scss";
import { BsBasketFill } from "react-icons/bs";
import { Option, Product } from "../../../models";
import { Link } from "react-router-dom";

type Props = {
  handleAddProduct: (product: Product) => void;
  product: Product;
};

export const Card: FC<Props> = ({ product, handleAddProduct }): ReactNode => {
  const { status, image, variants, title, options, id } = product;
  const { price } = variants[0];

  const isStock = status === "active" ? true : false;

  return (
    <div className={styles["card"]}>
      <Link to={`detail/${id}`}>
        <div className={styles["card__image-container"]}>
          <img data-testid="image" src={image.src} alt="" />
        </div>
        <div className={styles["card__title"]}>{title}</div>
      </Link>
      <div className={styles["card__details"]}>
        <div className={styles["card__status"]}>{isStock}</div>
        <div data-testid="price" className={styles["card__price"]}>
          {price}₺
        </div>

        <div className={styles["card__options"]}>
          {options.map((item: Option, i: number) => {
            return (
              <div key={i} className={styles["card__option"]}>
                <span>{item.name}:</span>
                <select name="" id="">
                  {item.values.map((value: string, index: number) => (
                    <option key={index}>{value}</option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
      </div>

      <div
        data-testid="add-product"
        onClick={() => handleAddProduct(product)}
        className={styles["card__button-container"]}
      >
        <BsBasketFill />
      </div>
    </div>
  );
};
