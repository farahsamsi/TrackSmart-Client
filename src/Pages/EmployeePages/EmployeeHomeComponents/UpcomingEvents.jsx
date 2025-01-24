import { FaCalendar, FaClock, FaMap } from "react-icons/fa";
import SectionTitle from "../../../SharedComponents/SectionTitle";
import meeting from "../../../assets/Home page images/contactHR.png";
import meetingImg from "../../../assets/Home page images/team.png";

const UpcomingEvents = () => {
  const events = [
    {
      id: 1,
      title: "Monthly Team Meeting",
      date: "2025-01-30",
      time: "10:00 AM",
      location: "Conference Room A",
      image: meeting,
    },
    {
      id: 2,
      title: "HR Policy Update Session",
      date: "2025-01-28",
      time: "3:00 PM",
      location: "Online (Zoom)",
      image: meetingImg,
    },
  ];

  return (
    <div className="py-9 w-11/12 mx-auto">
      <SectionTitle
        heading="Upcoming Events"
        subHeading="Stay updated with the latest events and meetings happening this month"
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="card card-compact bg-base-100  shadow-xl"
          >
            <figure>
              <img src={event.image} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{event.title}</h2>

              <div className="card-actions justify-end">
                <p className="flex items-center gap-2">
                  <FaCalendar /> Date: {event.date}
                </p>
                <p className="flex items-center gap-2">
                  <FaClock /> Time: {event.time}
                </p>
                <p className="flex items-center gap-2">
                  <FaMap /> Location: {event.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
