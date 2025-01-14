import { useEffect, useRef, useState } from "react";

const useDebounce = <T>(
  value: T,
  delay: number,
  callback?: (debouncedValue: T) => void,
): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const ref = useRef(true);
  useEffect(() => {
    if (ref.current) {
      ref.current = false;
      return;
    }
    const handler = setTimeout(() => {
      if (callback) {
        callback(debouncedValue);
      }
      setDebouncedValue(value);
    }, delay);
    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

export default useDebounce;
