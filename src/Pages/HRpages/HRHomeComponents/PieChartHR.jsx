import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useUser from "../../../Hooks/useUser";
import SectionTitle from "../../../SharedComponents/SectionTitle";
import returnImg from "../../../assets/Home page images/return.png";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartHR = () => {
  const [currentUser] = useUser();
  const [allAssets, setAllAssets] = useState([]);
  const company = currentUser?.company || "";
  const axiosSecure = useAxiosSecure();

  const res = async () => {
    const allAssets = await axiosSecure(`/assets/type/${company}`);
    setAllAssets(allAssets.data);
  };
  useEffect(() => {
    res();
  }, [company]);

  const calculateTotals = () => {
    const totals = { returnable: 0, nonReturnable: 0 };

    allAssets.forEach((asset) => {
      if (asset?.assetType == "returnable") {
        totals.returnable += asset?.reqCount || 0;
      } else if (asset.assetType == "non-returnable") {
        totals.nonReturnable += asset?.reqCount || 0;
      }
    });
    return totals;
  };

  const totals = calculateTotals();

  const data = {
    labels: ["Returnable", "Non-Returnable"],
    datasets: [
      {
        label: "# of Requests",
        data: [totals.returnable, totals.nonReturnable],
        backgroundColor: ["rgba(54, 162, 235, 1)", "rgba(255, 159, 64, 1)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="py-9 w-11/12 mx-auto">
      <SectionTitle
        heading="Requested Items Breakdown"
        subHeading="Visualize the percentage of returnable and non-returnable items requested by employees at a glance"
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-3/4 mx-auto">
          <Pie data={data} />
        </div>
        <div className="hidden md:flex items-center justify-center">
          <img src={returnImg} alt="Return" />
        </div>
      </div>
    </section>
  );
};

export default PieChartHR;
