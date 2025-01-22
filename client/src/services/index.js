import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/data.json",
});

export const axiosFetch = async (resource, method, data, headers) => {
  try {
    const response = await axiosInstance({
      method: method || "GET",
      url: `${resource}`,
      data,
      headers: {
        Accept: "application/json",
        ...(headers && headers),
      },
    });
    return response.data;
  } catch (e) {
    throw Error(
      e.response?.status === 404 ? "Not found" : getAxiosErrorMessage(e.code)
    );
  }
};

const getAxiosErrorMessage = (code) => {
  switch (code) {
    case "ERR_REQUEST_TIMEOUT":
      return "Request timeout. Please try again.";
    case "ERR_NO_RESPONSE":
      return "No response from the server. Please try again.";
    case "ERR_BAD_REQUEST":
      return "Bad request. Please try again.";
    default:
      return "Something went wrong. Please try again.";
  }
};
