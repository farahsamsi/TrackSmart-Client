import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useHR = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isPending: isHRLoading, data: isHR } = useQuery({
    queryKey: [user?.email, "isHR"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/HR/${user.email}`);
      //   console.log(res.data?.HR);
      return res.data?.HR;
    },
  });

  return [isHR, isHRLoading];
};

export default useHR;
