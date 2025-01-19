import { useQuery } from "@tanstack/react-query";
import useUser from "../../Hooks/useUser";
import SectionTitle from "../../SharedComponents/SectionTitle";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";
import { TfiControlEject } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const AddEmployee = () => {
  const axiosSecure = useAxiosSecure();
  const [currentUser, refetch] = useUser();

  const [selectedMembers, setSelectedMembers] = useState([]);

  // Function to handle checkbox selection
  const handleSelectMember = (email) => {
    setSelectedMembers(
      (prev) =>
        prev.includes(email)
          ? prev.filter((i) => i !== email) // Remove the unselected member
          : [...prev, email] // Add the newly selected member
    );
    // console.log(selectedMembers);
  };

  const { refetch: usersRefetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/available");
      return res.data;
    },
  });
  // console.log(currentUser?.team?.length);
  // console.log(maxEmployee);
  const handleAdd = async (email) => {
    //   update = employee email addresses
    // selectUser = info that are passed from hr to employee

    const currentTeamLength = currentUser?.team?.length || 0;

    let update = null;
    if (selectedMembers.length === 0) {
      update = [email];
    } else {
      update = selectedMembers;
    }

    if (currentTeamLength + update.length > currentUser?.teamLimit) {
      Swal.fire({
        title: "Limit Exceeded!",
        text: `You can not add more than ${currentUser?.teamLimit} employees`,
        icon: "error",
      });

      return;
    }

    // employee user info update
    const selectUser = {
      company: currentUser.company,
      companyLogoImg: currentUser.companyLogoImg,
      HRemail: currentUser.email,
    };
    const res = await axiosSecure.patch(`/updateEmployee`, {
      update,
      selectUser,
    });

    //   hr userInfo update
    const hrRes = await axiosSecure.patch(
      `/hr/team/${currentUser._id}`,
      update
    );
    if (hrRes.data.modifiedCount > 0 && res.data.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
      setSelectedMembers([]);
      usersRefetch();
    }
    // console.log("hr status", hrRes.data);
  };

  return (
    <div className="pb-9 w-11/12 mx-auto">
      <Helmet>
        <title>Add Employees | TrackSmart</title>
      </Helmet>
      <SectionTitle heading="Add Employee to your Team"></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
        <h1 className="text-xl md:text-2xl">
          Your Current Package:{" "}
          <span className="uppercase">{currentUser?.package}</span>
        </h1>
        <div className="text-xl md:text-2xl flex gap-5 items-center">
          <h1>
            Your employee count:{" "}
            <span className="uppercase">
              {currentUser?.team?.length}/{currentUser?.teamLimit}
            </span>
          </h1>
          <Link to="/increaseLimit">
            <button className="btn btn-xs bg-orange-200 flex items-center">
              <TfiControlEject className="text-xl" />
              Increase Limit
            </button>
          </Link>
        </div>
      </div>

      <button className="btn btn-outline my-5" onClick={handleAdd}>
        Add Selected Members to the Team
      </button>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label></label>
              </th>
              <th>Name</th>
              <th>Add To Team</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <th>
                  <label>
                    <input
                      value={user.email}
                      className="checkbox"
                      type="checkbox"
                      checked={selectedMembers.includes(user?.email)}
                      onChange={(e) => handleSelectMember(e.target.value)}
                    />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user?.photo} alt={user?.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user?.name}</div>
                    </div>
                  </div>
                </td>

                <th>
                  <button
                    disabled={selectedMembers?.length > 0}
                    onClick={() => handleAdd(user.email)}
                    className="btn btn-ghost btn-xs text-xl"
                  >
                    <FaUserCircle className="text-orange-400" />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddEmployee;
