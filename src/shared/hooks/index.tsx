/*-----[Global reusable hooks]-----*/
import { useEffect, useState } from "react";

export const useDebounce = <T,>(value: T, delay = 500): T => {
   const [debouncedValue, setDebouncedValue] = useState(value);

   useEffect(() => {
      const timeout = setTimeout(() => {
         setDebouncedValue(value);
      }, delay);

      return () => clearTimeout(timeout);
   }, [value, delay]);

   return debouncedValue;
};

type UsePollingProps = {
   callback: () => void;
   interval?: number;
   immediate?: boolean;
   enabled?: boolean;
};

export const usePolling = ({ callback, interval = 30_000, immediate = true, enabled = true }: UsePollingProps) => {
   useEffect(() => {
      if (!enabled) return;

      if (immediate) {
         callback();
      }

      const intervalId = setInterval(callback, interval);

      return () => clearInterval(intervalId);
   }, [callback, interval, immediate, enabled]);
};
