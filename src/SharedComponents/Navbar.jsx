import { Link, NavLink } from "react-router-dom";
import logo from "../assets/Home page images/logo.png";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import useAdmin from "../Hooks/useAdmin";

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const [isAdmin] = useAdmin();
  console.log(isAdmin);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout !",
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .then(() => {
            Swal.fire({
              title: "Logged Out!",
              text: "You are logged out successfully.",
              icon: "success",
            });
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    });
  };

  const adminLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allUsers">All Users</NavLink>
      </li>
    </>
  );

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/joinAsEmployee">Join as Employee</NavLink>
      </li>
      <li>
        <NavLink to="/joinAsHR">Join as HR Manager</NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-10 ">
      <div className="navbar bg-base-100 max-w-screen-xl mx-auto ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {isAdmin ? adminLinks : links}
            </ul>
          </div>
          <Link className="btn btn-ghost flex text-xl">
            <img src={logo} alt="" />
            TrackSmart
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {isAdmin ? adminLinks : links}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-20 rounded-full">
                  <img referrerPolicy="no-referrer" src={user?.photoURL} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li onClick={handleLogout}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
