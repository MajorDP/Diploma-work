import { Store } from "lucide-react";
import Link from "next/link";
import { getSession } from "../_services/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const Navigation = async () => {
  const token = await getSession();

  const handleLogout = async () => {
    "use server";

    const cookiesStore = await cookies();
    cookiesStore.delete("token");
    redirect("/login");
  };

  return (
    <nav className="bg-[#78dab4] shadow-lg text-black fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex justify-between items-center h-20">
          <div className="flex flex-row gap-10 text-center items-center">
            <Link
              href="/"
              className="flex items-center hover:scale-105 transition-transform duration-300"
            >
              <Store className="w-6 h-6 md:w-8 md:h-8 text-black" />
              <span className="hidden md:block ml-2 text-xl font-semibold text-gray-800 hover:text-black transition-colors duration-200">
                PlatRex E-commerce
              </span>
            </Link>
            <Link
              href="/pricing"
              className="hidden md:block text-sm lg:text-lg font-semibold text-gray-800 hover:scale-110 duration-200"
            >
              Pricing
            </Link>
          </div>
          <div className="flex flex-row gap-6 items-center">
            <Link
              href="/pricing"
              className="block md:hidden text-sm lg:text-lg font-semibold text-gray-800 hover:scale-110 duration-200"
            >
              Pricing
            </Link>
            {token ? (
              <form
                action={handleLogout}
                className="text-sm lg:text-lg font-semibold text-gray-800 hover:scale-110 duration-200"
              >
                <button type="submit" className="cursor-pointer">
                  Sign Out
                </button>
              </form>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm lg:text-lg font-semibold text-gray-800 hover:scale-110 duration-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="text-sm lg:text-lg font-semibold text-gray-800 hover:scale-110 duration-200"
                >
                  Get Started
                </Link>
              </>
            )}

            {/* TODO: add admin verification in DB */}
            {/* <Link
              href="/admin"
              className="text-sm lg:text-lg font-medium text-gray-800 px-4 py-2 rounded-lg"
            >
              Dashboard
            </Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
};
