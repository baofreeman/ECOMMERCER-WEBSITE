import { createRef, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { useGetProductsQuery } from "../../api/endpoints/productsApiSlice";
import ModelDetail from "./ModalDetail";

import { ArrowIcon, ImgIcon } from "../../assets/icons";

const DetailProduct = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");

  // // GET all product.
  const { product } = useGetProductsQuery(
    {},
    {
      selectFromResult: ({ data }) => ({
        product: data?.entities[productId],
      }),
    }
  );
  // // Render image.
  const refs = product?.productImg;
  const childRefs = useMemo(
    () => refs?.map(() => createRef()),
    [refs?.join(",")]
  );
  let currentSlide = 0;
  const showSlide = (index) => {
    childRefs?.forEach((slide, i) => {
      const slideWidth = slide.current?.clientWidth;
      slide.current.style.transform = `translateX(-${index * slideWidth}px)`;
    });
  };

  //Slide image.
  const preSlide = () => {
    currentSlide = (currentSlide - 1 + childRefs?.length) % childRefs?.length;
    showSlide(currentSlide);
  };
  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % childRefs?.length;
    showSlide(currentSlide);
  };

  return (
    <div className="flex sm:h-[100%] md:h-[100%] flex-col gap-4 w-full uppercase p-[12px]">
      {product ? (
        <>
          <div
            className="w-full overflow-scroll no-scrollbar relative flex items-center"
            style={{
              margin: "auto",
            }}
          >
            {product?.productImg.map((item, index) => (
              <div
                className="w-full flex items-center justify-center h-[100%]"
                key={item?.id}
                style={{
                  flex: "0 0 100%",
                }}
                ref={childRefs[index]}
              >
                <img
                  src={item?.url}
                  alt="no product"
                  className="w-full object-cover"
                  style={{ height: "auto" }}
                />
              </div>
            ))}
            <a className="prev" onClick={preSlide}>
              <div className="p-3 cursor-pointer absolute left-0 select-none">
                <ArrowIcon rotate={"90deg"} width={24} height={14} />
              </div>
            </a>
            <a className="next" onClick={nextSlide}>
              <div className="p-3 cursor-pointer absolute right-0 select-none">
                <ArrowIcon rotate={"-90deg"} width={24} height={14} />
              </div>
            </a>
          </div>
          <div className="hidden sm:block md:block">
            <ModelDetail />
          </div>
        </>
      ) : (
        <div className="p-[12px]">
          <div className="w-full h-[300px] border rounded bg-gray opacity-50 flex flex-col items-center justify-center">
            <ImgIcon />
            <h1>Chọn sản phẩm để xem chi tiết</h1>
          </div>
        </div>
      )}
    </div>
  );
};
export default DetailProduct;
