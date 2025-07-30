import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Debe ser un tipo de email válido"),
    password: z.string().regex(/^(?=.*[A-Z])(?=.*[\W_]).{8,20}$/, "Debe tener entre 8 y 20 caracteres, al menos una mayúscula y un símbolo"),
}).strict();