import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useUser from "../../Hooks/useUser";
import SectionTitle from "../../SharedComponents/SectionTitle";
import { FaDeleteLeft } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { TablePagination } from "@mui/material";

const MyEmployees = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [currentUser, refetch] = useUser();
  const axiosSecure = useAxiosSecure();
  const [myEmployees, setMyEmployees] = useState([]);
  const location = useLocation();

  const getTeamMember = async (emails) => {
    const res = await axiosSecure.post("/getEmployees", { emails });
    return [res.data];
  };

  const team = async () => {
    const res = await getTeamMember(currentUser?.team);
    setMyEmployees(res);
    return;
  };

  useEffect(() => {
    if (currentUser?.team) {
      team();
    }
  }, [currentUser?.team]);

  const removeFromTeam = async (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/removeFromTeam/${email}`);
        const HRres = await axiosSecure.patch(
          `/removeFromHr/${currentUser?.email}`,
          {
            email,
          }
        );
        if (HRres.data.modifiedCount > 0 && res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Employee has been deleted from your team.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div className="pb-9 w-11/12 mx-auto">
      {location?.pathname === "/myEmployee" && (
        <>
          <Helmet>
            <title>My Team | TrackSmart</title>
          </Helmet>
          <SectionTitle heading="Update and watch your Team"></SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
            <h1 className="text-xl md:text-2xl">
              Your Current Package:{" "}
              <span className="uppercase">{currentUser?.package}</span>
            </h1>
            <h1 className="text-xl md:text-2xl">
              Your employee count:{" "}
              <span className="uppercase">
                {currentUser?.team?.length || 0}/{currentUser?.teamLimit}
              </span>
            </h1>
          </div>
          <p>HR manager : {currentUser?.name}</p>
        </>
      )}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label></label>
              </th>
              <th>Name</th>
              <th>Role</th>
              {location?.pathname === "/myEmployee" && <th>Remove</th>}
            </tr>
          </thead>
          <tbody>
            {myEmployees[0]
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1 + page * rowsPerPage}</th>
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
                  <td>Employee</td>

                  {location?.pathname === "/myEmployee" && (
                    <th>
                      <button
                        onClick={() => removeFromTeam(user.email)}
                        className="btn btn-ghost  text-xl"
                      >
                        <FaDeleteLeft className="text-red-400 text-3xl" />
                      </button>
                    </th>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={myEmployees[0]?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default MyEmployees;
