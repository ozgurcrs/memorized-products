import { ReactNode, useContext, useEffect, useState } from "react";
import styles from "./navigation.module.scss";
import { BiSearch } from "react-icons/bi";
import { BsBasketFill } from "react-icons/bs";
import { ProductContext } from "../../context";
import { useDebouncedCallback } from "use-debounce";
import { Basket } from "../Basket";
import useMobile from "../../hooks/useMobile";
import { IoMdClose } from "react-icons/io";
import { Logo } from "../Logo";

export const Navigation = (): ReactNode => {
  const [isActiveBasket, setIsActiveBasket] = useState<boolean>(false);
  const [isActiveInput, setIsActiveInput] = useState<boolean>(false);
  const { isMobile } = useMobile();

  const { setSearchText, productOfBasket, removeProductFromBasket } =
    useContext(ProductContext);

  const handleSearch = useDebouncedCallback((query) => {
    setSearchText(query);
  }, 300);

  const handleOpenBasket = () => {
    setIsActiveBasket(!isActiveBasket);
  };

  useEffect(() => {
    setIsActiveInput(isMobile);
  }, [isMobile]);

  return (
    <div className={styles["nav-wrapper"]}>
      <Logo />
      <div
        className={`${styles["nav-wrapper__search-container"]} ${
          isActiveInput ? styles["nav-wrapper__search-container--active"] : ""
        }`}
      >
        <input
          onChange={(e) => handleSearch(e.target.value)}
          type="text"
          placeholder="Search..."
        />
        {isActiveInput ? (
          <IoMdClose onClick={() => setIsActiveInput(!isActiveInput)} />
        ) : (
          <BiSearch onClick={() => setIsActiveInput(!isActiveInput)} />
        )}
      </div>
      <div
        onClick={handleOpenBasket}
        className={styles["nav-wrapper__basket-container"]}
      >
        <span>{productOfBasket.length}</span>
        <BsBasketFill />
      </div>
      {isActiveBasket && (
        <Basket
          removeProductFromBasket={removeProductFromBasket}
          productOfBasket={productOfBasket}
        />
      )}
    </div>
  );
};
