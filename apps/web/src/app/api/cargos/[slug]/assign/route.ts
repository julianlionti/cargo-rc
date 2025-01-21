import { NextRequest, NextResponse } from "next/server";
import { db } from "rc/lib/db";
import { getUserFromServerSession, responseError } from "rc/utils/api.utils";

/**
 * @swagger
 * /api/cargos/{id}/assign:
 *   post:
 *     summary: Assign a cargo to a driver
 *     description: Updates a cargo's assigned driver and status to "PENDING".
 *     tags:
 *       - Cargos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID of the cargo to be assigned
 *     responses:
 *       200:
 *         description: Successfully assigned the cargo to the driver
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID of the updated cargo
 *                 assignedToId:
 *                   type: string
 *                   description: ID of the assigned driver
 *                 status:
 *                   type: string
 *                   enum: [AVAILABLE, IN_TRANSIT, DELIVERED, PICKED_UP, CANCELLED, PENDING]
 *                   description: The updated status of the cargo
 *       400:
 *         description: Bad request, failed to assign cargo
 *       500:
 *         description: Internal server error
 */

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug: cargoIdFromUrl } = await params;

    const { id: userId } = await getUserFromServerSession();
    // Fetch the related driver record
    const driver = await db.driver.findUnique({ where: { userId } });
    if (!driver) throw new Error("No driver record found for this user");

    // Update the cargo
    const updatedCargo = await db.cargo.update({
      where: { id: cargoIdFromUrl },
      data: {
        assignedToId: driver.id, // Use driver ID for assignment
        status: "PENDING",
      },
    });

    return NextResponse.json(updatedCargo);
  } catch (error) {
    console.error("Error in POST /assign-cargo:", error);
    return responseError("Failed to assign cargo", 400);
  }
}
