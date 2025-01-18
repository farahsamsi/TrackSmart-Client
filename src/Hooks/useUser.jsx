import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: currentUser } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      //   console.log(res.data);
      return res.data;
    },
  });
  return [currentUser];
};

export default useUser;
