import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Link } from "react-router-dom";

import HRImage from "../../../assets/Home page images/joinAsHr.png";
import employeeImage from "../../../assets/Home page images/joinAsEmployee.png";
import useAuth from "../../../Hooks/useAuth";

const Banner = () => {
  const { user } = useAuth();
  return (
    <section className="min-h-[calc(100vh-900px)] pb-12">
      <Carousel autoPlay infiniteLoop>
        <div className="h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6 lg:py-0">
            <div className="flex flex-col items-center justify-center w-10/12 mx-auto">
              <h1 className="text-2xl lg:text-4xl font-semibold">
                Empower Your Team, Manage Your Assets with Ease!
              </h1>
              <p className="text-xl mt-4 mb-6">
                Streamline asset management for your company with our robust,
                easy-to-use tools. Track, organize, and stay on top of your
                team&apos;s needs!
              </p>
              {user ? (
                ""
              ) : (
                <Link to="/joinAsHR">
                  <button className="btn btn-outline px-6 font-semibold">
                    Join as HR Manager
                  </button>
                </Link>
              )}
            </div>
            <div className="flex items-center justify-center h-full">
              <img
                className="w-full h-full object-cover"
                src={HRImage}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6 lg:py-0">
            <div className="flex flex-col items-center justify-center w-10/12 mx-auto">
              <h1 className="text-2xl lg:text-4xl font-semibold">
                Seamless Access to the Tools You Need!
              </h1>
              <p className="text-xl mt-4 mb-6">
                Request, track, and manage your assets effortlessly. Your
                one-stop solution for everything you need at work.
              </p>
              {user ? (
                ""
              ) : (
                <Link to="/joinAsEmployee">
                  <button className="btn btn-outline px-6 font-semibold">
                    Join as Employee
                  </button>
                </Link>
              )}
            </div>
            <div className="flex items-center justify-center h-full">
              <img
                className="w-full h-full object-cover"
                src={employeeImage}
                alt=""
              />
            </div>
          </div>
        </div>
      </Carousel>
    </section>
  );
};

export default Banner;
