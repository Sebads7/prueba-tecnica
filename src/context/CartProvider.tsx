import { useState } from "react";
import { Cart } from "../types";
import { v4 as uuidv4 } from "uuid";
import { CartContext } from "./CartContext";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Cart>({
    id: uuidv4(),
    items: [],
    createdAt: new Date(),
  });
  const [updateCart, setUpdateCart] = useState<{
    [productId: string]: boolean;
  }>({});
  const [pageLoading, setLoadingPage] = useState(false);

  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: string | null;
  }>({});

  const toggleUpdateCart = (productId: string, value: boolean) => {
    setUpdateCart((prevState) => ({
      ...prevState,
      [productId]: value,
    }));
  };

  const setLoading = (key: string, isLoading: boolean, id?: string) => {
    setLoadingStates((prevStates) => ({
      ...prevStates,
      [key]: isLoading ? id || null : null,
    }));
  };

  const isLoading = (key: string, id?: string) => {
    if (id) {
      return loadingStates[key] === id;
    } else {
      return !!loadingStates[key];
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        updateCart,
        toggleUpdateCart,
        pageLoading,
        setLoadingPage,
        setLoading,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
