import { z } from 'zod';

export const createProductSchema = z.object({
    title: z.string().nonempty().min(3),
    description: z.string().nonempty().min(3),
    price: z.coerce.number(),
    code: z.string(),
    stock: z.coerce.number(),
    category: z.string(),
})