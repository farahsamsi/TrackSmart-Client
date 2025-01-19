import { Helmet } from "react-helmet-async";
import About from "./HomeComponents/About";
import Banner from "./HomeComponents/Banner";
import Packages from "./HomeComponents/Packages";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | TrackSmart</title>
      </Helmet>
      <Banner></Banner>
      <About></About>
      <Packages></Packages>
    </div>
  );
};

export default Home;
