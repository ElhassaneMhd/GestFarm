import { axiosFetch } from ".";

export const getAllSheep = async () => await axiosFetch("sheep");

export const getSheep = async (id) =>
  !id ? null : await axiosFetch(`sheep/${id}`);

export const addSheep = async (data) =>
  await axiosFetch("sheep/add", "POST", { ...data });

export const updateSheep = async (id, data) =>
  await axiosFetch(`sheep/${id}`, "PUT", { ...data });

export const deleteSheep = async (id) =>
  await axiosFetch(`sheep/${id}`, "DELETE");

export const deleteAllSheep = async (ids) =>
  await axiosFetch(`multiple/sheep/delete`, "POST", { ids });

export const getSheepByField = async (field, value) =>
  await axiosFetch(`sheep/search/${field}?${field}=${value}`);
