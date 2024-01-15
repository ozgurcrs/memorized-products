import { FC, useEffect, useState } from "react";
import styles from "./basket.module.scss";
import { Product } from "../../models";
import { IoMdClose } from "react-icons/io";
import { BsBasketFill } from "react-icons/bs";

type Props = {
  productOfBasket: Product[];
  removeProductFromBasket: (product: Product) => void;
};

export const Basket: FC<Props> = ({
  productOfBasket,
  removeProductFromBasket,
}) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const calculateTotalPrice = () => {
    setTotalPrice(0);
    productOfBasket.map((item) => {
      const price = item.variants[0].price;

      return setTotalPrice((prev) => prev + Number(price));
    });
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [productOfBasket]);

  return (
    <div className={styles["basket"]}>
      {productOfBasket.length ? (
        productOfBasket.map((item: Product) => {
          return (
            <div key={item.id} className={styles["basket__row"]}>
              <img src={item.image.src} alt="" />
              <div className={styles["basket__details"]}>
                <h3>{item.title}</h3>
                <span>{item.variants[0].price}₺</span>
              </div>
              <IoMdClose
                data-testid="remove-button"
                onClick={() => removeProductFromBasket(item)}
              />
            </div>
          );
        })
      ) : (
        <div
          data-testid="empty-message"
          className={styles["basket__no-product"]}
        >
          <BsBasketFill />
          Basket is empty
        </div>
      )}

      {totalPrice > 0 && (
        <div className={styles["basket__total-price"]}>
          Total: <b>{totalPrice}₺</b>
        </div>
      )}
    </div>
  );
};
