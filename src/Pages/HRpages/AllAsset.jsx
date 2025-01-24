import { Helmet } from "react-helmet-async";
import SectionTitle from "../../SharedComponents/SectionTitle";
import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
import useAssets from "../../Hooks/useAssets";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaFile } from "react-icons/fa";
import { format } from "date-fns";
import { TablePagination } from "@mui/material";

const AllAsset = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [sort, setSort] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [isAvailable] = useState(false);
  const stockLimited = false;
  const [updateAsset, setUpdateAsset] = useState({});

  const axiosSecure = useAxiosSecure();

  const [assets, refetch] = useAssets(
    sort,
    search,
    filter,
    isAvailable,
    stockLimited
  );

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/asset/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your asset has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  const handleUpdate = async (asset) => {
    document.getElementById(asset._id).showModal();
    setUpdateAsset(asset);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const assetQuantity = parseInt(form.assetQuantity.value);

    const res = await axiosSecure.patch(`/updateAsset/${updateAsset._id}`, {
      assetQuantity,
    });
    if (res.data.modifiedCount > 0) {
      refetch();
      document.getElementById(updateAsset._id).close();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully Updated",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <section className="pb-9 w-11/12 mx-auto">
      <Helmet>
        <title>Assets | TrackSmart</title>
      </Helmet>
      <SectionTitle
        heading="Your Assets"
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
        <h1 className="text-xl md:text-2xl col-span-2 md:col-span-1">
          <button
            onClick={() => {
              setSort(!sort);
            }}
            className={`btn btn-primary w-full ${sort && "btn-success"}`}
          >
            {sort ? "Sorted by Quantity" : "Sort By Quantity"}
          </button>
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
                  <th>Date Added</th>
                  <th>Edit Asset</th>
                  <th>Delete Asset</th>
                </tr>
              </thead>
              <tbody>
                {assets
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((asset, index) => (
                    <tr key={asset._id}>
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
                      <td>{asset?.assetQuantity}</td>
                      <td>
                        {asset?.addedDate &&
                          format(new Date(asset?.addedDate), "dd-MM-yyyy")}
                      </td>

                      <th>
                        <button
                          onClick={() => handleUpdate(asset)}
                          className="btn btn-outline  text-xl"
                        >
                          <MdEdit className="text-yellow-400 text-3xl" />
                        </button>
                        {/* You can open the modal using document.getElementById('ID').showModal() method */}
                        <dialog id={asset._id} className="modal">
                          <div className="modal-box">
                            <form method="dialog">
                              {/* if there is a button in form, it will close the modal */}
                              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                              </button>
                            </form>
                            <div>
                              <div className="card bg-base-100 w-full  shrink-0 shadow-2xl">
                                <form
                                  onSubmit={handleSubmit}
                                  className="card-body"
                                >
                                  <h1 className="text-center">
                                    Update {asset?.assetName}
                                  </h1>
                                  <div className="form-control">
                                    <label className="label">
                                      <span className="label-text">
                                        Quantity
                                      </span>
                                    </label>
                                    <input
                                      defaultValue={asset?.assetQuantity}
                                      type="number"
                                      name="assetQuantity"
                                      placeholder="Enter quantity"
                                      className="input input-bordered"
                                    />
                                  </div>

                                  <div className="form-control mt-6">
                                    <button
                                      type="submit"
                                      className="btn btn-primary text-white"
                                    >
                                      <FaFile />
                                      Update
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </dialog>
                      </th>
                      <th>
                        <button
                          onClick={() => handleDelete(asset?._id)}
                          className="btn btn-outline  text-xl"
                        >
                          <MdDelete className="text-red-400 text-3xl" />
                        </button>
                      </th>
                    </tr>
                  ))}
              </tbody>
            </table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={assets?.length}
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

export default AllAsset;
