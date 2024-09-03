import React, { useCallback, useEffect, useRef, useState } from "react";

const FullScreenScroll = ({ children }) => {
  const containerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [lastScrollTime, setLastScrollTime] = useState(0); // Track the last scroll time

  const scrollToSection = (index) => {
    if (containerRef.current) {
<<<<<<< HEAD
      setIsScrolling(true);
      containerRef.current.scrollTo({
        top: index * window.innerHeight,
        behavior: "smooth",
      });
      setTimeout(() => setIsScrolling(false), 300); // Stop scrolling for 300ms
=======
      const totalSections = React.Children.count(children);
      const validIndex = Math.max(0, Math.min(index, totalSections - 1)); // Ensure index is within valid range

      setIsScrolling(true);
      containerRef.current.scrollTo({
        top: validIndex * window.innerHeight,
        behavior: "smooth",
      });
      setTimeout(() => setIsScrolling(false), 800); // Stop scrolling for 300ms
>>>>>>> de15884 (public)
    }
  };

  const handleScroll = useCallback((e) => {
<<<<<<< HEAD
    e.preventDefault();
    if (isScrolling) return; // Prevent scrolling while already scrolling

    const now = performance.now(); // Get the current time
    if (now - lastScrollTime < 300) return; // Limit scroll frequency to avoid excessive operations

    const deltaY = e.deltaY;
    const totalSections = React.Children.count(children);

    if (deltaY > 0 && currentSection < totalSections - 1) {
      setCurrentSection((prevSection) => prevSection + 1);
    } else if (deltaY < 0 && currentSection > 0) {
      setCurrentSection((prevSection) => prevSection - 1);
    }

=======
    if (isScrolling) return; // Prevent scrolling while already scrolling
    const now = performance.now(); // Get the current time
    if (now - lastScrollTime < 800) return; // Limit scroll frequency to avoid excessive operations

    const deltaY = e.deltaY;
    const totalSections = React.Children.count(children);
    console.log(lastScrollTime);

    if (deltaY > 0) {
      setCurrentSection((prevSection) =>
        Math.min(prevSection + 1, totalSections - 1)
      );
    } else if (deltaY < 0) {
      setCurrentSection((prevSection) => Math.max(prevSection - 1, 0));
    }

>>>>>>> de15884 (public)
    setLastScrollTime(now); // Update the last scroll time
  }, []);

  useEffect(() => {
    scrollToSection(currentSection);
  }, [currentSection]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleScroll, { passive: false });
      return () => {
        container.removeEventListener("wheel", handleScroll);
      };
    }
  }, [isScrolling, handleScroll]);

  return (
<<<<<<< HEAD
    <div
      ref={containerRef}
      style={{
        height: "100dvh",
        width: "100%",
        overflow: "hidden",
        scrollBehavior: "smooth",
      }}
    >
=======
    <div className="public-scroll" ref={containerRef}>
>>>>>>> de15884 (public)
      {React.Children.map(children, (child) => (
        <div className="w-full h-full">{child}</div>
      ))}
    </div>
  );
};

export default FullScreenScroll;
