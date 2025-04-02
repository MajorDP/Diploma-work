import { redirect } from "next/navigation";
import Error from "../_components/Error";
import { PlatformCard } from "../_components/PlatformCard";
import { getRecommendation } from "../_services/platforms";
import { getSession } from "../_services/session";

const Page = async () => {
  const session = await getSession();
  const { recommendation, error } = await getRecommendation(session.id);

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
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Your Recommendations
        </h2>
        <p className="text-gray-600">
          Based on your answers, these platforms are the best match for your
          needs
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-center gap-8 m-auto">
        {recommendation.recommendation.map((rec) => (
          <PlatformCard key={rec.id} platform={rec} />
        ))}
      </div>
    </div>
  );
};

export default Page;
