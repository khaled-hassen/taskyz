import { useEffect, useRef } from "react";

export function useClickAway<T extends HTMLElement = HTMLDivElement>(
  callback?: Function
) {
  const ref = useRef<T | null>(null);

  function handleClickAway(e: MouseEvent) {
    if (!ref.current) return;
    if (ref.current.contains(e.target as Node)) return;
    callback?.();
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickAway);
    return () => document.removeEventListener("mousedown", handleClickAway);
  }, []);

  return { ref };
}
