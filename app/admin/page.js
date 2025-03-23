"use client";

import { useState } from "react";
import { AdminDashboard } from "../_components/AdminDashboard";
import { PlatformForm } from "../_components/PlatformForm";

const samplePlatforms = [
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
];

const Page = () => {
  //TODO: Get all platforms from database, validate user as admin, if not admin, send away
  const [platforms, setPlatforms] = useState(samplePlatforms);
  const [showPlatformForm, setShowPlatformForm] = useState(false);
  const [selectedForEdit, setSelectedForEdit] = useState(null);

  const selectForEdit = (index) => {
    setSelectedForEdit(samplePlatforms[index]);
    setShowPlatformForm(true);
  };

  const handleAddPlatform = (platform) => {
    setPlatforms([...platforms, platform]);
    setShowPlatformForm(false);
  };

  return (
    <div className="min-w-[30rem] sm:w-auto">
      {showPlatformForm ? (
        <PlatformForm
          onSubmit={handleAddPlatform}
          onClose={() => setShowPlatformForm(false)}
          initialData={selectedForEdit}
        />
      ) : (
        <div>
          <div className="mb-6 flex justify-between items-center ">
            <h1 className="text-xl sm:text-3xl font-bold text-gray-900">
              Platform Management
            </h1>
            <button
              onClick={() => {
                setSelectedForEdit(null);
                setShowPlatformForm(true);
              }}
              className="px-4 py-2 bg-[#40a378] text-white rounded-lg hover:bg-[#66D2A3] cursor-pointer text-sm sm:text-base"
            >
              Add New Platform
            </button>
          </div>
          <AdminDashboard
            currentPlatforms={platforms}
            selectForEdit={selectForEdit}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
