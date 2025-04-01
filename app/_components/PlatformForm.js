import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

export const PlatformForm = ({ onSubmit, onClose, initialData }) => {
  const isEdit = !!initialData;

  const [platform, setPlatform] = useState(
    initialData || {
      name: "test Data",
      subsFees: [{ name: "", price: 0, features: [""] }],
      paymentGateways: [{ name: "" }],
      transactionFees: [{ type: "", fee: "" }],
      websiteBuildersAndCms: [{ name: "" }],
      dropshippingSupport: false,
      userSupport: [{ type: "" }],
      toolsSEO: [{ type: "automatic" }],
      easeOfUse: { difficulty: "easy", notes: "" },
      crossPlatformAdvertising: [
        { appName: "", extentionName: "", freeOfCharge: true },
      ],
    }
  );

  const handleSubmit = (e) => {
    //TODO: Create/Edit Platform
    e.preventDefault();
    onSubmit(platform, isEdit);
  };

  const addArrayItem = (field, defaultValue) => {
    setPlatform((prev) => ({
      ...prev,
      [field]: [...prev[field], defaultValue],
    }));
  };

  const removeArrayItem = (field, index) => {
    setPlatform((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const updateArrayItem = (field, index, value) => {
    setPlatform((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow"
    >
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-bold mb-6">
          {isEdit ? `Edit Platform ${platform.name}` : "Add a New Platform"}
        </h2>
        <button
          onClick={onClose}
          type="submit"
          className="px-2 py-1 h-fit bg-red-600 text-white text-sm rounded-lg hover:bg-red-800 cursor-pointer"
        >
          Close
        </button>
      </div>

      {/* Platform Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Platform Name
        </label>
        <input
          type="text"
          value={platform.name}
          onChange={(e) => setPlatform({ ...platform, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {/* Subscription Fees */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4 border-t border-gray-300 pt-4">
          Subscription Fees
        </label>
        {platform.subsFees.map((fee, index) => (
          <div key={index} className="flex gap-4 items-start mb-10">
            <div className="flex-1 space-y-2">
              <label>Plan {index + 1}</label>
              <input
                type="text"
                placeholder="Plan name"
                value={fee.name}
                onChange={(e) =>
                  updateArrayItem("subsFees", index, {
                    ...fee,
                    name: e.target.value,
                  })
                }
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <input
                type="number"
                placeholder="Price"
                value={fee.price}
                onChange={(e) =>
                  updateArrayItem("subsFees", index, {
                    ...fee,
                    price: parseFloat(e.target.value) || 0,
                  })
                }
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {/* Features */}
              <label className="block text-sm ml-10 font-medium text-gray-700 mb-4">
                Features
              </label>
              <div className="space-y-2 ml-10">
                {fee.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Feature"
                      value={feature}
                      onChange={(e) => {
                        const newFeatures = [...fee.features];
                        newFeatures[featureIndex] = e.target.value;
                        updateArrayItem("subsFees", index, {
                          ...fee,
                          features: newFeatures,
                        });
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newFeatures = fee.features.filter(
                          (_, i) => i !== featureIndex
                        );
                        updateArrayItem("subsFees", index, {
                          ...fee,
                          features: newFeatures,
                        });
                      }}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    updateArrayItem("subsFees", index, {
                      ...fee,
                      features: [...fee.features, ""],
                    })
                  }
                  className="flex items-center text-indigo-600 hover:text-indigo-800 cursor-pointer"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Feature
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeArrayItem("subsFees", index)}
              className="text-red-600 hover:text-red-800 cursor-pointer"
            >
              <Minus className="w-5 h-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addArrayItem("subsFees", { name: "", price: 0, features: [""] })
          }
          className="flex items-center text-indigo-600 hover:text-indigo-800 cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Subscription Plan
        </button>
      </div>

      {/* Ease of Use */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4 border-t border-gray-300 pt-4">
          Ease of Use
        </label>
        <div className="flex gap-4 items-start mb-10">
          <div className="flex-1 space-y-2">
            <select
              value={platform.easeOfUse.difficulty}
              onChange={(e) =>
                setPlatform((prev) => {
                  return {
                    ...prev,
                    easeOfUse: {
                      ...prev.easeOfUse,
                      difficulty: e.target.value,
                    },
                  };
                })
              }
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <input
              type="text"
              value={platform.easeOfUse.notes}
              onChange={(e) =>
                setPlatform((prev) => {
                  return {
                    ...prev,
                    easeOfUse: {
                      ...prev.easeOfUse,
                      notes: e.target.value,
                    },
                  };
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Cross-Platform Advertising */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4 border-t border-gray-300 pt-4">
          Cross-Platform Advertising
        </label>
        {platform.crossPlatformAdvertising.map((advert, index) => (
          <div key={index} className="flex gap-4 items-start mb-10">
            <div className="flex-1 space-y-2">
              <label>Advert {index + 1}</label>
              <input
                type="text"
                placeholder="App Name"
                value={advert.appName}
                onChange={(e) =>
                  updateArrayItem("crossPlatformAdvertising", index, {
                    ...advert,
                    appName: e.target.value,
                  })
                }
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <input
                type="string"
                placeholder="Extention Name"
                value={advert.extentionName}
                onChange={(e) =>
                  updateArrayItem("crossPlatformAdvertising", index, {
                    ...advert,
                    extentionName: e.target.value,
                  })
                }
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <select
                value={platform.easeOfUse.freeOfCharge}
                onChange={(e) =>
                  updateArrayItem("crossPlatformAdvertising", index, {
                    ...advert,
                    freeOfCharge: e.target.value === "true",
                  })
                }
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
            <button
              type="button"
              onClick={() => removeArrayItem("crossPlatformAdvertising", index)}
              className="text-red-600 hover:text-red-800 cursor-pointer"
            >
              <Minus className="w-5 h-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addArrayItem("crossPlatformAdvertising", {
              appName: "",
              extentionName: "",
              freeOfCharge: false,
            })
          }
          className="flex items-center text-indigo-600 hover:text-indigo-800 cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Cross-Platform Advertising
        </button>
      </div>

      {/* Transaction Fees */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4 border-t border-gray-300 pt-4">
          Transaction Fees
        </label>
        {platform.transactionFees.map((fee, index) => (
          <div key={index} className="flex gap-4 items-start mb-10">
            <div className="flex-1 space-y-2">
              <label>Fee {index + 1}</label>
              <input
                type="text"
                placeholder="Transaction type"
                value={fee.type}
                onChange={(e) =>
                  updateArrayItem("transactionFees", index, {
                    ...fee,
                    type: e.target.value,
                  })
                }
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="Transaction name"
                value={fee.fee}
                onChange={(e) =>
                  updateArrayItem("transactionFees", index, {
                    ...fee,
                    fee: e.target.value,
                  })
                }
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <button
              type="button"
              onClick={() => removeArrayItem("transactionFees", index)}
              className="text-red-600 hover:text-red-800 cursor-pointer"
            >
              <Minus className="w-5 h-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem("transactionFees", { type: "", fee: "" })}
          className="flex items-center text-indigo-600 hover:text-indigo-800 cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Transaction Fee
        </button>
      </div>

      {/* Website Builders and CMS */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4 border-t border-gray-300 pt-4">
          Website Builders and CMS
        </label>
        {platform.websiteBuildersAndCms.map((builder, index) => (
          <div key={index} className="flex gap-4 items-start mb-10">
            <div className="flex-1 space-y-2">
              <label>Builder/CMS {index + 1}</label>
              <input
                type="text"
                placeholder="Website Builders/CMS Name"
                value={builder.name}
                onChange={(e) =>
                  updateArrayItem("websiteBuildersAndCms", index, {
                    name: e.target.value,
                  })
                }
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <button
              type="button"
              onClick={() => removeArrayItem("websiteBuildersAndCms", index)}
              className="text-red-600 hover:text-red-800 cursor-pointer"
            >
              <Minus className="w-5 h-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem("websiteBuildersAndCms", { name: "" })}
          className="flex items-center text-indigo-600 hover:text-indigo-800 cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Website Builder/CMS
        </button>
      </div>

      {/* User Support */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4 border-t border-gray-300 pt-4">
          User Support
        </label>
        {platform.userSupport.map((support, index) => (
          <div key={index} className="flex gap-4 items-start mb-10">
            <div className="flex-1 space-y-2">
              <label>Support {index + 1}</label>
              <input
                type="text"
                placeholder="Support type"
                value={support.type}
                onChange={(e) =>
                  updateArrayItem("userSupport", index, {
                    type: e.target.value,
                  })
                }
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <button
              type="button"
              onClick={() => removeArrayItem("userSupport", index)}
              className="text-red-600 hover:text-red-800 cursor-pointer"
            >
              <Minus className="w-5 h-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem("userSupport", { type: "" })}
          className="flex items-center text-indigo-600 hover:text-indigo-800 cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-1" /> Add User Support
        </button>
      </div>

      {/* Payment Gateways */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4 border-t border-gray-300 pt-4">
          Payment Gateways
        </label>
        {platform.paymentGateways.map((gateway, index) => (
          <div key={index} className="flex gap-4 items-start mb-10">
            <div className="flex-1 space-y-2">
              <label>Gateway {index + 1}</label>
              <input
                type="text"
                placeholder="Gateway name"
                value={gateway.name}
                onChange={(e) =>
                  updateArrayItem("paymentGateways", index, {
                    ...gateway,
                    name: e.target.value,
                  })
                }
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <button
              type="button"
              onClick={() => removeArrayItem("paymentGateways", index)}
              className="text-red-600 hover:text-red-800 cursor-pointer"
            >
              <Minus className="w-5 h-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem("paymentGateways", { name: "" })}
          className="flex items-center text-indigo-600 hover:text-indigo-800 cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Payment Gateway
        </button>
      </div>

      {/* Dropshipping Support */}
      <div>
        <label className="block text-sm font-medium text-gray-700 border-t border-gray-300 pt-4">
          Dropshipping Support
        </label>
        <div className="mt-2">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={platform.dropshippingSupport}
              onChange={(e) =>
                setPlatform({
                  ...platform,
                  dropshippingSupport: e.target.checked,
                })
              }
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 cursor-pointer"
            />
            <span className="ml-2">Supports dropshipping</span>
          </label>
        </div>
      </div>

      {/* SEO Tools */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4 border-t border-gray-300 pt-4">
          SEO Tools
        </label>
        {platform.toolsSEO.map((tool, index) => (
          <div key={index} className="flex gap-4 items-center mb-4">
            <select
              value={tool.type}
              onChange={(e) =>
                updateArrayItem("toolsSEO", index, { type: e.target.value })
              }
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
            </select>
            <button
              type="button"
              onClick={() => removeArrayItem("toolsSEO", index)}
              className="text-red-600 hover:text-red-800 cursor-pointer"
            >
              <Minus className="w-5 h-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem("toolsSEO", { type: "automatic" })}
          className="flex items-center text-indigo-600 hover:text-indigo-800 cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-1" /> Add SEO Tool
        </button>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-[#40a378] text-white rounded-lg hover:bg-[#66D2A3] cursor-pointer"
        >
          Save Platform
        </button>
      </div>
    </form>
  );
};
