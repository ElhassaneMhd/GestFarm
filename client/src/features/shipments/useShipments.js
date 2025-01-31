import { getShipping, getShipments } from "@/services/shippingApi";
import { formatEmbeddedData } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";

export function useShipments() {
  const { data, error, isPending } = useQuery({
    queryKey: ["shipments"],
    queryFn: getShipments,
  });
  return {
    shipments: formatEmbeddedData(data, "shipments"),
    links: data?._links,
    page: data?.page,
    error,
    isLoading: isPending,
  };
}

export function useShipping(id) {
  const { data, error, isPending } = useQuery({
    queryKey: ["shipments", id],
    queryFn: () => getShipping(id),
  });
  return {
    shipping: { id: data?._links.self.href.split("/").pop(), ...data },
    error,
    isLoading: isPending,
  };
}
