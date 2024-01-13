import { ReactNode, useContext } from "react";
import { ProductContext } from "../../context";
import { ApiStatus, Sort } from "../../models";
import { Cards } from "../../components/Cards";
import styles from "./home.module.scss";
import { Spinner } from "../../components/Spinner";

export const Home = () => {
  const {
    filterProductBySearch,
    setFilterOptions,
    filterOptions,
    fetchProductApiStatus,
  } = useContext(ProductContext);

  console.log(filterProductBySearch);

  const handleSortProduct = (value: Sort | string) => {
    switch (Number(value)) {
      case Sort.FromCheapToExpensive:
        setFilterOptions(Sort.FromCheapToExpensive);
        break;
      case Sort.FromExpensiveToCheap:
        setFilterOptions(Sort.FromExpensiveToCheap);
        break;
    }
  };

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
            <div className={styles["filter-container"]}>
              <select
                name=""
                id=""
                onChange={(e) => handleSortProduct(e.target.value)}
                value={filterOptions}
              >
                <option value={Sort.FromCheapToExpensive}>
                  Ucuzdan Pahalıya
                </option>
                <option value={Sort.FromExpensiveToCheap}>
                  Pahalıdan Ucuza
                </option>
              </select>
            </div>
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
