"use client";
import React, { useState } from "react";

export const Quiz = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    maxBudget: 150,
    preferredPaymentGateways: [],
    maxTransactionFee: 2.5,
    needsWebsiteBuilder: false,
    needsDropshipping: false,
    preferredSupportType: [],
    seoPreference: "both",
    technicalExpertise: "easy",
    advertisingPlatforms: [],
  });

  const questions = [
    {
      title: "What's your monthly budget for an e-commerce platform?",
      component: (
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="300"
            step="10"
            value={answers.maxBudget}
            onChange={(e) =>
              setAnswers({ ...answers, maxBudget: parseInt(e.target.value) })
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <p className="text-center text-lg font-semibold">
            ${answers.maxBudget}/month
          </p>
        </div>
      ),
    },
    {
      title: "Which payment gateways do you need?",
      component: (
        <div className="space-y-3">
          {["PayPal", "Stripe", "Square", "Apple Pay", "Google Pay"].map(
            (gateway) => (
              <label key={gateway} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={answers.preferredPaymentGateways.includes(gateway)}
                  onChange={(e) => {
                    const newGateways = e.target.checked
                      ? [...answers.preferredPaymentGateways, gateway]
                      : answers.preferredPaymentGateways.filter(
                          (g) => g !== gateway
                        );
                    setAnswers({
                      ...answers,
                      preferredPaymentGateways: newGateways,
                    });
                  }}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
                <span>{gateway}</span>
              </label>
            )
          )}
        </div>
      ),
    },
    {
      title: "What's the maximum transaction fee you're willing to accept?",
      component: (
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={answers.maxTransactionFee}
            onChange={(e) =>
              setAnswers({
                ...answers,
                maxTransactionFee: parseFloat(e.target.value),
              })
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <p className="text-center text-lg font-semibold">
            {answers.maxTransactionFee}%
          </p>
        </div>
      ),
    },
    {
      title: "Do you need website builder and CMS integration?",
      component: (
        <div className="space-x-4 flex flex-row justify-center">
          <button
            className={`px-6 py-3 rounded-lg cursor-pointer ${
              answers.needsWebsiteBuilder
                ? "bg-[#40a378] text-white"
                : "bg-gray-200"
            }`}
            onClick={() =>
              setAnswers({ ...answers, needsWebsiteBuilder: true })
            }
          >
            Yes
          </button>
          <button
            className={`px-6 py-3 rounded-lg cursor-pointer ${
              !answers.needsWebsiteBuilder
                ? "bg-[#40a378] text-white"
                : "bg-gray-200"
            }`}
            onClick={() =>
              setAnswers({ ...answers, needsWebsiteBuilder: false })
            }
          >
            No
          </button>
        </div>
      ),
    },
    {
      title: "Do you need dropshipping support?",
      component: (
        <div className="space-x-4 flex flex-row justify-center">
          <button
            className={`px-6 py-3 rounded-lg cursor-pointer ${
              answers.needsDropshipping
                ? "bg-[#40a378] text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setAnswers({ ...answers, needsDropshipping: true })}
          >
            Yes
          </button>
          <button
            className={`px-6 py-3 rounded-lg cursor-pointer ${
              !answers.needsDropshipping
                ? "bg-[#40a378] text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setAnswers({ ...answers, needsDropshipping: false })}
          >
            No
          </button>
        </div>
      ),
    },
    {
      title: "What type of support do you prefer?",
      component: (
        <div className="space-y-3">
          {[
            "24/7 Support",
            "Email Support",
            "Phone Support",
            "Community Forums",
            "Documentation",
          ].map((support) => (
            <label key={support} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={answers.preferredSupportType.includes(support)}
                onChange={(e) => {
                  const newSupport = e.target.checked
                    ? [...answers.preferredSupportType, support]
                    : answers.preferredSupportType.filter((s) => s !== support);
                  setAnswers({ ...answers, preferredSupportType: newSupport });
                }}
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span>{support}</span>
            </label>
          ))}
        </div>
      ),
    },
    {
      title: "What's your preference for SEO tools?",
      component: (
        <div className="space-y-3">
          {[
            { value: "both", label: "Both Automatic and Manual" },
            { value: "automatic", label: "Automatic SEO Tools" },
            { value: "manual", label: "Manual SEO Control" },
          ].map((option) => (
            <label key={option.value} className="flex items-center space-x-3">
              <input
                type="radio"
                checked={answers.seoPreference === option.value}
                onChange={() =>
                  setAnswers({ ...answers, seoPreference: option.value })
                }
                className="form-radio h-5 w-5 text-indigo-600"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      ),
    },
    {
      title: "What's your technical expertise level?",
      component: (
        <div className="space-y-3">
          {[
            {
              value: "easy",
              label: "Beginner - I prefer easy-to-use platforms",
            },
            {
              value: "medium",
              label: "Intermediate - I can handle some complexity",
            },
            {
              value: "hard",
              label: "Expert - I want full control and customization",
            },
          ].map((option) => (
            <label key={option.value} className="flex items-center space-x-3">
              <input
                type="radio"
                checked={answers.technicalExpertise === option.value}
                onChange={() =>
                  setAnswers({ ...answers, technicalExpertise: option.value })
                }
                className="form-radio h-5 w-5 text-indigo-600"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      ),
    },
    {
      title: "Which advertising platforms are important to you?",
      component: (
        <div className="space-y-3">
          {["Facebook", "Instagram", "TikTok", "Google Ads", "Pinterest"].map(
            (platform) => (
              <label key={platform} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={answers.advertisingPlatforms.includes(platform)}
                  onChange={(e) => {
                    const newPlatforms = e.target.checked
                      ? [...answers.advertisingPlatforms, platform]
                      : answers.advertisingPlatforms.filter(
                          (p) => p !== platform
                        );
                    setAnswers({
                      ...answers,
                      advertisingPlatforms: newPlatforms,
                    });
                  }}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
                <span>{platform}</span>
              </label>
            )
          )}
        </div>
      ),
    },
  ];

  const handleNext = async () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(answers);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="mb-8">
        <div className="flex flex-col justify-between items-center mb-4">
          <h2 className="text-xl text-center font-bold text-gray-900">
            {questions[currentStep].title}
          </h2>
          <span className="text-base sm:text-sm text-gray-500">
            Question {currentStep + 1} of {questions.length}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-[#40a378] rounded-full transition-all duration-300"
            style={{
              width: `${((currentStep + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="mb-8">{questions[currentStep].component}</div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          className={`px-6 py-2 rounded-lg cursor-pointer disabled:cursor-default ${
            currentStep === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          disabled={currentStep === 0}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 rounded-lg bg-[#40a378] text-white hover:bg-[#66D2A3] cursor-pointer"
        >
          {currentStep === questions.length - 1
            ? "Get Recommendations"
            : "Next"}
        </button>
      </div>
    </div>
  );
};
