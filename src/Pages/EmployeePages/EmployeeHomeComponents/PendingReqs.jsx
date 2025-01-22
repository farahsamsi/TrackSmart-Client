import { ImCancelCircle } from "react-icons/im";
import useEmployeeAssets from "../../../Hooks/useEmployeeAssets";
import SectionTitle from "../../../SharedComponents/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PendingReqs = () => {
  const pendingApprovedFilter = "pending";
  const search = "";
  const filter = "";
  const [employeeAssets, employeeAssetRefetch] = useEmployeeAssets(
    search,
    filter,
    pendingApprovedFilter
  );
  //   console.log(employeeAssets);
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

  return (
    <section className="my-9">
      <SectionTitle heading="Pending Requests"></SectionTitle>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 w-11/12 mx-auto">
        {employeeAssets &&
          employeeAssets.map((asset) => (
            <div key={asset?._id} className="card bg-base-100 shadow-xl">
              <div className="card-body p-4">
                <h2 className="card-title">{asset?.assetName}</h2>
                <p>
                  <span
                    className={`badge h-auto ${
                      asset?.assetType == "returnable"
                        ? "bg-green-200"
                        : "bg-purple-200"
                    }`}
                  >
                    {asset?.assetType}
                  </span>
                </p>
                <p>
                  Status:
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
                </p>
                <div className="card-actions justify-center">
                  <button
                    onClick={() => handleDelete(asset)}
                    className="btn btn-error btn-xs"
                  >
                    {" "}
                    Cancel Request
                    <ImCancelCircle className=" " />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default PendingReqs;
