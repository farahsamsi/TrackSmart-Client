import { Outlet } from "react-router-dom";
import Navbar from "../SharedComponents/Navbar";
import Footer from "../SharedComponents/Footer";
import Loader from "../SharedComponents/Loader";
import useAuth from "../Hooks/useAuth";

const Main = () => {
  const { loading } = useAuth();
  return (
    <div>
      <>
        {" "}
        {/* navbar */}
        <Navbar></Navbar>
        {loading ? (
          <Loader></Loader>
        ) : (
          <div className="min-h-[calc(100vh-200px)] container mx-auto">
            <Outlet></Outlet>
          </div>
        )}
        {/* footer */}
        <Footer></Footer>
      </>
    </div>
  );
};

export default Main;
