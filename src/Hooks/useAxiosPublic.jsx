import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://track-smart-server.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
