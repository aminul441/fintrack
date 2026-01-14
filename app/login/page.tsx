"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/dashboard",
    });

    // redirect true হলে res সাধারণত null হয়, তাই শুধু loading off
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border p-6 space-y-4">
        <h1 className="text-2xl font-bold">Login</h1>

        <form onSubmit={onSubmit} className="space-y-3">
          <input
            className="w-full border rounded-xl p-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full border rounded-xl p-3"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {err && <p className="text-sm text-red-600">{err}</p>}

          <button
            disabled={loading}
            className="w-full rounded-xl bg-black text-white p-3 hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-sm">
          No account? <Link className="underline" href="/register">Register</Link>
        </p>
      </div>
    </main>
  );
}
