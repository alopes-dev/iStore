import { IProduct } from "~/store/redux/features/cartSlice";
import api from "./api";

export const getProducts = async () => {
  return await api.get<IProduct[]>("/product");
};
