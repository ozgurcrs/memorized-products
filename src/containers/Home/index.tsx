import { ReactNode, useContext } from "react";
import { ProductContext } from "../../context";
import { ApiStatus, Product, Sort } from "../../models";
import { Cards } from "../../components/Cards";
import styles from "./home.module.scss";
import { Spinner } from "../../components/Spinner";
import { GiDeathNote } from "react-icons/gi";
import { Skeleton } from "../../components/Skeleton";
import { ErrorBoundary } from "../ErrorBoundary";
import { notifySuccess } from "../../components/ToastMessage";

export const Home = () => {
  const {
    filterProductBySearch,
    setFilterOptions,
    filterOptions,
    fetchProductApiStatus,
    isLoadingInfinityScroll,
    addProductToBasket,
  } = useContext(ProductContext);

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

  const handleAddProduct = (product: Product) => {
    addProductToBasket(product);
    notifySuccess("Success");
  };

  const RenderHomePage = () => {
    return (
      <div className={styles["home"]}>
        <div className={styles["home__filter-container"]}>
          <select
            name="filter"
            onChange={(e) => handleSortProduct(e.target.value)}
            value={filterOptions}
          >
            <option value={Sort.FromCheapToExpensive}>Lowest Price</option>
            <option value={Sort.FromExpensiveToCheap}>Highest Price</option>
          </select>
        </div>

        {filterProductBySearch.length ? (
          <Cards
            handleAddProduct={handleAddProduct}
            products={filterProductBySearch}
          />
        ) : (
          <div className={styles["home__product-not-found"]}>
            <GiDeathNote />
            <span>Product is not found</span>
          </div>
        )}

        <div className={styles["home__loading-data"]}>
          {isLoadingInfinityScroll && <Spinner />}
        </div>
      </div>
    );
  };

  const RenderPage = (): ReactNode => {
    switch (fetchProductApiStatus) {
      case ApiStatus.LOADING:
        return (
          <div className={styles["skeleton-wrapper"]}>
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} />
            ))}
          </div>
        );

      case ApiStatus.SUCCESS:
        return <RenderHomePage />;

      case ApiStatus.ERROR:
        return <ErrorBoundary />;

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
