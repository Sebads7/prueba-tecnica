import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../components/firebase/firebase";
import { Cart, Product } from "../types";
import { useCartContext } from "./useCartContext";
import { useEffect } from "react";
import { notifySuccess } from "../components/Roast";

export const useCart = () => {
  const { setCart, setLoadingPage, toggleUpdateCart, setLoading } =
    useCartContext();

  const fetchCart = async (): Promise<Cart | null> => {
    try {
      const cartDocRef = doc(db, "cart", "user123");
      const cartDoc = await getDoc(cartDocRef);
      if (cartDoc.exists()) {
        return cartDoc.data() as Cart;
      }
      return null;
    } catch (error) {
      console.error("Cart document not found");
      throw error;
    }
  };

  useEffect(() => {
    const loadCart = async () => {
      setLoadingPage(true);
      try {
        const cartData = await fetchCart();
        if (cartData) {
          setCart(cartData);
        }
      } catch (error) {
        console.log("Error loading cart", error);
      } finally {
        setLoadingPage(false);
      }
    };
    loadCart();
  }, [setCart, setLoadingPage]);

  //  useEffect(() => {
  //   if (cart.items.find((item) => item.product.id === product.id)) {
  //     setQuantity(
  //       cart.items.find((item) => item.product.id === product.id)?.quantity || 0
  //     );
  //   } else {
  //     setQuantity(0);
  //   }
  // }, []);

  //Esta funcion permite agregar productos al carrito
  const addToCart = async (product: Product, quantity: number) => {
    try {
      setLoading("addToCart", true, product.id);
      const cartDocRef = doc(db, "cart", "user123");
      const cartDoc = await getDoc(cartDocRef);

      if (cartDoc.exists()) {
        const existingCart = cartDoc.data() as Cart;
        const productIndex = existingCart.items.findIndex(
          (item) => item.product.id === product.id
        );
        if (productIndex >= 0) {
          existingCart.items[productIndex].quantity += quantity;
          notifySuccess("Redirigiendo al carrito");
        } else {
          existingCart.items.push({ product, quantity });
        }
        await setDoc(cartDocRef, existingCart);
        setCart(existingCart);
        setLoading("addToCart", false, product.id);
        notifySuccess("Producto agregado al carrito");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  //Esta function permite eliminar productos del carrito
  const removeFromCart = async (product: Product) => {
    setLoading("removeFromCart", true, product.id);
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
      setLoading("removeFromCart", false, product.id);
      return updatedCart;
    });
  };

  const updateItems = async (product: Product, selectedQuantity: number) => {
    setLoading("updateItems", true, product.id);
    try {
      const cartDocRef = doc(db, "cart", "user123");
      const cartDoc = await getDoc(cartDocRef);
      if (cartDoc.exists()) {
        const existingCart = cartDoc.data() as Cart;
        const updatedItems = existingCart.items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: selectedQuantity }
            : item
        );

        const updatedCart = { ...existingCart, items: updatedItems };
        await setDoc(cartDocRef, updatedCart);
        setCart(updatedCart);
        setLoading("updateItems", false, product.id);
        toggleUpdateCart(product.id, false);
        notifySuccess("Carrito actualizado");
      }
    } catch (error) {
      console.error("Error updating items:", error);
    }
  };
  return { removeFromCart, addToCart, updateItems };
};
