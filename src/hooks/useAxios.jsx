import axios from "axios";
import { useSelector } from "react-redux";

const BASE_URL = "https://30037.fullstack.clarusway.com/";

//* Axios Instance for Public API Request
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

const useAxios = () => {
  const { token } = useSelector((state) => state.auth);

  //* Axios Instance for Private API Request
  const axiosWithToken = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Token ${token}` },
  });
  const axiosWithoutToken = axios.create({
    baseURL: BASE_URL  });

  return { axiosWithToken,axiosWithoutToken };
};

export default useAxios;