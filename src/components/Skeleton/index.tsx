import { FC } from "react";
import styles from "./skeleton.module.scss";

export const Skeleton: FC = () => {
  return (
    <div className={styles["skeleton"]}>
      <div className={styles["skeleton__image"]}></div>
      <div className={styles["skeleton__title"]}></div>
      <div className={styles["skeleton__option"]}></div>
      <div className={styles["skeleton__button"]}></div>
    </div>
  );
};
