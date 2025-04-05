import { convertToSubcurrency } from "./helpers";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://diploma-work-showcase.vercel.app/"
    : "http://localhost:3000";

export async function handlePaymentIntent(amount) {
  const res = await fetch(baseUrl + "/api/create-payment-intent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
  });

  const data = await res.json();

  return data;
}
