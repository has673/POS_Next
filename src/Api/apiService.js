import axios from "axios";
import Cookies from "js-cookie";

const Url = process.env.NEXT_PUBLIC_NEST_BACKEND_SERVER;

const getAuthHeaders = () => {
  const token = Cookies.get("token");
  return {
    Authorization: token,
    "ngrok-skip-browser-warning": "abc",
  };
};

export const fetchCategories = async () => {
  const response = await axios.get(`${Url}/categories`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const fetchItems = async () => {
  const response = await axios.get(`${Url}/items`, {
    headers: { "ngrok-skip-browser-warning": "abc" },
  });
  return response.data;
};
