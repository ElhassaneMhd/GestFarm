import { axiosFetch } from ".";

export const getShipments = async () => await axiosFetch("shipments");

export const getShipping = async (id) =>
  !id ? null : await axiosFetch(`shipments/${id}`);

export const addShipping = async (data) =>
  await axiosFetch("shipments", "POST", { ...data });

export const updateShipping = async (id, data) =>
  await axiosFetch(`shipments/${id}`, "PUT", { ...data });

export const deleteShipping = async (id) =>
  await axiosFetch(`shipments/${id}`, "DELETE");

export const deleteAllShipping = async (ids) =>
  await axiosFetch(`multiple/shipments/delete`, "POST", { ids });

export const getShippingByField = async (field, value) =>
  await axiosFetch(`shipments/search/${field}?${field}=${value}`);
