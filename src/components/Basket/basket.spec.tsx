import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Basket } from ".";
import "@testing-library/jest-dom";
import { Product } from "../../models";

const mockData: Product[] = [
  {
    id: 7550800855259,
    title: "Cara",
    body_html:
      '<p><em>This is a demonstration store. You can purchase products like this from <a href="//skiandscuba.com" target="_blank">The Ski Chalet &amp; Treasure Cove Scuba</a>.</em></p><ul>\n<li><span style="line-height: 1.4;">100% acrylic</span></li>\n<li><span style="line-height: 1.4;">Extra warm</span></li>\n</ul>',
    vendor: "Neff",
    product_type: "Beanies",
    created_at: "2022-02-23T16:14:31+03:00",
    handle: "neff-cara-beanie-2016",
    updated_at: "2022-02-23T16:28:04+03:00",
    published_at: "2022-02-23T16:14:30+03:00",
    template_suffix: null,
    status: "active",
    published_scope: "web",
    tags: "Beanies",
    admin_graphql_api_id: "gid://shopify/Product/7550800855259",
    variants: [
      {
        id: 42509600129243,
        product_id: 7550800855259,
        title: "Cream",
        price: "28.00",
        sku: "",
        position: 1,
        inventory_policy: "deny",
        compare_at_price: null,
        fulfillment_service: "manual",
        inventory_management: "shopify",
        option1: "Cream",
        option2: null,
        option3: null,
        created_at: "2022-02-23T16:14:31+03:00",
        updated_at: "2022-02-23T16:14:31+03:00",
        taxable: true,
        barcode: "888259613697",
        grams: 454,
        image_id: 36706877440219,
        weight: 1.0009,
        weight_unit: "lb",
        inventory_item_id: 44603761819867,
        inventory_quantity: 1,
        old_inventory_quantity: 1,
        requires_shipping: true,
        admin_graphql_api_id: "gid://shopify/ProductVariant/42509600129243",
      },
    ],
    options: [
      {
        id: 9606267896027,
        product_id: 7550800855259,
        name: "Color",
        position: 1,
        values: ["Cream"],
      },
    ],
    images: [
      {
        id: 36706877440219,
        product_id: 7550800855259,
        position: 1,
        created_at: "2022-02-23T16:14:31+03:00",
        updated_at: "2022-02-23T16:14:31+03:00",
        alt: null,
        width: 480,
        height: 480,
        src: "https://cdn.shopify.com/s/files/1/0631/9122/0443/products/carabeanie_creme.jpg?v=1645622071",
        variant_ids: [42509600129243],
        admin_graphql_api_id: "gid://shopify/ProductImage/36706877440219",
      },
    ],
    image: {
      id: 36706877440219,
      product_id: 7550800855259,
      position: 1,
      created_at: "2022-02-23T16:14:31+03:00",
      updated_at: "2022-02-23T16:14:31+03:00",
      alt: null,
      width: 480,
      height: 480,
      src: "https://cdn.shopify.com/s/files/1/0631/9122/0443/products/carabeanie_creme.jpg?v=1645622071",
      variant_ids: [42509600129243],
      admin_graphql_api_id: "gid://shopify/ProductImage/36706877440219",
    },
  },
];

test("render component", () => {
  const container = render(
    <Basket productOfBasket={[]} removeProductFromBasket={jest.fn()} />
  );

  expect(container).toMatchSnapshot();
});

test("empty basket message is displayed", () => {
  render(<Basket productOfBasket={[]} removeProductFromBasket={jest.fn()} />);
  const emptyBasketMessage = screen.getByTestId("empty-message");
  expect(emptyBasketMessage).toBeInTheDocument();
});

test("remove a product when click the button", async () => {
  const removeProductMock = jest.fn();
  render(
    <Basket
      productOfBasket={mockData}
      removeProductFromBasket={removeProductMock}
    />
  );

  const removeButton = screen.getByTestId("remove-button");

  await waitFor(() => expect(removeProductMock).toHaveBeenCalledTimes(0));

  fireEvent.click(removeButton);

  await waitFor(() => expect(removeProductMock).toHaveBeenCalledTimes(1));

  const emptyBasketMessage = screen.queryByTestId("empty-message");
  expect(emptyBasketMessage).toBeNull();
});
