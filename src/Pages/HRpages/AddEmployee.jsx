import { useQuery } from "@tanstack/react-query";
import useUser from "../../Hooks/useUser";
import SectionTitle from "../../SharedComponents/SectionTitle";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaUserCircle } from "react-icons/fa";

const AddEmployee = () => {
  const axiosSecure = useAxiosSecure();

  const [currentUser] = useUser();
  console.log(currentUser);

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/available");
      return res.data;
    },
  });

  const handleAdd = async (email) => {
    const selectUser = {
      company: currentUser.company,
      companyLogoImg: currentUser.companyLogoImg,
      HRemail: currentUser.email,
    };
    console.log(selectUser);

    //   const res = await axiosSecure.patch(`/selectUser/${email}`, selectUser);

    const update = {
      teamMember: email,
    };

    const hrRes = await axiosSecure.patch(
      `/hr/team/${currentUser._id}`,
      update
    );
    console.log(hrRes);

    // console.log(res.data);
  };

  return (
    <div className="pb-9 w-11/12 mx-auto">
      <SectionTitle heading="Add Employee to your Team"></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
        <h1 className="text-xl md:text-2xl">
          Your Current Package:{" "}
          <span className="uppercase">{currentUser?.package}</span>
        </h1>
        <h1 className="text-xl md:text-2xl">
          Your employee count: <span className="uppercase">0</span>
        </h1>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
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
                    <input type="checkbox" disabled className="checkbox" />
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
