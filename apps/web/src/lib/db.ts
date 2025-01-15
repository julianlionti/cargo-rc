import { PrismaClient } from "@prisma/client";

// Add a global variable for Prisma client to prevent multiple instances in development
declare global {
  // This must be a global namespace to prevent redefinition errors
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma; // Assign to global in development
}

export default prisma;
