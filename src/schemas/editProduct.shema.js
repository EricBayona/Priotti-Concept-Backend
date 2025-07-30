import { z } from 'zod';

export const editProductSchema = z.object({
    title: z.string().nonempty().min(3).optional(),
    description: z.string().nonempty().min(3).optional(),
    price: z.number().optional(),
    thumbnails: z.array(z.string()).optional(),
    code: z.string().optional(),
    stock: z.number().optional(),
    category: z.string().optional(),
}).strict();