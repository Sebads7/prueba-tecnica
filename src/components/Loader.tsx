import { AiOutlineLoading3Quarters } from "react-icons/ai";

type LoaderProps = {
  size: string;
  container?: string;
};
const Loader = ({ size, container }: LoaderProps) => {
  return (
    <span className={`flex items-center  ${container}`}>
      <AiOutlineLoading3Quarters
        className={`animate-spin  ${size} text-blue-700`}
      />
    </span>
  );
};

export default Loader;
