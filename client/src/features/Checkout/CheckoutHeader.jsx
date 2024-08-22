import { Button } from "../../components/ui";
import ArrowIcon from "../../assets/icons/ArrowIcon";

const CheckoutHeader = () => {
  return (
    <div className="w-full flex justify-between items-center">
      <span className="text-base sm:text-md uppercase flex gap-2">
        / <h1 className="text-active">Thanh toán</h1> /
      </span>
      <Button size="s-link" design="link-primary" to="/cart">
        <div className="bg-white dark:bg-black mr-2">
          <ArrowIcon width={12} height={7} rotate={"-90deg"} />
        </div>
        Giỏ hàng
      </Button>
    </div>
  );
};

export default CheckoutHeader;
