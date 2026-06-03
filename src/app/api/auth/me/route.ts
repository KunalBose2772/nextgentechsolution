import { NextRequest, NextResponse } from "next/server";
import { verifyToken, getStaticUsers, TOKEN_KEY } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(TOKEN_KEY)?.value;
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const payload = await verifyToken(token);
  if (!payload?.sub) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

  const user = getStaticUsers().find((u) => u._id === payload.sub);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({
    user: {
      ...user,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  });
}
