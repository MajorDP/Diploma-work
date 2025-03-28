import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getSession() {
  const cookiesStore = await cookies();

  const token = cookiesStore.get("token");
  const decoded = jwt.decode(token?.value);

  return decoded;
}
