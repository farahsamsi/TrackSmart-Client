import { Helmet } from "react-helmet-async";
import SectionTitle from "../../SharedComponents/SectionTitle";
import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
import useAssets from "../../Hooks/useAssets";
import { useState } from "react";

const AllAsset = () => {
  const [sort, setSort] = useState(false);
  const [assets] = useAssets(sort);

  return (
    <section className="pb-9 w-11/12 mx-auto">
      <Helmet>
        <title>Assets | TrackSmart</title>
      </Helmet>
      <SectionTitle
        heading="Your Assets"
        subHeading="Effortlessly track and manage your company assets by adding them to the system."
      ></SectionTitle>
      {assets?.length === 0 ? (
        <h1 className="text-2xl text-center text-red-700 flex items-center justify-center gap-3">
          <MdSearch />
          You Have no Assets to show
        </h1>
      ) : (
        <div>
          <div className="grid grid-cols-3 gap-4 bg-black/10 p-4 my-6">
            <h1 className="text-xl md:text-2xl">
              Search
              <span className="uppercase"></span>
            </h1>
            <h1 className="text-xl md:text-2xl">
              Filter
              <span className="uppercase"></span>
            </h1>
            <h1 className="text-xl md:text-2xl">
              <button
                onClick={() => {
                  setSort(!sort);
                }}
                className={`btn btn-primary ${sort && "btn-success"}`}
              >
                {sort ? "Sorted by Quantity" : "Sort By Quantity"}
              </button>
              <span className="uppercase"></span>
            </h1>
          </div>

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
