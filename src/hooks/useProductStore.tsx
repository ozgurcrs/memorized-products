import { useEffect, useMemo, useState } from "react";
import { ApiStatus, Product } from "../models";

interface IUseProductStore {
  fetchProductApiStatus: ApiStatus;
  products: Product[];
  setSearchText: (query: string) => void;
  filterProductBySearch: Product[];
}

export const useProductStore = (): IUseProductStore => {
  const [fetchProductApiStatus, setFetchProductApiStatus] = useState<ApiStatus>(
    ApiStatus.IDLE
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");

  const getProducts = async () => {
    try {
      setFetchProductApiStatus(ApiStatus.LOADING);
      const { products } = await fetch(
        `https://teknasyon.netlify.app/.netlify/functions/products`,
        {
          headers: {
            "X-Access-Token": "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",
          },
        }
      ).then((res) => res.json());

      setFetchProductApiStatus(ApiStatus.SUCCESS);

      setProducts(products);
    } catch {
      setFetchProductApiStatus(ApiStatus.ERROR);
    }
  };

  const loadMoreProducts = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;

      const threshold = 100;

      if (scrollable - scrolled < threshold) {
        loadMoreProducts();
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const filterProductBySearch = useMemo(() => {
    return products.filter(
      (item) => item.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1
    );
  }, [products, searchText, pageNumber]);

  useEffect(() => {
    getProducts();
  }, []);

  return {
    products,
    fetchProductApiStatus,
    setSearchText,
    filterProductBySearch: filterProductBySearch.filter(
      (_, index) => index < pageNumber * 10
    ),
  };
};
