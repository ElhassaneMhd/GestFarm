import { getShipment, getShipments, addShipment } from "@/services/shipmentApi";
import { useQuery } from "@tanstack/react-query";
import { useMutate } from "@/hooks/useMutate";

export function useShipments() {
  const { data, error, isPending } = useQuery({
    queryKey: ["shipments"],
    queryFn: getShipments,
  });
  return {
    shipments: data,
    links: data?._links,
    page: data?.page,
    error,
    isLoading: isPending,
  };
}

export function useShipment(id) {
  const { data, error, isPending } = useQuery({
    queryKey: ["shipments", id],
    queryFn: () => getShipment(id),
  });
  return {
    Shipment: { id: data?._links.self.href.split("/").pop(), ...data },
    error,
    isLoading: isPending,
  };
}

export const useAddShipment = () =>
  useMutate({
    queryKey: ["shipments", "add"],
    mutationFn: addShipment,
    loadingMessage: "Adding shipments...",
    successMessage: "shipments added successfully",
  });
