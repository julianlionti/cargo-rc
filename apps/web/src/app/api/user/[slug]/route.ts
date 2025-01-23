import { NextRequest, NextResponse } from "next/server";
import { db } from "rc/lib/db";
import { SlugParams } from "rc/types/api";

export async function GET(request: NextRequest, { params }: SlugParams) {
  const { slug: userId } = await params;
  console.log(userId);
  const user = await db.user.findUnique({ where: { uid: userId } });
  return NextResponse.json(user);
}
