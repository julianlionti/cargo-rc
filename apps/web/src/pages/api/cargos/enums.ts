// pages/api/cargoEnums.js
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@prisma/client";

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const enums = {
      CargoSize: Object.values(prisma.CargoSize),
      CargoUrgency: Object.values(prisma.CargoUrgency),
      CargoReward: ["high", "medium", "low"], // or other values, adjust as necessary
    };

    res.status(200).json(enums);
  } catch (error) {
    console.error("Error fetching enums:", error);
    res.status(500).json({ message: "Error fetching enums" });
  }
}
