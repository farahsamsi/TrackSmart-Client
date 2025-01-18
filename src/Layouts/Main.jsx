import { Outlet } from "react-router-dom";
import Navbar from "../SharedComponents/Navbar";
import Footer from "../SharedComponents/Footer";

const Main = () => {
  return (
    <div>
      <>
        {" "}
        {/* navbar */}
        <Navbar></Navbar>
        <div className="min-h-[calc(100vh-200px)] container mx-auto">
          <Outlet></Outlet>
        </div>
        {/* footer */}
        <Footer></Footer>
      </>
    </div>
  );
};

export default Main;
