import { Quiz } from "../_components/Quiz";
import { redirect } from "next/navigation";
import { getRecommendation } from "../_services/platforms";

const Page = () => {
  const handleQuizComplete = async (answers) => {
    "use server";

    const recommendation = await getRecommendation(answers);

    redirect(`/recommendation/${recommendation[0]?.platformId}`);
  };
  return (
    <div className="min-h-screen py-12  min-w-[30rem] sm:w-auto">
      <Quiz onComplete={handleQuizComplete} />;
    </div>
  );
};

export default Page;
