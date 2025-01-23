import { z } from "zod";

export const basicDriverSchema = z.object({
  firstName: z.string().min(1, "First name is required").nullable(),
  lastName: z.string().min(1, "Last name is required").nullable(),
  email: z.string().email("Invalid email format"),
  phoneNumber: z.string().min(1, "Phone number is required").nullable(),
  licenseNumber: z.string().min(1, "License number is required").nullable(),
  bornDate: z.date().refine((bornDate) => {
    const today = new Date();
    const age = today.getFullYear() - bornDate.getFullYear();
    const isBirthdayPassed =
      today.getMonth() > bornDate.getMonth() ||
      (today.getMonth() === bornDate.getMonth() &&
        today.getDate() >= bornDate.getDate());
    return isBirthdayPassed ? age >= 18 : age - 1 >= 18;
  }),
  experienceYears: z
    .number()
    .min(0, "Experience cannot be negative")
    .max(50, "Experience must be realistic")
    .nullable(),
});

export type DriverSchema = z.infer<typeof basicDriverSchema>;

export const driverDetailsSchema = z.object({
  vehicleType: z.enum(["Truck", "Van", "Car"], {
    required_error: "Vehicle type is required",
  }),
  vehicleRegistrationNumber: z
    .string()
    .min(1, "Vehicle registration number is required"),
  vehicleCapacity: z
    .number()
    .min(1, "Vehicle capacity must be at least 1 ton")
    .nullable(),
  insuranceDocument: z.string().min(1, "Insurance document is required"),
  licenseNumber: z.string().min(1, "License number is required"),
  licenseExpiryDate: z.date({
    required_error: "License expiry date is required",
  }),
  licenseImage: z.string().min(1, "License image is required"),
});

export type DriverDetailsSchema = z.infer<typeof driverDetailsSchema>;
