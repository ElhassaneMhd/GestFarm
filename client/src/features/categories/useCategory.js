import { useQuery } from "@tanstack/react-query";
import {
  addCategory,
  getCategories,
  getCategory,
} from "@/services/categoryApi";
import { useMutate } from "@/hooks/useMutate";

export function useCategories() {
  const { data, error, isPending } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  return {
    categories: data,
    error,
    isLoading: isPending,
  };
}

export function useCategory(id) {
  const { data, error, isPending } = useQuery({
    queryKey: ["categories", id],
    queryFn: () => getCategory(id),
  });
  return {
    category: { id: data?._links.self.href.split("/").pop(), ...data },
    error,
    isLoading: isPending,
  };
}

export const useAddCategory = () =>
  useMutate({
    queryKey: ["categories", "add"],
    mutationFn: addCategory,
    loadingMessage: "Adding category...",
    successMessage: "Category added successfully",
  });
