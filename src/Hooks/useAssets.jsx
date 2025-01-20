import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useUser from "./useUser";
import { useEffect } from "react";

const useAssets = (sort, search, filter) => {
  const axiosSecure = useAxiosSecure();
  const [currentUser] = useUser();

  const company = currentUser?.company || "";

  const { refetch, data: assets = [] } = useQuery({
    queryKey: [currentUser?.company],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assets/${company}?sort=${sort}&search=${search}&filter=${filter}`
      );
      // console.log(assets);
      return res.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [sort, search, filter]);

  return [assets, refetch];
};

export default useAssets;
