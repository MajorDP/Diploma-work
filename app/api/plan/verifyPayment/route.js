import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../_services/supabase";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function PATCH(req) {
  const { payment_intent, uid } = await req.json();

  if (!payment_intent) {
    return NextResponse.json(
      { success: false, message: "Missing payment intent" },
      { status: 400 }
    );
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);

    if (paymentIntent.status === "succeeded") {
      const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
        uid,
        {
          user_metadata: {
            plan: { name: "basic" },
          },
        }
      );

      if (error) {
        return NextResponse.json(
          { success: false, message: "Could not successfully update plan." },
          { status: 400 }
        );
      }

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, message: "Payment not successful" },
        { status: 400 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Error verifying payment" },
      { status: 500 }
    );
  }
}
