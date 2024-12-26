import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Checkout from "./pages/Checkout";

import { ToastContainer } from "react-toastify";
import { CartProvider } from "./context/CartProvider";

function App() {
  return (
    <CartProvider>
      <Router>
        <header>
          <NavBar />
          <ToastContainer />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Checkout />} />
          </Routes>
        </main>
      </Router>
    </CartProvider>
  );
}

export default App;
