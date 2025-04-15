import { Quiz } from "../_components/Quiz";
import { redirect } from "next/navigation";
import { handleRecommendation } from "../_services/platforms";
import { getSession } from "../_services/session";

export const metadata = {
  title: {
    default: "Take the quiz",
    template: "%s | PlatRex",
  },
  description:
    "Take this short quiz to find the best online shopping platform for your needs.",
  keywords: [
    "ecommerce",
    "online",
    "shopping",
    "store",
    "dropshipping",
    "SaaS",
    "Shopify",
    "WooCommerce",
  ],
  openGraph: {
    title: "Take The Quiz - E-commerce Platform Recommendations",
    description:
      "Take this short quiz to find the best online shopping platform for your needs.",
    url: "https://diploma-work-showcase.vercel.app/quiz",
    siteName: "PlatRex",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
