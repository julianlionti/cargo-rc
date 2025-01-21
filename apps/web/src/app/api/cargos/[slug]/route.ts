/* eslint-disable @typescript-eslint/no-unused-vars */
import { CargoSchema } from "@utils/dist";
import { Console } from "console";
import { NextResponse } from "next/server";
import { db } from "rc/lib/db";
import { responseError } from "rc/utils/api.utils";

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
 *               reward:
 *                 type: number
 *                 format: float
 *                 description: The reward of the cargo.
 *                 example: 1505000
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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const slug = (await params).slug;
    const cargo = await db.cargo.findUnique({ where: { id: slug } });

    if (!cargo) return responseError("Cargo doesn't exist", 404);
    return NextResponse.json(cargo);
  } catch (error) {
    return responseError("Failed to get cargo", 400);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { id, ...data }: CargoSchema = await request.json();
    console.log(slug, data);

    const updatedCargo = await db.cargo.update({
      where: { id: slug },
      data: {
        ...data,
      },
    });
    return NextResponse.json(updatedCargo);
  } catch (error) {
    console.log(error);
    return responseError("Failed to update cargo", 400);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const slug = (await params).slug;

    await db.cargo.delete({ where: { id: slug } });
    return NextResponse.json(undefined, { status: 204 });
  } catch (error) {
    return responseError("Failed to delete cargo", 400);
  }
}
