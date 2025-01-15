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
 * /api/drivers:
 *   get:
 *     summary: Get all drivers
 *     tags: [Drivers]
 *     responses:
 *       200:
 *         description: A list of drivers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique identifier for the driver.
 *                   name:
 *                     type: string
 *                     description: The name of the driver.
 *                   email:
 *                     type: string
 *                     description: The email of the driver.
 *                   assignedCargos:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: The unique identifier for the cargo.
 *                         title:
 *                           type: string
 *                           description: The title of the cargo.
 *                         origin:
 *                           type: string
 *                           description: The origin of the cargo.
 *                         destination:
 *                           type: string
 *                           description: The destination of the cargo.
 *                         weight:
 *                           type: number
 *                           format: float
 *                           description: The weight of the cargo.
 *                         company:
 *                           type: string
 *                           description: The company handling the cargo.
 *       500:
 *         description: Failed to fetch drivers
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
  if (req.method === "GET") {
    try {
      const drivers = await prisma.driver.findMany({
        include: { assignedCargos: true },
      });
      res.status(200).json(drivers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch drivers" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
