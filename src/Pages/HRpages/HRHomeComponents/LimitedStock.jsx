import { useState } from "react";
import useAssets from "../../../Hooks/useAssets";
import SectionTitle from "../../../SharedComponents/SectionTitle";
import { Link } from "react-router-dom";

const LimitedStock = () => {
  const [sort] = useState(false);
  const [search] = useState("");
  const [filter] = useState("");
  const [isAvailable] = useState(false);
  const stockLimited = true;
  const [assets] = useAssets(sort, search, filter, isAvailable, stockLimited);

  return (
    <div className="bg-yellow-100 my-9">
      <section className="py-9">
        <SectionTitle
          heading="Limited Stock"
          subHeading="Keep track of assets running low to ensure timely restocking and uninterrupted resource availability."
        ></SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-11/12 mx-auto">
          {assets &&
            assets?.map((asset) => (
              <>
                <Link to="/allAsset" className="md:w-3/4 mx-auto">
                  <div
                    key={asset?._id}
                    className="indicator  mx-auto hover:scale-105 transition ease-in-out"
                  >
                    <span
                      className={`indicator-item badge ${
                        asset?.assetQuantity > 5
                          ? "badge-secondary"
                          : "badge-error"
                      }  `}
                    ></span>
                    <div className="bg-white grid h-36 p-4  w-full rounded-xl place-items-center">
                      <h1 className="card-title">{asset?.assetName}</h1>
                      <p>
                        <span
                          className={`badge h-auto ${
                            asset?.assetType == "returnable"
                              ? "bg-green-200"
                              : "bg-purple-200"
                          }`}
                        >
                          {asset?.assetType}
                        </span>
                      </p>
                      <p>
                        Quantity:{" "}
                        <span
                          className={` badge px-4 ${
                            asset?.assetQuantity > 5
                              ? "badge-secondary"
                              : "badge-error"
                          }  `}
                        >
                          {asset?.assetQuantity}{" "}
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              </>
            ))}
        </div>
      </section>
    </div>
  );
};

export default LimitedStock;
