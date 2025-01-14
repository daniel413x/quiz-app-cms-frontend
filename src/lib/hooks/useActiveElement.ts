import { useEffect, useState } from "react";

const useActiveElement = () => {
  const [activeElement, setActiveElement] = useState(document.activeElement);
  const handleFocusIn = () => {
    setActiveElement(document.activeElement);
  };
  useEffect(() => {
    document.addEventListener("focusin", handleFocusIn);
    return () => {
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, []);
  return activeElement;
};

export default useActiveElement;
