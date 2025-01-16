import PropTypes from "prop-types";

const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="md:w-6/12 mx-auto text-center px-3 mb-5 md:mb-9">
      <p className="text-xl md:text-3xl">{heading}</p>
      <p className="mt-2">{subHeading}</p>
    </div>
  );
};

SectionTitle.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
};
export default SectionTitle;
