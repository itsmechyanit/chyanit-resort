import { useEffect, useRef } from "react";

export default function useClickOutside(handler, capturing = true) {
  const modalRef = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          handler();
        }
      }
      document.addEventListener("click", handleClick, capturing);
      return () => {
        document.removeEventListener("click", handleClick, capturing);
      };
    },
    [handler, capturing]
  );
  return modalRef;
}
