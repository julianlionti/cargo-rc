import { NextRequest, NextResponse } from "next/server";
import { db } from "rc/lib/db";
import { SlugParams } from "rc/types/api";
import { responseError } from "rc/utils/api.utils";

export async function POST(request: NextRequest, { params }: SlugParams) {
  try {
    const { slug: driverId } = await params;
    const { lat, lng } = await request.json();

    if (!driverId || lat == null || lng == null) {
      throw new Error("Invalid input");
    }

    const updatedDriver = await db.driver.update({
      where: { id: driverId },
      data: {
        lastKnownLat: lat,
        lastKnownLng: lng,
        lastLocationTime: new Date(),
      },
    });

    return NextResponse.json(updatedDriver);
  } catch (error) {
    console.error("Error updating driver location:", error);
    return responseError("Failed to update location", 400);
  }
}
