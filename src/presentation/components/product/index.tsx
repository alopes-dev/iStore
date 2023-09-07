/* eslint-disable @next/next/no-img-element */
"use client";

import { FC, useMemo } from "react";
import { MdAddShoppingCart } from "react-icons/md";

import { ProductList } from "./styles";
import { useDispatch } from "react-redux";
import { IAmount } from "./type";
import { addToCart } from "~/store/redux/features/cartSlice";
import { useProduct } from "~/presentation/hooks/useProduct";
import Image from "next/image";
import { useAppSelector } from "~/store/redux/hooks";

const getImage = (id: number) =>
  `https://picsum.photos/255/100?grayscale?random=${id}`;

const ProductView: FC = () => {
  const dispatch = useDispatch();
  const { products } = useProduct();
  const carts = useAppSelector((state) => state.cartReducer);

  const amounts = useMemo(() => {
    return carts.reduce((total: IAmount, product): IAmount => {
      total[product.id] = product.amount;
      return total;
    }, {});
  }, [carts]);

  return (
    <>
      <ProductList>
        {products.map((product, index) => (
          <li key={product.id}>
            <img src={getImage(index)} alt={product.name} />
            <strong>{product.name}</strong>
            <span>{product.priceFormatted}</span>

            <button
              type="button"
              onClick={() => {
                dispatch(addToCart(product));
              }}
            >
              <div>
                <MdAddShoppingCart color="#fff" size={16} />
                {amounts[product.id] || 0}
              </div>
              <span>Adicionar ao carrinho</span>
            </button>
          </li>
        ))}
      </ProductList>
    </>
  );
};

export default ProductView;
