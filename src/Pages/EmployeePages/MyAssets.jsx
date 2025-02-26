import { Helmet } from "react-helmet-async";
import SectionTitle from "../../SharedComponents/SectionTitle";
import { BiSearch } from "react-icons/bi";
import useEmployeeAssets from "../../Hooks/useEmployeeAssets";
import { MdSearch } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { TablePagination } from "@mui/material";

const MyAssets = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [pendingApprovedFilter, setPendingApprovedFilter] = useState("");

  const [employeeAssets, employeeAssetRefetch] = useEmployeeAssets(
    search,
    filter,
    pendingApprovedFilter
  );
  const axiosSecure = useAxiosSecure();

  const handleDelete = async (asset) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/assetReq/${asset?._id}`);
        if (res.data.deletedCount > 0) {
          employeeAssetRefetch();
          Swal.fire({
            title: "Cancelled!",
            text: "Your Request has been Cancelled.",
            icon: "success",
          });
        }
      }
    });
  };

  const handleReturn = async (asset) => {
    const reqStatus = "returned";
    const returnRes = await axiosSecure.patch(`/reqAssetUpdate/${asset?._id}`, {
      reqStatus,
    });
    if (returnRes.data.modifiedCount > 0) {
      const approved = -1;
      const res = await axiosSecure.patch(
        `/updateAsset/${asset?.assetOriginalId}`,
        { approved }
      );
      if (res.data.modifiedCount > 0) {
        employeeAssetRefetch();
        Swal.fire({
          title: "Success!",
          text: "Your Return Request has been send.",
          icon: "success",
        });
      }
    }
  };

  return (
    <section className="pb-9 w-11/12 mx-auto">
      <Helmet>
        <title>My Assets | TrackSmart</title>
      </Helmet>
      <SectionTitle
        heading="My Assets"
        subHeading="Effortlessly track and manage your company assets by adding them to the system."
      ></SectionTitle>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-black/10 p-4 my-6">
        <h1 className="text-xl md:text-2xl flex items-center gap-2">
          <BiSearch />
          <input
            onKeyUp={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search asset by name"
            className="input w-full"
          />
          <span className="uppercase"></span>
        </h1>
        <h1 className="text-xl md:text-2xl">
          <select
            onChange={(e) => setFilter(e.target.value)}
            className="select select-bordered w-full "
          >
            <option selected disabled>
              Filter By Asset Type
            </option>
            <option value={""}>View All</option>
            <option value={"returnable"}>Returnable</option>
            <option value={"non-returnable"}>Non-Returnable</option>
          </select>
        </h1>
        <h1 className="text-xl md:text-2xl">
          <select
            onChange={(e) => setPendingApprovedFilter(e.target.value)}
            className="select select-bordered w-full "
          >
            <option selected disabled>
              Filter By Status
            </option>
            <option value={""}>View All</option>
            <option value={"pending"}>Pending</option>
            <option value={"approved"}>Approved</option>
          </select>
        </h1>
      </div>

      {employeeAssets?.length === 0 ? (
        <h1 className="text-2xl text-center text-red-700 flex items-center justify-center gap-3">
          <MdSearch />
          No Asset Found
        </h1>
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Asset Name</th>
                  <th>Asset Type</th>
                  <th>Request Date</th>
                  <th>Approval Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employeeAssets
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((asset, index) => (
                    <tr className="hover" key={asset._id}>
                      <td>{index + 1 + page * rowsPerPage}</td>
                      <td>{asset?.assetName}</td>
                      <td className={`uppercase`}>
                        <span
                          className={`badge h-auto ${
                            asset?.assetType == "returnable"
                              ? "bg-green-200"
                              : "bg-purple-200"
                          }`}
                        >
                          {asset?.assetType}
                        </span>
                      </td>
                      <td>
                        {asset?.reqDate &&
                          format(new Date(asset?.reqDate), "dd-MM-yyyy")}
                      </td>
                      <td>
                        {asset?.approvedDate &&
                          format(new Date(asset?.approvedDate), "dd-MM-yyyy")}
                      </td>

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

                      <th className="space-x-1">
                        {asset?.reqStatus === "pending" && (
                          <button
                            onClick={() => handleDelete(asset)}
                            className="btn btn-ghost  text-xl"
                          >
                            <ImCancelCircle className="text-red-400 text-3xl" />
                          </button>
                        )}
                        {asset?.reqStatus === "approved" &&
                          asset?.assetType === "returnable" && (
                            <button
                              onClick={() => handleReturn(asset)}
                              className="btn btn-success btn-xs "
                            >
                              Return
                            </button>
                          )}
                        {asset?.reqStatus === "approved" && (
                          <Link to={`/approvalDoc/${asset?._id}`}>
                            <button className="btn btn-warning btn-xs ">
                              Print
                            </button>
                          </Link>
                        )}
                        {asset?.reqStatus === "returned" && (
                          <button disabled className="btn btn-success btn-xs ">
                            Return
                          </button>
                        )}
                      </th>
                    </tr>
                  ))}
              </tbody>
            </table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={employeeAssets?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default MyAssets;
