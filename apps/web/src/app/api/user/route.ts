import { NextResponse } from "next/server";
import { db } from "rc/lib/db";

export async function GET() {
  const users = await db.user.findMany({});
  return NextResponse.json(users);
}
