import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Checkout from "./pages/Checkout";
import { Cart, Product } from "./types";
import { ToastContainer } from "react-toastify";
import { db } from "./components/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export type CartItem = {
  product: Product;
  quantity: number;
};

function App() {
  const [cart, setCart] = useState<Cart>({
    id: uuidv4(),
    items: [],
    createdAt: new Date(),
  });

  useEffect(() => {
    const loadCart = async () => {
      const cartDocRef = doc(db, "cart", "user123");
      const cartDoc = await getDoc(cartDocRef);

      if (cartDoc.exists()) {
        setCart(cartDoc.data() as Cart);
      }
    };

    loadCart();
  }, []);

  return (
    <Router>
      <header>
        <NavBar cart={cart} />
        <ToastContainer />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
          <Route
            path="/cart"
            element={<Checkout cart={cart} setCart={setCart} />}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
