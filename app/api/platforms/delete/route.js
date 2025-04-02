import { authorizeAdmin } from "../../../_services/session";
import { supabase } from "../../../_services/supabase";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  await authorizeAdmin(req.cookies);

  try {
    const { id } = await req.json();

    const { error } = await supabase.from("platforms").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ error: null });
  } catch (error) {
    return NextResponse.json(
      { error: { message: "Something went wrong." } },
      { status: 500 }
    );
  }
}
