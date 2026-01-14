import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { connectDB } from "../../lib/db";
import Transaction from "../../models/Transaction";


export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id;
  await connectDB();

  const data = await Transaction.find({ userId } as any).sort({ createdAt: -1 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id;
  const body = await req.json();

  const title = (body?.title || "").trim();
  const amount = Number(body?.amount);
  const type = body?.type;

  if (!title || !Number.isFinite(amount) || amount <= 0 || !["income", "expense"].includes(type)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  await connectDB();
  const tx = await Transaction.create({ userId, title, amount, type });
  return NextResponse.json(tx, { status: 201 });
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await connectDB();
  const tx = await Transaction.findOne({ _id: id, userId } as any);
  if (!tx) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await Transaction.deleteOne({ _id: id, userId } as any);

  return NextResponse.json({ ok: true });
}

