import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Checkout from "./pages/Checkout";
import { Cart, Product } from "./types";
import { ToastContainer } from "react-toastify";

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

  // Utilizo useEffect para actualizar el carrito en localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
      console.log("Cart loaded from localStorage");
    }
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
          <Route path="/cart" element={<Checkout cart={cart} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
