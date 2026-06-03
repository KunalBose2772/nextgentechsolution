import { NextRequest, NextResponse } from "next/server";
import { verifyToken, getStaticUsers, TOKEN_KEY } from "@/lib/auth";

async function getUser(req: NextRequest) {
  const token = req.cookies.get(TOKEN_KEY)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function GET(req: NextRequest) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const users = getStaticUsers().map((u) => ({
    ...u,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  return NextResponse.json({ data: users, total: users.length });
}
