/* eslint-disable @next/next/no-img-element */

"use client";
import React, { FC, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from "react-icons/md";

import { Container, ProductTable, Total } from "./styles";
import { formatPrice } from "~/presentation/utils/format";
import { useEffect } from "react";
import {
  addToAllCart,
  removeFromCart,
  updateAmount,
} from "~/store/redux/features/cartSlice";
import { useAppSelector } from "~/store/redux/hooks";

const CartView: FC = () => {
  const carts = useAppSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const xcarts = useMemo(() => {
    return carts.map((product) => ({
      ...product,
      subTotal: product.amount * product.price,
    }));
  }, [carts]);

  const totalPrice = useMemo(() => {
    return carts.reduce((total_price, transation): number => {
      return total_price + transation.price * transation.amount;
    }, 0);
  }, [carts]);

  function handleDeleteOfCart(id: number) {
    dispatch(removeFromCart(id));
  }

  function handleRemoveFromCart({
    id,
    amount,
  }: {
    id: number;
    amount: number;
  }) {
    dispatch(updateAmount({ id, amount }));
  }

  useEffect(() => {
    const localCarts = localStorage.getItem("iStore:cart");
    if (!localCarts) return;

    dispatch(addToAllCart(JSON.parse(localCarts)));
  }, [dispatch]);

  return (
    <>
      <Container aria-label="cart-container">
        <ProductTable>
          <thead>
            <tr>
              <th />
              <th>PRODUTO</th>
              <th>QTD</th>
              <th>SUBTOTAL</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {xcarts.map((cart) => (
              <tr key={cart.id}>
                <td>
                  <img src={cart.image} alt="Tênis" />
                </td>
                <td>
                  <strong>{cart.name}</strong>
                  <span>{cart.priceFormatted}</span>
                </td>

                <td>
                  <div>
                    <button
                      onClick={() => {
                        handleRemoveFromCart({
                          amount: cart.amount - 1,
                          id: cart.id,
                        });
                      }}
                    >
                      <MdRemoveCircleOutline size={20} color="#fac23c" />
                    </button>
                    <input type="number" readOnly value={cart.amount} />
                    <button
                      onClick={() => {
                        handleRemoveFromCart({
                          amount: cart.amount + 1,
                          id: cart.id,
                        });
                      }}
                    >
                      <MdAddCircleOutline size={20} color="#fac23c" />
                    </button>
                  </div>
                </td>
                <td>
                  <strong>{formatPrice(cart.amount * cart.price)}</strong>
                </td>
                <td>
                  <button onClick={() => handleDeleteOfCart(cart.id)}>
                    <MdDelete size={20} color="#fac23c" />{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </ProductTable>

        <footer>
          <button type="button">Finalizar Pedido</button>

          <Total>
            <span>TOTAL</span>
            <strong>{formatPrice(totalPrice)}</strong>
          </Total>
        </footer>
      </Container>
    </>
  );
};

export default CartView;
