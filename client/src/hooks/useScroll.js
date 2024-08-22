import { useRef } from "react";

/**
 * Custom hook for scrolling to a referenced element.
 *
 * @returns {[Function, React.RefObject]} An array where:
 * - The first element is a function that scrolls the referenced element into view.
 * - The second element is a React ref object to attach to the element you want to scroll to.
 */
const useScroll = () => {
  // Create a ref object that will be used to access the DOM element
  const elRef = useRef(null);

  // Function to scroll the referenced element into view smoothly
  const executeScroll = () =>
    elRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  // Return the function and the ref object
  return [executeScroll, elRef];
};

export default useScroll;
