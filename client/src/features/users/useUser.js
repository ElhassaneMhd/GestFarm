import { useQuery } from "@tanstack/react-query";
import { getAllUsers, getShippers } from "@/services/UserAPI";
import { getUserById } from "@/services/UserApi";

export function useUsers() {
  const { data, error, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
  if (!data) return { users: [], error, isLoading: isPending };
  return {
    users:data,
    error,
    isLoading: isPending,
  };
}

export function useUser(id) {
  const { data, error, isPending } = useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserById(id),
  });
  return {
    user: data,
    error,
    isLoading: isPending,
  };
}

export function useShippers() {
    const { data, error, isPending } = useQuery({
      queryKey: ["shippers"],
      queryFn: getShippers,
    });
    if (!data) return { shippers: [], error, isLoading: isPending };
    return {
      shippers: data,
      error,
      isLoading: isPending,
    };
}