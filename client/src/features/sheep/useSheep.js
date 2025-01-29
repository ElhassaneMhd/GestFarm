import { useQuery } from "@tanstack/react-query";
import { getAllSheep, getSheep, getSheepByField } from "@/services/SheepAPI";
import { formatEmbeddedData } from "../../utils/helpers";

export function useAllSheep() {
  const { data, error, isPending } = useQuery({
    queryKey: ["sheep"],
    queryFn: getAllSheep,
  });
  return {
    sheep: formatEmbeddedData(data, "sheep"),
    links: data?._links,
    page: data?.page,
    error,
    isLoading: isPending,
  };
}

export function useSheep(id) {
  const { data, error, isPending } = useQuery({
    queryKey: ["sheep", id],
    queryFn: () => getSheep(id),
  });
  console.log(data);
  return {
    sheep: { id: data?._links.self.href.split("/").pop(), ...data },
    error,
    isLoading: isPending,
  };
}

export function useSheepByField() {
  const { data, error, isPending } = useQuery({
    queryKey: ["sheep"],
    queryFn: getSheepByField,
  });
  if (!data) return { sheep: [], error, isLoading: isPending };
  return {
    sheep: formatEmbeddedData(data, "sheep"),
    links: data?._links,
    page: data?.page,
    error,
    isLoading: isPending,
  };
}
