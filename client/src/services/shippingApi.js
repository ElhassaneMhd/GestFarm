import { axiosFetch } from ".";

export const getShippings = async () => await axiosFetch("shippings");

export const getShipping = async (id) =>
  !id ? null : await axiosFetch(`shippings/${id}`);

export const addShipping = async (data) =>
  await axiosFetch("shippings", "POST", { ...data });

export const updateShipping = async (id, data) =>
  await axiosFetch(`shippings/${id}`, "PUT", { ...data });

export const deleteShipping = async (id) =>
  await axiosFetch(`shippings/${id}`, "DELETE");

export const deleteAllShipping = async (ids) =>
  await axiosFetch(`multiple/shippings/delete`, "POST", { ids });

export const getShippingByField = async (field, value) =>
  await axiosFetch(`shippings/search/${field}?${field}=${value}`);
