import React, { useCallback, useEffect, useRef, useState } from "react";

const FullScreenScroll = ({ children }) => {
  const containerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollToSection = (index) => {
    if (containerRef.current) {
      const section = containerRef.current.children[index];
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleScroll = useCallback(
    (e) => {
      if (isScrolling) return;

      const deltaY = e.deltaY;
      const totalSections = React.Children.count(children);

      if (deltaY > 0 && currentSection < totalSections - 1) {
        setCurrentSection((prevSection) => prevSection + 1);
      } else if (deltaY < 0 && currentSection > 0) {
        setCurrentSection((prevSection) => prevSection - 1);
      }

      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 500); // Adjust timeout to match smooth scroll duration
    },
    [currentSection, isScrolling, children]
  );

  useEffect(() => {
    scrollToSection(currentSection);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleScroll, { passive: true });
      return () => {
        container.removeEventListener("wheel", handleScroll);
      };
    }
  }, [handleScroll]);

  return (
    <div className="container" ref={containerRef}>
      {React.Children.map(children, (child) => (
        <div className="section">{child}</div>
      ))}
    </div>
  );
};

export default FullScreenScroll;
