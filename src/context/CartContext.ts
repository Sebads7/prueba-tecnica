import { createContext } from "react";
import { Cart } from "../types";

interface CartContextProps {
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
  updateCart: { [productId: string]: boolean };
  toggleUpdateCart: (productId: string, value: boolean) => void;
  pageLoading: boolean;
  setLoadingPage: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: (key: string, isLoading: boolean, id?: string) => void;
  isLoading: (key: string, id?: string) => boolean;
}
export const CartContext = createContext<CartContextProps | undefined>(
  undefined
);
