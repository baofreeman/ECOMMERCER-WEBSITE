import { useSelector } from "react-redux";
import { selectTotalQuantity } from "../../api/slices/cartSlice";
import Button from "../../components/ui/Button/Button";
import { ArrowIcon } from "../../assets/icons";

const CartHeader = () => {
  const totalQuantity = useSelector(selectTotalQuantity); // GET Total quantity.

  return (
    <div className="flex w-full gap-8 justify-between items-center">
      <div className="flex gap-2 items-center">
        <span className="text-base sm:text-md uppercase flex gap-2">
          / <h1 className="text-active">Giỏ hàng</h1> /
        </span>
        <span className="text-silver">{`Có ${totalQuantity} sản phẩm trong giỏ hàng`}</span>
      </div>
      <Button size="s-link" design="link-primary" to={"/shop"}>
        <div className="bg-white dark:bg-black mr-2">
          <ArrowIcon width={12} height={7} rotate={"-90deg"} />
        </div>
        Cửa hàng
      </Button>
    </div>
  );
};

export default CartHeader;
