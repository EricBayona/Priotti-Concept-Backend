import { z } from 'zod';

export const registerSchema = z.object({
    first_name: z.string().nonempty().min(3),
    last_name: z.string().nonempty().min(3),
    email: z.string().email(),
    birthDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Debe tener el formato YYYY-MM-DD" })
        .transform((val) => new Date(val))
        .refine((val) => val instanceof Date && !isNaN(val), {
            message: "Debe ser una fecha válida",
        })
        .refine((date) => {
            const today = new Date();
            const age = today.getFullYear() - date.getFullYear();
            const monthDiff = today.getMonth() - date.getMonth();
            const dayDiff = today.getDate() - date.getDate();

            if (
                monthDiff < 0 ||
                (monthDiff === 0 && dayDiff < 0)
            ) {
                return age - 1 >= 18;
            }

            return age >= 18;
        }, {
            message: "Debés ser mayor de 18 años para registrarte",
        }),
    password: z.string().regex(/^(?=.*[A-Z])(?=.*[\W_]).{8,20}$/, {
        message: "La contraseña debe tener entre 8 y 20 caracteres, al menos una mayúscula y un carácter especial"
    }),
    role: z.enum(["user", "admin"]).optional(),
}).strict();