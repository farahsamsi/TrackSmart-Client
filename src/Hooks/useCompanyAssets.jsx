import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useUser from "./useUser";
import { useEffect } from "react";

const useCompanyAssets = (search, limit, pendingApprovedFilter) => {
  const axiosSecure = useAxiosSecure();
  const [currentUser] = useUser();

  const { refetch, data: companyAssetReq } = useQuery({
    queryKey: [currentUser?.company, search],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/companyAssetReq/${currentUser.company}?search=${search}&pendingApprovedFilter=${pendingApprovedFilter}&limit=${limit}`
      );
      return res.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [search, limit, pendingApprovedFilter]);

  return [companyAssetReq, refetch];
};

export default useCompanyAssets;
