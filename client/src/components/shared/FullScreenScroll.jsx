import React, { useEffect, useRef, useState } from "react";

const FullScreenScroll = ({ children }) => {
  const containerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollToSection = (index) => {
    if (containerRef.current) {
      setIsScrolling(true);
      containerRef.current.scrollTo({
        top: index * window.innerHeight,
        behavior: "smooth",
      });
      setTimeout(() => setIsScrolling(false), 300); // Dừng cuộn trong 300ms
    }
  };

  const handleScroll = (e) => {
    if (isScrolling) return; // Ngăn chặn cuộn khi đang cuộn
    const deltaY = e.deltaY;
    const totalSections = React.Children.count(children);

    if (deltaY > 0 && currentSection < totalSections - 1) {
      setCurrentSection((prevSection) => prevSection + 1);
    } else if (deltaY < 0 && currentSection > 0) {
      setCurrentSection((prevSection) => prevSection - 1);
    }
  };

  useEffect(() => {
    scrollToSection(currentSection);
  }, [currentSection]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleScroll);
      return () => {
        container.removeEventListener("wheel", handleScroll);
      };
    }
  }, [isScrolling]); // Theo dõi isScrolling để kích hoạt cuộn lại sau khi hoàn thành
  return (
    <div
      ref={containerRef}
      style={{
        height: "100dvh",
        width: "100%",
        overflow: "hidden",
        scrollBehavior: "smooth", // Cuộnmượt
      }}
    >
      {React.Children.map(children, (child) => (
        <div style={{ height: "100vh", width: "100%" }}>{child}</div>
      ))}
    </div>
  );
};

export default FullScreenScroll;
