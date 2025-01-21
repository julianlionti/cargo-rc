import { z } from "zod";

export const cargoSchema = z.object({
  id: z.string().optional(), // Optional for creating a new Cargo, required for updates
  title: z.string().min(1, "Title is required").max(255, "Title is too long"),
  origin: z.string().min(1, "Origin is required"),
  destination: z.string().min(1, "Destination is required"),
  weight: z.number().min(0, "Weight must be a positive number"),
  reward: z.number().min(0, "Reward must be a positive number"),
  size: z.enum(["SMALL", "MEDIUM", "LARGE"]), // Enum for CargoSize
  urgency: z.enum(["LOW", "MEDIUM", "HIGH"]), // Enum for CargoUrgency

  companyId: z.string().optional(), // Optional if the company is not assigned

  originLat: z.number().min(-90).max(90, "Latitude must be between -90 and 90"),
  originLng: z
    .number()
    .min(-180)
    .max(180, "Longitude must be between -180 and 180"),
  destinationLat: z
    .number()
    .min(-90)
    .max(90, "Latitude must be between -90 and 90"),
  destinationLng: z
    .number()
    .min(-180)
    .max(180, "Longitude must be between -180 and 180"),

  distanceAprox: z
    .number()
    .min(0, "Distance must be a positive number")
    .optional(),

  deliveryDateTime: z.date().optional(), // Optional to allow default value at creation

  assignedToId: z.string().optional(), // Driver assignment is optional
  requestedById: z.string().optional(), // Driver request is optional
  requestedAt: z.date().optional(), // Optional timestamp for request
  approvedAt: z.date().optional(), // Optional timestamp for approval

  status: z.enum([
    "AVAILABLE",
    "PENDING",
    "IN_TRANSIT",
    "DELIVERED",
    "PICKED_UP",
    "CANCELLED",
  ]), // Enum for CargoStatus
});

export type CargoSchema = z.infer<typeof cargoSchema>;
