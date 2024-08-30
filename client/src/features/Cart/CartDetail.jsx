import { useDispatch, useSelector } from "react-redux";

import {
  addToCart,
  decrToCart,
  deleteCart,
  selectCartItem,
} from "../../api/slices/cartSlice";

import { Button } from "../../components/ui";
import { Modal } from "../../components/shared";
import { ArrowIcon, DeleteIcon } from "../../assets/icons";
import { convertPrice } from "../../config/convertPrice";
import { useModal } from "../../context/ModalContext";

const CartDetail = () => {
  const cart = useSelector(selectCartItem); // Select cart items from the Redux store
  const dispatch = useDispatch();
  const { openModal, closeModal } = useModal();

  // Increment the quantity of the product
  const handleIncrement = (item) => {
    dispatch(addToCart(item));
  };

  // Decrement the quantity of the product
  const handleDecrement = (item) => {
    dispatch(decrToCart(item));
  };

  // Handle the deletion of the product from the cart
  const handleDelete = (item) => {
    dispatch(deleteCart(item));
    closeModal();
  };

  const showDeleteModal = (item) => {
    openModal(
      <Modal
        callback={() => handleDelete(item)}
        data={item}
        title={"Bạn có muốn xóa sản phẩm khỏi giỏ hàng?"}
      />
    );
  };

  return (
    <section className="w-full h-[100%]">
      {cart.length > 0 ? (
        <table className="w-full">
          <thead className="w-full uppercase">
            <tr>
              <th className="text-center px-2 py-4 w-[20%]">Hình ảnh</th>
              <th className="text-center px-2 py-4 w-[20%]">Tên sản phẩm</th>
              <th className="text-center px-2 py-4 w-[10%]">Màu sắc</th>
              <th className="text-center px-2 py-4 w-[10%]">Kich cỡ</th>
              <th className="text-center px-2 py-4 w-[20%]">Số lượng</th>
              <th className="text-center px-2 py-4 w-[20%]">Giá</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {cart.map((item) => (
              <tr key={item?.subCategory?.model?.skus?._id}>
                <td className="border px-2 text-center w-[20%] h-full py-4">
                  <img
                    src={item.productImg[0].url}
                    width={"60%"}
                    height={"100%"}
                    alt="Product"
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                  />
                </td>
                <td className="border px-2 text-center py-4 whitespace-wrap overflow-hidden w-[20%]">
                  <h1 className="line-clamp-3">{item.name}</h1>
                </td>
                <td className="border px-2 text-center py-4 w-[10%]">
                  {item.subCategory?.model?.color}
                </td>
                <td className="border px-2 text-center py-4 w-[10%]">
                  {item.subCategory?.model?.skus?.size}
                </td>
                <td className="border px-2 text-center py-4 w-[20%]">
                  <div className="flex gap-5 items-center justify-center select-none">
                    <div onClick={() => handleIncrement(item)}>
                      <div className="border rounded p-3 cursor-pointer">
                        <ArrowIcon width={12} height={7} rotate={"180deg"} />
                      </div>
                    </div>
                    <h1 className="text-orange">{item.qty}</h1>
                    <div
                      onClick={() => handleDecrement(item)}
                      aria-disabled={item.qty <= 1}
                    >
                      <div
                        className={
                          item.qty <= 1
                            ? "border rounded p-3 cursor-not-allowed opacity-50"
                            : "border rounded p-3 cursor-pointer"
                        }
                      >
                        <ArrowIcon width={12} height={7} rotate={"0deg"} />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="border px-2 text-center py-4 select-none w-[20%]">
                  {convertPrice(item.subCategory.model.skus.price)}
                </td>
                <td
                  className="border px-2 text-center py-4 select-none w-[20%]"
                  onClick={() => showDeleteModal(item)}
                >
                  <DeleteIcon />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="w-full flex flex-col justify-center items-center h-[100%]">
          <span>Không có sản phẩm</span>
          <Button size="m" design="link-primary" width="max" to={"/shop"}>
            Tiếp tục mua sắm
          </Button>
        </div>
      )}
    </section>
  );
};

export default CartDetail;
