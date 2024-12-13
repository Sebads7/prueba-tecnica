import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";
import { Cart, Product } from "../types";
import { useFormatPrice } from "../hooks/useFormatPrice";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { notifyError, notifySuccess } from "./Roast";
import { useNavigate } from "react-router-dom";

type ProductCardProps = {
  product: Product;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
  cart: Cart;
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  setCart,
  cart,
}) => {
  const [quantity, setQuantity] = useState(0);

  const { removeFromCart, addToCart } = useCart({ setCart });

  // FUNCION PARA AGREGAR AL CARRITO

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity);
      notifySuccess("Producto agregado al carrito");
    } else {
      notifyError("Seleccione una cantidad");
    }
  };

  const navigate = useNavigate();

  // FUNCTION PARA COMPRAR Y REDIRIGIR AL CARRITO.

  const handleBuyNow = () => {
    if (quantity > 0 && cart.items.length === 0) {
      addToCart(product, quantity);
      notifySuccess("Producto agregado! Redirigiendo al carrito");
      setTimeout(() => {
        navigate("/cart"); // Redirect to the cart
      }, 4000);
    } else if (cart.items.some((item) => item.product.id === product.id)) {
      notifySuccess("Redirigiendo al carrito");
      setTimeout(() => {
        navigate("/cart"); // Redirect to the cart
      }, 4000);
    } else {
      notifyError("Seleccione una cantidad");
    }
  };

  const handleRemoveFromCart = () => {
    if (cart.items.length > 0) {
      removeFromCart(product);
      notifySuccess("Producto eliminado del carrito");
      // alert("Producto eliminado del carrito");
      setQuantity(0);
    }
  };

  const handleAddQuantity = () => {
    if (product.stock - quantity > 0) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleRemoveQuantity = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  const { formatPrice } = useFormatPrice();

  return (
    <div className="flex flex-col md:flex-row gap-7 items-center justify-center pt-20  md:pb-40 container md:w-3/4  mx-auto last:mb-10 ">
      <div className=" ">
        <img
          src={product.img}
          alt=""
          className="w-[26rem] h-[26rem] object-cover rounded-2xl md:mt-12 "
        />
      </div>

      <div className="md:w-2/4">
        <p className="text-zinc-400 text-sm font-semibold pl-5 md:pl-0">
          SKU: {product.id}
        </p>
        <h2 className="text-lg md:text-2xl font-bold pl-5 md:pl-0">
          {product.title}
        </h2>
        {product.stock > 0 ? (
          <div className="flex items-center gap-1 font-semibold text-lg pl-5 md:pl-0">
            <CiCircleCheck className="text-green-500 text-xl stroke-1" />
            <p>Stock disponible</p>
          </div>
        ) : (
          <div className="flex items-center gap-1 font-semibold text-lg pl-5 md:pl-0">
            <CiCircleRemove className="text-red-500 text-xl stroke-1" />
            <p>Sin stock </p>
          </div>
        )}

        <ul className="mt-5 mx-auto w-full   pl-5 md:pl-0">
          <li className="flex ">
            <p className="font-extrabold text-2xl mr-1">
              {formatPrice(product.price)}
            </p>

            {product.discount && (
              <p className="bg-blue-500 rounded-lg py-1 px-2 text-white text-sm mt-2 font-bold">
                {product.discount}
              </p>
            )}
          </li>
          {product.id === "100012" && (
            <li className=" font-semibold text-sm">PU: $306</li>
          )}

          {product.listingPrice && (
            <li className="text-zinc-400 font-bold  line-through">
              {formatPrice(product.listingPrice)}
            </li>
          )}
        </ul>

        <div className="mt-5 flex flex-col md:flex-row items-center  gap-10">
          {product.salesUnit === "group" ? (
            <ul>
              <li className="font-semibold mb-2">Cantidad de Unidades</li>
              <li className="flex items-center gap-2">
                <p className="border rounded-md py-1 px-4">
                  {product.unitValue}
                </p>
                <p className="text-zinc-400">unidades</p>
              </li>
            </ul>
          ) : product.salesUnit === "area" ? (
            <ul>
              <li className="font-semibold mb-2">Superficie</li>
              <li className="flex items-center gap-2">
                <p className="border rounded-md py-1 px-4">
                  {product.unitValue}
                </p>
                <p className="text-zinc-400">{product.measurementUnit}</p>
              </li>
            </ul>
          ) : (
            <div className="hidden"></div>
          )}

          <ul className="mx-auto md:mx-0">
            {product.salesUnit === "group" ? (
              <li className="font-semibold">Cantidad de Pallets</li>
            ) : (
              <li className="font-semibold">Cantidad de Cajas</li>
            )}

            <li
              className={`flex gap-2 items-center mt-2 ${
                product.stock === 0 ? "opacity-40" : ""
              }`}
            >
              <button
                className={`border rounded-md px-4 py-1 ${
                  product.stock === 0 ? "cursor-default" : ""
                }`}
                type="button"
                onClick={handleRemoveQuantity}
              >
                -
              </button>
              <p className="border rounded-md px-7 py-1">
                {cart.items.some(
                  (item) => item.product.id === product.id && item.quantity > 0
                )
                  ? cart.items.find((item) => item.product.id === product.id)
                      ?.quantity
                  : quantity}
              </p>
              <button
                className={`border rounded-md px-4 py-1 ${
                  product.stock === 0 ? "cursor-default" : ""
                }`}
                type="button"
                onClick={handleAddQuantity}
              >
                +
              </button>
              {product.salesUnit === "unit" && (
                <p className="font-medium"> unidades</p>
              )}
            </li>
          </ul>
        </div>

        <p className="mt-5 text-zinc-400  font-semibold text-center md:text-left">
          {product.description}
        </p>

        {/* ///////////// BUTTONS:  BUY AND (ADD TO CART | REMOVE FROM CART) /////////////// */}

        <div className="mt-5 ">
          <button
            type="button"
            className={`w-full bg-blue-800  rounded-full  py-4 text-white font-extrabold ${
              product.stock === 0 ? "cursor-default" : "hover:bg-blue-800/90"
            }`}
            onClick={handleBuyNow}
          >
            {cart && cart.items.some((item) => item.product.id === product.id)
              ? "Checkout"
              : "Comprar ahora"}
          </button>

          {/* En esta parte del código, se muestra un botón que permite agregar un producto al carrito. Si el producto ya está en el carrito, se muestra un botón para eliminarlo.  */}
          {cart && cart.items.some((item) => item.product.id === product.id) ? (
            <button
              type="button"
              className="w-full border-2 border-blue-800 hover:bg-indigo-50  rounded-full  py-3 text-blue-800 font-extrabold mt-4 flex justify-center items-center gap-2"
              onClick={handleRemoveFromCart}
            >
              Eliminar del carrito
            </button>
          ) : (
            <button
              type="button"
              className="w-full border-2 border-blue-800 hover:bg-indigo-50  rounded-full  py-3 text-blue-800 font-extrabold mt-4 flex justify-center items-center gap-2"
              onClick={handleAddToCart}
            >
              Agregar
              <MdOutlineShoppingCart className="text-3xl" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
