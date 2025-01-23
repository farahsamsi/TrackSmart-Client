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

const Home = () => {
  const [currentUser] = useUser();

  return (
    <div>
      <Helmet>
        <title>Home | TrackSmart</title>
      </Helmet>
      <Banner></Banner>
      {/* {currentUser?.company ? "" : <ContactHR />} */}

      {currentUser ? (
        currentUser?.company ? (
          currentUser?.role === "HR" ? (
            <>
              <HRPendingReq />
              <TopReqItems />
              <LimitedStock />
              <PieChartHR />
              <HRTips />
            </>
          ) : (
            <>
              <PendingReqs />
            </>
          )
        ) : (
          <ContactHR />
        )
      ) : (
        <>
          <About></About>
          <Packages></Packages>
        </>
      )}
    </div>
  );
};

export default Home;
