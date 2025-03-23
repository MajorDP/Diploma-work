"use client";

import { useState } from "react";

function RegisterForm({ handleRegister }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isDisabled =
    !formData.fullName ||
    !formData.email ||
    !formData.password ||
    !formData.repeatPassword ||
    isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const error = await handleRegister({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      repeatPassword: formData.repeatPassword,
    });
    console.log(error);
    if (error) {
      setError(error);
    }
    setIsLoading(false);
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#40a378] focus:outline-none"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={(e) => {
            setFormData((prev) => {
              return { ...prev, fullName: e.target.value };
            });
          }}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#40a378] focus:outline-none"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => {
            setFormData((prev) => {
              return { ...prev, email: e.target.value };
            });
          }}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#40a378] focus:outline-none"
          placeholder="Create a password"
          value={formData.password}
          onChange={(e) => {
            setFormData((prev) => {
              return { ...prev, password: e.target.value };
            });
          }}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Repeat Password
        </label>
        <input
          type="password"
          className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#40a378] focus:outline-none"
          placeholder="Repeat your password"
          value={formData.repeatPassword}
          onChange={(e) => {
            setFormData((prev) => {
              return { ...prev, repeatPassword: e.target.value };
            });
          }}
        />
      </div>
      {error && <p className="text-center text-red-400">{error}</p>}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-[#40a378] disabled:bg-slate-300 text-white rounded-lg hover:bg-[#66D2A3] shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 duration-200 text-lg font-semibold"
        disabled={isDisabled}
      >
        {isLoading ? "Signing up..." : "Sign up"}
      </button>
    </form>
  );
}

export default RegisterForm;
