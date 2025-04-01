import Error from "../../_components/Error";
import { PlatformCard } from "../../_components/PlatformCard";
import { getPlatformById } from "../../_services/platforms";

const Page = async ({ params }) => {
  const { id } = await params;

  const { platform, error } = await getPlatformById(id);

  return platform ? (
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
      {platform && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-center gap-8 m-auto">
          <PlatformCard key={platform.id} platform={platform} />
        </div>
      )}
    </div>
  ) : (
    <div className="h-screen text-center pt-10">
      <Error message={error.message} />
    </div>
  );
};

export default Page;
