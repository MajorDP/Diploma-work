const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://diploma-work-showcase.vercel.app/"
    : "http://localhost:3000";

export async function login(formData) {
  const res = await fetch(baseUrl + "/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { data: null, error: data.message };
  }

  return { data: data, error: null };
}

export async function register(formData) {
  const res = await fetch(baseUrl + "/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      repeatPassword: formData.repeatPassword,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { data: null, error: data.message };
  }

  return { data: data, error: data.message };
}
