const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://diploma-work-showcase.vercel.app/"
    : "http://localhost:3000";

export async function getPlatforms() {
  const res = await fetch(baseUrl + "/api/platforms/get");

  const data = await res.json();

  return data;
}

export async function getPlatformById(platformId) {
  const res = await fetch(baseUrl + `/api/platforms/get/${platformId}`);

  const data = await res.json();

  return data;
}

export async function createPlatform(platformData) {
  const res = await fetch(baseUrl + "/api/platforms/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(platformData),
  });

  const data = await res.json();
  return data;
}

export async function deletePlatform(platformId) {
  const res = await fetch(baseUrl + "/api/platforms/delete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: platformId }),
  });

  const data = await res.json();
  return data;
}

export async function editPlatform(platformData) {
  const res = await fetch(baseUrl + "/api/platforms/edit", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ platform: platformData }),
  });

  const data = await res.json();
  return data;
}

export async function getRecommendation(id) {
  const res = await fetch(baseUrl + `/api/recommend/get/${id}`);

  const data = await res.json();

  return data;
}

export async function handleRecommendation(answers, session) {
  const res = await fetch(baseUrl + "/api/recommend", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answers: answers, user: session }),
  });

  const data = await res.json();

  return data;
}

export function filterPlatforms(answers, platforms) {
  const filteredByPrice = platforms.filter(
    (platform) =>
      platform.subsFees.length === 0 ||
      answers.maxBudget >= platform.subsFees[0].price
  );

  const filteredByTransactionFee = filteredByPrice.filter((platform) =>
    platform.transactionFees.length === 0
      ? true
      : platform.transactionFees.some(
          (fee) => fee.fee.split("%")[0] <= answers.maxTransactionFee
        )
  );

  const filteredByDifficulty = filteredByTransactionFee.filter((platform) => {
    if (answers.technicalExpertise === "hard") return true;
    if (answers.technicalExpertise === "medium")
      return platform.easeOfUse.difficulty !== "hard";
    return platform.easeOfUse.difficulty === "easy";
  });

  const filteredByAdvertisement =
    answers.advertisingPlatforms.length === 0
      ? filteredByDifficulty
      : filteredByDifficulty.filter((platform) =>
          platform.crossPlatformAdvertising.some((adPlatform) =>
            answers.advertisingPlatforms.includes(adPlatform.appName)
          )
        );

  const filteredByDropshipping =
    answers.needsDropshipping === false
      ? filteredByAdvertisement
      : filteredByAdvertisement.filter(
          (platform) => platform.dropshippingSupport === true
        );

  const filteredByCMS =
    answers.needsWebsiteBuilder === false
      ? filteredByDropshipping
      : filteredByDropshipping.filter(
          (platform) => platform.websiteBuildersAndCms.length > 0
        );

  const filteredBySEO =
    answers.seoPreference === "both"
      ? filteredByCMS
      : filteredByCMS.filter((platform) =>
          platform.toolsSEO.some((tool) => tool.type === answers.seoPreference)
        );

  const sortedPlatforms = filteredBySEO.sort((a, b) => {
    const aHasSupport = answers.preferredSupportType.some((type) =>
      a.userSupport.some((support) => support.type.includes(type))
    );
    const bHasSupport = answers.preferredSupportType.some((type) =>
      b.userSupport.some((support) => support.type.includes(type))
    );

    const aHasGateway = answers.preferredPaymentGateways.some((gateway) =>
      a.paymentGateways.some((gate) => gate.name === gateway)
    );
    const bHasGateway = answers.preferredPaymentGateways.some((gateway) =>
      b.paymentGateways.some((gate) => gate.name === gateway)
    );

    if (aHasGateway && !bHasGateway) return -1;
    if (!aHasGateway && bHasGateway) return 1;

    if (aHasSupport && !bHasSupport) return -1;
    if (!aHasSupport && bHasSupport) return 1;

    return 0;
  });

  return sortedPlatforms;
}
