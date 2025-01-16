import { FaLink, FaUpload, FaUserEdit } from "react-icons/fa";
import SectionTitle from "../../../SharedComponents/SectionTitle";

const About = () => {
  return (
    <section className="pb-12">
      <SectionTitle
        heading="Manage Your Assets with TrackSmart"
        subHeading="Discover how we make it easy to manage, upload, and share files seamlessly, ensuring security and efficiency every step of the way."
      ></SectionTitle>
      <div>
        <div>
          <div className="container mx-auto text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8 px-2">
              {/* Feature 1 */}
              <div className="flex flex-col items-center bg-slate-50 p-5 rounded-md border">
                <div className="w-16 h-16 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full">
                  <FaUserEdit size={32} />
                </div>
                <h3 className="text-xl font-semibold mt-4">
                  Create an account
                </h3>
                <p className="mt-2 text-gray-600">
                  Quickly sign up to join our secure asset-sharing platform.
                  Gain access to tools that make managing and sharing your
                  assets simple and hassle-free
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center bg-slate-50 p-5 rounded-md border">
                <div className="w-16 h-16 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
                  <FaUpload size={32} />
                </div>
                <h3 className="text-xl font-semibold mt-4">
                  Upload your assets
                </h3>
                <p className="mt-2 text-gray-600">
                  Upload assets of any type using our fast and seamless
                  drag-and-drop feature. With robust security measures, your
                  data is always protected and accessible.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center bg-slate-50 p-5 rounded-md border">
                <div className="w-16 h-16 flex items-center justify-center bg-green-100 text-green-600 rounded-full">
                  <FaLink size={32} />
                </div>
                <h3 className="text-xl font-semibold mt-4">Access Inventory</h3>
                <p className="mt-2 text-gray-600">
                  Easily access and manage your inventory assets from anywhere,
                  anytime. Our platform allows you to update, organize, and
                  monitor your inventory in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
