import { Link, useNavigate } from "react-router-dom";
import SectionTitle from "../../SharedComponents/SectionTitle";
import loginImg from "../../assets/Social Images/login.png";
import { useForm } from "react-hook-form";

import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import GoogleLogin from "./GoogleLogin";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data.email, data.password)
      .then(() => {
        navigate("/");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Welcome to TrackSmart",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${err.message}`,
        });
      });
  };

  return (
    <div className="pb-9 w-11/12 mx-auto">
      <Helmet>
        <title>Login | TrackSmart</title>
      </Helmet>
      <SectionTitle
        heading="Login to Your Account"
        subHeading="Access your dashboard and stay on top of your inventory tasks effortlessly."
      ></SectionTitle>
      <div className="hero">
        <div className="hero-content grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="text-center lg:text-left">
            <img src={loginImg} alt="" />
          </div>
          <div className="card bg-base-100 w-full  shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-700">Please enter your email</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  {...register("password", { required: true, minLength: 6 })}
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password?.type === "required" && (
                  <span className="text-red-700">Please enter password</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-700">Password is too short</span>
                )}
                <label className="label">
                  <a className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
            <div className="divider"></div>
            <div className="flex flex-col md:flex-row gap-4 justify-around items-center mb-6">
              <div className="flex flex-col justify-center">
                <p>Do not have an account ?</p>
                <Link to="/" className="btn">
                  <button>Join Now</button>
                </Link>
              </div>
              <div className="flex flex-col justify-center items-center">
                <p>Or</p>
                <GoogleLogin></GoogleLogin>
              </div>

              {/* <button onClick={handleLogOut} className="btn">Log out</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
