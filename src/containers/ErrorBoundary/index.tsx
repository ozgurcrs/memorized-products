import { FC } from "react";
import styles from "./error-boundary.module.scss";
import { TbError404 } from "react-icons/tb";

export const ErrorBoundary: FC = () => {
  return (
    <div className={styles["error-container"]}>
      <TbError404 />
    </div>
  );
};
