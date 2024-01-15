import { FC } from "react";
import styles from "./logo.module.scss";
import { BiJoystickButton } from "react-icons/bi";

export const Logo: FC = () => {
  return (
    <div className={styles["logo"]}>
      <BiJoystickButton />
      <h1>
        with<b>Product</b>
      </h1>
    </div>
  );
};
