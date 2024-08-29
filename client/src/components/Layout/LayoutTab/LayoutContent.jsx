import { ModalDetail } from "../../../features/Shop";
import { Outlet, useLocation } from "react-router-dom";

import ButtonSidebar from "./ButtonSidebar";
import { memo } from "react";
import useResize from "../../../hooks/useResize";

const LayoutContent = ({ id }) => {
  // Get the current pathname from the router
  const { pathname } = useLocation();
  const { contentRef, overlayRef, width, height } = useResize();

  // Determine if the sidebar button should be shown
  const isShowSidebarButton = pathname.includes("/admin");

  return (
    <main id={id} ref={contentRef} className="relative bg-white dark:bg-black">
      {/* Conditionally render sidebar buttons based on the path */}
      {!isShowSidebarButton && (
        <>
          <ButtonSidebar design="left" />
          <ButtonSidebar design="right" />
        </>
      )}

      <div className="w-full h-full flex justify-center relative flex-col overflow-y-hidden">
        <div className="flex-1">
          <div className="w-full h-full">
            {/* Wrapper for content with custom width and height */}
            <div className="overflow-visible w-0 h-0">
              <section
                style={{ width, height }}
                className="overflow-auto p-[24px] sm:p-[12px] no-scrollbar"
              >
                {/* Render nested routes/components */}
                <Outlet />
              </section>
            </div>
            {/* Conditionally render the ModalDetail component for shop paths */}
            {pathname.includes("/shop") && (
              <div
                className="p-[12px] w-full h-[140px] border-t z-10"
                ref={overlayRef}
              >
                <ModalDetail />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default memo(LayoutContent);
