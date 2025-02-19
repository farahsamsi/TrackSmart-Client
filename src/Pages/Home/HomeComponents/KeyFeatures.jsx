import SectionTitle from "../../../SharedComponents/SectionTitle";
import userImg from "../../../assets/Home page images/contactHR.png";
import trackingImg from "../../../assets/Home page images/return.png";
import secureImg from "../../../assets/Home page images/team.png";

const KeyFeatures = () => {
  return (
    <section className="pb-12">
      <SectionTitle
        heading=" Key Features of TrackSmart"
        subHeading="Efficiently manage and track your company’s assets with powerful tools designed for HR managers and employees. Stay organized, enhance productivity, and ensure seamless asset utilization."
      ></SectionTitle>

      <div>
        <div>
          <div className="container mx-auto text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8 px-2">
              {/* Feature 1 */}
              <div className="card bg-base-100 w-full shadow-xl">
                <figure>
                  <img src={userImg} alt="User" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Role-based Access</h2>
                  <p>
                    Grant HR managers and employees the right tools with secure,
                    role-specific permissions.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="card bg-base-100 w-full shadow-xl">
                <figure>
                  <img src={trackingImg} alt="User" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    Asset Tracking & Categorization
                  </h2>
                  <p>
                    Easily classify assets as returnable or non-returnable and
                    track them in real time.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="card bg-base-100 w-full shadow-xl">
                <figure>
                  <img src={secureImg} alt="User" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Secure Authentication</h2>
                  <p>
                    Protect your system with email/password login, Google
                    authentication, and JWT security.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
