import { MdAssignmentReturned } from "react-icons/md";
import SectionTitle from "../../../SharedComponents/SectionTitle";
import assetImg from "../../../assets/Home page images/assetType.png";
import { HiCog } from "react-icons/hi";

const AssetCategories = () => {
  return (
    <section className="pb-12">
      <SectionTitle
        heading="Asset Categories"
        subHeading="Efficient asset management starts with proper categorization. TrackSmart divides company assets into two main categories to streamline allocation and tracking"
      ></SectionTitle>
      <div className="px-1">
        <div className="card card-side bg-base-100 shadow-xl grid grid-cols-1 lg:grid-cols-2">
          <figure>
            <img src={assetImg} alt="Movie" />
          </figure>
          <div className="card-body">
            <div>
              <h2 className="card-title">
                <MdAssignmentReturned /> Returnable Assets
              </h2>
              <p>
                These assets are assigned to employees temporarily and must be
                returned after use. Examples include:
                <ul className="list-disc ml-6">
                  <li>Laptops & Monitors</li>
                  <li>Office Desks & Chairs</li>
                  <li>Projectors & Meeting Equipment</li>
                </ul>
              </p>
            </div>
            <div className="divider"></div>
            <div>
              <h2 className="card-title">
                <HiCog /> Non-Returnable Assets
              </h2>
              <p>
                These are consumable items that do not require returns. Examples
                include:
                <ul className="list-disc ml-6">
                  <li>Notebooks & Stationery</li>
                  <li>Office Supplies</li>
                  <li>Employee Welcome Kits</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssetCategories;
