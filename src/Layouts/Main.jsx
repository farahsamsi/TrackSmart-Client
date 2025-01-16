import { Outlet } from "react-router-dom";
import Navbar from "../SharedComponents/Navbar";

const Main = () => {
  return (
    <div>
      {/* navbar */}
      <Navbar></Navbar>

      <Outlet></Outlet>

      {/* footer */}
    </div>
  );
};

export default Main;
