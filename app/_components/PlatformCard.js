"use client";
import { Check, X, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const PlatformCard = ({ platform }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 duration-300 ease-in-out transition-all z-0">
      <div className="relative h-48">
        <Image
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
          alt={platform.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
          {platform.name}
        </h3>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Starting from</p>
            <p className="text-2xl font-bold text-[#40a378]">
              ${platform.subsFees[0]?.price}/mo
            </p>
          </div>

          <div>
            <p className="text-sm md:text-xs xl:text-sm text-gray-600 mb-2 font-bold">
              Key Features
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <Check className="w-4 h-4 text-[#40a378] mr-2" />
                <span className="text-sm md:text-xs">
                  {platform.paymentGateways.length} Payment Methods
                </span>
              </div>
              <div className="flex items-center">
                {platform.dropshippingSupport ? (
                  <Check className="w-4 h-4 text-[#40a378] mr-2" />
                ) : (
                  <X className="w-4 h-4 text-red-500 mr-2" />
                )}
                <span className="text-sm md:text-xs">Dropshipping</span>
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 text-[#40a378] mr-2" />
                <span className="text-sm md:text-xs">
                  {platform.websiteBuildersAndCms.length} Integrations
                </span>
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 text-[#40a378] mr-2" />
                <span className="text-sm md:text-xs">
                  {platform.toolsSEO.length} SEO Tools
                </span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Ease of Use</p>
            <div className="flex items-center">
              <div
                className={`
                px-2 py-1 rounded text-xs font-medium
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
          </div>

          <Link
            href={`/platform/${platform.id}`}
            className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 rounded-md shadow-xl text-base sm:text-sm font-medium text-white bg-[#40a378] hover:bg-[#66D2A3] hover:text-black duration-200"
          >
            View Details
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
