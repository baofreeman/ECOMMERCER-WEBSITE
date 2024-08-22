import { useCallback, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const useResize = () => {
  const { pathname } = useLocation();
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // Function to start observing resize changes
  const startObserving = useCallback(() => {
    const node = contentRef.current;
    if (!node) return;

    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setWidth(entry.contentRect.width);

        const overlayHeight = overlayRef.current?.clientHeight || 0;
        const newHeight = pathname.includes("/shop")
          ? entry.contentRect.height - overlayHeight
          : entry.contentRect.height;

        setHeight(newHeight);
      });
    });

    observer.observe(node);

    // Cleanup function to stop observing
    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  // Initialize observer and handle cleanup
  const initObserver = useCallback(() => {
    const cleanup = startObserving();
    return cleanup;
  }, [startObserving]);

  // Effectively starting the observer
  const cleanup = initObserver();

  // Clean up on component unmount
  useRef(() => {
    return cleanup;
  }, [cleanup]);

  return { contentRef, overlayRef, width, height };
};

export default useResize;
