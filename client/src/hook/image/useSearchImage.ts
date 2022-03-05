import { useRef, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { ISearchImagesQuery } from "../../types/graphql.types";
import { SearchImagesQuery } from "../../graphql/unsplash.graphql";
import { toast } from "react-hot-toast";
import { getApolloError } from "../../utils/form.utils";
import { useDelayedChange } from "../input/useDelayedChange";
import { IImage } from "../../types/style.types";
import { useInfiniteScroll } from "../utils/useInfiniteScroll";

export function useSearchImage() {
  const input = useRef<HTMLInputElement>(null);
  const searchQuery = useRef<string>("");
  const page = useRef(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchResult, setSearchResult] = useState<IImage[] | null>(null);
  const { onChange } = useDelayedChange(handleChange, clearSearch);
  const [
    search,
    { loading: queryLoading, fetchMore, refetch },
  ] = useLazyQuery<ISearchImagesQuery>(SearchImagesQuery, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    onCompleted: handleSearchCompleted,
    onError: (error) => toast.error(getApolloError(error)),
  });
  const [loading, setLoading] = useState(false);
  const { lastElementRef } = useInfiniteScroll(
    loading,
    page.current < totalPages,
    fetchMoreResults
  );

  function handleSearchCompleted({ searchImages }: ISearchImagesQuery) {
    setSearchResult(searchImages.images);
    setTotalPages(searchImages.totalPages);
  }

  async function handleChange(value: string) {
    searchQuery.current = value;
    page.current = 1;
    setSearchResult([]);
    if (!refetch) return search({ variables: { query: value, page: 1 } });

    try {
      setLoading(true);
      const { data } = await refetch({ query: value, page: 1 });
      handleSearchCompleted(data);
    } catch (e) {
      toast.error(getApolloError(e));
    }
    setLoading(false);
  }

  function clearResults() {
    setSearchResult(null);
    searchQuery.current = "";
    page.current = 1;
    setTotalPages(1);
  }

  function clearSearch() {
    clearResults();
    if (input.current) {
      input.current.value = "";
      input.current.focus();
    }
  }

  async function fetchMoreResults() {
    if (!fetchMore) return;

    try {
      setLoading(true);
      const { data } = await fetchMore({
        variables: { query: searchQuery.current, page: page.current + 1 },
      });

      setSearchResult((prev) => [...(prev || []), ...data.searchImages.images]);
      page.current = page.current + 1;
    } catch (e) {
      toast.error(getApolloError(e));
    }
    setLoading(false);
  }

  return {
    defaultValue: searchQuery.current,
    input,
    lastElementRef,
    loading: queryLoading || loading,
    searchResult,
    clearResults,
    clearSearch,
    onChange,
  };
}
