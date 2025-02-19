import { FaMoneyBill, FaUser } from "react-icons/fa";
import SectionTitle from "../../../SharedComponents/SectionTitle";

const Packages = () => {
  return (
    <section className="pb-12">
      <SectionTitle
        heading="Choose the Perfect Package"
        subHeading="Explore our tailored plans designed to meet your inventory management needs. Flexible, affordable, and feature-packed options for every business size!"
      ></SectionTitle>

      <div className="space-y-4 px-2">
        {/* Starter */}
        <div className="grid grid-cols-1 md:grid-cols-2  items-center justify-between p-6  rounded-lg shadow-md w-full lg:w-2/3 mx-auto">
          {/* Left Section */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold text-gray-800">Starter</h3>
            </div>
            <p className="mt-2 text-gray-600">
              Start managing your inventory effortlessly at no cost. Perfect for
              individuals or small businesses exploring efficient inventory
              solutions.
            </p>

            <div className="mt-4 space-y-2">
              <p className="flex items-center gap-2 badge bg-green-100 ">
                <FaMoneyBill /> Price: $5
              </p>
              <p className="flex items-center gap-2 badge  bg-orange-200">
                <FaUser /> Maximum Employees: 5
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col items-center mt-6 lg:mt-0 lg:ml-6  bg-slate-100 rounded p-4 h-full">
            <div className="text-center">
              <p className="text-gray-500">Enjoy basic features.</p>
              <p className="text-3xl font-extrabold text-gray-800">$ 5</p>
            </div>
            {/* <button className="mt-4 btn btn-outline text-lg font-medium rounded-md transition">
              Select Package →
            </button> */}
            <p className="mt-2 text-sm text-gray-500">
              Invoices and receipts available
            </p>
          </div>
        </div>
        {/* Premium */}
        <div className="grid grid-cols-1 md:grid-cols-2  items-center justify-between p-6  rounded-lg shadow-md w-full lg:w-2/3 mx-auto">
          {/* Left Section */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold text-gray-800">Premium</h3>
            </div>
            <p className="mt-2 text-gray-600">
              Medium-sized teams aiming for better collaboration and enhanced
              inventory control with premium features.
            </p>

            <div className="mt-4 space-y-2">
              <p className="flex items-center gap-2 badge bg-green-100 ">
                <FaMoneyBill /> Price: $8
              </p>
              <p className="flex items-center gap-2 badge  bg-orange-200">
                <FaUser /> Maximum Employees: 10
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col items-center mt-6 lg:mt-0 lg:ml-6  bg-slate-100 rounded p-4 h-full">
            <div className="text-center">
              <p className="text-gray-500">Enjoy Premium features.</p>
              <p className="text-3xl font-extrabold text-gray-800">$ 8</p>
            </div>
            {/* <button className="mt-4 btn btn-outline text-lg font-medium rounded-md transition">
              Select Package →
            </button> */}
            <p className="mt-2 text-sm text-gray-500">
              Invoices and receipts available
            </p>
          </div>
        </div>

        {/* Elite */}
        <div className="grid grid-cols-1 md:grid-cols-2  items-center justify-between p-6  rounded-lg shadow-md w-full lg:w-2/3 mx-auto">
          {/* Left Section */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold text-gray-800">Elite</h3>
            </div>
            <p className="mt-2 text-gray-600">
              Larger teams or businesses requiring advanced inventory solutions,
              robust data insights, and premium customer support.
            </p>

            <div className="mt-4 space-y-2">
              <p className="flex items-center gap-2 badge bg-green-100 ">
                <FaMoneyBill /> Price: $15
              </p>
              <p className="flex items-center gap-2 badge  bg-orange-200">
                <FaUser /> Maximum Employees: 20
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col items-center mt-6 lg:mt-0 lg:ml-6  bg-slate-100 rounded p-4 h-full">
            <div className="text-center">
              <p className="text-gray-500">Enjoy Elite features.</p>
              <p className="text-3xl font-extrabold text-gray-800">$ 15</p>
            </div>
            {/* <button className="mt-4 btn btn-outline text-lg font-medium rounded-md transition">
              Select Package →
            </button> */}
            <p className="mt-2 text-sm text-gray-500">
              Invoices and receipts available
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;
