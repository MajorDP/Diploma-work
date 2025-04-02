import { authorizeAdmin } from "../../../_services/session";
import { supabase } from "../../../_services/supabase";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  await authorizeAdmin(req.cookies);

  try {
    const { platform } = await req.json();

    const { data, error } = await supabase
      .from("platforms")
      .update(platform)
      .eq("id", platform.id)
      .select()
      .single();
    if (error) {
      return NextResponse.json({
        platform: null,
        error: { message: "Could not edit." },
      });
    }

    return NextResponse.json({
      platform: data,
      error: null,
    });
  } catch (error) {
    return NextResponse.json({
      platform: null,
      error: { message: "Something went wrong." },
    });
  }
}
