"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();

  const nav = [{ href: "/dashboard", label: "Dashboard" }];

  return (
    <header className="border-b bg-white">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/dashboard" className="font-extrabold text-xl">
          FinTrack
        </Link>

        <nav className="flex items-center gap-2">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-xl border text-sm ${
                  active ? "bg-black text-white" : "hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="px-3 py-2 rounded-xl border text-sm hover:bg-gray-50"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
