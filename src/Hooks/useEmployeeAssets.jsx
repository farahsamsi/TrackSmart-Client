import { useQuery } from "@tanstack/react-query";
import useUser from "./useUser";
import useAxiosSecure from "./useAxiosSecure";

const useEmployeeAssets = () => {
  const [currentUser] = useUser();
  const axiosSecure = useAxiosSecure();

  const { refetch: employeeAssetRefetch, data: employeeAssets } = useQuery({
    queryKey: [currentUser?.reqEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assetReq/${currentUser?.email}`);
      return res.data;
    },
  });

  return [employeeAssets, employeeAssetRefetch];
};

export default useEmployeeAssets;
