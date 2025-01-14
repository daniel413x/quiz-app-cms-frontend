import { PreviousHistoryItemContext } from "@/components/contexts";
import { useContext } from "react";

const usePreviousHistoryItem = () => useContext(PreviousHistoryItemContext);

export default usePreviousHistoryItem;
