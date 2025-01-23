/* eslint-disable @typescript-eslint/no-unused-vars */
import { DriverSchema } from "@utils";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "rc/lib/db";
import { getUserFromServerSession, responseError } from "rc/utils/api.utils";
import authOptions from "rc/utils/auth.utils";

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

export async function GET(request: Request) {
  try {
    const drivers = await db.driver.findMany({
      include: { assignedCargos: true },
    });
    return NextResponse.json(drivers);
  } catch (error) {
    return responseError("Failed to fetch drivers");
  }
}

export async function POST(request: Request) {
  try {
    const { id } = await getUserFromServerSession();
    const driver = (await request.json()) as DriverSchema;
    const {
      licenseNumber,
      bornDate,
      email,
      experienceYears,
      firstName,
      lastName,
      phoneNumber,
    } = driver;

    await db.user.update({
      where: { id },
      data: { bornDate, email, firstName, lastName, phoneNumber },
    });

    const updated = await db.driver.upsert({
      where: { userId: id },
      create: {
        userId: id,
        licenseNumber,
        experienceYears,
      },
      update: {
        licenseNumber,
        experienceYears,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return responseError("Failed to fetch drivers");
  }
}
