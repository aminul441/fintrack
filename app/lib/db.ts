import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("MONGODB_URI missing in .env.local");

type Cache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: Cache | undefined;
}

const cached = global.mongooseCache || { conn: null, promise: null };
global.mongooseCache = cached;

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) cached.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  cached.conn = await cached.promise;
  return cached.conn;
}
