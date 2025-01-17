import prisma from "@prisma/client";
import { NextResponse } from "next/server";
import { responseError } from "rc/utils/api.utils";

/**
 * @swagger
 * tags:
 *   name: Cargos
 *   description: API for managing cargos
 */

/**
 * @swagger
 * /api/cargos/enums:
 *   get:
 *     tags: [Cargos]
 *     summary: Retrieve cargo enums for filtering
 *     description: Fetches available enums for cargo size, urgency, and reward for filtering options.
 *     responses:
 *       200:
 *         description: A list of enums for cargo filtering
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 CargoSize:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["SMALL", "MEDIUM", "LARGE"]
 *                 CargoUrgency:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["LOW", "MEDIUM", "HIGH"]
 *                 CargoReward:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["high", "medium", "low"]
 *       500:
 *         description: Error fetching enums
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching enums"
 */

export async function GET() {
  try {
    const enums = {
      CargoSize: Object.values(prisma.CargoSize),
      CargoUrgency: Object.values(prisma.CargoUrgency),
      CargoReward: ["high", "medium", "low"], // or other values, adjust as necessary
    };
    return NextResponse.json(enums, { status: 200 });
  } catch (error) {
    console.error("Error fetching enums:", error);
    return responseError("Error fetching enums");
  }
}
