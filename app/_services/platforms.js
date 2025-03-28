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
