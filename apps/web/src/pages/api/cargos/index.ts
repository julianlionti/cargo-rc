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
 *                     type: string
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
 *                   size:
 *                     type: string
 *                     enum: [SMALL, MEDIUM, LARGE]
 *                     description: The size of the cargo.
 *                   urgency:
 *                     type: string
 *                     enum: [LOW, MEDIUM, HIGH]
 *                     description: The urgency of the cargo.
 *                   status:
 *                     type: string
 *                     enum: [AVAILABLE, IN_TRANSIT, DELIVERED, PICKED_UP, CANCELLED]
 *                     description: The status of the cargo.
 *                   originLat:
 *                     type: number
 *                     format: float
 *                     description: Latitude of the origin.
 *                   originLng:
 *                     type: number
 *                     format: float
 *                     description: Longitude of the origin.
 *                   destinationLat:
 *                     type: number
 *                     format: float
 *                     description: Latitude of the destination.
 *                   destinationLng:
 *                     type: number
 *                     format: float
 *                     description: Longitude of the destination.
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
 * /api/cargos:
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
 *               reward:
 *                 type: number
 *                 format: float
 *                 description: The reward of the cargo.
 *                 example: 1505000
 *               company:
 *                 type: string
 *                 description: The company handling the cargo.
 *                 example: "ABC Corp"
 *               size:
 *                 type: string
 *                 enum: [SMALL, MEDIUM, LARGE]
 *                 description: The size of the cargo.
 *                 example: "LARGE"
 *               urgency:
 *                 type: string
 *                 enum: [LOW, MEDIUM, HIGH]
 *                 description: The urgency of the cargo.
 *                 example: "HIGH"
 *               originLat:
 *                 type: number
 *                 format: float
 *                 description: Latitude of the origin.
 *                 example: 40.7128
 *               originLng:
 *                 type: number
 *                 format: float
 *                 description: Longitude of the origin.
 *                 example: -74.0060
 *               destinationLat:
 *                 type: number
 *                 format: float
 *                 description: Latitude of the destination.
 *                 example: 34.0522
 *               destinationLng:
 *                 type: number
 *                 format: float
 *                 description: Longitude of the destination.
 *                 example: -118.2437
 *     responses:
 *       201:
 *         description: Cargo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
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
 *                 size:
 *                   type: string
 *                   enum: [SMALL, MEDIUM, LARGE]
 *                   description: The size of the cargo.
 *                 urgency:
 *                   type: string
 *                   enum: [LOW, MEDIUM, HIGH]
 *                   description: The urgency of the cargo.
 *                 status:
 *                   type: string
 *                   enum: [AVAILABLE, IN_TRANSIT, DELIVERED, PICKED_UP, CANCELLED]
 *                   description: The status of the cargo.
 *                 originLat:
 *                   type: number
 *                   format: float
 *                   description: Latitude of the origin.
 *                 originLng:
 *                   type: number
 *                   format: float
 *                   description: Longitude of the origin.
 *                 destinationLat:
 *                   type: number
 *                   format: float
 *                   description: Latitude of the destination.
 *                 destinationLng:
 *                   type: number
 *                   format: float
 *                   description: Longitude of the destination.
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
      const {
        title,
        origin,
        destination,
        weight,
        company,
        reward,
        size,
        urgency,
        originLat,
        originLng,
        destinationLat,
        destinationLng,
      } = req.body;

      const newCargo = await prisma.cargo.create({
        data: {
          title,
          origin,
          destination,
          weight,
          company,
          size,
          urgency,
          reward,
          originLat,
          originLng,
          destinationLat,
          destinationLng,
          status: "AVAILABLE", // Default status
        },
      });

      res.status(201).json(newCargo);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Failed to create cargo" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
