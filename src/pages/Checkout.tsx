import { useFormatPrice } from "../hooks/useFormatPrice";
import "react-toastify/dist/ReactToastify.css";
import { notifySuccess } from "../components/Roast";

interface Cart {
  product: { id: string; title: string; img: string; price: number };
  quantity: number;
}

interface CartProps {
  cart: { items: Cart[] };
}

const Checkout = ({ cart }: CartProps) => {
  const removeFromCart = (product: { id: string }) => {
    const updatedCart = cart.items.filter(
      (item) => item.product.id !== product.id
    );
    localStorage.setItem("cart", JSON.stringify({ items: updatedCart }));
    notifySuccess("Product removed from cart");

    setTimeout(() => {
      window.location.reload();
    }, 4000);
  };

  const { formatPrice } = useFormatPrice();

  return (
    <div>
      <div className="my-8 container mx-auto w-3/4 ">
        <h2 className="text-2xl font-bold text-center my-20">Cart Summary</h2>
        {cart.items.length > 0 ? (
          cart.items.map(
            (item: {
              product: {
                id: string;
                title: string;
                img: string;
                price: number;
              };
              quantity: number;
            }) => (
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
                    onClick={() => removeFromCart(item.product)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )
          )
        ) : (
          <p>The cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Checkout;
