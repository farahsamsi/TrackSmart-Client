import { Helmet } from "react-helmet-async";
import errorImg from "../assets/Home page images/error.png";
import Navbar from "./Navbar";
const ErrorPage = () => {
  return (
    <div>
      <Helmet>
        <title>ERROR</title>
      </Helmet>
      <Navbar></Navbar>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 py-6">
        <div>
          <h1 className="text-2xl md:text-4xl">Sorry Page Not Found</h1>
        </div>
        <div>
          <img src={errorImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
