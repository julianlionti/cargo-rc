import { NextResponse } from "next/server";

export async function GET() {
  const types = [];
  return NextResponse.json(types);
}
