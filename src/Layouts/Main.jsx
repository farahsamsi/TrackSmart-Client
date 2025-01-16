import { Outlet } from "react-router-dom";
import Navbar from "../SharedComponents/Navbar";
import Footer from "../SharedComponents/Footer";
import useAuth from "../Hooks/useAuth";
import Loader from "../SharedComponents/Loader";

const Main = () => {
  const { loading } = useAuth();
  console.log("from main", loading);
  return (
    <div>
      {loading ? (
        <Loader></Loader>
      ) : (
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
      )}
    </div>
  );
};

export default Main;
