"use client";

import Link from "next/link";
import { useState } from "react";

function LoginForm({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const error = await handleLogin({ email, password });

    if (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#40a378] focus:outline-none"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#40a378] focus:outline-none"
          placeholder="Enter your password"
        />
      </div>
      <div className="flex items-center justify-between text-sm text-gray-600">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" /> Remember me
        </label>
        <Link
          href="/forgot-password"
          className="text-[#40a378] hover:underline"
        >
          Forgot password?
        </Link>
      </div>
      {error && <p className="text-center text-red-400">{error}</p>}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-[#40a378] disabled:bg-slate-300 text-white rounded-lg hover:bg-[#66D2A3] shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 duration-200 text-lg font-semibold"
        disabled={!email || !password || isLoading}
      >
        {isLoading ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}

export default LoginForm;
