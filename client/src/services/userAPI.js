import { axiosFetch } from ".";

// Users
export const getAllUsers = async () => await axiosFetch("api/users");
export const getShippers = async () => await axiosFetch("api/users/shippers");

export const getUser = async () => await axiosFetch("user", "GET");

export const getUserById = async (id) => await axiosFetch(`users/${id}`);

export const deleteUser = async (id) =>
  await axiosFetch(`api/users/${id}`, "DELETE");

export const deleteUsers = async (ids) =>
  await axiosFetch(`api/users/delete/multiple`, "POST", { ids });

// Auth
export const login = async (username, password) => {
  return await axiosFetch("login", "POST", { username, password });
};

export const oauth2Login = async (provider) =>
  await axiosFetch(`login/${provider}`);

export const register = async (user) =>
  await axiosFetch("register", "POST", user);

export const logout = async () => await axiosFetch("logout", "POST");
