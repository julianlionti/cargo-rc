import { NextResponse } from "next/server";
import { db } from "rc/lib/db";

export async function GET() {
  const companies = await db.company.findMany({});
  return NextResponse.json(companies);
}
