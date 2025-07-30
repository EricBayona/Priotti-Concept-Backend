import { z } from 'zod';

export const validateQuantity = z.object({
    quantity: z.number().int().positive({ message: "Quantity must be a positive integer" })
});