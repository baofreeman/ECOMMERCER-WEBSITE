import { useEffect, useLayoutEffect, useState } from "react";
import { useGetProductsQuery } from "../../../api/endpoints/productsApiSlice";
import { Loading } from "../../../components/shared";
import ProductExtent from "./ProductExtent";
import { useInView } from "react-intersection-observer";
import useScroll from "../../../hooks/useScroll";
import { useLocation } from "react-router-dom";

const Products = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useLayoutEffect(() => {
    setPage(1);
  }, [location.pathname]);
  const {
    data: products,
    isFetching,
    isSuccess,
  } = useGetProductsQuery({ page: page }, { refetchOnMountOrArgChange: true });

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

  let content;

  content =
    isSuccess && products?.ids?.length > 0
      ? products?.ids.map((productId) => (
          <ProductExtent key={productId} productId={productId} />
        ))
      : (content = (
          <div className="w-full flex items-center justify-center">
            <h1>Không có sản phẩm</h1>
          </div>
        ));

  return (
    <>
      <div ref={elRef}></div>
      <div className="p-10 w-full">
        <section className="w-full">
          {isFetching && (
            <div className="w-full col-span-4 m-auto flex items-center justify-center">
              <Loading />
            </div>
          )}
          {products && products?.ids?.length ? (
            <table className="w-full uppercase">
              <thead>
                <tr>
                  <th className="text-left px-8 py-4">Hình ảnh</th>
                  <th className="text-left px-8 py-4">tên</th>
                  <th className="text-left px-8 py-4">mô tả</th>
                  <th className="text-left px-8 py-4">danh mục</th>
                  <th className="text-left px-8 py-4"></th>
                  <th className="text-left px-8 py-4"></th>
                </tr>
              </thead>
              <tbody>{content}</tbody>
            </table>
          ) : (
            <div className="text-center m-auto">
              <h1>Không có sản phẩm</h1>
            </div>
          )}
          {products?.ids?.length > 0 && (
            <div
              ref={ref}
              className="w-full col-span-4 m-auto py-10 flex items-center justify-center"
            >
              {isLoading && <Loading />}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Products;
