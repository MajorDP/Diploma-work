import { Quiz } from "../_components/Quiz";
import { redirect } from "next/navigation";
import { handleRecommendation } from "../_services/platforms";
import { getSession } from "../_services/session";

const Page = () => {
  const handleQuizComplete = async (answers) => {
    "use server";

    const session = await getSession();
    const { recommendationId, error } = await handleRecommendation(
      answers,
      session
    );

    redirect(`/recommendation`);
  };
  return (
    <div className="min-h-screen py-12  min-w-[30rem] sm:w-auto">
      <Quiz onComplete={handleQuizComplete} />;
    </div>
  );
};

export default Page;
