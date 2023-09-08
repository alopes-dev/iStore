import { expect, test, describe } from "vitest";
import { screen, within } from "@testing-library/react";
import Home from "../app/page";
import { renderWithProvider } from "./mock";

describe("Home Page", () => {
  test("Should render home page as expected", () => {
    renderWithProvider(<Home />);

    const main = within(screen.getByRole("main"));
    expect(main).toBeDefined();
  });

  test("Should render home page with header menu", () => {
    renderWithProvider(<Home />);

    const headerContainer = within(screen.getByLabelText("header-container"));

    expect(headerContainer).toBeDefined();
  });

  test("Should render home page with product list as expected", () => {
    renderWithProvider(<Home />);

    const productList = within(screen.getByLabelText("product-list"));

    expect(productList).toBeDefined();
  });
});
