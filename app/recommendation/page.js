import { redirect } from "next/navigation";
import Error from "../_components/Error";
import { PlatformCard } from "../_components/PlatformCard";
import { getRecommendation } from "../_services/platforms";
import { getSession } from "../_services/session";

const Page = async () => {
  const session = await getSession();
  const { recommendation, error } = await getRecommendation(session.id);

  console.log(recommendation.recommendation[0].easeOfUse);
  if (error) {
    return (
      <div className="h-screen text-center pt-10">
        <Error message={error.message} />
      </div>
    );
  }

  if (!recommendation) {
    redirect("/quiz");
  }

  return (
    <div className="mb-12 flex flex-col gap-10">
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your Recommendations
          </h2>
          <p className="text-gray-600">
            Based on your answers, these platforms are the best match for your
            needs
          </p>
        </div>
        <div className="grid grid-cols-1 md:flex md:justify-center gap-8 m-auto">
          {recommendation.recommendation.map((rec) => (
            <PlatformCard key={rec.id} platform={rec} />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Because you answered
        </h2>

        <div className="rounded-lg p-6 bg-white shadow-sm hover:shadow-lg duration-200 text-gray-800 text-sm md:text-base space-y-3">
          <ul className="list-disc list-inside space-y-6">
            {recommendation.answers.maxBudget && (
              <li>
                You&apos;re working with a budget of{" "}
                <strong>${recommendation.answers.maxBudget}</strong> or less.
                {recommendation.recommendation.map(
                  (rec) =>
                    rec.subsFees.length > 0 && (
                      <div key={rec.id} className="ml-6 text-sm">
                        -{rec.name} has a starting fee of $
                        {rec.subsFees[0].price}.
                      </div>
                    )
                )}
              </li>
            )}
            {recommendation.answers.preferredPaymentGateways?.length > 0 && (
              <li>
                You prefer to use{" "}
                <strong>
                  {recommendation.answers.preferredPaymentGateways.join(", ")}
                </strong>{" "}
                as your payment gateway.
              </li>
            )}
            {recommendation.answers.maxTransactionFee && (
              <li>
                You want to keep transaction fees under{" "}
                <strong>{recommendation.answers.maxTransactionFee}%</strong>.
              </li>
            )}
            {recommendation.answers.needsWebsiteBuilder && (
              <li>
                You need a platform that includes a{" "}
                <strong>website builder</strong>.
                {recommendation.recommendation.map(
                  (rec) =>
                    rec.websiteBuildersAndCms.length > 0 && (
                      <div key={rec.id} className="ml-6 text-sm">
                        -{rec.name} has a an integrated website builder
                      </div>
                    )
                )}
              </li>
            )}
            {recommendation.answers.needsDropshipping && (
              <li>
                You need <strong>dropshipping features</strong> built into the
                platform.
                {recommendation.recommendation.map(
                  (rec) =>
                    rec.dropshippingSupport && (
                      <div key={rec.id} className="ml-6 text-sm">
                        -{rec.name} supports dropshipping.
                      </div>
                    )
                )}
              </li>
            )}
            {recommendation.answers.preferredSupportType?.includes(
              "24/7 Support"
            ) && (
              <li>
                You value having access to{" "}
                <strong>
                  {recommendation.answers.preferredSupportType.join(", ")}.
                </strong>
              </li>
            )}
            {recommendation.answers.seoPreference && (
              <li>
                You want help with{" "}
                <strong>
                  {recommendation.answers.seoPreference === "both"
                    ? "on-site and off-site SEO"
                    : `${recommendation.answers.seoPreference} SEO`}
                </strong>
                .
              </li>
            )}
            {recommendation.answers.technicalExpertise && (
              <li>
                You prefer a platform that is{" "}
                <strong>{recommendation.answers.technicalExpertise}</strong> to
                use.
                {recommendation.recommendation.map(
                  (rec) =>
                    rec.easeOfUse.difficulty ===
                      recommendation.answers.technicalExpertise && (
                      <div key={rec.id} className="ml-6 text-sm">
                        {rec.easeOfUse.notes
                          ? rec.easeOfUse.notes
                          : `-${rec.name} would be a good fit for your needs.`}
                      </div>
                    )
                )}
              </li>
            )}
            {recommendation.answers.advertisingPlatforms?.length > 0 && (
              <li>
                You plan to advertise on{" "}
                <strong>
                  {recommendation.answers.advertisingPlatforms.join(", ")}
                </strong>
                .
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
