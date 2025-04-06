import { getSession } from "../_services/session";
import { redirect } from "next/navigation";
import { handleVerifyPayment } from "../_services/payment";
import { cookies } from "next/headers";

const Page = async ({ searchParams }) => {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const { amount, payment_intent } = await searchParams;

  const data = await handleVerifyPayment(payment_intent, session.id);

  const handleLogout = async () => {
    "use server";

    const cookiesStore = await cookies();
    cookiesStore.delete("token");
    redirect("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="text-2xl pt-5">
        {data.success ? `$${amount} Successfully paid` : "Payment failed"}
      </h1>
      {data.success && (
        <form action={handleLogout}>
          <button
            type="submit"
            className="underline pt-2 hover:scale-105 duration-200 cursor-pointer"
          >
            Log into your account again to apply changes.
          </button>
        </form>
      )}
    </div>
  );
};

export default Page;
