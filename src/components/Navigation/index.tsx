import { ReactNode, useContext, useState } from "react";
import styles from "./navigation.module.scss";
import { BiJoystickButton } from "react-icons/bi";
import { BsBasketFill } from "react-icons/bs";
import { ProductContext } from "../../context";
import { useDebouncedCallback } from "use-debounce";
import { Basket } from "../Basket";

export const Navigation = (): ReactNode => {
  const [isActiveBasket, setIsActiveBasket] = useState<boolean>(false);

  const { setSearchText } = useContext(ProductContext);

  const handleSearch = useDebouncedCallback((query) => {
    setSearchText(query);
  }, 300);

  const handleOpenBasket = () => {
    setIsActiveBasket(!isActiveBasket);
  };

  return (
    <div className={styles["navigation-container"]}>
      <div className={styles["navigation"]}>
        <BiJoystickButton />
        <h1>
          with<b>Product</b>
        </h1>
      </div>
      <div className={styles["search-container"]}>
        <input
          onChange={(e) => handleSearch(e.target.value)}
          type="text"
          placeholder="Search..."
        />
      </div>
      <div onClick={handleOpenBasket} className={styles["basket-container"]}>
        <span>0</span>
        <BsBasketFill />
      </div>
      {isActiveBasket && <Basket />}
    </div>
  );
};
