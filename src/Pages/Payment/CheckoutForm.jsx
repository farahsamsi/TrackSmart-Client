import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import payImg from "../../assets/Social Images/payment.png";
import PropTypes from "prop-types";

const CheckoutForm = ({ hrInfo }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const axiosPublic = useAxiosPublic();
  const { price } = hrInfo;

  useEffect(() => {
    axiosPublic.post("/create-payment-intent", { price }).then((res) => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosPublic, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    //   confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: hrInfo?.email || "anonymous",
            name: hrInfo?.HRname || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error", confirmError);
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);
        //   TODO: send transaction id with other 1. hr infos and create hr user in firebase, 2.confirmation button 3.
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <img src={payImg} alt="" />
        </div>
        <div className=" flex flex-col justify-center">
          <div>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    fontSmoothing: "antialiased",

                    border: "5px solid #000000",
                    borderRadius: "4px",
                    padding: "10px 12px",

                    "::placeholder": {
                      color: "#aab7c4", // Matches the placeholder text styling
                    },
                  },
                  invalid: {
                    color: "#9e2146", // Ensures the error state matches the color shown in your image
                    iconColor: "#9e2146",
                  },
                },
              }}
            />
          </div>
          <p className="text-red-600 my-4">{error}</p>
          <button
            className="btn btn-primary inline-flex my-5 w-full "
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </form>
  );
};

CheckoutForm.propTypes = {
  hrInfo: PropTypes.object,
};

export default CheckoutForm;
