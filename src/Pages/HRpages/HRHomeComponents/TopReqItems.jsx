import { useEffect, useState } from "react";
import SectionTitle from "../../../SharedComponents/SectionTitle";
import topReqsImg from "../../../assets/Home page images/topReqs.png";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useUser from "../../../Hooks/useUser";

const TopReqItems = () => {
  const [topReqs, setTopReqs] = useState([]);
  const [currentUser] = useUser();
  const company = currentUser?.company;
  const axiosSecure = useAxiosSecure();
  const res = async () => {
    const topReqsRes = await axiosSecure(`/assets/topReqs/${company}`);
    setTopReqs(topReqsRes.data);
  };
  useEffect(() => {
    res();
  }, [company]);
  return (
    <section className="py-9">
      <SectionTitle
        heading="Top Requested Items"
        subHeading="Discover the most in-demand assets to better understand employee needs and streamline resource allocation."
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-11/12 mx-auto">
        <div>
          <img className="p-4" src={topReqsImg} alt="" />{" "}
        </div>
        <div className=" card-body border rounded-xl p-4 flex items-center justify-center">
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              {/* head */}
              <thead className="">
                <tr>
                  <th>Asset Name</th>
                  <th>Type</th>
                  <th>Req Count</th>
                </tr>
              </thead>
              <tbody>
                {topReqs.map((asset) => (
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
                    <td>{asset?.reqCount} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopReqItems;
