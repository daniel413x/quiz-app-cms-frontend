import { useSearchParams } from "react-router-dom";
import useDebounce from "@/lib/hooks/useDebounce";
import { ChangeEvent, useState } from "react";

const usePaginatedQueriesLogic = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const searchedName = searchParams.get("search") || "";
  const handleSetSearchParams = (query: Record<string, any>) => {
    const url = new URLSearchParams(window.location.search);
    const k = Object.keys(query);
    for (let i = 0; i < k.length; i += 1) {
      const prop = k[i];
      if (query[prop] === "") {
        url.delete(prop);
      } else {
        url.set(prop, query[prop]!);
      }
    }
    setSearchParams(url);
  };
  const handleSetPage = (num: number) => {
    window.scrollTo({
      top: 0,
    });
    handleSetSearchParams({
      page: num,
      search: searchedName,
    });
  };
  // will search by owner name
  const [search, setSearch] = useState<string>("");
  const handleSetSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target?.value);
  };
  const handleClearSearch = () => {
    setSearch("");
  };
  const handleSetDebouncedSearch = () => {
    handleSetSearchParams({
      search,
      page: "",
    });
  };
  useDebounce(search, 500, handleSetDebouncedSearch);
  return {
    page,
    handleClearSearch,
    handleSetSearch,
    handleSetPage,
    search,
  };
};

export default usePaginatedQueriesLogic;
