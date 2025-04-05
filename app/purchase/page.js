"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "../_components/CheckoutPage";
import { convertToSubcurrency } from "../_services/helpers";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NO PUBLIC KEY");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
const Page = () => {
  const amount = 4.99;
  return (
    <div className="min-h-screen w-full">
      <div className="w-fit m-auto pt-10 bg-gray-100">
        <h1 className="text-4xl">Basic Plan</h1>
        <p className="text-2xl text-center pt-2 mb-5">${amount}</p>
      </div>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount), //In cents
          currency: "usd",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    </div>
  );
};

export default Page;
