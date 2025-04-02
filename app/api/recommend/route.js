import { NextResponse } from "next/server";
import { supabase } from "../../_services/supabase";

export async function POST(req) {
  const { answers, uid } = await req.json();

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

    const filteredByPrice = platforms.filter(
      (platform) =>
        platform.subsFees.length === 0 ||
        answers.maxBudget >= platform.subsFees[0].price
    );

    const filteredByTransactionFee = filteredByPrice.filter((platform) =>
      platform.transactionFees.some(
        (fee) => fee.fee.split("%")[0] <= answers.maxTransactionFee
      )
    );

    const filteredByDifficulty = filteredByTransactionFee.filter((platform) => {
      if (answers.technicalExpertise === "hard") return true;
      if (answers.technicalExpertise === "medium")
        return platform.easeOfUse.difficulty !== "hard";
      return platform.easeOfUse.difficulty === "easy";
    });

    const filteredByAdvertisement =
      answers.advertisingPlatforms.length === 0
        ? filteredByDifficulty
        : filteredByDifficulty.filter((platform) =>
            platform.crossPlatformAdvertising.some((adPlatform) =>
              answers.advertisingPlatforms.includes(adPlatform.appName)
            )
          );

    const filteredByDropshipping =
      answers.needsDropshipping === false
        ? filteredByAdvertisement
        : filteredByAdvertisement.filter(
            (platform) => platform.dropshippingSupport === true
          );

    const filteredByCMS =
      answers.needsWebsiteBuilder === false
        ? filteredByDropshipping
        : filteredByDropshipping.filter(
            (platform) => platform.websiteBuildersAndCms.length > 0
          );

    const filteredBySEO =
      answers.seoPreference === "both"
        ? filteredByCMS
        : filteredByCMS.filter((platform) =>
            platform.toolsSEO.some(
              (tool) => tool.type === answers.seoPreference
            )
          );

    const sortedPlatforms = filteredBySEO.sort((a, b) => {
      const aHasSupport = answers.preferredSupportType.some((type) =>
        a.userSupport.some((support) => support.type.includes(type))
      );
      const bHasSupport = answers.preferredSupportType.some((type) =>
        b.userSupport.some((support) => support.type.includes(type))
      );

      const aHasGateway = answers.preferredPaymentGateways.some((gateway) =>
        a.paymentGateways.some((gate) => gate.name === gateway)
      );
      const bHasGateway = answers.preferredPaymentGateways.some((gateway) =>
        b.paymentGateways.some((gate) => gate.name === gateway)
      );

      if (aHasGateway && !bHasGateway) return -1;
      if (!aHasGateway && bHasGateway) return 1;

      if (aHasSupport && !bHasSupport) return -1;
      if (!aHasSupport && bHasSupport) return 1;

      return 0;
    });

    //TODO: If User has paid, place all recommendations inside object (get whole user inside this function, not just the id)
    //TODO: If User has paid, calculate (somehow) which platforms best fit for the user and why and add it to the object
    const recommendationObj = {
      userId: uid,
      recommendation: [sortedPlatforms[0]],
      answers: answers,
    };

    const { data: recommendation, error: recommendationError } = await supabase
      .from("recommendations")
      .insert(recommendationObj);

    if (recommendationError) {
      return NextResponse.json(
        {
          recommendationId: null,
          error: {
            message: "Could not get recommendation, please try again later.",
          },
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      recommendationId: uid,
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
