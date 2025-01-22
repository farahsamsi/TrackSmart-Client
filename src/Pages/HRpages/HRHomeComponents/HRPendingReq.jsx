import useCompanyAssets from "../../../Hooks/useCompanyAssets";
import SectionTitle from "../../../SharedComponents/SectionTitle";

const HRPendingReq = () => {
  const search = "";
  const limit = 5;
  const pendingApprovedFilter = "pending";
  const [companyAssetReq] = useCompanyAssets(
    search,
    limit,
    pendingApprovedFilter
  );
  return (
    <section className="my-9">
      <SectionTitle heading="Pending Requests"></SectionTitle>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 w-11/12 mx-auto">
        {companyAssetReq &&
          companyAssetReq.map((asset) => (
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

                <p>Requested by: {asset?.reqName}</p>
                <p>
                  Status:
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
                </p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default HRPendingReq;
