import { z } from "zod";

export const cargoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  origin: z.string().min(1, "Origin is required"),
  destination: z.string().min(1, "Destination is required"),
  weight: z.number().positive("Weight must be a positive number"),
  company: z.string().min(1, "Company is required"),
  reward: z.number().positive("Reward must be a positive number"),
  size: z.enum(["SMALL", "MEDIUM", "LARGE"]),
  urgency: z.enum(["LOW", "MEDIUM", "HIGH"]),
  originLat: z.number().min(-90).max(90, "Latitude must be between -90 and 90"),
  originLng: z
    .number()
    .min(-180)
    .max(180, "Longitude must be between -180 and 180"),
  destinationLat: z.number().min(-90).max(90),
  destinationLng: z.number().min(-180).max(180),
  distanceAprox: z.number().nullable(),
  deliveryDateTime: z.date(),
});

export type CargoSchema = z.infer<typeof cargoSchema>;
