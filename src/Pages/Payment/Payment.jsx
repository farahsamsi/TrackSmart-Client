import { loadStripe } from "@stripe/stripe-js";
import PropTypes from "prop-types";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_payment_gateway_pk);

const Payment = ({ hrInfo }) => {
  return (
    <div className="mt-9 w-10/12 mx-auto">
      <div className="divider"></div>
      <h1 className="text-xl text-center mb-5">
        Hey {hrInfo.HRname}, PLease fill out the following fields for payment{" "}
      </h1>

      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm hrInfo={hrInfo}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

Payment.propTypes = {
  hrInfo: PropTypes.object,
};

export default Payment;
