import { useEffect, useState } from "react";
import SectionTitle from "../../../SharedComponents/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useUser from "../../../Hooks/useUser";
import { format } from "date-fns";
import monthlyReqImg from "../../../assets/Home page images/topReqs.png";

const MonthlyReqs = () => {
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
                      <th>Type</th>
                      <th>Req Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assets.map((asset) => (
                      <tr key={asset?._id}>
                        <td>{asset?.assetName}</td>
                        <td>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
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
