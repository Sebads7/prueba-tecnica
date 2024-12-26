import ProductCard from "../components/ProductCard";
import { products } from "../constants/products";

const Home = () => {
  return (
    <div className="w-full px-4 ">
      <h1 className="text-center font-bold mt-10 text-2xl">
        Prueba Tecnica: Sebastian Di Salvatore
      </h1>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Home;
