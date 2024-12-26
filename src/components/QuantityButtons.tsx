type QuantityButtonsProps = {
  onClick: () => void;
  text: React.ReactNode;
  className?: string;
  btnProp?: boolean;
};

export const QuantityBtn: React.FC<QuantityButtonsProps> = ({
  onClick,
  text,
  className,
  btnProp,
}) => {
  return (
    <button
      className={`border rounded-md  flex justify-center items-center ${className} ${
        btnProp
          ? "cursor-pointer bg-gray-50 hover:bg-gray-100"
          : "cursor-default opacity-50 "
      } 
       `}
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
};
