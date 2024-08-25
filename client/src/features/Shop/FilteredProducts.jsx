import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useGetFilterProductsQuery } from "../../api/endpoints/productsApiSlice";
import {
  selectSidebarLeft,
  selectSidebarRight,
} from "../../api/slices/sidebarSlice";
import ProductExtend from "./ProductExtend";
import useScroll from "../../hooks/useScroll";
import queryString from "query-string";
import { Loading } from "../../components/shared";

const ListFilterProducts = () => {
  const location = useLocation();
  const searchParams = queryString.parse(location.search);
  const { category } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [isPageInitialized, setIsPageInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize page state and trigger refetch
  useEffect(() => {
    setCurrentPage(1);
    setIsPageInitialized(true);
  }, [category, location.pathname]);

  // Fetch filtered products only after currentPage is set to 1
  const { products, refetch } = useGetFilterProductsQuery(
    { category, search: searchParams, page: currentPage },
    {
      skip: !isPageInitialized,
      selectFromResult: ({ data }) => ({
        products: data?.ids.map((id) => id) || [],
      }),
      refetchOnMountOrArgChange: true,
    }
  );

  // Refetch data after page is initialized
  useEffect(() => {
    if (isPageInitialized) {
      refetch();
    }
  }, [isPageInitialized, refetch]);

  // Scroll to top on component mount
  const [executeScroll, scrollRef] = useScroll();
  useEffect(() => {
    executeScroll();
  }, []);

  // Setup infinite scrolling
  const { ref: inViewRef, inView } = useInView();

  useEffect(() => {
    if (inView && !isLoading) {
      setIsLoading(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [inView, Loading]);

  useEffect(() => {
    setIsLoading(false);
  }, [currentPage]);

  // Determine grid columns based on sidebar visibility
  const isSidebarRightOpen = useSelector(selectSidebarRight);
  const isSidebarLeftOpen = useSelector(selectSidebarLeft);
  const gridColumns =
    isSidebarLeftOpen && isSidebarRightOpen
      ? "grid-cols-4 grid-auto sm:grid-cols-2"
      : !isSidebarLeftOpen && !isSidebarRightOpen
      ? "grid-cols-8 grid-auto"
      : "grid-cols-6 grid-auto";

  // Render product items or show a "no products" message
  const productItems = products?.length ? (
    products.map((productId) => (
      <ProductExtend key={productId} productId={productId} />
    ))
  ) : (
    <span className="text-center m-auto col-span-4">Không có sản phẩm</span>
  );

  return (
    <>
      <div ref={scrollRef} />
      <div className={`grid ${gridColumns} gap-4 relative`}>{productItems}</div>
      {products?.length > 0 && (
        <div
          ref={inViewRef}
          className="w-full col-span-4 m-auto py-10 flex items-center justify-center"
        >
          {isLoading && <Loading />}
        </div>
      )}
    </>
  );
};

export default ListFilterProducts;
