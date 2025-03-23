import Link from "next/link";
import RegisterForm from "../_components/RegisterForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { register } from "../_services/auth";

const Page = () => {
  const handleRegister = async (formData) => {
    "use server";

    const { data, error } = await register(formData);

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
          Create an Account
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Sign up to start your e-commerce journey
        </p>
        <RegisterForm handleRegister={handleRegister} />
        <p className="text-center text-gray-600 mt-6 text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#40a378] hover:underline font-medium"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
