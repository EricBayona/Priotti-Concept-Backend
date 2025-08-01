import { z } from "zod";

export const validateNewPassword = z.object({
    newPassword: z.string().regex(/^(?=.*[A-Z])(?=.*[\W_]).{8,20}$/, {
        message: "La contraseña debe tener entre 8 y 20 caracteres, al menos una mayúscula y un carácter especial"
    })
})