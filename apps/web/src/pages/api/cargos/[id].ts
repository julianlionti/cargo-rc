/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "rc/lib/db";

/**
 * @swagger
 * tags:
 *   name: Cargos
 *   description: API for managing cargos
 */

/**
 * @swagger
 * /api/cargos/{id}:
 *   get:
 *     summary: Get a cargo by ID
 *     tags: [Cargos]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the cargo to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The cargo with the specified ID
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
 *       404:
 *         description: Cargo not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Failed to fetch cargo
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
 * /api/cargos/{id}:
 *   put:
 *     summary: Update an existing cargo by ID
 *     tags: [Cargos]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the cargo to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: The data to update the cargo
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the cargo.
 *               origin:
 *                 type: string
 *                 description: The origin of the cargo.
 *               destination:
 *                 type: string
 *                 description: The destination of the cargo.
 *               weight:
 *                 type: number
 *                 format: float
 *                 description: The weight of the cargo.
 *               company:
 *                 type: string
 *                 description: The company handling the cargo.
 *     responses:
 *       200:
 *         description: The updated cargo
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
 *         description: Failed to update cargo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       404:
 *         description: Cargo not found
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
 * /api/cargos/{id}:
 *   delete:
 *     summary: Delete a cargo by ID
 *     tags: [Cargos]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the cargo to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Cargo deleted successfully
 *       400:
 *         description: Failed to delete cargo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       404:
 *         description: Cargo not found
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
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const cargo = await prisma.cargo.findUnique({
        where: { id: id as string },
      });
      if (!cargo) return res.status(404).json({ error: "Cargo not found" });
      res.status(200).json(cargo);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cargo" });
    }
  } else if (req.method === "PUT") {
    try {
      const updatedCargo = await prisma.cargo.update({
        where: { id: id as string },
        data: req.body,
      });
      res.status(200).json(updatedCargo);
    } catch (error) {
      res.status(400).json({ error: "Failed to update cargo" });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.cargo.delete({ where: { id: id as string } });
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete cargo" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
