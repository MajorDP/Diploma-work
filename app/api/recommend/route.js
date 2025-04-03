import { NextResponse } from "next/server";
import { supabase } from "../../_services/supabase";
import { filterPlatforms } from "../../_services/platforms";

export async function POST(req) {
  const { answers, user } = await req.json();

  try {
    let { data: platforms, error } = await supabase
      .from("platforms")
      .select("*");

    if (error) {
      return NextResponse.json(
        {
          recommendationId: null,
          error: {
            message: "Could not get platforms, please try again later.",
          },
        },
        { status: 400 }
      );
    }

    const filteredPlatforms = filterPlatforms(answers, platforms);

    //if User had paid, we must check if they already have a recommendation, if they do, it will be updated, if not, inserted
    let existingRecommendation = null;

    if (user.plan.name === "basic") {
      let { data, error: existingRecError } = await supabase
        .from("recommendations")
        .select("*")
        .eq("userId", user.id)
        .single();

      if (existingRecError && existingRecError.code !== "PGRST116") {
        return NextResponse.json(
          {
            recommendationId: null,
            error: { message: "Could not check for existing recommendations." },
          },
          { status: 400 }
        );
      }

      existingRecommendation = data;
    }

    //TODO: If User has paid, calculate (somehow) which platforms best fit for the user and why and add it to the object
    const recommendationObj = {
      userId: user.id,
      recommendation:
        user.plan.name === "basic" ? filteredPlatforms : [filteredPlatforms[0]],

      answers: answers,
    };

    const query = existingRecommendation
      ? supabase
          .from("recommendations")
          .update(recommendationObj)
          .eq("userId", user.id)
          .select()
          .single()
      : supabase
          .from("recommendations")
          .insert(recommendationObj)
          .select()
          .single();

    const { data, error: setRecError } = await query;

    if (setRecError) {
      return NextResponse.json(
        {
          recommendationId: null,
          error: {
            message: "Could not set recommendation, please try again later.",
          },
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      recommendationId: user.id,
      error: null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        recommendationId: null,
        error: {
          message: "Something went wrong, please try again later.",
        },
      },
      { status: 400 }
    );
  }
}
