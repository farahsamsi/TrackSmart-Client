import { Helmet } from "react-helmet-async";
import About from "./HomeComponents/About";
import Banner from "./HomeComponents/Banner";
import Packages from "./HomeComponents/Packages";
import useUser from "../../Hooks/useUser";
import ContactHR from "../../SharedComponents/ContactHR";

const Home = () => {
  const [currentUser] = useUser();
  console.log(currentUser);
  return (
    <div>
      <Helmet>
        <title>Home | TrackSmart</title>
      </Helmet>
      <Banner></Banner>
      {!currentUser?.company && <ContactHR />}
      <About></About>
      {!currentUser && <Packages></Packages>}
    </div>
  );
};

export default Home;
