import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import {
  getSelectors,
  useGetProductsQuery,
} from "../../api/endpoints/productsApiSlice";
import {
  selectSidebarLeft,
  selectSidebarRight,
} from "../../api/slices/sidebarSlice";

import useScroll from "../../hooks/useScroll";
import ProductExtend from "./ProductExtend";

import { Loading } from "../../components/shared";

const AllProducts = () => {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useLayoutEffect(() => {
    setPage(1);
  }, []);

  const { isFetching, isSuccess } = useGetProductsQuery(
    { page: page },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const { selectIds, selectTotalPage } = getSelectors({
    page: page,
  });

  const products = useSelector(selectIds);
  const totalPage = useSelector(selectTotalPage);

  const [executeScroll, elRef] = useScroll();
  useEffect(() => {
    executeScroll();
  }, []);

  const { ref, inView } = useInView({
    trackVisibility: true,
    delay: 500,
    root: null,
    rootMargin: "200px",
  });

  useEffect(() => {
    setIsLoading(false);
  }, [page]);

  // Increase page when inView is true and not currently fetching
  useEffect(() => {
    if (inView && !isFetching && !isLoading && page < totalPage) {
      setPage((prev) => prev + 1);
      setIsLoading(true);
    }
  }, [inView, isFetching, isLoading, page, totalPage]);

  // Toggle sidebar.
  const openSiderRight = useSelector(selectSidebarRight);
  const openSidebarLeft = useSelector(selectSidebarLeft);
  let gridCols =
    openSidebarLeft && openSiderRight
      ? "grid-cols-4 grid-auto sm:grid-cols-2"
      : !openSidebarLeft && !openSiderRight
      ? "grid-cols-8 grid-auto sm:grid-cols-2"
      : !openSidebarLeft || !openSiderRight
      ? "grid-cols-6 grid-auto sm:grid-cols-2"
      : null;
  let tabItem = null;

  tabItem =
    isSuccess && products?.length > 0
      ? products.map((productId) => (
          <ProductExtend key={productId} productId={productId} />
        ))
      : (tabItem = (
          <span className="text-center m-auto col-span-4">
            Không có sản phẩm
          </span>
        ));

  return (
    <>
      <div ref={elRef} />
      <div className={`grid gap-4 relative ${gridCols}`}>
        {tabItem}
        {isFetching && (
          <div className="w-full col-span-4 sm:col-span-2 m-auto flex items-center justify-center">
            <Loading />
          </div>
        )}
      </div>
      {products.length > 0 && page < totalPage && (
        <div
          ref={ref}
          className="w-full col-span-4 m-auto py-10 flex items-center justify-center"
        >
          {isLoading && <Loading />}
        </div>
      )}
    </>
  );
};

export default AllProducts;
