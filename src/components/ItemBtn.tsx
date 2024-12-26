import Loader from "./Loader";
import { useCartContext } from "../hooks/useCartContext";

type ItemBtnProps = {
  clickEvent: () => void;
  children: React.ReactNode;
  className?: string;
};

const ItemBtn: React.FC<ItemBtnProps> = ({
  clickEvent,
  children,
  className,
}) => {
  const { pageLoading, isLoading } = useCartContext();
  return (
    <button
      type="button"
      className={`w-full  rounded-full  py-3  font-extrabold mt-4 flex justify-center items-center gap-2 ${className}`}
      onClick={clickEvent}
    >
      {pageLoading ||
      isLoading("removeFromCart") ||
      isLoading("addToCart") ||
      isLoading("updateItems") ? (
        <Loader size="w-6 h-6" />
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

export default ItemBtn;
