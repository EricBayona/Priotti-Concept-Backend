import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { registerSchema } from "../schemas/register.schema.js";
import { passportCall } from "../middlewares/passporCall.middleware.js";
import { authController } from "../controller/auth.controller.js";
import { loginSchema } from "../schemas/login.schema.js";
import { validateNewPassword } from "../schemas/validateNewPassword.schema.js";
import { validateEmail } from "../schemas/validateEmail.schema.js";


const router = Router();

router.post("/login", validateSchema({ body: loginSchema }), passportCall("login"), authController.login);

router.post("/register", validateSchema({ body: registerSchema }), passportCall("register"), authController.register);

router.get("/current", passportCall("jwt"), authController.current);

router.get("/logout", passportCall("jwt"), authController.logout);

router.post("/forgot-password", validateSchema({ body: validateEmail }), authController.forgotPassword);

router.post("/reset-password/:token", validateSchema({ body: validateNewPassword }), authController.resetPassword);



export default router; 