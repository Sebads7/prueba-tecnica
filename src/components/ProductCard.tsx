import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";
import { Product } from "../types";
import { useFormatPrice } from "../hooks/useFormatPrice";

import { useCart } from "../hooks/useCart";
import { notifyError, notifySuccess } from "./Roast";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../hooks/useCartContext";
import { useEffect, useState } from "react";
import { QuantityBtn } from "./QuantityButtons";

import ItemBtn from "./ItemBtn";
import { MdOutlineShoppingCart } from "react-icons/md";
import Loader from "./Loader";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { cart, updateCart, toggleUpdateCart } = useCartContext();
  const [quantity, setQuantity] = useState(
    product.salesUnit === "area" ? 1 : 0
  );
  const [inputValue, setInputValue] = useState<number | string>(
    product.unitValue || ""
  );

  const cartItem = cart.items.find((item) => item.product.id === product.id);
  const isUpdating = updateCart[product.id] || false;

  /////////// HOOKS //////////////

  const { formatPrice } = useFormatPrice();
  const { removeFromCart, addToCart, updateItems } = useCart();
  const navigate = useNavigate();
  const { pageLoading } = useCartContext();

  const unitPerBox = 2.68;

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
      setInputValue((cartItem.quantity * unitPerBox).toFixed(2));
    }
  }, [cart.items, product.id, cartItem, product.unitValue]);

  ////////// HANDLERS ///////////
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : parseFloat(e.target.value);
    if (value === "") {
      setInputValue("");
      setQuantity(0);
    } else if (!isNaN(value)) {
      const requiredQuantity = Math.ceil(value / unitPerBox);
      if (requiredQuantity > product.stock) {
        notifyError("No hay stock suficiente");
      } else {
        setInputValue(value);
        setQuantity(requiredQuantity);
        if (cartItem) {
          toggleUpdateCart(product.id, true);
        }
      }
    }
  };

  // FUNCION PARA AGREGAR AL CARRITO
  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity);
    } else {
      notifyError("Seleccione una cantidad");
    }
  };

  // FUNCTION PARA COMPRAR Y REDIRIGIR AL CARRITO.
  const handleBuyNow = () => {
    if (quantity > 0 && !cartItem) {
      addToCart(product, quantity);
      setTimeout(() => {
        notifySuccess("Redirigiendo al carrito");
      }, 2000);
      setTimeout(() => {
        navigate("/cart"); // Redirect to the cart
      }, 4000);
    } else if (cart.items.some((item) => item.product.id === product.id)) {
      notifySuccess("Redirigiendo al carrito");
      setTimeout(() => {
        navigate("/cart"); // Redirect to the cart
      }, 1500);
    } else {
      notifyError("Seleccione una cantidad");
    }
  };

  const handleRemoveFromCart = () => {
    if (cart.items.length > 0 && cartItem) {
      removeFromCart(product);
      notifySuccess("Producto eliminado del carrito");
      setQuantity(0);
    }
  };

  const handleUpdateCart = () => {
    if (cartItem && quantity > 0) {
      updateItems(product, quantity);
    } else {
      removeFromCart(product);
    }
  };

  const handleAddQuantity = () => {
    if (product.stock > quantity) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      if (cartItem) {
        toggleUpdateCart(product.id, true);
      }
      if (product.salesUnit === "area" && product.unitValue) {
        setInputValue((newQuantity * unitPerBox).toFixed(2));
      }
    }
  };

  const handleRemoveQuantity = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      if (product.salesUnit === "area" && product.unitValue) {
        setInputValue((newQuantity * unitPerBox).toFixed(2));
      }
      if (cartItem) {
        toggleUpdateCart(product.id, true);
      }
    }
  };

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
          ) : product.salesUnit === "area" && product.unitValue ? (
            <ul>
              <li className="font-semibold mb-2">Superficie</li>
              <li className="flex items-center gap-2">
                {pageLoading ? (
                  <div className="border rounded-md w-20 p-1 flex justify-center items-center">
                    {" "}
                    <Loader size="w-6 h-6 " />
                  </div>
                ) : (
                  <input
                    className="border rounded-md w-20 p-1 flex justify-center items-center focus:ring-sky-500 no-spinner "
                    placeholder={unitPerBox.toString()}
                    value={inputValue}
                    type="number"
                    min="2.68"
                    step="0.01"
                    onChange={handleChangeInput}
                  />
                )}

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
              <QuantityBtn
                onClick={handleRemoveQuantity}
                text="-"
                btnProp={quantity !== 0}
                className="w-9 h-9"
              />
              {/* ///// quantity ///*/}
              <p className="border rounded-md px-7 py-1">
                {pageLoading ? <Loader size="w-6 h-6" /> : quantity}
              </p>
              <QuantityBtn
                onClick={handleAddQuantity}
                text="+"
                btnProp={product.stock > quantity}
                className="w-9 h-9"
              />
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
          <ItemBtn
            clickEvent={handleBuyNow}
            className="bg-blue-800 hover:bg-blue-800/90 text-white"
            children={cart && cartItem ? "Ir al carrito" : "Comprar ahora"}
            buttonId={product.id}
          />
          {/* En esta parte del código, se muestra un botón que permite agregar un producto al carrito. Si el producto ya está en el carrito, se muestra un botón para eliminarlo.  */}
          {cart && cartItem ? (
            <ItemBtn
              clickEvent={isUpdating ? handleUpdateCart : handleRemoveFromCart}
              className=" btn-white"
              children={!isUpdating ? "Eliminar del carrito" : "Actualizar"}
              buttonId={product.id}
            />
          ) : (
            <ItemBtn
              clickEvent={handleAddToCart}
              className=" btn-white"
              buttonId={product.id}
              children={
                <>
                  Agregar
                  <MdOutlineShoppingCart className="text-3xl" />
                </>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
