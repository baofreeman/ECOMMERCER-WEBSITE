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
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useLayoutEffect(() => {
    setPage(1);
  }, [location.pathname]);

  const { isFetching, isSuccess } = useGetProductsQuery(
    { page: page },
    { refetchOnMountOrArgChange: true }
  );

  const { selectIds } = getSelectors({
    page: page,
  });
  const products = useSelector(selectIds);

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
    isSuccess && setIsLoading(false);
  }, [page]);

  useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      setIsLoading(true);
    }
  }, [inView]);

  // Toggle sidebar.
  const openSiderRight = useSelector(selectSidebarRight);
  const openSidebarLeft = useSelector(selectSidebarLeft);
  let gridCols =
    openSidebarLeft && openSiderRight
      ? "grid-cols-4 grid-auto sm:grid-cols-2"
      : !openSidebarLeft && !openSiderRight
      ? "grid-cols-8 grid-auto"
      : !openSidebarLeft || !openSiderRight
      ? "grid-cols-6 grid-auto"
      : null;
  let tabItem = null;

  tabItem =
    isSuccess && products?.length
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
        {isFetching && (
          <div className="w-full col-span-4 m-auto flex items-center justify-center">
            <Loading />
          </div>
        )}
        {tabItem}
      </div>
      {products.length > 0 && (
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
