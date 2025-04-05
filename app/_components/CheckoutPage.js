"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import Spinner from "../_components/Spinner";
import { convertToSubcurrency } from "../_services/helpers";
import { useEffect, useState } from "react";
import { handlePaymentIntent } from "../_services/payment";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://diploma-work-showcase.vercel.app/"
    : "http://localhost:3000";

const CheckoutPage = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState(null);
  const [isLoading, setIsLoading] = useState("");

  useEffect(() => {
    async function getIntent() {
      const data = await handlePaymentIntent(amount);
      setClientSecret(data.clientSecret);
    }
    getIntent();
  }, [amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setError(submitError.message);
      setIsLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: baseUrl + `/payment-success?amount=${amount}`,
      },
    });

    if (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return <Spinner />;
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      {clientSecret && <PaymentElement />}
      {error && (
        <p className="text-center pt-10 text-red-400 font-semibold">{error}</p>
      )}
      <button
        className="w-full h-14 text-center flex items-center justify-center px-2 py-1 mt-4 rounded-md hover:scale-105 hover:bg-green-500 duration-200 cursor-pointer hover:text-white text-xl bg-green-400 disabled:text-black disabled:bg-gray-400 disabled:hover:cursor-default disabled:hover:scale-100"
        disabled={!stripe || isLoading}
      >
        {isLoading ? "Processing..." : `Pay $${amount}`}
      </button>
    </form>
  );
};

export default CheckoutPage;
