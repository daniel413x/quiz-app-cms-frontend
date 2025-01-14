import { useLocation } from "react-router-dom";

const useIsAuthenticated = () => {
  const location = useLocation();
  const { pathname } = location;
  return pathname !== "/";
};

export default useIsAuthenticated;
