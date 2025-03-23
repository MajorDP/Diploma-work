import { PlatformCard } from "../../_components/PlatformCard";

const sampleRecommendations = {
  id: "1",
  recommendations: [
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
  ],
};

const Page = async ({ params }) => {
  const { id } = await params;
  //TODO: Get recommendation for user from backend
  console.log(id);
  const recommendations = sampleRecommendations;

  return (
    recommendations.recommendations.length > 0 && (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.recommendations.map((platform) => (
            <PlatformCard key={platform.id} platform={platform} />
          ))}
        </div>
      </div>
    )
  );
};

export default Page;
