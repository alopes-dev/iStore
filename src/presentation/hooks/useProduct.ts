"use client";
import { useEffect, useState } from "react";
import { getProducts } from "~/aplication/services/product";
import { IProduct } from "~/store/redux/features/cartSlice";
import { formatPrice } from "../utils/format";

export const useProduct = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await getProducts();

        const data = res.data.map((product) => ({
          ...product,
          priceFormatted: formatPrice(product.price),
        }));

        setProducts(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return {
    products,
    isLoading,
    error,
  };
};
