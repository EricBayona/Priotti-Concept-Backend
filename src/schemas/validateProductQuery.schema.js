import { z } from "zod";

export const validateProductQuery = z.object({
  limit: z.coerce.number().int().min(1).max(100).optional(),
  page: z.coerce.number().int().min(1).optional(),
  sort: z.enum(["asc", "desc"]).optional(),
  category: z.string().optional(),
  status: z.enum(["true", "false"]).optional()
}).strict();
