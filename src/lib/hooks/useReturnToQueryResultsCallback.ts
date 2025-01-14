import { useNavigate } from "react-router-dom";
import usePreviousHistoryItem from "./usePreviousHistoryItem";

const useReturnToQueryResultsCallback = (route: string) => {
  const navigate = useNavigate();
  const previousHistoryItem = usePreviousHistoryItem();
  const wereSearchResults = previousHistoryItem?.includes(`/${route}?`);
  const onPressBackButton = () => {
    // user had search results while on /${route}; return to those search results
    if (wereSearchResults) {
      navigate(previousHistoryItem!);
    } else {
      navigate(`/${route}`);
    }
  };
  return {
    wereSearchResults,
    onPressBackButton,
  };
};

export default useReturnToQueryResultsCallback;
