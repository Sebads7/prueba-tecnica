import { useFormatPrice } from "../hooks/useFormatPrice";
import { notifySuccess } from "../components/Roast";
import { useCart } from "../hooks/useCart";
import { Cart, Product } from "../types";
import "react-toastify/dist/ReactToastify.css";

interface CartProps {
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
}

const Checkout = ({ cart, setCart }: CartProps) => {
  const { removeFromCart } = useCart({ setCart });
  const { formatPrice } = useFormatPrice();

  const handleRemoveFromCart = (product: Product) => {
    removeFromCart(product);
    // console.log("Product removed from cart", product);
    notifySuccess("Producto eliminado del carrito");
  };

  return (
    <div>
      <div className="my-8 container mx-auto w-3/4 ">
        <h1 className="text-2xl font-bold text-center my-20">Cart Summary</h1>
        {cart.items.length > 0 ? (
          cart.items.map((item) => (
            <div
              key={item.product.id}
              className="mt-10 flex flex-col md:flex-row gap-5 border py-5 md:p-5 justify-center md:justify-start items-center text-center md:text-start "
            >
              <div className="w-40 h-40">
                <img
                  src={item.product.img}
                  alt=""
                  className="w-40 h-40 object-cover"
                />
              </div>
              <div>
                <p className="font-bold">{item.product.title}</p>
                <p>
                  <strong className="mr-1">Quantity:</strong>
                  {item.quantity}
                </p>
                <p>
                  <strong className="mr-1">Price:</strong>
                  {formatPrice(item.quantity * item.product.price)}
                </p>
                <button
                  className="bg-blue-700 hover:bg-blue-700/90 text-white font-bold py-2 px-4 rounded-full mt-5 text-sm"
                  onClick={() => handleRemoveFromCart(item.product)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center border w-3/4 mx-auto py-5 font-bold text-gray-500">
            The cart is empty.
          </p>
        )}
      </div>
    </div>
  );
};

export default Checkout;
