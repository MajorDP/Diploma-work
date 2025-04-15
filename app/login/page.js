import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import LoginForm from "../_components/LoginForm";
import { login } from "../_services/auth";

export const metadata = {
  title: {
    default: "Sign In",
    template: "%s | PlatRex",
  },
  description:
    "Sign in and find the best online shopping platform for your needs in just a few clicks.",
  keywords: [
    "ecommerce",
    "online",
    "shopping",
    "store",
    "dropshipping",
    "SaaS",
    "Shopify",
    "WooCommerce",
  ],
  openGraph: {
    title: "Sign In - E-commerce Platform Recommendations",
    description:
      "Find the best online shopping platform for your needs in just a few clicks.",
    url: "https://diploma-work-showcase.vercel.app/login",
    siteName: "PlatRex",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const Page = () => {
  const handleLogin = async (formData) => {
    "use server";

    const { data, error } = await login(formData);

    if (error) {
      return error;
    }

    const cookie = await cookies();
    cookie.set("token", data.token, {
      httpOnly: true,
      maxAge: 3600,
      path: "/",
      sameSite: "strict",
      secure: true,
    });

    redirect("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-0 bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Welcome Back
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Log in to your account to continue
        </p>
        <LoginForm handleLogin={handleLogin} />
        <p className="text-center text-gray-600 mt-6 text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-[#40a378] hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
