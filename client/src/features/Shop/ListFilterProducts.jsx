import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useLazyGetFilterProductsQuery } from "../../api/endpoints/productsApiSlice";
import {
  selectSidebarLeft,
  selectSidebarRight,
} from "../../api/slices/sidebarSlice";
import ProductExtend from "./ProductExtend";
import useScroll from "../../hooks/useScroll";
import queryString from "query-string";
import { Loading } from "../../components/shared";

const ListFilterProducts = () => {
  const { search } = useLocation();
  const searchParams = queryString.parse(search);
  const { category } = useParams();
  const [page, setPage] = useState(1);

  const [trigger, { data: products, isFetching, isSuccess, isLoading }] =
    useLazyGetFilterProductsQuery();

  useEffect(() => {
    setPage(1);
    // Trigger API call when category or search changes
    trigger({ category, search: searchParams, page: 1 });
  }, [category, search]);

  // Fetch filtered products when page changes
  useEffect(() => {
    // If page is greater than 1, fetch the products for that page
    if (page > 1) {
      trigger({ category, search: searchParams, page });
    }
  }, [page]);

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
    if (inView && !isFetching && !isLoading && page < products?.totalPages) {
      setPage((prev) => prev + 1);
    }
  }, [inView, isFetching, isLoading, page, products?.totalPages]);

  const isSidebarRightOpen = useSelector(selectSidebarRight);
  const isSidebarLeftOpen = useSelector(selectSidebarLeft);
  const gridColumns =
    isSidebarLeftOpen && isSidebarRightOpen
      ? "grid-cols-4 grid-auto sm:grid-cols-2"
      : !isSidebarLeftOpen && !isSidebarRightOpen
      ? "grid-cols-8 grid-auto"
      : "grid-cols-6 grid-auto";

  const productItems =
    isSuccess && products?.ids?.length > 0 ? (
      products?.ids.map((productId) => (
        <ProductExtend key={productId} productId={productId} />
      ))
    ) : (
      <span className="text-center m-auto col-span-4">Không có sản phẩm</span>
    );

  return (
    <>
      <div ref={elRef} />
      <div className={`grid ${gridColumns} gap-4 relative`}>
        {productItems}
        {isFetching && (
          <div className="w-full col-span-4 sm:col-span-2 m-auto flex items-center justify-center">
            <Loading />
          </div>
        )}
      </div>
      {products?.ids?.length > 0 && page < products?.totalPages && (
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

export default ListFilterProducts;
