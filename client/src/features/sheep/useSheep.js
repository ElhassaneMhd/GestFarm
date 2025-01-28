import { useQuery } from "@tanstack/react-query";
import { getAllSheep, getSheep } from "@/services/SheepApi";

export function useSheep() {
  const { data, error, isPending } = useQuery({
    queryKey: ["sheep"],
    queryFn: getAllSheep,
  });
  return {
    sheep: data?._embedded,
    links: data?._links,
    page: data?.page,
    error,
    isLoading: isPending,
  };
}

export function useOneSheep(id) {
  const { data, error, isPending } = useQuery({
    queryKey: ["sheep", id],
    queryFn: () => getSheep(id),
  });
  return {
    sheep: data?._embedded,
    links: data?._links,
    page: data?.page,
    error,
    isLoading: isPending,
  };
}
