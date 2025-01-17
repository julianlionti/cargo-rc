import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodTypeAny } from "zod";

// Middleware to validate request bodies
export const validateBody = (schema: ZodTypeAny) => {
  return (
    handler: (req: NextApiRequest, res: NextApiResponse) => void | Promise<void>
  ) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      try {
        if (req.body) {
          // Parse and validate the request body
          req.body = schema.parse(req.body);
        }
        await handler(req, res);
      } catch (error) {
        if (error instanceof z.ZodError) {
          // Handle validation errors
          return res.status(400).json({
            error: "Validation failed",
            details: error.errors.map((err) => ({
              path: err.path,
              message: err.message,
            })),
          });
        }
        // For other errors, return a generic 500
        res.status(500).json({ error: "Internal Server Error" });
      }
    };
  };
};
