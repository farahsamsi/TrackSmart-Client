import { useForm } from "react-hook-form";

import SectionTitle from "../../SharedComponents/SectionTitle";
import { FaMoneyBill, FaUser } from "react-icons/fa";
import { useState } from "react";
import Payment from "../Payment/Payment";

const JoinAsHR = () => {
  const {
    register,
    // reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [hrInfo, setHrInfo] = useState(null);

  // TODO : disable input fields when payment page is opened

  const onSubmit = (data) => {
    console.log(data.package);
    let price = 0;

    if (data.package === "starter") {
      price = 5;
    } else if (data.package === "premium") {
      price = 8;
    } else {
      price = 15;
    }
    const HRInfo = { ...data, price };

    console.log(HRInfo);
    setHrInfo(HRInfo);
  };
  return (
    <div className="pb-9">
      <SectionTitle
        heading="Make Your HR account"
        subHeading="Select your package and proceed to payment for successful activation"
      ></SectionTitle>
      <div className="w-11/12 mx-auto">
        <div className="">
          <div className="card bg-base-100 w-full  shrink-0 shadow-2xl">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card-body w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Full Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    {...register("HRname", { required: true })}
                    placeholder="enter your full name"
                    className="input input-bordered"
                  />
                  {errors.HRname && (
                    <span className="text-red-700">Please enter your name</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Company Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    {...register("companyName", { required: true })}
                    placeholder="enter your company name"
                    className="input input-bordered"
                  />
                  {errors.companyName && (
                    <span className="text-red-700">
                      Please enter your company name
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="enter your email"
                    className="input input-bordered"
                  />
                  {errors.email && (
                    <span className="text-red-700">
                      Please enter your email
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    {...register("password", { required: true })}
                    type="password"
                    name="password"
                    placeholder="password"
                    className="input input-bordered"
                  />
                  {errors.password && (
                    <span className="text-red-700">
                      Please enter your password
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Date of Birth</span>
                  </label>
                  <input
                    type="date"
                    {...register("dateOfBirth")}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Company Logo</span>
                  </label>
                  <input
                    {...register("companyLogo", { required: true })}
                    type="text"
                    placeholder="companyLogo"
                    className="input input-bordered"
                  />
                  {errors.companyLogo && (
                    <span className="text-red-700">
                      Please enter your companyLogo
                    </span>
                  )}
                </div>
              </div>
              <div className="divider"></div>

              <div>
                <h1 className="text-2xl font-semibold text-center mb-5">
                  Please Select your package
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="form-control card border p-4 bg-purple-100">
                    <label className="label cursor-pointer">
                      <span className="label-text">
                        <div className="flex items-center gap-2">
                          <h3 className="text-2xl font-bold text-gray-800">
                            Starter
                          </h3>
                        </div>
                        <div className="mt-4 space-y-2">
                          <p className="flex items-center gap-2 badge h-auto bg-green-100 ">
                            <FaMoneyBill /> Price: $5
                          </p>
                          <p className="flex items-center gap-2 badge h-auto bg-orange-200">
                            <FaUser /> Maximum Employees: 5
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
                            Premium
                          </h3>
                        </div>
                        <div className="mt-4 space-y-2">
                          <p className="flex items-center gap-2 badge h-auto bg-green-100 ">
                            <FaMoneyBill /> Price: $8
                          </p>
                          <p className="flex items-center gap-2 badge h-auto  bg-orange-200">
                            <FaUser /> Maximum Employees: 10
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
                            Elite
                          </h3>
                        </div>
                        <div className="mt-4 space-y-2">
                          <p className="flex items-center gap-2 badge h-auto bg-green-100 ">
                            <FaMoneyBill /> Price: $15
                          </p>
                          <p className="flex items-center gap-2 badge h-auto  bg-orange-200">
                            <FaUser /> Maximum Employees: 20
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
                  <p className="text-red-700 text-center">
                    Please Select a package
                  </p>
                )}
              </div>

              <div className="form-control mt-6">
                {/* <Link to="/payment"> */}
                <button type="submit" className="btn btn-primary">
                  Pay Now
                </button>
                {/* </Link> */}
              </div>
            </form>
          </div>

          {/* payment component */}
          {hrInfo && <Payment hrInfo={hrInfo}></Payment>}
        </div>
      </div>
    </div>
  );
};

export default JoinAsHR;
