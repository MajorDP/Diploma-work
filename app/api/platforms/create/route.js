import { authorizeAdmin } from "../../../_services/session";
import { supabase } from "../../../_services/supabase";
import { NextResponse } from "next/server";

export async function POST(req) {
  await authorizeAdmin(req.cookies);

  try {
    const platform = await req.json();

    platform.platformId = platform.name.replaceAll(" ", "").toLowerCase();

    const { data, error } = await supabase
      .from("platforms")
      .insert(platform)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { platform: null, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ platform: data, error: null });
  } catch (error) {
    return NextResponse.json(
      {
        platform: null,
        error: "Something went wrong, please try again.",
      },
      { status: 500 }
    );
  }
}
