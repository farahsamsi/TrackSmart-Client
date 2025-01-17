import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const GoogleLogin = () => {
  const { googleLogin } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    googleLogin()
      .then((res) => {
        const userInfo = {
          name: res.user.displayName,
          email: res.user.email,
        };
        axiosPublic
          .post("/users", userInfo)
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
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <button onClick={handleGoogleLogin} className="btn">
      <img
        width="48"
        height="48"
        src="https://img.icons8.com/color/48/google-logo.png"
        alt="google-logo"
      />
      Continue with Google
    </button>
  );
};

export default GoogleLogin;
