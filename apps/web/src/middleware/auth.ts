import { NextApiRequest, NextApiResponse } from "next";
import { UserRole } from "@prisma/client";
import { getSession } from "next-auth/react";
import { db } from "rc/lib/db";

export const authenticate = (requiredRoles: UserRole[] = []) => {
  return (
    handler: (req: NextApiRequest, res: NextApiResponse) => void | Promise<void>
  ) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      try {
        const session = await getSession({ req });
        if (!session?.user) {
          return res
            .status(401)
            .json({ error: "Unauthorized: No token provided" });
        }

        const email = session.user.email || "";
        if (!email) {
          return res
            .status(401)
            .json({ error: "Unauthorized: User with no email" });
        }
        const user = await db.user.findUnique({ where: { email } });
        if (!user) {
          return res.status(401).json({ error: "Unauthorized: No user" });
        }

        if (
          requiredRoles.length > 0 &&
          !requiredRoles.some((role) => user.role.includes(role))
        ) {
          return res
            .status(403)
            .json({ error: "Forbidden: Insufficient permissions" });
        }

        await handler(req, res);
      } catch (error) {
        console.error("Authentication error:", error);
        res
          .status(401)
          .json({ error: "Unauthorized: Invalid or expired token" });
      }
    };
  };
};
