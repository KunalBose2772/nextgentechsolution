import { NextResponse } from "next/server";
import { TOKEN_KEY } from "@/lib/auth";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete(TOKEN_KEY);
  return res;
}
