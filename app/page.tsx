import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white border shadow-sm rounded-2xl p-6 space-y-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold">FinTrack</h1>
          <p className="text-sm text-gray-500">
            Track income & expenses. Built with Next.js + MongoDB + Auth.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Link className="text-center py-2.5 rounded-xl bg-black text-white hover:opacity-90" href="/login">
            Login
          </Link>
          <Link className="text-center py-2.5 rounded-xl border hover:bg-gray-50" href="/register">
            Register
          </Link>
        </div>

        <div className="text-xs text-gray-400">
          Portfolio-ready: Auth, Protected API, User-wise data.
        </div>
      </div>
    </main>
  );
}
