import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { supabase } from "@/app/_services/supabase";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email.trim() || !password.trim()) {
      return NextResponse.json(
        { message: "Please fill all fields." },
        { status: 400 }
      );
    }

    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
}
