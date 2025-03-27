import {
  Check,
  X,
  ArrowLeft,
  CreditCard,
  Globe,
  Headphones,
  Search,
  Share2,
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { getPlatformById } from "@/app/_services/platforms";
import Error from "@/app/_components/Error";

const Page = async ({ params }) => {
  const { id } = await params;

  const { platform, error } = await getPlatformById(id);

  if (!platform) {
    return (
      <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Platform not found
          </h2>
          {error && <Error message={error.message} />}
          <Link href="/" className="mt-4 text-slate-600 hover:text-black">
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  const heroImages = [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=800&q=80",
  ];

  if (error) {
    return (
      <div className="min-h-screen flex justify-center ">
        <Error message={error.message} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-96">
        <Image
          src={heroImages[0]}
          alt={platform.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center text-white mb-4 hover:text-gray-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to platforms
            </Link>
            <h1 className="text-4xl font-bold text-white mb-2">
              {platform.name}
            </h1>
            <p className="text-xl text-gray-200">{platform.easeOfUse.notes}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Subscription Plans</h2>
              <div className="grid gap-6">
                {platform.subsFees.map((plan, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-6 hover:shadow-lg duration-200"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{plan.name}</h3>
                        <p className="text-3xl font-bold text-[#40a378] mt-2">
                          ${plan.price}/mo
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <Check className="w-5 h-5 text-[#40a378] mr-3" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg shadow hover:shadow-lg duration-200 p-6 h-fit">
              <h2 className="text-2xl font-bold mb-6">Platform Features</h2>
              <div className="w-full flex flex-row justify-between flex-wrap gap-y-10">
                <div className="space-y-4">
                  <div className="flex items-start h-[10rem]">
                    <div>
                      <CreditCard className="w-6 h-6 text-[#40a378]" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Payment Gateways</h3>
                      <ul className="mt-2 space-y-2">
                        {platform.paymentGateways.map((gateway, index) => (
                          <li key={index} className="flex items-center">
                            <Check className="w-4 h-4 text-green-500 mr-2" />
                            <span>
                              {gateway.name}{" "}
                              {platform.paymentGateways.length > 3 &&
                                index === 2 &&
                                "& More"}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start h-[10rem]">
                    <div>
                      <Globe className="w-6 h-6 text-[#40a378]" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">
                        Website Builders & CMS
                      </h3>
                      <ul className="mt-2 space-y-2">
                        {platform.websiteBuildersAndCms.map(
                          (builder, index) => (
                            <li key={index} className="flex items-center">
                              <Check className="w-4 h-4 text-green-500 mr-2" />
                              <span>{builder.name}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start h-[10rem]">
                    <div>
                      <Globe className="w-6 h-6 text-[#40a378]" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">
                        Website Builders & CMS
                      </h3>
                      <ul className="mt-2 space-y-2">
                        {platform.websiteBuildersAndCms.map(
                          (builder, index) => (
                            <li key={index} className="flex items-center">
                              <Check className="w-4 h-4 text-green-500 mr-2" />
                              <span>{builder.name}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start h-[10rem]">
                    <div>
                      <Search className="w-6 h-6 text-[#40a378]" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">SEO Tools</h3>
                      <ul className="mt-2 space-y-2">
                        {platform.toolsSEO.map((tool, index) => (
                          <li key={index} className="flex items-center">
                            <Check className="w-4 h-4 text-green-500 mr-2" />
                            <span>
                              {tool.type.charAt(0).toUpperCase() +
                                tool.type.slice(1)}{" "}
                              SEO
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start h-[10rem]">
                    <div>
                      <Share2 className="w-6 h-6 text-[#40a378]" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">
                        Cross-Platform Advertising
                      </h3>
                      <ul className="mt-2 space-y-2">
                        {platform.crossPlatformAdvertising.map((ad, index) => (
                          <li key={index} className="flex items-center">
                            <Check className="w-4 h-4 text-green-500 mr-2" />
                            <span>
                              {ad.appName} ({ad.freeOfCharge ? "Free" : "Paid"})
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start h-[10rem]">
                    <div>
                      <Share2 className="w-6 h-6 text-[#40a378]" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">
                        Cross-Platform Advertising
                      </h3>
                      <ul className="mt-2 space-y-2">
                        {platform.crossPlatformAdvertising.map((ad, index) => (
                          <li key={index} className="flex items-center">
                            <Check className="w-4 h-4 text-green-500 mr-2" />
                            <span>
                              {ad.appName} ({ad.freeOfCharge ? "Free" : "Paid"})
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow hover:shadow-lg duration-200 p-6">
              <h3 className="text-lg font-medium mb-4">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Dropshipping Support</span>
                  {platform.dropshippingSupport ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <X className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Ease of Use</span>
                  <div
                    className={`
                    mt-2 px-3 py-1 rounded-full text-sm font-medium
                    ${
                      platform.easeOfUse.difficulty === "easy"
                        ? "bg-green-100 text-green-800"
                        : ""
                    }
                    ${
                      platform.easeOfUse.difficulty === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : ""
                    }
                    ${
                      platform.easeOfUse.difficulty === "hard"
                        ? "bg-red-100 text-red-800"
                        : ""
                    }
                  `}
                  >
                    {platform.easeOfUse.difficulty.charAt(0).toUpperCase() +
                      platform.easeOfUse.difficulty.slice(1)}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Transaction Fees</span>
                  <ul className="mt-2 space-y-2">
                    {platform.transactionFees.map((fee, index) => (
                      <li key={index} className="text-sm">
                        {fee.type}: {fee.fee}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow hover:shadow-lg duration-200 p-6">
              <h3 className="text-lg font-medium mb-4">Support Options</h3>
              <ul className="space-y-3">
                {platform.userSupport.map((support, index) => (
                  <li key={index} className="flex items-center">
                    <Headphones className="w-5 h-5 text-[#40a378] mr-3" />
                    <span>{support.type}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
