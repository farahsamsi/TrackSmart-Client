import { useEffect, useState } from "react";
import SectionTitle from "../../../SharedComponents/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useUser from "../../../Hooks/useUser";
import { format } from "date-fns";
import monthlyReqImg from "../../../assets/Home page images/topReqs.png";
import { TablePagination } from "@mui/material";

const MonthlyReqs = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [assets, setAssets] = useState([]);
  const [currentUser] = useUser();
  const axiosSecure = useAxiosSecure();

  const getMonthlyAssets = async () => {
    const res = await axiosSecure(`/monthly-requests/${currentUser?.email}`);
    setAssets(res.data);
  };

  useEffect(() => {
    getMonthlyAssets();
  }, [currentUser]);

  return (
    <section className="py-9 w-11/12 mx-auto">
      <SectionTitle heading="My Monthly Requests"></SectionTitle>
      <div>
        {assets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-11/12 mx-auto">
            <div>
              <img className="p-4" src={monthlyReqImg} />{" "}
            </div>
            <div className=" card-body border rounded-xl p-4 flex items-center justify-center">
              <div className="overflow-x-auto w-full">
                <table className="table w-full">
                  {/* head */}
                  <thead className="">
                    <tr>
                      <th>Asset Name</th>
                      <th>Status</th>
                      <th>Req Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assets
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((asset) => (
                        <tr key={asset?._id}>
                          <td>{asset?.assetName}</td>
                          <td className={`uppercase`}>
                            <span
                              className={`badge h-auto 
                            ${asset?.reqStatus == "pending" && "bg-pink-200"}
                            ${asset?.reqStatus == "rejected" && "bg-red-300"}
                            ${asset?.reqStatus == "approved" && "bg-green-200"}
                            ${asset?.reqStatus == "returned" && "bg-blue-200"}
                            `}
                            >
                              {asset?.reqStatus}
                            </span>
                          </td>
                          <td>
                            {asset?.reqDate &&
                              format(new Date(asset?.reqDate), "dd-MM-yyyy")}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <TablePagination
                  rowsPerPageOptions={[5]}
                  component="div"
                  count={assets?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </div>
            </div>
          </div>
        ) : (
          <p>No requests found for this month.</p>
        )}
      </div>
    </section>
  );
};

export default MonthlyReqs;
