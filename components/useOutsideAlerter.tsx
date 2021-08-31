import { useEffect } from "react";

export default function useOutsideAlerter(
  ref: React.MutableRefObject<null | HTMLDivElement>,
  parentToObserve: string,
  func: () => void
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        func();
      }
    }
    // Bind the event listener
    const inv = document.querySelector(`.${parentToObserve}`);
    inv!.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      inv!.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
}
