import { axiosFetch } from ".";

export const getCategories = async () => await axiosFetch("api/categories");

export const getCategory = async (id) =>
  !id ? null : await axiosFetch(`api/categories/${id}`);

export const addCategory = async (data) =>
  await axiosFetch("api/categories", "POST", { ...data });

export const updateCategory = async (data) =>
  await axiosFetch(`api/categories/${data.data.id}`, "PUT", { ...data.data });

export const deleteCategory = async (id) =>
  await axiosFetch(`api/categories/${id}`, "DELETE");

export const multipleDeleteCategory = async (ids) =>
  await axiosFetch(`api/categories/delete/multiple`, "POST", [...ids]);

export const getCategoryByField = async (field, value) =>
  await axiosFetch(`api/categories/search/${field}?${field}=${value}`);
