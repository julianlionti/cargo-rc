import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  AUTH_GOOGLE_ID: z.string(),
  AUTH_GOOGLE_SECRET: z.string(),
});

export default envSchema.parse(process.env);
