/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "rc/lib/db"; // Assuming prisma client is initialized here

/**
 * @swagger
 * tags:
 *   name: Cargos
 *   description: API for managing cargos
 */

/**
 * @swagger
 * /api/cargos:
 *   get:
 *     summary: Get all cargos
 *     tags: [Cargos]
 *     responses:
 *       200:
 *         description: A list of cargos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique identifier for the cargo.
 *                   title:
 *                     type: string
 *                     description: The title of the cargo.
 *                   origin:
 *                     type: string
 *                     description: The origin of the cargo.
 *                   destination:
 *                     type: string
 *                     description: The destination of the cargo.
 *                   weight:
 *                     type: number
 *                     format: float
 *                     description: The weight of the cargo.
 *                   company:
 *                     type: string
 *                     description: The company handling the cargo.
 *       500:
 *         description: Failed to fetch cargos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /api/cargo:
 *   post:
 *     summary: Create a new cargo
 *     tags: [Cargos]
 *     requestBody:
 *       description: Cargo data to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the cargo.
 *                 example: "Electronics"
 *               origin:
 *                 type: string
 *                 description: The origin of the cargo.
 *                 example: "New York"
 *               destination:
 *                 type: string
 *                 description: The destination of the cargo.
 *                 example: "Los Angeles"
 *               weight:
 *                 type: number
 *                 format: float
 *                 description: The weight of the cargo.
 *                 example: 1500.5
 *               company:
 *                 type: string
 *                 description: The company handling the cargo.
 *                 example: "ABC Corp"
 *     responses:
 *       201:
 *         description: Cargo created successfully
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
 *       400:
 *         description: Failed to create cargo
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
  if (req.method === "GET") {
    try {
      const cargos = await prisma.cargo.findMany();
      res.status(200).json(cargos);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cargos" });
    }
  } else if (req.method === "POST") {
    try {
      const { title, origin, destination, weight, company } = req.body;
      const newCargo = await prisma.cargo.create({
        data: { title, origin, destination, weight, company },
      });
      res.status(201).json(newCargo);
    } catch (error) {
      res.status(400).json({ error: "Failed to create cargo" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
