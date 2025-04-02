import Link from "next/link";
import { getSession } from "../_services/session";

const Page = async () => {
  const token = await getSession();

  return (
    <div className="bg-gray-50 py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Choose Your Plan</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Select the best plan for you and get started today. Whether
            you&apos;re looking for a simple start or unlimited access,
            we&apos;ve got you covered!
          </p>
        </div>

        <div className="flex flex-wrap-reverse sm:flex-row items-center justify-center gap-10">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-all hover:shadow-xl hover:scale-105">
            <h3 className="text-2xl font-semibold text-gray-900">Free Plan</h3>
            <p className="text-xl font-bold text-gray-900 mt-4">Free</p>
            <ul className="mt-6 text-left text-gray-600">
              <li className="mb-2">
                <span className="text-[#40a378]">✔</span> 1 Quiz
              </li>
              <li className="mb-2">
                <span className="text-[#40a378]">✔</span> 1 Recommendation Per
                Quiz
              </li>
            </ul>
            <Link
              href={token ? "/quiz" : "/login"}
              className={`mt-6 inline-block px-6 py-3 ${
                token
                  ? token.plan.name === "free"
                    ? "bg-green-600"
                    : "bg-gray-400"
                  : "bg-green-600"
              } text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200`}
            >
              Start for Free
            </Link>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 text-center border-2 border-green-600 transition-all hover:shadow-xl hover:scale-105">
            <h3 className="text-2xl font-semibold text-gray-900">Basic Plan</h3>
            <p className="text-xl font-bold text-gray-900 mt-4">
              $4.99 (Pay once)
            </p>
            <ul className="mt-6 text-left text-gray-600">
              <li className="mb-2">
                <span className="text-[#40a378]">✔</span> Unlimited Quizzes
              </li>
              <li className="mb-2">
                <span className="text-[#40a378]">✔</span> Unlimited
                Recommendations
              </li>
            </ul>
            <Link
              href={
                token
                  ? token.plan.name === "free"
                    ? "/purchase"
                    : "/quiz"
                  : "/login"
              }
              className="mt-6 inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              {token
                ? token.plan.name === "free"
                  ? "Get Started for $4.99"
                  : "Get Started"
                : "Get Started for $4.99"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
