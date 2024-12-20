import ProductCard from "../components/ProductCard";
import { products } from "../constants/products";

import { Cart } from "../types";

interface HomeProps {
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
}

const Home: React.FC<HomeProps> = ({ cart, setCart }) => {
  return (
    <div className="w-full px-4 ">
      <h1 className="text-center font-bold mt-10 text-2xl">
        Prueba Tecnica: Sebastian Di Salvatore
      </h1>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          cart={cart}
          setCart={setCart}
        />
      ))}
    </div>
  );
};

export default Home;
