import { axiosFetch } from ".";

export const getAllSheep = async () => await axiosFetch("api/sheep");

export const getSheep = async (id) =>
  !id ? null : await axiosFetch(`sheep/${id}`);

export const addSheep = async (data) =>
  await axiosFetch("api/sheep", "POST", { ...data });

export const updateSheep = async (data) =>
  await axiosFetch(`api/sheep/${data.data.id}`, "PUT", { ...data.data });

export const deleteSheep = async (id) =>
  await axiosFetch(`sheep/${id}`, "DELETE");

export const deleteAllSheep = async (ids) =>
  await axiosFetch(`multiple/sheep/delete`, "POST", { ids });

export const getSheepByField = async (field, value) =>
  await axiosFetch(`sheep/search/${field}?${field}=${value}`);
