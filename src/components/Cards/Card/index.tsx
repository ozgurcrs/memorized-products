import { FC, ReactNode } from "react";
import styles from "./card.module.scss";

export const Card: FC<any> = ({
  title,
  id,
  variants,
  status,
  image,
}): ReactNode => {
  return (
    <div className={styles["card-container"]}>
      <div className={styles["image-container"]}>
        <img src={image.src} alt="" />
      </div>
      <div>{title}</div>
    </div>
  );
};
