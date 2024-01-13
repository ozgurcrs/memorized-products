import { useEffect, useMemo, useState } from "react";
import { ApiStatus, Product, Sort } from "../models";

interface IUseProductStore {
  fetchProductApiStatus: ApiStatus;
  setSearchText: (query: string) => void;
  searchText: string;
  filterProductBySearch: Product[];
  setFilterOptions: (filterOptions: Sort) => void;
  filterOptions: Sort;
  getProductById: Function;
}

export const useProductStore = (): IUseProductStore => {
  const [fetchProductApiStatus, setFetchProductApiStatus] = useState<ApiStatus>(
    ApiStatus.IDLE
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [filterOptions, setFilterOptions] = useState<Sort>(
    Sort.FromCheapToExpensive
  );

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

  const filteredProducts = useMemo(() => {
    return products.filter(
      (item) => item.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1
    );
  }, [products, searchText]);

  const sortedProducts = useMemo(() => {
    if (Sort.FromCheapToExpensive === filterOptions) {
      return filteredProducts.sort(
        (a, b) => Number(a.variants[0].price) - Number(b.variants[0].price)
      );
    } else {
      return filteredProducts.sort(
        (a, b) => Number(b.variants[0].price) - Number(a.variants[0].price)
      );
    }
  }, [filteredProducts, filterOptions]);

  const getProductById = (id: string) => {
    if (products.length) {
      return products.find((item: Product) => String(item.id) === id);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return {
    fetchProductApiStatus,
    setSearchText,
    filterProductBySearch: sortedProducts.filter(
      (_, index) => index < pageNumber * 10
    ),
    setFilterOptions,
    filterOptions,
    searchText,
    getProductById,
  };
};
