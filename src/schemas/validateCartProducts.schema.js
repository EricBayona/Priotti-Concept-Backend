import mongoose from "mongoose";
import { z } from "zod";

const objectIdSchema = z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
    message: "El product debe ser un ObjectId válido",
});

export const validateCartProducts = z.object({
    products: z.array(
        z.object({
            product: objectIdSchema,
            quantity: z.number().int().min(1),
        })
    ),
});
