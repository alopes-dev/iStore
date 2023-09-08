import { expect, test, describe } from "vitest";
import { screen, within } from "@testing-library/react";
import Cart from "./index";
import { renderWithProvider } from "~/__test__/mock";

import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

const push = vi.fn();
vi.mock("next/navigation", () => {
  const actual = vi.importActual("next/navigation");
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push,
    })),
    useSearchParams: vi.fn(() => ({
      get: vi.fn(),
    })),
    usePathname: vi.fn(),
  };
});

describe("Cart Component", () => {
  test("Should render Cart component as expected", () => {
    renderWithProvider(<Cart />);

    const cartContainer = within(screen.getByLabelText("cart-container"));
    expect(cartContainer).toBeDefined();
  });

  test("Should render Cart with header table as expected", () => {
    renderWithProvider(<Cart />);

    const product = within(screen.getByText("PRODUTO"));
    const qtd = within(screen.getByText("QTD"));
    const subtotal = within(screen.getByText("SUBTOTAL"));
    const finsh = within(screen.getByText("Finalizar Pedido"));
    const total = within(screen.getByText("TOTAL"));

    expect(product).toBeDefined();
    expect(qtd).toBeDefined();
    expect(subtotal).toBeDefined();
    expect(finsh).toBeDefined();
    expect(total).toBeDefined();
  });

  // test("Should render iStore text as expected", () => {
  //   renderWithProvider(<Cart />);

  //   const iStore = within(screen.getByText("iStore"));

  //   expect(iStore).toBeDefined();
  // });

  // test("Should render Meu carrinho text on Menu as expected", () => {
  //   renderWithProvider(<Cart />);

  //   const myCart = within(screen.getByText("Meu Carrinho"));

  //   expect(myCart).toBeDefined();
  // });

  // test("Should render all itens counter", () => {
  //   renderWithProvider(<Cart />);

  //   const itens = within(screen.getByText("0 itens"));

  //   expect(itens).toBeDefined();
  // });

  // test("Should call push function and render on cart page", async () => {
  //   renderWithProvider(<Cart />);

  //   const shoppingText = screen.getByLabelText("cart-shopping");

  //   await userEvent.click(shoppingText);

  //   expect(push).toBeCalled();
  //   expect(push).toBeCalledTimes(1);
  //   expect(push).toBeCalledWith("/cart");
  // });
});
