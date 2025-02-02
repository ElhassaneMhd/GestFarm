import { axiosFetch } from ".";

export const getCategories = async () => await axiosFetch("api/categories");

export const getCategory = async (id) =>
  !id ? null : await axiosFetch(`categories/${id}`);

export const addCategory = async (data) =>
  await axiosFetch("categories", "POST", { ...data });

export const updateCategory = async (id, data) =>
  await axiosFetch(`categories/${id}`, "PUT", { ...data });

export const deleteCategory = async (id) =>
  await axiosFetch(`categories/${id}`, "DELETE");

export const deleteAllCategory = async (ids) =>
  await axiosFetch(`multiple/categories/delete`, "POST", { ids });

export const getCategoryByField = async (field, value) =>
  await axiosFetch(`categories/search/${field}?${field}=${value}`);
