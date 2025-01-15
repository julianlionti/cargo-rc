/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "rc/lib/db";

/**
 * @swagger
 * tags:
 *   name: Drivers
 *   description: API for managing drivers
 */

/**
 * @swagger
 * /api/drivers/assign:
 *   post:
 *     summary: Assign a cargo to a driver
 *     tags: [Drivers]
 *     requestBody:
 *       description: Driver and cargo information for assignment
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               driverId:
 *                 type: string
 *                 description: The unique identifier for the driver.
 *                 example: "12345"
 *               cargoId:
 *                 type: string
 *                 description: The unique identifier for the cargo.
 *                 example: "67890"
 *     responses:
 *       200:
 *         description: Cargo successfully assigned to driver
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique identifier for the cargo.
 *                 title:
 *                   type: string
 *                   description: The title of the cargo.
 *                 origin:
 *                   type: string
 *                   description: The origin of the cargo.
 *                 destination:
 *                   type: string
 *                   description: The destination of the cargo.
 *                 weight:
 *                   type: number
 *                   format: float
 *                   description: The weight of the cargo.
 *                 company:
 *                   type: string
 *                   description: The company handling the cargo.
 *                 assignedToId:
 *                   type: string
 *                   description: The driver ID assigned to the cargo.
 *       400:
 *         description: Failed to assign cargo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       405:
 *         description: Method Not Allowed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { driverId, cargoId } = req.body;

      const updatedCargo = await prisma.cargo.update({
        where: { id: cargoId },
        data: { assignedToId: driverId },
      });

      res.status(200).json(updatedCargo);
    } catch (error) {
      res.status(400).json({ error: "Failed to assign cargo" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
