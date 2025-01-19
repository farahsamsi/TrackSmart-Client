import { useForm } from "react-hook-form";
import SectionTitle from "../../SharedComponents/SectionTitle";
import { FaMoneyBill } from "react-icons/fa6";

const IncreaseLimit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // e.preventDefault();
    let price = 0;
    let teamLimit = 0;
    if (data.package === "starter") {
      price = 5;
      teamLimit = 5;
    } else if (data.package === "premium") {
      price = 8;
      teamLimit = 10;
    } else {
      price = 15;
      teamLimit = 20;
    }

    console.log({ price, teamLimit });
    //   TODO : add payment
  };

  return (
    <div className="pb-9 w-11/12 mx-auto">
      <SectionTitle heading="Upgrade to increase your team limit "></SectionTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-2xl font-semibold text-center mb-5">
          Please Select your Upgrade Plan
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="form-control card border p-4 bg-purple-100">
            <label className="label cursor-pointer">
              <span className="label-text">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-gray-800">
                    Add 5 members for $5
                  </h3>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="flex items-center gap-2 badge h-auto bg-green-100 ">
                    <FaMoneyBill /> Price: $5
                  </p>
                </div>
              </span>
              <input
                type="radio"
                id="starter"
                {...register("package", { required: true })}
                value="starter"
                className="checkbox"
              />
            </label>
          </div>
          <div className="form-control card border p-4 bg-blue-100">
            <label className="label cursor-pointer">
              <span className="label-text">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {" "}
                    Add 10 members for $8
                  </h3>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="flex items-center gap-2 badge h-auto bg-green-100 ">
                    <FaMoneyBill /> Price: $8
                  </p>
                </div>
              </span>
              <input
                type="radio"
                id="premium"
                {...register("package", { required: true })}
                value="premium"
                className="checkbox"
              />
            </label>
          </div>
          <div className="form-control card border p-4 bg-amber-100">
            <label className="label cursor-pointer">
              <span className="label-text">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {" "}
                    Add 20 members for $10
                  </h3>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="flex items-center gap-2 badge h-auto bg-green-100 ">
                    <FaMoneyBill /> Price: $15
                  </p>
                </div>
              </span>
              <input
                type="radio"
                id="elite"
                {...register("package", { required: true })}
                value="elite"
                className="checkbox"
              />
            </label>
          </div>
        </div>
        {errors.package && (
          <p className="text-red-700 text-center">Please Select a package</p>
        )}
        <div type="submit" className=" flex justify-end">
          <button className="btn btn-primary my-5">Proceed to pay</button>
        </div>
      </form>
    </div>
  );
};

export default IncreaseLimit;
