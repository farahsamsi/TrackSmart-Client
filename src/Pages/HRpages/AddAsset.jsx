import { Helmet } from "react-helmet-async";
import SectionTitle from "../../SharedComponents/SectionTitle";
import { useForm } from "react-hook-form";
import addImg from "../../assets/Social Images/addAsset.png";
import { FaFile } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useUser from "../../Hooks/useUser";
import Swal from "sweetalert2";
import useAssets from "../../Hooks/useAssets";

const AddAsset = () => {
  const [, refetch] = useAssets();
  const axiosSecure = useAxiosSecure();
  const [currentUser] = useUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const today = new Date();
    const addedBy = currentUser?.email;
    const assetCompany = currentUser?.company;
    const addedDate = today;
    const assetQuantity = parseInt(data.assetQuantity);
    const assetType = data.assetType;
    const assetName = data.assetName;

    const assetData = {
      assetType,
      assetName,
      assetQuantity,
      assetCompany,
      addedBy,
      addedDate,
    };

    const res = await axiosSecure.post("/addAsset", assetData);

    if (res.data.insertedId) {
      reset();
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Asset has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <section className="pb-9 w-11/12 mx-auto">
      <Helmet>
        <title>Add Asset | TrackSmart</title>
      </Helmet>
      <SectionTitle
        heading="Add Asset"
        subHeading="Effortlessly track and manage your company assets by adding them to the system."
      ></SectionTitle>
      <div className="hero">
        <div className="hero-content grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="text-center lg:text-left">
            <img src={addImg} alt="" />
          </div>
          <div className="card bg-base-100 w-full  shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Asset Name</span>
                </label>
                <input
                  {...register("assetName", { required: true })}
                  type="text"
                  placeholder="Enter asset name"
                  className="input input-bordered"
                />
                {errors.assetName && (
                  <span className="text-red-700">
                    Please enter your asset name
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Quantity</span>
                </label>
                <input
                  {...register("assetQuantity", { required: true })}
                  type="number"
                  placeholder="Enter quantity"
                  className="input input-bordered"
                />
                {errors.assetQuantity?.type === "required" && (
                  <span className="text-red-700">Please enter password</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Select Asset Type</span>
                </label>
                <select
                  {...register("assetType")}
                  required
                  defaultValue="default"
                  className="select select-bordered w-full"
                >
                  <option disabled value="default">
                    Select a type
                  </option>
                  <option value="returnable">Returnable</option>
                  <option value="non-returnable">Non-Returnable</option>
                </select>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-success text-white">
                  <FaFile />
                  Add Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddAsset;
