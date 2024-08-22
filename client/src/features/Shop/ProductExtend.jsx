import { memo, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { useGetProductsQuery } from "../../api/endpoints/productsApiSlice";
import {
  selectSidebarRight,
  setSidebarRight,
} from "../../api/slices/sidebarSlice";
import queryString from "query-string";
import { convertPrice } from "../../config";
import clsx from "clsx";

const ProductExtend = ({ productId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const search = queryString.parse(location.search);
  const { category } = useParams();
  const openSidebarRight = useSelector(selectSidebarRight);

  // Fetch the product details.
  const { product } = useGetProductsQuery(
    {},
    {
      selectFromResult: ({ data }) => ({ product: data?.entities[productId] }),
      refetchOnMountOrArgChange: true,
    }
  );

  // Toggle sidebar and navigate when a product is clicked.
  const handleOpenProduct = () => {
    if (!openSidebarRight) {
      dispatch(setSidebarRight(true));
    }
    navigate({
      pathname: category ? `/shop/${category}` : "/shop",
      search: createSearchParams({
        ...search,
        productId: product?._id,
      }).toString(),
    });
  };

  // Calculate min and max prices using useMemo for optimization.
  const [min, max] = useMemo(() => {
    if (!product?.subCategory) return [0, 0];

    const prices = product.subCategory.flatMap(({ model }) =>
      model.flatMap(({ skus }) => skus.map(({ price }) => price))
    );

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return [minPrice, maxPrice];
  }, [product]);
  return (
    <div
      className={clsx(
        "w-full outline dark:outline-gray data-[active=true]:outline-orange data-[active=true]:outline-4 dark:hover:outline-orange hover:outline-orange hover:outline-4 rounded"
      )}
      onClick={handleOpenProduct}
      data-active={productId === search.productId}
    >
      <div className="w-full h-full pb-[20px] sm:pb-[10px] rounded cursor-pointer">
        <section className="w-full flex flex-col relative p-0 gap-4 uppercase">
          <div className="w-full block pb-[150%] relative">
            <img
              className="w-full max-h-full absolute top-0 left-0 right-0 object-cover"
              src={product?.productImg[0]?.url}
              alt={product?.name || "No product"}
              loading="lazy"
            />
          </div>
          <div className="flex flex-col justify-between items-center px-[10px] gap-2 sm:gap-1 w-full flex-1">
            <h1 className="flex-1 w-full justify-center items-center text-md whitespace-nowrap overflow-hidden text-ellipsis">
              {product?.name}
            </h1>
            <div className="text-sm flex justify-between items-center w-full">
              <h1 className="text-silver sm:hidden">Giá</h1>
              <h1 className="text-sm text-silver whitespace-wrap text-center">
                {min === max
                  ? convertPrice(max)
                  : `${convertPrice(min)} - ${convertPrice(max)}`}
              </h1>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default memo(ProductExtend);
