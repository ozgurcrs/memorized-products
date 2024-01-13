import { FC, ReactNode } from "react";
import styles from "./card.module.scss";
import { BsBasketFill } from "react-icons/bs";
import { Option } from "../../../models";
import { Link } from "react-router-dom";

export const Card: FC<any> = ({
  title,
  id,
  status,
  price,
  image,
  options,
}): ReactNode => {
  const isStock = status === "active" ? true : false;

  return (
    <div className={styles["card-container"]}>
      <Link to={`detail/${id}`}>
        <div className={styles["image-container"]}>
          <img src={image.src} alt="" />
        </div>
        <div className={styles["card-title"]}>{title}</div>
      </Link>
      <div className={styles["details"]}>
        <div className={styles["status"]}>{isStock}</div>
        <div className={styles["price"]}>{price}₺</div>

        <div className={styles["options"]}>
          {options.map((item: Option) => {
            return (
              <div className={styles["option"]}>
                <span>{item.name}:</span>
                <select name="" id="">
                  {item.values.map((value: string) => (
                    <option>{value}</option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles["button-container"]}>
        <div>
          <BsBasketFill />
        </div>
      </div>
    </div>
  );
};
