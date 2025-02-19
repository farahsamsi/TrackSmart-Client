import { Helmet } from "react-helmet-async";
import About from "./HomeComponents/About";
import Banner from "./HomeComponents/Banner";
import Packages from "./HomeComponents/Packages";
import useUser from "../../Hooks/useUser";
import ContactHR from "../../SharedComponents/ContactHR";
import HRPendingReq from "../HRpages/HRHomeComponents/HRPendingReq";
import PendingReqs from "../EmployeePages/EmployeeHomeComponents/PendingReqs";
import LimitedStock from "../HRpages/HRHomeComponents/LimitedStock";
import TopReqItems from "../HRpages/HRHomeComponents/TopReqItems";
import PieChartHR from "../HRpages/HRHomeComponents/PieChartHR";
import HRTips from "../HRpages/HRHomeComponents/HRTips";
import HRTeam from "../HRpages/HRHomeComponents/HRTeam";
import MonthlyReqs from "../EmployeePages/EmployeeHomeComponents/MonthlyReqs";
import UpcomingEvents from "../EmployeePages/EmployeeHomeComponents/UpcomingEvents";
import { useEffect, useState } from "react";
import KeyFeatures from "./HomeComponents/KeyFeatures";
import AssetCategories from "./HomeComponents/AssetCategories";
import SuccessStories from "./HomeComponents/SuccessStories";

const Home = () => {
  const [currentUser, refetch] = useUser();

  const [user, setUser] = useState({});
  useEffect(() => {
    refetch();
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser(null);
    }
  }, [currentUser]);

  return (
    <div>
      <Helmet>
        <title>Home | TrackSmart</title>
      </Helmet>
      <Banner></Banner>
      {/* {currentUser?.company ? "" : <ContactHR />} */}

      {currentUser?.name ? (
        user?.company ? (
          user?.role === "HR" ? (
            <>
              <HRPendingReq />
              <TopReqItems />
              <LimitedStock />
              <PieChartHR />
              <HRTips />
              <HRTeam />
            </>
          ) : (
            <>
              <PendingReqs />
              <MonthlyReqs />
              <HRTips />
              <UpcomingEvents />
            </>
          )
        ) : (
          <ContactHR />
        )
      ) : (
        <>
          <About></About>
          <Packages></Packages>
          <KeyFeatures />
          <AssetCategories />
          <SuccessStories />
        </>
      )}
    </div>
  );
};

export default Home;
