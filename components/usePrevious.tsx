import { useRef, useEffect } from "react";

export default function usePrevious(value: number) {
  const ref = useRef<any>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
