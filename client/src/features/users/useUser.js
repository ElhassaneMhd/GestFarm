import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/services/UserAPI";
import { formatEmbeddedData } from "@/utils/helpers";
import { getUserById } from "@/services/UserApi";

export function useUsers() {
  const { data, error, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
  if (!data) return { users: [], error, isLoading: isPending };
  return {
    users: formatEmbeddedData(data, "users"),
    links: data?._links,
    page: data?.page,
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
