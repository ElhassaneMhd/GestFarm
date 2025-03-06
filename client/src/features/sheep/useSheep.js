import { useQuery } from "@tanstack/react-query";
import {
  getAllSheep,
  getSheep,
  getAvailableSheep,
  addSheep,
  updateSheep,
  deleteSheep,
  multipleDeleteSheep,
  getPaginateSheep,
} from "@/services/SheepAPI";
import { useMutate } from "@/hooks/useMutate";

export function useAllSheep() {
  const { data, error, isPending } = useQuery({
    queryKey: ["sheep"],
    queryFn: getAllSheep,
  });
  return {
    sheep: data,
    error,
    isLoading: isPending,
  };
}

export function usePaginateSheep(page, limit) {
  const { data, error, isPending } = useQuery({
    queryKey: ["sheep",page,limit],
    queryFn: () => getPaginateSheep(page, limit),
  });
  return {
    sheep: data,
    error,
    isLoading: isPending,
  };
}


export function useAvailableSheep() {
   const { data, error, isPending } = useQuery({
     queryKey: ["sheep","available"],
     queryFn: getAvailableSheep,
   });
   return {
     sheep: data,
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
    sheep: data,
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

export const useDeleteSheep = () =>
  useMutate({
    queryKey: ["sheep", "delete"],
    mutationFn: deleteSheep,
    loadingMessage: "Deleting sheep...",
    successMessage: "Sheep deleted successfully",
  });

export const useMultipleDeleteSheep = () =>
  useMutate({
    queryKey: ["sheep", "delete"],
    mutationFn: multipleDeleteSheep,
    loadingMessage: "Deleting multiple sheep...",
    successMessage: "multiple sheep deleted successfully",
  });
