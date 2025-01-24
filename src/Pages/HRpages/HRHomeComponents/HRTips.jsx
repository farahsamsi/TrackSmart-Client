import { useState } from "react";
import SectionTitle from "../../../SharedComponents/SectionTitle";
import { useEffect } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const HRTips = () => {
  const [tip, setTip] = useState("");

  useEffect(() => {
    // Fetch tips from JSON file
    const fetchTips = async () => {
      const response = await fetch("/hr-tips.json");
      const tips = await response.json();

      // Get today's tip based on date
      const today = new Date();
      const dayOfYear =
        Math.floor(
          (today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
        ) % tips.length;

      setTip(tips[dayOfYear].tip);
    };

    fetchTips();
  }, []);
  return (
    <div className="bg-orange-100 my-9">
      <div className="py-9 w-11/12 mx-auto">
        <SectionTitle heading="HR Tips of the Day"></SectionTitle>
        <div className="flex items-center justify-center">
          <p className="text-gray-700 flex items-center  gap-2 text-xl text-center">
            <FaQuoteLeft className=" " /> {tip || "Loading today's tip..."}{" "}
            <FaQuoteRight />
          </p>
        </div>
      </div>
    </div>
  );
};

export default HRTips;
