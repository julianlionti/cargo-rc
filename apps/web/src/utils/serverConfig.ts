"use server";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
});

export default envSchema.parse(process.env);
