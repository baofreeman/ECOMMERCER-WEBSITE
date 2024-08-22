import { useEffect } from "react";
import store from "../api/store";
import { productsApiSlice } from "../api/productsApiSlice";
import { Outlet } from "react-router-dom";

const Prefresh = () => {
  useEffect(() => {
    store.dispatch(
      productsApiSlice.util.prefetch("getProducts", "getFilterProducts", {
        force: true,
      })
    );
  }, []);
  return <Outlet />;
};

export default Prefresh;
