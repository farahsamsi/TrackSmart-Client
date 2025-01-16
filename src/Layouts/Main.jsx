import { Outlet } from "react-router-dom";
import Navbar from "../SharedComponents/Navbar";

const Main = () => {
  return (
    <div>
      {/* navbar */}
      <Navbar></Navbar>

      <div
      //   className="min-h-[calc(100vh-200px)]"
      >
        <Outlet></Outlet>
      </div>

      {/* footer */}
    </div>
  );
};

export default Main;
