import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../components/firebase/firebase";
import { Cart, Product } from "../types";

interface UseCartProps {
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
}

export const useCart = ({ setCart }: UseCartProps) => {
  //Esta funcion permite agregar productos al carrito
  const addToCart = async (product: Product, quantity: number) => {
    const cartDocRef = doc(db, "cart", "user123");

    const cartDoc = await getDoc(cartDocRef);
    if (cartDoc.exists()) {
      const existingCart = cartDoc.data() as Cart;

      // Check if the product already exists in the cart
      const productIndex = existingCart.items.findIndex(
        (item) => item.product.id === product.id
      );
      if (productIndex >= 0) {
        existingCart.items[productIndex].quantity += quantity;
      } else {
        existingCart.items.push({ product, quantity });
      }
      await setDoc(cartDocRef, existingCart);
      setCart(existingCart);
    }
  };

  //Esta function permite eliminar productos del carrito
  const removeFromCart = async (product: Product) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter(
        (item) => item.product.id !== product.id
      );

      const updatedCart = {
        ...prevCart,
        items: updatedItems,
      };
      const cartDocRef = doc(db, "cart", "user123");
      setDoc(cartDocRef, updatedCart);
      return updatedCart;
    });
  };

  return { removeFromCart, addToCart };
};
