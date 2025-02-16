import { useEffect, useRef } from "react";

export const useInfiniteScroll = (
  isFetching: boolean,
  callback: () => void,
  limit: number,
  autoScrollLimit: number,
) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !isFetching && limit >= autoScrollLimit) {
      callback();
    }
  };

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(handleObserver);
    if (lastElementRef.current) observer.current.observe(lastElementRef.current);
    return () => observer.current?.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, limit, autoScrollLimit]);

  return { lastElementRef };
};
