import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SectionTitle from "../../SharedComponents/SectionTitle";
import registerImg from "../../assets/Social Images/register.png";
import GoogleLogin from "./GoogleLogin";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const JoinAsEmployee = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const photoURL = res.data.data.display_url;
      // create user
      createUser(data.email, data.password)
        .then(() => {
          //  profile update
          updateUserProfile(data.name, photoURL).then(() => {
            const userInfo = {
              name: data.name,
              email: data.email,
              photo: photoURL,
            };
            // save user in DB
            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                navigate("/");
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Welcome to TrackSmart",
                  showConfirmButton: false,
                  timer: 1500,
                });
                reset();
              }
            });
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${err.message}`,
          });
        });
    }
  };

  return (
    <div className="pb-9 w-11/12 mx-auto">
      <Helmet>
        <title>Join As Employee | TrackSmart</title>
      </Helmet>
      <SectionTitle
        heading="Create Your Employee Account"
        subHeading="Start your journey to smarter inventory management."
      ></SectionTitle>
      <div className="hero">
        <div className="hero-content grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="text-center lg:text-left">
            <img src={registerImg} alt="" />
          </div>
          <div className="card bg-base-100 w-full  shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  {...register("name", { required: true })}
                  placeholder="enter your name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-700">Please enter your name</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Profile Photo</span>
                </label>

                <input
                  type="file"
                  {...register("image", { required: true })}
                  className="file-input file-input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  name="email"
                  placeholder="enter your email"
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
                  {...register("password", { required: true })}
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password && (
                  <span className="text-red-700">
                    Please enter your password
                  </span>
                )}
                <label className="label">
                  <a className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Date of Birth</span>
                </label>
                <input
                  {...register("dateOfBirth", { required: true })}
                  type="date"
                  className="input input-bordered"
                />
                {errors.dateOfBirth && (
                  <span className="text-red-700">Please enter your email</span>
                )}
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
            </form>
            <div className="divider"></div>
            <div className="flex flex-col md:flex-row gap-4 justify-around items-center mb-6">
              <div className="flex flex-col justify-center">
                <p>Already have an account ?</p>
                <Link to="/login" className="btn">
                  <button>Login</button>
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

export default JoinAsEmployee;
