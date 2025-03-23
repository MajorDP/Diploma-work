import { cookies } from "next/headers";

export async function getSession() {
  const cookiesStore = await cookies();

  const token = cookiesStore.get("token");

  return token;
}
