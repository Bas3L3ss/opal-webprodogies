import { QueryFunction, QueryKey, useQuery } from "@tanstack/react-query";

export const useQueryData = (
  queryKey: QueryKey,
  queryFn: QueryFunction,
  enabled?: boolean
) => {
  const { data, isFetched, isPending, isFetching, refetch } = useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    enabled: enabled,
  });

  return { data, isFetched, isPending, isFetching, refetch };
};
