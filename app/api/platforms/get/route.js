import { supabase } from "@/app/_services/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    let { data: platforms, error } = await supabase
      .from("platforms")
      .select("*");

    if (error) {
      return NextResponse.json(
        {
          platforms: null,
          error: {
            message: "Could not get platforms, please try again later.",
          },
        },
        { status: 400 }
      );
    }
    return NextResponse.json({ platforms, error: null });
  } catch (error) {
    return NextResponse.json(
      {
        platforms: null,
        error: { message: "Somethin went wrong, please try again later." },
      },
      { status: 500 }
    );
  }
}
