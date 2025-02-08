import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/services/UserAPI";
import { getUserById } from "@/services/UserApi";

export function useUsers() {
  const { data, error, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
  if (!data) return { users: [], error, isLoading: isPending };
  const users = data.map((value, index) => ({ id: index + 1, ...value }));
  return {
    users,
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
    user: { id: data?._links.self.href.split("/").pop(), ...data },
    error,
    isLoading: isPending,
  };
}
