import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import payImg from "../../assets/Social Images/payment.png";
import PropTypes from "prop-types";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ hrInfo }) => {
  const { createUser, updateUserProfile } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const axiosPublic = useAxiosPublic();
  const { price } = hrInfo;
  const navigate = useNavigate();

  useEffect(() => {
    axiosPublic.post("/create-payment-intent", { price }).then((res) => {
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
      //   console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm Payment !",
    }).then(async (result) => {
      if (result.isConfirmed) {
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
            setTransactionId(paymentIntent.id);
            //   TODO: send transaction id with other 1. hr infos and create hr user in firebase, 2.confirmation button 3.
            //   create user for firebase
            createUser(hrInfo.email, hrInfo.password)
              .then(() => {
                //  profile update
                updateUserProfile(hrInfo.HRname, hrInfo.companyLogo).then(
                  () => {
                    const userInfo = {
                      name: hrInfo.HRname,
                      email: hrInfo.email,
                      transactionId: paymentIntent.id,
                      role: "HR",
                      company: hrInfo.companyName,
                    };
                    // save user in DB
                    axiosPublic.post("/users", userInfo).then((res) => {
                      if (res.data.insertedId) {
                        navigate("/");
                        Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: "Welcome to TrackSmart",
                          showConfirmButton: false,
                          timer: 1500,
                        });
                        //   reset();
                      }
                    });
                  }
                );
              })
              .catch((err) => {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: `${err.message}`,
                });
              });
          }
        }
      }
    });

    //   confirm payment
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
