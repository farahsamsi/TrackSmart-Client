import { Helmet } from "react-helmet-async";
import useUser from "../../Hooks/useUser";
import SectionTitle from "../../SharedComponents/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaUser } from "react-icons/fa";
import ContactHR from "../../SharedComponents/ContactHR";

const MyTeam = () => {
  const [currentUser] = useUser();
  const axiosSecure = useAxiosSecure();
  let userCompany = currentUser?.company;

  const { data: teamMembers } = useQuery({
    queryKey: [currentUser?.company],
    queryFn: async () => {
      const res = await axiosSecure(`/myTeam/${userCompany}`);
      return res.data;
    },
  });

  return (
    <section className="pb-9 w-11/12 mx-auto">
      <Helmet>
        <title>My Team | TrackSmart</title>
      </Helmet>
      <SectionTitle heading="My Team"></SectionTitle>

      {currentUser?.company ? (
        <div className="card grid grid-cols-1 md:grid-cols-2 bg-base-100 shadow-xl my-7">
          <figure className="flex flex-col gap-4 items-center justify-center">
            <h1 className="text-xl font-bold">
              Company Name : {currentUser?.company}
            </h1>
            <img
              className="h-80"
              src={currentUser?.companyLogoImg}
              alt={currentUser?.company}
            />
          </figure>
          <div className="card-body border-t-2 md:border-l-2 md:border-t-0">
            {/* <h2 className="card-title">Name: {user?.displayName}</h2> */}
            <div className="">
              <h1 className="text-2xl">Team Members :</h1>
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Photo</th>
                      <th>Name</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {teamMembers?.map((user) => (
                      <tr key={user?._id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle h-12 w-12">
                                <img
                                  src={user?.photo || user?.companyLogoImg}
                                  alt={user?.name}
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{user?.name}</td>

                        <td>{user?.role ? user?.role : <FaUser />}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ContactHR />
      )}
    </section>
  );
};

export default MyTeam;
