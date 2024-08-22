import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Header } from "../Header";
import clsx from "clsx";
import { ModalProvider } from "../../context/ModalContext";

const Layout = () => {
  return (
    <div
      className={clsx(
        `w-screen h-dvh bg-white text-black`,
        "dark:bg-black dark:text-silver"
      )}
    >
      <ModalProvider>
        <div className="flex flex-col h-full">
          <header>
            <Header />
          </header>
          <main className="flex-1 min-h-0">
            <Outlet />
          </main>
          <ToastContainer
            toastClassName={() =>
              `relative flex p-1 min-h-20 border rounded-md justify-between overflow-hidden cursor-pointer bg-white dark:bg-black text-silver z-90`
            }
            autoClose={2000}
          />
        </div>
      </ModalProvider>
    </div>
  );
};

export default Layout;
