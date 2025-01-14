import {
  useEffect, useRef, useState,
} from "react";
import { useLocation } from "react-router-dom";
import { PreviousHistoryItemContext } from "../contexts";

function PreviousHistoryItemProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [prevPath, setPrevPath] = useState<string | null>(null);
  const prevLocationRef = useRef(location.pathname + location.search);
  useEffect(() => {
    setPrevPath(prevLocationRef.current);
    prevLocationRef.current = location.pathname + location.search;
  }, [location]);
  return (
    <PreviousHistoryItemContext.Provider value={prevPath}>
      {children}
    </PreviousHistoryItemContext.Provider>
  );
}

export default PreviousHistoryItemProvider;
