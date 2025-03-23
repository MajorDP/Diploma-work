import { Quiz } from "../_components/Quiz";
import { redirect } from "next/navigation";

const Page = () => {
  const handleQuizComplete = async (answers) => {
    "use server";
    //TODO: Get recommendation for user from backend and navigate to it
    console.log(answers);
    redirect("/recommendation/1");
  };
  return (
    <div className="min-h-screen py-12  min-w-[30rem] sm:w-auto">
      <Quiz onComplete={handleQuizComplete} />;
    </div>
  );
};

export default Page;
