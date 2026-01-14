"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      setMsg(data?.error || "Register failed");
    } else {
      setMsg("Registered! Now login.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border p-6 space-y-4">
        <h1 className="text-2xl font-bold">Register</h1>

        <form onSubmit={onSubmit} className="space-y-3">
          <input
            className="w-full border rounded-xl p-3"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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

          {msg && <p className="text-sm">{msg}</p>}

          <button
            disabled={loading}
            className="w-full rounded-xl bg-black text-white p-3 hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <p className="text-sm">
          Already have an account?{" "}
          <Link className="underline" href="/login">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
