import { Layout } from "../../layouts";
import { ApiStatus, Product, Sort } from "../../models";
import { ProductContext } from "../../context";
import { Home } from ".";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { IUseProductStore } from "../../hooks/useProductStore";

jest.mock("../../models");

const product: Product = {
  id: 7550808883419,
  title: "Axium 100 B93",
  body_html:
    '<p><em>This is a demonstration store. You can purchase products like this from <a href="//skiandscuba.com" target="_blank">The Ski Chalet &amp; Treasure Cove Scuba</a>.</em></p><ul>\n<li><span style="line-height: 1.4;">DIN 3/10</span></li>\n<li><span style="line-height: 1.4;">Toe lateral elasticity 45 mm</span></li>\n<li><span style="line-height: 1.4;">Glider AFC TEFLON</span></li>\n<li><span style="line-height: 1.4;">Toe piece DUAL ACTION II</span></li>\n<li><span style="line-height: 1.4;">Heel piece AXIUM2</span></li>\n<li><span style="line-height: 1.4;">Height interface 16 MM</span></li>\n<li><span style="line-height: 1.4;">Heel vertical elasticity 12 MM</span></li>\n<li><span style="line-height: 1.4;">Brake 2P 83-93 MM</span></li>\n<li><span style="line-height: 1.4;">Heel piece Adjustment 2P 24 MM</span></li>\n</ul>',
  vendor: "Rossignol",
  product_type: "Ski Bindings",
  created_at: "2022-02-23T16:19:32+03:00",
  handle: "rossignol-axium-100-b93-binding-2016",
  updated_at: "2022-02-23T16:28:20+03:00",
  published_at: "2022-02-23T16:19:31+03:00",
  template_suffix: null,
  status: "active",
  published_scope: "web",
  tags: "Ski Bindings",
  admin_graphql_api_id: "gid://shopify/Product/7550808883419",
  variants: [
    {
      id: 42509635551451,
      product_id: 7550808883419,
      title: "B93 / Black/White",
      price: "119.00",
      sku: "",
      position: 1,
      inventory_policy: "deny",
      compare_at_price: null,
      fulfillment_service: "manual",
      inventory_management: "shopify",
      option1: "B93",
      option2: "Black/White",
      option3: null,
      created_at: "2022-02-23T16:19:32+03:00",
      updated_at: "2022-02-23T16:19:32+03:00",
      taxable: true,
      barcode: "",
      grams: 2722,
      image_id: 36706928525531,
      weight: 6.001,
      weight_unit: "lb",
      inventory_item_id: 44603797242075,
      inventory_quantity: 4,
      old_inventory_quantity: 4,
      requires_shipping: true,
      admin_graphql_api_id: "gid://shopify/ProductVariant/42509635551451",
    },
  ],
  options: [
    {
      id: 9606279987419,
      product_id: 7550808883419,
      name: "Size",
      position: 1,
      values: ["B93"],
    },
    {
      id: 9606280020187,
      product_id: 7550808883419,
      name: "Color",
      position: 2,
      values: ["Black/White"],
    },
  ],
  images: [
    {
      id: 36706928525531,
      product_id: 7550808883419,
      position: 1,
      created_at: "2022-02-23T16:19:32+03:00",
      updated_at: "2022-02-23T16:19:32+03:00",
      alt: null,
      width: 554,
      height: 283,
      src: "https://cdn.shopify.com/s/files/1/0631/9122/0443/products/rossignol_RCDA028_AXIUM-100-B93-BLACK-WHITE.jpg?v=1645622372",
      variant_ids: [42509635551451],
      admin_graphql_api_id: "gid://shopify/ProductImage/36706928525531",
    },
  ],
  image: {
    id: 36706928525531,
    product_id: 7550808883419,
    position: 1,
    created_at: "2022-02-23T16:19:32+03:00",
    updated_at: "2022-02-23T16:19:32+03:00",
    alt: null,
    width: 554,
    height: 283,
    src: "https://cdn.shopify.com/s/files/1/0631/9122/0443/products/rossignol_RCDA028_AXIUM-100-B93-BLACK-WHITE.jpg?v=1645622372",
    variant_ids: [42509635551451],
    admin_graphql_api_id: "gid://shopify/ProductImage/36706928525531",
  },
};

const fakeProductStore = {
  fetchProductApiStatus: ApiStatus.SUCCESS,
  setSearchText: jest.fn(),
  searchText: "",
  filterProductBySearch: [product],
  setFilterOptions: jest.fn(),
  filterOptions: Sort.FromCheapToExpensive,
  getProductById: jest.fn(),
  isLoadingInfinityScroll: false,
  addProductToBasket: jest.fn(),
  productOfBasket: [product],
  removeProductFromBasket: jest.fn(),
};

const RenderProduct = () => {
  return (
    <ProductContext.Provider value={fakeProductStore as IUseProductStore}>
      <Layout>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Layout>
    </ProductContext.Provider>
  );
};

test("renders home page correctly", () => {
  const container = render(<RenderProduct />);
  expect(container).toMatchSnapshot();
});

test("renders image from card", () => {
  render(<RenderProduct />);

  const image = screen.getByTestId("image");

  expect(image).toBeDefined();
});

test("displays price on the screen", () => {
  render(<RenderProduct />);

  const price = screen.getByTestId("price");

  expect(price.textContent).toEqual("119.00₺");
});

test("adds product to the basket", async () => {
  render(<RenderProduct />);

  const addProduct = fakeProductStore.addProductToBasket;

  await waitFor(() => expect(addProduct).toHaveBeenCalledTimes(0));

  expect(fakeProductStore.productOfBasket.length).toBe(1);

  fireEvent.click(screen.getByTestId("add-product"));

  await waitFor(() => expect(addProduct).toHaveBeenCalledTimes(1));

  expect(fakeProductStore.productOfBasket.length).toBe(1);
});
