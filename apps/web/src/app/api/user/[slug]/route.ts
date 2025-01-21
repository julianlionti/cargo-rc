import { NextRequest, NextResponse } from "next/server";
import { db } from "rc/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug: userId } = await params;
  const user = await db.user.findUnique({ where: { uid: userId } });
  return NextResponse.json(user);
}
