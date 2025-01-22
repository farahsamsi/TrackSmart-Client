import contactHRimg from "../assets/Home page images/contactHR.png";
import useUser from "../Hooks/useUser";
import SectionTitle from "./SectionTitle";

const ContactHR = () => {
  const [currentUser] = useUser();
  return (
    <div className="card flex-col-reverse lg:grid lg:grid-cols-2 bg-base-100 shadow-xl my-7 md:my-14">
      <figure className="flex flex-col gap-4 items-center justify-center">
        <img className="h-80" src={contactHRimg} alt="contact HR" />
      </figure>
      <div className="card-body flex flex-col justify-center items-center">
        <SectionTitle
          heading={`Hey, ${currentUser?.name}`}
          subHeading="You're Not Assigned to an HR Team"
        ></SectionTitle>
        <p className="text-center max-h-max">
          It seems you are currently not part of any HR team. Don’t worry,
          please contact your HR department to add you in team!
        </p>
      </div>
    </div>
  );
};

export default ContactHR;
