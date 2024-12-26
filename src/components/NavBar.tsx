import { MdOutlineShoppingCart } from "react-icons/md";

import { Link } from "react-router-dom";
import { useCartContext } from "../hooks/useCartContext";

const NavBar = () => {
  const { cart } = useCartContext();
  return (
    <nav className="w-full h-10 p-5 flex justify-between border border-blue-100 pb-20">
      <div className="w-full pt-5 ">
        <div className="flex gap-10   justify-center">
          <Link to="/" className="hover:text-blue-400 cursor-pointer">
            Home
          </Link>
          <Link to="/cart" className="hover:text-blue-400 cursor-pointer">
            Carrito
          </Link>
        </div>
      </div>

      <div className="mr-10 cursor-pointer">
        <Link to="/cart">
          <p className="rounded-full px-2 bg-blue-400 translate-x-3 translate-y-2 flex justify-center items-center text-sm text-white">
            {cart.items.length}
          </p>
          <MdOutlineShoppingCart className="text-3xl" />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
