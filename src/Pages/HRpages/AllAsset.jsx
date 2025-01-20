import { Helmet } from "react-helmet-async";
import SectionTitle from "../../SharedComponents/SectionTitle";
import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
import useAssets from "../../Hooks/useAssets";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";

const AllAsset = () => {
  const [sort, setSort] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  // console.log(filter);

  const [assets] = useAssets(sort, search, filter);

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
                {assets?.map((asset, index) => (
                  <tr key={asset._id}>
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
                    <td>{asset?.assetQuantity}</td>
                    <td>{asset?.addedDate}</td>

                    <th>
                      <button
                        // onClick={() => removeFromTeam(user.email)}
                        className="btn btn-outline  text-xl"
                      >
                        <MdEdit className="text-yellow-400 text-3xl" />
                      </button>
                    </th>
                    <th>
                      <button
                        // onClick={() => removeFromTeam(user.email)}
                        className="btn btn-outline  text-xl"
                      >
                        <MdDelete className="text-red-400 text-3xl" />
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

export default AllAsset;
