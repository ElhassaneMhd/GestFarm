import { useQuery } from "@tanstack/react-query";
import {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  multipleDeleteCategory,
} from "@/services/categoryAPI";
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
    category: data,
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

export const useUpdateCategory = () =>
  useMutate({
    queryKey: ["categories", "update"],
    mutationFn: updateCategory,
    loadingMessage: "Updating category...",
    successMessage: "Category updated successfully",
  });
export const useDeleteCategory = () =>
  useMutate({
    queryKey: ["categories", "delete"],
    mutationFn: deleteCategory,
    loadingMessage: "Deleting category...",
    successMessage: "Category deleted successfully",
  });

export const useMultipleDeleteCategory = () =>
  useMutate({
    queryKey: ["categories", "delete"],
    mutationFn: multipleDeleteCategory,
    loadingMessage: "Deleting category...",
    successMessage: "Category deleted successfully",
  });
