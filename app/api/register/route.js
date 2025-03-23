import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { supabase } from "@/app/_services/supabase";

export async function POST(req) {
  try {
    const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const { fullName, email, password, repeatPassword } = await req.json();

    if (!fullName || !email || !password || !repeatPassword) {
      return NextResponse.json(
        { message: "Please fill all fields." },
        { status: 400 }
      );
    }

    if (!emailRegexp.test(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email" },
        { status: 400 }
      );
    }

    if (password !== repeatPassword) {
      return NextResponse.json(
        { message: "Passwords do not match." },
        { status: 400 }
      );
    }

    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          fullName: fullName,
        },
      },
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
