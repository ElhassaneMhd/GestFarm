import { axiosFetch } from ".";

export const getShipments = async () => await axiosFetch("api/shipments");

export const getShipment = async (id) =>
  !id ? null : await axiosFetch(`api/shipments/${id}`);

export const addShipment = async (data) =>
  await axiosFetch("api/shipments", "POST", { ...data });

export const updateShipment = async (id, data) =>
  await axiosFetch(`api/shipments/${id}`, "PUT", { ...data });

export const deleteShipment = async (id) =>
  await axiosFetch(`api/shipments/${id}`, "DELETE");

export const deleteAllShipment = async (ids) =>
  await axiosFetch(`api/shipments/delete/multiple`, "POST", { ids });

export const getShipmentByField = async (field, value) =>
  await axiosFetch(`shipments/search/${field}?${field}=${value}`);
