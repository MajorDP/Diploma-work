import { supabase } from "../../../../_services/supabase";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;

  try {
    let { data: platform, error } = await supabase
      .from("platforms")
      .select("*")
      .eq("platformId", id)
      .single();

    if (error) {
      return NextResponse.json(
        {
          platform: null,
          error: {
            message: "Could not get platform, please try again later.",
          },
        },
        { status: 400 }
      );
    }
    return NextResponse.json({ platform, error: null });
  } catch (error) {
    return NextResponse.json(
      {
        platform: null,
        error: { message: "Somethin went wrong, please try again later." },
      },
      { status: 500 }
    );
  }
}
