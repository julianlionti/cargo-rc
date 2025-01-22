import { NextRequest, NextResponse } from "next/server";
import { db } from "rc/lib/db";
import { SlugParams } from "rc/types/api";

export async function GET(request: NextRequest, { params }: SlugParams) {
  const { slug: driverId } = await params;
  const driver = await db.driver.findUnique({
    where: { id: driverId },
    include: { user: true },
  });

  return NextResponse.json(driver);
}
