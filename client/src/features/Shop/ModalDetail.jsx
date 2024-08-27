import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getSelectors,
  useLazyGetVariantsQuery,
} from "../../api/endpoints/productsApiSlice";
import { addToCart } from "../../api/slices/cartSlice";

import { Select, Button, Errors } from "../../components/ui";
import { Loading, Modal } from "../../components/shared";
import { convertPrice } from "../../config";
import { toast } from "react-toastify";
import { useModal } from "../../context/ModalContext";
import SizePattern from "./SizePattern";

const ModalDetail = () => {
  const [searchParams] = useSearchParams();
  const [selectedSizeId, setSelectedSizeId] = useState("");
  const [selectedColorId, setSelectedColorId] = useState("");
  const { openModal, closeModal } = useModal();

  const productId = searchParams.get("productId"); // GET productId params
  const dispatch = useDispatch();

  const { selectById } = getSelectors({});
  const product = useSelector(selectById(productId));

  // // GET variants Product with lazy query
  const [fetchVariants, { data, error, isError, isLoading }] =
    useLazyGetVariantsQuery();

  useEffect(() => {
    if (selectedSizeId) {
      fetchVariants(selectedSizeId);
    }
  }, [selectedSizeId, fetchVariants]);

  const variants = product?.subCategory.flatMap(({ tag, model, _id }) => ({
    tag,
    model,
    _id,
  }));

  const handleSizeChange = (e) => {
    const sizeId = e.target.value;
    setSelectedSizeId(sizeId);
  };

  const handleColorChange = (colorId) => {
    setSelectedColorId(colorId);
  };

  // Add to cart
  const handleAddToCart = async () => {
    if (data[0]) {
      try {
        await dispatch(addToCart(data[0]));
        setSelectedSizeId("");
        setSelectedColorId("");
      } catch {
        toast.error("Failed to add to cart");
      }
    } else {
      toast.error(error?.message || "An error occurred");
    }
  };

  const showDeleteModal = () => {
    openModal(<SizePattern />);
  };

  if (!productId) {
    return (
      <span className="text-silver flex justify-center items-center h-full w-full">
        CHỌN SẢN PHẨM ĐỂ XEM CHI TIẾT
      </span>
    );
  }
  return (
    <div className="flex w-full sm:flex-col overflow-hidden h-[100%]">
      <div className="flex w-full items-start justify-center gap-6">
        <div className="flex h-full w-[30%] flex-col gap-2">
          <h1 className="line-clamp-2 pr-[10px] font-bold text-primary select-none">
            {product?.name}
          </h1>
          <div className="w-full h-[80px] overflow-scroll no-scrollbar">
            <span className="text-silver">{product?.description}</span>
          </div>
        </div>
        <div className="flex w-[70%] gap-2 h-[100%] sm:flex-col">
          <div className="flex flex-row gap-4 w-[70%] sm:w-full sm:flex-col flex-wrap sm:h-[100px] overflow-y-scroll scroll-smooth lg:no-scrollbar xl:no-scrollbar 2xl:no-scrollbar sm:overflow-x-scroll sm:overflow-y-hidden">
            {variants?.map((variant) => (
              <div
                key={variant?._id}
                className="flex flex-col basic-1/2 grow min-w-0 items-start h-[100%] gap-2 border rounded p-[10px] uppercase"
              >
                <h1 className="px-2 cursor-pointers w-full">{variant.tag}</h1>
                <div className="px-2 flex flex-col sm:h-[62px] w-full items-start h-[100%] justify-between gap-2 sm:flex-nowrap scroll-smooth overflow-y-scroll">
                  {variant.model.map((model) => (
                    <div
                      key={model._id}
                      className="flex items-center gap-2 py-2 flex-1 w-full"
                    >
                      <div className="flex gap-2 pr-[6px] hover:scale-105">
                        <input
                          type="checkbox"
                          className="size-6 cursor-pointer"
                          value={model._id}
                          onChange={(e) => {
                            handleColorChange(e.target.value);
                          }}
                          checked={model._id === selectedColorId}
                          id={`color-${model._id}`}
                        />
                        <label
                          className={
                            model._id === selectedColorId
                              ? `text-active cursor-pointer`
                              : "cursor-pointer"
                          }
                          htmlFor={`color-${model._id}`}
                        >
                          {model.color}
                        </label>
                      </div>
                      <div className="flex-1 w-full">
                        <Select
                          design="basic"
                          onChange={(e) => handleSizeChange(e)}
                          disabled={model._id !== selectedColorId}
                          label={"Kích cỡ"}
                        >
                          {model.skus.map((sku) => (
                            <option key={sku._id} value={sku._id}>
                              {sku.size}
                            </option>
                          ))}
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:w-full gap-2 items-start justify-between w-[30%] px-4">
            <Button size="s-link" design="link-basic" onClick={showDeleteModal}>
              Hướng dẫn kích cỡ
            </Button>
            <div className="flex w-full gap-4">
              <h1 className="text-silver">GIÁ: </h1>
              {isLoading && <Loading />}
              {data && data[0]?.subCategory?.model?.skus?.price && (
                <h1 className="text-orange">
                  {convertPrice(data[0]?.subCategory?.model?.skus?.price)}
                </h1>
              )}
            </div>
            <Button
              size="m"
              design={"primary"}
              width="full"
              onClick={handleAddToCart}
              disabled={!selectedSizeId}
            >
              Thêm giỏ hàng
            </Button>
          </div>
        </div>
        {isError && <Errors>{error.message}</Errors>}
      </div>
    </div>
  );
};

export default ModalDetail;
