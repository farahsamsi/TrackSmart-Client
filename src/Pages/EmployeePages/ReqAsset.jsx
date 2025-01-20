import { Helmet } from "react-helmet-async";
import SectionTitle from "../../SharedComponents/SectionTitle";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import useAssets from "../../Hooks/useAssets";
import { MdSearch } from "react-icons/md";
import { VscRequestChanges } from "react-icons/vsc";
import { useForm } from "react-hook-form";
import useUser from "../../Hooks/useUser";
import { format } from "date-fns";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ReqAsset = () => {
  const [sort] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [reqAsset, setReqAsset] = useState({});
  const [reqNotes, setReqNotes] = useState("");

  const [assets] = useAssets(sort, search, filter, isAvailable);
  const [currentUser] = useUser();
  const axiosSecure = useAxiosSecure();

  const { handleSubmit, reset } = useForm();

  const handleReq = async (asset) => {
    document.getElementById(asset?._id).showModal();
    setReqAsset(asset);
    reset();
    setReqNotes("");
  };

  const onSubmit = async () => {
    const today = new Date();
    const assetName = reqAsset?.assetName;
    const assetType = reqAsset?.assetType;
    const reqEmail = currentUser?.email;
    const reqName = currentUser?.name;
    const assetCompany = currentUser?.company;
    const reqDate = format(today, "dd-MM-yyyy");
    const reqStatus = "pending";

    const asset = {
      assetName,
      assetType,
      reqEmail,
      reqName,
      reqDate,
      reqNotes,
      assetCompany,
      reqStatus,
    };

    const res = await axiosSecure.post("/assetReq", asset);
    if (res.data.insertedId) {
      document.getElementById(reqAsset?._id).close();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Request has been sent",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <section className="pb-9 w-11/12 mx-auto">
      <Helmet>
        <title>Assets | TrackSmart</title>
      </Helmet>
      <SectionTitle
        heading="Company Assets"
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
          <span className="uppercase"></span>
        </h1>
        <h1 className="text-xl md:text-2xl">
          <button
            onClick={() => {
              setIsAvailable(!isAvailable);
            }}
            className={`btn btn-error w-full ${
              !isAvailable && "!btn-success "
            }`}
          >
            {!isAvailable ? "Show Unavailable Assets" : "Show All Assets"}
          </button>
          <span className="uppercase"></span>
        </h1>
      </div>

      {assets?.length === 0 ? (
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
                  <th>Quantity</th>

                  <th>Request Asset</th>
                </tr>
              </thead>
              <tbody>
                {assets?.map((asset, index) => (
                  <tr className="hover" key={asset._id}>
                    <td>{index + 1}</td>
                    <td>{asset?.assetName}</td>
                    <td className={`uppercase`}>
                      <span
                        className={`badge h-auto ${
                          asset?.assetType == "returnable"
                            ? "bg-blue-200"
                            : "bg-purple-200"
                        }`}
                      >
                        {asset?.assetType}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge h-auto ${
                          asset?.assetQuantity > 0
                            ? "bg-green-200"
                            : "bg-red-200"
                        }`}
                      >
                        {asset?.assetQuantity > 0
                          ? "Available"
                          : "Out of Stock"}
                      </span>
                    </td>

                    <th>
                      <button
                        disabled={asset?.assetQuantity < 1}
                        onClick={() => handleReq(asset)}
                        className="btn btn-ghost  text-xl"
                      >
                        <VscRequestChanges className="text-red-400 text-3xl" />
                      </button>
                    </th>

                    <dialog
                      id={asset?._id}
                      className="modal modal-bottom sm:modal-middle"
                    >
                      <div className="modal-box">
                        <h3 className="font-bold text-lg text-center mb-5">
                          Request for {reqAsset?.assetName}
                        </h3>
                        <div>
                          <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="grid grid-cols-2 gap-2"
                          >
                            <textarea
                              onKeyUp={(e) => setReqNotes(e.target.value)}
                              className="textarea textarea-bordered w-full"
                              placeholder="Enter additional notes"
                            ></textarea>
                            <div className="flex flex-col justify-center items-center">
                              <p className="py-4">
                                Available Quantity : {reqAsset?.assetQuantity}
                              </p>
                              <button type="submit" className="btn btn-success">
                                Request
                              </button>
                            </div>
                          </form>
                        </div>
                        <div className="divider"></div>
                        <div className="modal-action">
                          <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
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

export default ReqAsset;
