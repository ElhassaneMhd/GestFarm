import { axiosFetch } from ".";

export const getSales = async () => await axiosFetch("api/sales");

export const getSale = async (id) =>
  !id ? null : await axiosFetch(`sales/${id}`);

export const addSale = async (data) =>
  await axiosFetch("sales", "POST", { ...data });

export const updateSale = async (id, data) =>
  await axiosFetch(`sales/${id}`, "PUT", { ...data });

export const deleteSale = async (id) =>
  await axiosFetch(`sales/${id}`, "DELETE");

export const deleteAllSale = async (ids) =>
  await axiosFetch(`multiple/sales/delete`, "POST", { ids });

export const getSaleByField = async (field, value) =>
  await axiosFetch(`sales/search/${field}?${field}=${value}`);
