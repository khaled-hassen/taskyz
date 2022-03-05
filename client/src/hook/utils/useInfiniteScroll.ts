import { useCallback, useRef } from "react";

export function useInfiniteScroll(
  loading: boolean,
  hasMore: boolean,
  callback: Function
) {
  const observer = useRef<IntersectionObserver>();

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current?.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => entries[0].isIntersecting && hasMore && callback()
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return { lastElementRef };
}
