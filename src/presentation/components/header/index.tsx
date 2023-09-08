"use client";
import { FC } from "react";
import { MdShoppingBasket } from "react-icons/md";

import { Container, Cart } from "./styles";
import Image from "next/image";
import { useAppSelector } from "~/store/redux/hooks";
import { usePathname, useRouter } from "next/navigation";

const Header: FC = () => {
  const carts = useAppSelector((state) => state.cartReducer);
  const pathname = usePathname();
  const { push } = useRouter();

  function handleCartClicked() {
    if (pathname !== "/cart") {
      localStorage.setItem("iStore:cart", JSON.stringify(carts));
      push("/cart");
    }
  }

  return (
    <Container aria-label="header-container">
      <div
        onClick={() => {
          push("/");
        }}
      >
        <Image src={"/assets/logo.svg"} height={120} width={120} alt="Logo" />
      </div>
      <h1>iStore</h1>
      <Cart aria-label="cart-shopping" onClick={handleCartClicked}>
        <div>
          <strong>Meu Carrinho</strong>
          <span>{carts?.length} itens</span>
        </div>
        <MdShoppingBasket
          aria-label="shopping-basket"
          size={36}
          color="#fac23c"
        />
      </Cart>
    </Container>
  );
};

export default Header;
