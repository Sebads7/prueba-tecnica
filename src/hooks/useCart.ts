import { Cart, Product } from "../types";

interface UseCartProps {
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
}

export const useCart = ({ setCart }: UseCartProps) => {
  //Esta funcion permite agregar productos al carrito
  const addToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const newCartItem = {
        product,
        quantity,
      };

      const updatedCart = {
        ...prevCart,
        items: [...prevCart.items, newCartItem],
      };

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // console.log("Product added to cart", newCartItem);
      return updatedCart;
    });
  };

  //Esta function permite eliminar productos del carrito
  const removeFromCart = (product: Product) => {
    setCart((prevCart) => {
      const updatedCart = {
        ...prevCart,
        items: prevCart.items.filter((item) => item.product.id !== product.id),
      };

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return { removeFromCart, addToCart };
};
