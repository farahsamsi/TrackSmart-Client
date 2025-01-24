import SectionTitle from "../../../SharedComponents/SectionTitle";
import MyEmployees from "../MyEmployees";
import teamImg from "../../../assets/Home page images/team.png";

const HRTeam = () => {
  return (
    <div className="py-9 w-11/12 mx-auto">
      <SectionTitle heading="My Team"></SectionTitle>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="">
          <img src={teamImg} alt="Team Image" />
        </div>
        <div className="flex items-center justify-center">
          <MyEmployees />
        </div>
      </div>
    </div>
  );
};

export default HRTeam;
