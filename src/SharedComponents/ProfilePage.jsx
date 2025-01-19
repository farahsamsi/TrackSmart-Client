import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import SectionTitle from "./SectionTitle";
import { useQuery } from "@tanstack/react-query";
import { FaBookBookmark } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";

const ProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: profileDetail } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data;
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;

    updateUserProfile(name)
      .then(async () => {
        const updatedName = { name };

        const res = await axiosSecure.patch(`/user/${user.email}`, updatedName);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Profile Name has been updated",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <section className="pb-9 w-11/12 mx-auto">
      <Helmet>
        <title>My Profile | TrackSmart</title>
      </Helmet>
      <SectionTitle heading="My Profile"></SectionTitle>
      <div className="card grid grid-cols-1 md:grid-cols-2 bg-base-100 shadow-xl my-7">
        <figure>
          <img className="h-80" src={user?.photoURL} alt={user?.displayName} />
        </figure>
        <div className="card-body">
          {/* <h2 className="card-title">Name: {user?.displayName}</h2> */}
          <div className="">
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="input input-bordered flex items-center gap-2">
                Name :
                <input
                  type="text"
                  className="grow"
                  name="name"
                  defaultValue={user?.displayName}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Email :
                <input
                  type="text"
                  className="grow"
                  value={user?.email}
                  readOnly
                />
              </label>
              {profileDetail?.company && (
                <h2 className="card-title">
                  Company: {profileDetail?.company}
                </h2>
              )}
              {profileDetail?.package && (
                <h2 className="flex items-center gap-1">
                  <FaBookBookmark></FaBookBookmark>
                  Active Package:{" "}
                  <span className="uppercase">{profileDetail?.package}</span>
                </h2>
              )}
              {/* action button */}
              <div className="card-actions justify-end">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
