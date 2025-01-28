import { axiosFetch } from ".";

// Users
export const getAllUsers = async () => await axiosFetch("users");

export const getUser = async () => {
  const data = await axiosFetch("user", "GET");
  return { user: data.user };
};

export const deleteUser = async (id) =>
  await axiosFetch(`profiles/${id}`, "DELETE");

export const deleteUsers = async (ids) =>
  await axiosFetch(`multiple/users/delete`, "POST", { ids });

// Auth
export const login = async (username, password) => {
  return await axiosFetch("login", "POST", { username, password });
};

export const oauth2Login = async (provider) =>
  await axiosFetch(`login/${provider}`);

export const register = async (user) =>
  await axiosFetch("register", "POST", user);

export const logout = async () => await axiosFetch("logout", "POST");
