import { FC } from "react";
import { useRouteError } from "react-router-dom";
import styles from "./error-boundary.module.scss";
import { TbError404 } from "react-icons/tb";

export const ErrorBoundary: FC = () => {
  const error: any = useRouteError();
  return (
    <div className={styles["error-container"]}>
      <TbError404 />
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};
