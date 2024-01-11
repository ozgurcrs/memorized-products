import { ReactNode, useContext } from "react";
import { ProductContext } from "../../context";
import { ApiStatus } from "../../models";
import { Cards } from "../../components/Cards";
import styles from "./home.module.scss";
import { Spinner } from "../../components/Spinner";

export const Home = () => {
  const { filterProductBySearch, fetchProductApiStatus } =
    useContext(ProductContext);

  console.log(filterProductBySearch);

  const RenderPage = (): ReactNode => {
    switch (fetchProductApiStatus) {
      case ApiStatus.LOADING:
        return (
          <div className={styles["spinner"]}>
            <Spinner />
          </div>
        );

      case ApiStatus.SUCCESS:
        return (
          <div>
            <Cards products={filterProductBySearch} />
          </div>
        );

      case ApiStatus.ERROR:
        return <div>Error</div>;

      default:
        return <div>Product Not Found</div>;
    }
  };

  return (
    <article>
      <RenderPage />
    </article>
  );
};
