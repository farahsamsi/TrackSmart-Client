import { Link } from "react-router-dom";
import SectionTitle from "../../SharedComponents/SectionTitle";
import registerImg from "../../assets/Social Images/register.png";
import useAuth from "../../Hooks/useAuth";

const Register = () => {
  const { register } = useAuth();
  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    register(email, password).then((res) => {
      const user = res.user;
      console.log(user);
    });
  };
  return (
    <div>
      <SectionTitle
        heading="Create Your Account"
        subHeading="Start your journey to smarter inventory management."
      ></SectionTitle>
      <div className="hero">
        <div className="hero-content grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="text-center lg:text-left">
            <img src={registerImg} alt="" />
          </div>
          <div className="card bg-base-100 w-full  shrink-0 shadow-2xl">
            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="enter your name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="enter your email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
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
                {/* <GoogleLogin></GoogleLogin> */}
                <button
                  //   onClick={googleLoginBtn}
                  className="btn"
                >
                  <img
                    width="48"
                    height="48"
                    src="https://img.icons8.com/color/48/google-logo.png"
                    alt="google-logo"
                  />
                  Continue with Google
                </button>
              </div>

              {/* <button onClick={handleLogOut} className="btn">Log out</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
