import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "../../lib/db";
import User from "../../models/User";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = (body?.name || "").toString().trim();
    const email = (body?.email || "").toString().toLowerCase().trim();
    const password = (body?.password || "").toString();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    await connectDB();

    const exists = await User.findOne({ email } as any);
    if (exists) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashed });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err: any) {
    console.error("REGISTER_ERROR:", err);
    return NextResponse.json(
      { error: err?.message || "Register failed" },
      { status: 500 }
    );
  }
}
