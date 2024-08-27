import Cookies from "js-cookie";
import axios from "axios";

// Helper function to get the token from cookies and set headers
const getAxiosInstance = () => {
  const token = Cookies.get("token");
  return axios.create({
    headers: {
      Authorization: token ? token : "",
    },
  });
};

export default getAxiosInstance;
