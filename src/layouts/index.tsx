import { FC, ReactNode } from "react";
import { Navigation } from "../components/Navigation";
import styles from "./layout.module.scss";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles["layout-container"]}>
      <Navigation />
      {children}
    </div>
  );
};
