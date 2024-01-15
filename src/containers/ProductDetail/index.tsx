import { FC, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../context";
import styles from "./product-detail.module.scss";
import { Option, Product } from "../../models";
import { GiPriceTag } from "react-icons/gi";
import { BsBasketFill } from "react-icons/bs";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export const ProductDetail: FC = () => {
  const { getProductById, fetchProductApiStatus, addProductToBasket } =
    useContext(ProductContext);
  const params = useParams();
  const [product, setProduct] = useState<Product>();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState<string>();

  const handleSelectedImage = (src: string) => {
    setSelectedImage(src);
  };

  useEffect(() => {
    if (params.id) {
      const singleProduct: Product = getProductById(params.id.toString());
      setProduct(singleProduct);
    }
  }, [fetchProductApiStatus]);

  const handleBackPage = () => {
    navigate(-1);
  };

  return (
    <article>
      <div onClick={handleBackPage} className={styles["history-page"]}>
        <BiLeftArrowAlt />
      </div>
      {product && (
        <div className={styles["product"]}>
          <div className={styles["product__image-container"]}>
            <img src={selectedImage || product?.image.src} alt="" />
            <div className={styles["product__images"]}>
              {product?.images.length > 1 &&
                product?.images.map(({ src }) => (
                  <img
                    onClick={() => handleSelectedImage(src)}
                    src={src}
                    alt=""
                  />
                ))}
            </div>
          </div>
          <div className={styles["product__details"]}>
            <div className={styles["product__label"]}>
              <h1>{product.title}</h1>
              <span>{product.variants[0].price}₺</span>
            </div>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis
              dolorem doloremque dignissimos ea repellendus nihil deleniti in
              maxime, adipisci earum excepturi voluptates magni. Aliquam cum
              quaerat provident magnam, at perspiciatis? Lorem ipsum dolor, sit
              amet consectetur adipisicing elit. Quis dolorem doloremque
              dignissimos ea repellendus nihil deleniti in maxime, adipisci
              earum excepturi voluptates magni. Aliquam cum quaerat provident
              magnam, at perspiciatis?
            </p>

            <div className={styles["product__options"]}>
              {product.options.map((item: Option, i: number) => {
                return (
                  <div key={i} className={styles["product__option"]}>
                    <span>{item.name}:</span>
                    <select name="" id="">
                      {item.values.map((value: string, index: number) => (
                        <option key={index}>{value}</option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className={styles["product__action-button"]}
            onClick={() => addProductToBasket(product)}
          >
            <BsBasketFill />
          </div>

          <div className={styles["product__chip"]}>
            <GiPriceTag />
          </div>
        </div>
      )}
    </article>
  );
};
