import { axiosFetch } from ".";

export const getAllSheep = async () => await axiosFetch("api/sheep");

export const getPaginateSheep = async (page, limit) =>
  await axiosFetch(`api/sheep/paginate?page=${page}&limit=${limit}`);

export const getSheep = async (id) =>
  !id ? null : await axiosFetch(`api/sheep/${id}`);

export const addSheep = async (data) =>
  await axiosFetch("api/sheep", "POST", { ...data });

export const updateSheep = async (data) =>
  await axiosFetch(`api/sheep/${data.data.id}`, "PUT", { ...data.data });

export const deleteSheep = async (id) =>
  await axiosFetch(`api/sheep/${id}`, "DELETE");

export const multipleDeleteSheep = async (ids) =>
  await axiosFetch(`api/sheep/delete/multiple`, "POST", [...ids]);

export const getSheepByField = async (field, value) =>
  await axiosFetch(`sheep/search/${field}?${field}=${value}`);
