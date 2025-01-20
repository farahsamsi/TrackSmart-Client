import { useQuery } from "@tanstack/react-query";
import useUser from "./useUser";
import useAxiosSecure from "./useAxiosSecure";
import { useEffect } from "react";

const useEmployeeAssets = (search, filter, pendingApprovedFilter) => {
  const [currentUser] = useUser();
  const axiosSecure = useAxiosSecure();

  const { refetch: employeeAssetRefetch, data: employeeAssets } = useQuery({
    queryKey: [currentUser?.reqEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assetReq/${currentUser?.email}?search=${search}&filter=${filter}&pendingApprovedFilter=${pendingApprovedFilter}`
      );
      return res.data;
    },
  });

  useEffect(() => {
    employeeAssetRefetch();
  }, [search, filter, pendingApprovedFilter]);

  return [employeeAssets, employeeAssetRefetch];
};

export default useEmployeeAssets;
