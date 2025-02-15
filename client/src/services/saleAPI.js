import { axiosFetch } from ".";

export const getSales = async () => await axiosFetch("api/sales");

export const getSale = async (id) =>
  !id ? null : await axiosFetch(`api/sales/${id}`);

export const addSale = async (data) =>
  await axiosFetch("api/sales", "POST", { ...data });

export const updateSale = async (id, data) =>
  await axiosFetch(`api/sales/${id}`, "PUT", { ...data });

export const deleteSale = async (id) =>
  await axiosFetch(`api/sales/${id}`, "DELETE");

export const multipleDeleteSale = async (ids) =>
  await axiosFetch(`api/sales/delete/multiple`, "POST", [...ids]);

export const getSaleByField = async (field, value) =>
  await axiosFetch(`api/sales/search/${field}?${field}=${value}`);
