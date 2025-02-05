import { useQuery } from "@tanstack/react-query";
import {
  getAllSheep,
  getSheep,
  getSheepByField,
  addSheep,
  updateSheep,
} from "@/services/SheepAPI";
import { formatEmbeddedData } from "@/utils/helpers";
import { useMutate } from "@/hooks/useMutate";

export function useAllSheep() {
  const { data, error, isPending } = useQuery({
    queryKey: ["sheep"],
    queryFn: getAllSheep,
  });
  return {
    sheep: data,
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
  return {
    sheep: { id: data?._links.self.href.split("/").pop(), ...data },
    error,
    isLoading: isPending,
  };
}

export function useSheepByField(field = "status", value = "available") {
  const { data, error, isPending } = useQuery({
    queryKey: ["sheep", field, value],
    queryFn: getSheepByField(field, value),
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

export const useAddSheep = () =>
  useMutate({
    queryKey: ["sheep", "add"],
    mutationFn: addSheep,
    loadingMessage: "Adding sheep...",
    successMessage: "Sheep added successfully",
  });

export const useUpdateSheep = () =>
  useMutate({
    queryKey: ["sheep", "update"],
    mutationFn: updateSheep,
    loadingMessage: "Updating sheep...",
    successMessage: "Sheep updated successfully",
  });
