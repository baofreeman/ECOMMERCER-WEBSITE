"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import clsx from "clsx";

import { useGetProductsQuery } from "../../../api/endpoints/productsApiSlice";
import {
  selectSidebarLeft,
  selectSidebarRight,
  setSidebarLeft,
  setSidebarRight,
} from "../../../api/slices/sidebarSlice";

import useResize from "../../../hooks/useResize";

import LayoutLeft from "./LayoutLeft";
import LayoutRight from "./LayoutRight";
import LayoutContent from "./LayoutContent";
import LayoutNone from "./LayoutNone";
import LayoutHeader from "./LayoutHeader";
import Footer from "../../../components/Footer/Footer";
import { Loading } from "../../../components/shared";

/**
 * LayoutTab component handles the layout of the page, including sidebars and content.
 * It conditionally renders different layouts based on the current route and sidebar state.
 */

const LayoutTab = () => {
  const { pathname, search } = useLocation();
  const dispatch = useDispatch();
  const { isLoading, isSuccess } = useGetProductsQuery({});
  const { contentRef, overlayRef, width, height } = useResize();

  const isSidebarLeftOpen = useSelector(selectSidebarLeft);
  const isSidebarRightOpen = useSelector(selectSidebarRight);

  // Synchronize sidebar states with the Redux store
  useEffect(() => {
    dispatch(setSidebarLeft(isSidebarLeftOpen));
    dispatch(setSidebarRight(isSidebarRightOpen));
  }, [dispatch, isSidebarLeftOpen, isSidebarRightOpen]);

  // Determine layout based on the current route and sidebar state
  const isCartOrCheckoutOnMobile =
    pathname.includes("/cart") || pathname.includes("/checkout");
  const isProductOnMobile = search.includes("productId");
  const isShopOnMobile = pathname.includes("/shop");
  const isAdminLayout = pathname.includes("admin");

  // Determine class names for the layout
  const layoutClassNames = useMemo(
    () =>
      clsx({
        "bg-silver dark:bg-gray overflow-hidden": true,
        "page-tab-layout":
          isSidebarRightOpen && isSidebarLeftOpen && !isAdminLayout,
        "page-tab-layout-left":
          !isSidebarLeftOpen && isSidebarRightOpen && !isAdminLayout,
        "page-tab-layout-right":
          isSidebarLeftOpen && !isSidebarRightOpen && !isAdminLayout,
        "page-tab-layout-nosb":
          !isSidebarLeftOpen && !isSidebarRightOpen && !isAdminLayout,
        "sm:page-tab-layout-md-cart md:page-tab-layout-md-cart":
          isCartOrCheckoutOnMobile && !isAdminLayout,
        "sm:page-tab-layout-md-shop-detail md:page-tab-layout-md-shop-detail":
          isProductOnMobile && !isAdminLayout,
        "sm:page-tab-layout-md md:page-tab-layout-md": isShopOnMobile,
        "page-tab-layout-admin": isAdminLayout,
      }),
    [
      isSidebarLeftOpen,
      isSidebarRightOpen,
      isCartOrCheckoutOnMobile,
      isProductOnMobile,
      isShopOnMobile,
      isAdminLayout,
    ]
  );

  // Show loading indicator while data is being fetched
  if (isLoading) return <Loading />;

  // Render the layout based on the fetched data
  if (isSuccess) {
    return (
      <main className={layoutClassNames}>
        <LayoutHeader id="HEADER_LAYOUT" />
        <LayoutNone id="NONE_LEFT_LAYOUT" />
        <LayoutNone id="NONE_RIGHT_LAYOUT" />
        <LayoutLeft id="SIDEBAR_LEFT_LAYOUT" />
        <LayoutContent
          id="MAIN_LAYOUT"
          contentRef={contentRef}
          overlayRef={overlayRef}
          width={width}
          height={height}
        />
        <LayoutRight id="SIDEBAR_RIGHT_LAYOUT" />
        <Footer id="FOOTER_LAYOUT" />
      </main>
    );
  }

  // Return null if data is not yet available
  return null;
};

export default LayoutTab;
