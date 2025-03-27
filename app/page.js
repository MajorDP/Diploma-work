import Image from "next/image";
import { PlatformCard } from "./_components/PlatformCard";
import Link from "next/link";
import { getPlatforms } from "./_services/platforms";
import Error from "./_components/Error";

const samplePlatforms = [
  {
    id: "shopify1",
    name: "Shopify",
    subsFees: [
      {
        name: "Basic",
        price: 29.99,
        features: [
          "Basic reports",
          "Up to 2 staff accounts",
          "24/7 support",
          "Online store",
        ],
      },
      {
        name: "Shopify",
        price: 79.99,
        features: [
          "Professional reports",
          "Up to 5 staff accounts",
          "Gift cards",
          "Lower transaction fees",
        ],
      },
    ],
    paymentGateways: [
      { name: "Shopify Payments" },
      { name: "PayPal" },
      { name: "Stripe" },
    ],
    transactionFees: [
      {
        type: "Credit Card",
        fee: "2.9% + 0.30 USD",
      },
    ],
    websiteBuildersAndCms: [{ name: "Shopify CMS" }, { name: "WordPress" }],
    dropshippingSupport: true,
    userSupport: [
      { type: "24/7 Support" },
      { type: "Community Forums" },
      { type: "Help Center" },
    ],
    toolsSEO: [{ type: "automatic" }, { type: "manual" }],
    easeOfUse: {
      difficulty: "easy",
      notes:
        "User-friendly interface with drag-and-drop builder and guided setup",
    },
    crossPlatformAdvertising: [
      {
        appName: "Facebook",
        extentionName: "Facebook Channel",
        freeOfCharge: true,
      },
      {
        appName: "Instagram",
        extentionName: "Instagram Shopping",
        freeOfCharge: true,
      },
    ],
  },
  {
    id: "shopify2",
    name: "Shopify",
    subsFees: [
      {
        name: "Basic",
        price: 29.99,
        features: [
          "Basic reports",
          "Up to 2 staff accounts",
          "24/7 support",
          "Online store",
        ],
      },
      {
        name: "Shopify",
        price: 79.99,
        features: [
          "Professional reports",
          "Up to 5 staff accounts",
          "Gift cards",
          "Lower transaction fees",
        ],
      },
    ],
    paymentGateways: [
      { name: "Shopify Payments" },
      { name: "PayPal" },
      { name: "Stripe" },
    ],
    transactionFees: [
      {
        type: "Credit Card",
        fee: "2.9% + 0.30 USD",
      },
    ],
    websiteBuildersAndCms: [{ name: "Shopify CMS" }, { name: "WordPress" }],
    dropshippingSupport: true,
    userSupport: [
      { type: "24/7 Support" },
      { type: "Community Forums" },
      { type: "Help Center" },
    ],
    toolsSEO: [{ type: "automatic" }, { type: "manual" }],
    easeOfUse: {
      difficulty: "easy",
      notes:
        "User-friendly interface with drag-and-drop builder and guided setup",
    },
    crossPlatformAdvertising: [
      {
        appName: "Facebook",
        extentionName: "Facebook Channel",
        freeOfCharge: true,
      },
      {
        appName: "Instagram",
        extentionName: "Instagram Shopping",
        freeOfCharge: true,
      },
    ],
  },
  {
    id: "shopify",
    name: "Shopify",
    subsFees: [
      {
        name: "Basic",
        price: 29.99,
        features: [
          "Basic reports",
          "Up to 2 staff accounts",
          "24/7 support",
          "Online store",
        ],
      },
      {
        name: "Shopify",
        price: 79.99,
        features: [
          "Professional reports",
          "Up to 5 staff accounts",
          "Gift cards",
          "Lower transaction fees",
        ],
      },
    ],
    paymentGateways: [
      { name: "Shopify Payments" },
      { name: "PayPal" },
      { name: "Stripe" },
    ],
    transactionFees: [
      {
        type: "Credit Card",
        fee: "2.9% + 0.30 USD",
      },
    ],
    websiteBuildersAndCms: [{ name: "Shopify CMS" }, { name: "WordPress" }],
    dropshippingSupport: true,
    userSupport: [
      { type: "24/7 Support" },
      { type: "Community Forums" },
      { type: "Help Center" },
    ],
    toolsSEO: [{ type: "automatic" }, { type: "manual" }],
    easeOfUse: {
      difficulty: "medium",
      notes:
        "User-friendly interface with drag-and-drop builder and guided setup",
    },
    crossPlatformAdvertising: [
      {
        appName: "Facebook",
        extentionName: "Facebook Channel",
        freeOfCharge: true,
      },
      {
        appName: "Instagram",
        extentionName: "Instagram Shopping",
        freeOfCharge: true,
      },
    ],
  },
];

const Page = async () => {
  const { platforms, error } = await getPlatforms();

  return (
    <div className="px-4 sm:px-0 py-12 min-w-[30rem] sm:w-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Find Your Perfect E-commerce Platform
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Answer a few questions about your business needs and we&apos;ll
          recommend the best e-commerce platform for you.
        </p>
        <Link
          href="/quiz"
          className="px-8 py-4 bg-[#40a378] text-white rounded-lg hover:bg-[#66D2A3] text-lg font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 duration-200"
        >
          Take the Quiz
        </Link>
      </div>

      <div className="text-center mt-5 pt-10">
        <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-4">
          All Platforms
        </h2>
        {error ? (
          <Error message={error.message} />
        ) : (
          <>
            <div>
              <p className="text-gray-600 text-center mb-8">
                Browse our complete collection of e-commerce platforms
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {platforms.map((platform) => (
                <PlatformCard key={platform.id} platform={platform} />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="bg-gray-50 py-12 mt-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Here&apos;s what our customers say about their experience with our
            recommended platforms.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
            <p className="text-xl text-gray-700 mb-4">
              &quot;PlatRex has completely transformed our business! The quiz
              recommended the perfect platform for our needs. We&apos;re now
              reaching more customers and the setup was seamless!&quot;
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <Image
                  width={100}
                  height={100}
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Client Avatar"
                  className="object-cover"
                />
              </div>

              <div>
                <p className="font-semibold text-gray-900">Leonard Pierce</p>
                <p className="text-base sm:text-sm text-gray-500">
                  CEO, TechSolutions
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
            <p className="text-xl text-gray-700 mb-4">
              &quot;We found the perfect solution through PlatRex! The quiz was
              easy to use, and we were able to choose a platform that fits our
              growth strategy. Highly recommend!&quot;
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <Image
                  width={100}
                  height={100}
                  src="https://images.unsplash.com/photo-1605884636476-ec4bd6c8d958?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Client Avatar"
                  className="object-cover"
                />
              </div>

              <div>
                <p className="font-semibold text-gray-900">Sophia Carter</p>
                <p className="text-base sm:text-sm text-gray-500">
                  Marketing Director, Green Innovations
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
            <p className="text-xl text-gray-700 mb-4">
              &quot;The quiz was a game-changer for us. PlatRex helped us find
              the right platform quickly, and the setup was intuitive. Our sales
              have doubled since switching!&quot;
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <Image
                  width={100}
                  height={100}
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Client Avatar"
                  className="object-cover"
                />
              </div>

              <div>
                <p className="font-semibold text-gray-900">Jonah Parker</p>
                <p className="text-base sm:text-sm text-gray-500">
                  Chief Marketing Officer (CMO)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
