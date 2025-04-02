import { NextResponse } from "next/server";
import { supabase } from "../../../../_services/supabase";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    let { data: recommendation, error } = await supabase
      .from("recommendations")
      .select("*")
      .eq("userId", id);

    if (error) {
      return NextResponse.json(
        {
          recommendation: null,
          error: {
            message: "Could not get recommendation, please try again later.",
          },
        },
        { status: 400 }
      );
    }

    //TODO: If user has paid, return all recommendations instead of the first (get whole user inside this function, not just the id)
    return NextResponse.json({
      recommendation: recommendation[0],
      error: null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        recommendation: null,
        error: {
          message: "Something went wrong, please try again later.",
        },
      },
      { status: 500 }
    );
  }
}
