import { Helmet } from "react-helmet-async";
import SectionTitle from "../../SharedComponents/SectionTitle";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import useCompanyAssets from "../../Hooks/useCompanyAssets";
import { MdSearch } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { format } from "date-fns";

const AllRequests = () => {
  const [search, setSearch] = useState("");
  const [companyAssetReq, refetch] = useCompanyAssets(search);

  const axiosSecure = useAxiosSecure();

  const handleReject = async (asset) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const reqStatus = "rejected";
        const res = await axiosSecure.patch(`/reqAssetUpdate/${asset?._id}`, {
          reqStatus,
        });
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Rejected!",
            text: "Asset Request has been Rejected.",
            icon: "success",
          });
        }
      }
    });
  };

  const handleApprove = async (asset) => {
    const findAssetQuantityRes = await axiosSecure.get(
      `/asset/${asset?.assetOriginalId}`
    );
    if (findAssetQuantityRes.data[0].assetQuantity < 1) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Stock Out, can not approve!",
      });
      return;
    }

    const today = new Date();
    const approvedDate = format(today, "dd-MM-yyyy");
    const reqStatus = "approved";
    const statusRes = await axiosSecure.patch(`/reqAssetUpdate/${asset?._id}`, {
      reqStatus,
      approvedDate,
    });
    if (statusRes.data.modifiedCount > 0) {
      const approved = 1;
      const res = await axiosSecure.patch(
        `/updateAsset/${asset?.assetOriginalId}`,
        { approved }
      );
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Approved successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <section className="pb-9 w-11/12 mx-auto">
      <Helmet>
        <title>All Requests | TrackSmart</title>
      </Helmet>
      <SectionTitle
        heading="Asset Requests"
        subHeading="Effortlessly track and manage your company assets by adding them to the system."
      ></SectionTitle>
      <div className=" bg-black/10 p-4 my-6">
        <h1 className="text-xl md:text-2xl flex items-center justify-center gap-2">
          <BiSearch />
          <input
            onKeyUp={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search requests by requester name or email name"
            className="input w-full max-w-xl"
          />
          <span className="uppercase"></span>
        </h1>
      </div>

      {companyAssetReq?.length === 0 ? (
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
                  <th>Requester Email</th>
                  <th>Requested By</th>
                  <th>Request Date</th>
                  <th>Additional Note</th>
                  <th>Status</th>
                  <th>Approve</th>
                  <th>Reject</th>
                </tr>
              </thead>
              <tbody>
                {companyAssetReq?.map((asset, index) => (
                  <tr className="hover" key={asset._id}>
                    <td>{index + 1}</td>
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
                    <td>{asset?.reqEmail}</td>
                    <td>{asset?.reqName}</td>
                    <td>{asset?.reqDate}</td>
                    <td>{asset?.reqNotes}</td>
                    <td className={`uppercase`}>
                      <span
                        className={`badge h-auto 
                                      ${
                                        asset?.reqStatus == "pending" &&
                                        "bg-pink-200"
                                      }
                                      ${
                                        asset?.reqStatus == "rejected" &&
                                        "bg-red-300"
                                      }
                                      ${
                                        asset?.reqStatus == "approved" &&
                                        "bg-green-200"
                                      }
                                      ${
                                        asset?.reqStatus == "returned" &&
                                        "bg-blue-200"
                                      }
                                      `}
                      >
                        {asset?.reqStatus}
                      </span>
                    </td>
                    <th>
                      <button
                        disabled={asset?.reqStatus === "rejected"}
                        onClick={() => handleApprove(asset)}
                        className="btn btn-ghost  text-xl"
                      >
                        <TiTick className="text-green-400 text-3xl" />
                      </button>
                    </th>
                    <th>
                      <button
                        disabled={asset?.reqStatus === "rejected"}
                        onClick={() => handleReject(asset)}
                        className="btn btn-ghost  text-xl"
                      >
                        <ImCancelCircle className="text-red-400 text-3xl" />
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default AllRequests;
