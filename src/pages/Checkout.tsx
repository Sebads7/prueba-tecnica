import { useFormatPrice } from "../hooks/useFormatPrice";
import { notifySuccess } from "../components/Roast";
import { useCart } from "../hooks/useCart";
import { Product } from "../types";
import "react-toastify/dist/ReactToastify.css";
import { useCartContext } from "../hooks/useCartContext";
import { QuantityBtn } from "../components/QuantityButtons";
import Loader from "../components/Loader";

const Checkout = () => {
  const { cart, pageLoading, isLoading } = useCartContext();

  const { removeFromCart, updateItems } = useCart();
  const { formatPrice } = useFormatPrice();

  const handleRemoveFromCart = (product: Product) => {
    removeFromCart(product);
    // console.log("Product removed from cart", product);
    notifySuccess("Producto eliminado del carrito");
  };

  const handleAddQuantity = (
    product: Product,
    quantity: number,
    stock: number
  ) => {
    if (quantity < stock) {
      updateItems(product, quantity + 1);
    }
  };

  const handleRemoveQuantity = (product: Product, quantity: number) => {
    if (quantity > 1) {
      updateItems(product, quantity - 1);
    }
  };

  return (
    <>
      {pageLoading ? (
        <div className="flex justify-center items-center w-full h-[80vh]">
          <Loader size="w-14 h-14" />
        </div>
      ) : (
        <div>
          <div className="my-8 container mx-auto w-3/4 ">
            <h1 className="text-2xl font-bold text-center my-20">Mi Carrito</h1>
            {cart && cart.items && cart.items.length > 0 ? (
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

                    <div className="flex items-center  gap-2 my-2">
                      <p className="border rounded-md px-2 py-px flex items-center gap-2">
                        Cantidad:
                        {isLoading("updateItems", item.product.id) &&
                        cart.items.find(
                          (i) => i.product.id === item.product.id
                        ) ? (
                          <Loader size="h-4 w-4" />
                        ) : (
                          <strong className="text-blue-700">
                            {item.quantity}
                          </strong>
                        )}
                      </p>
                      <QuantityBtn
                        text="-"
                        onClick={() =>
                          handleRemoveQuantity(item.product, item.quantity)
                        }
                        btnProp={item.quantity > 1}
                        className="w-6 h-6"
                      />

                      <QuantityBtn
                        text="+"
                        onClick={() =>
                          handleAddQuantity(
                            item.product,
                            item.quantity,
                            item.product.stock
                          )
                        }
                        className="w-6 h-6"
                        btnProp={item.product.stock > item.quantity}
                      />
                    </div>
                    <p className="flex items-center">
                      <strong className="mr-1">Precio Total:</strong>
                      {isLoading("updateItems", item.product.id) ? (
                        <Loader size="h-4 w-4" />
                      ) : (
                        formatPrice(item.quantity * item.product.price)
                      )}
                    </p>
                    <button
                      className="bg-blue-700 hover:bg-blue-700/90 text-white font-bold py-2 px-4 rounded-full mt-5 text-sm"
                      onClick={() => handleRemoveFromCart(item.product)}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center border w-3/4 mx-auto py-5 font-bold text-gray-500">
                El carrito esta vacio
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
