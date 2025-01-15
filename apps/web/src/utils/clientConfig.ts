// lib/env/client.ts

"use client";

import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_NEXTAUTH_URL: z.string(),
  NEXT_PUBLIC_HERE_API: z.string(),
});

export default envSchema.parse({
  NEXT_PUBLIC_NEXTAUTH_URL: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
  NEXT_PUBLIC_HERE_API: process.env.NEXT_PUBLIC_HERE_API,
});
