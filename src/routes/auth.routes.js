import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { registerSchema } from "../schemas/register.schema.js";
import { passportCall } from "../middlewares/passporCall.middleware.js";
import { authController } from "../controller/auth.controller.js";
import { loginSchema } from "../schemas/login.schema.js";


const router = Router();

router.post("/login", validateSchema({ body: loginSchema }), passportCall("login"), authController.login);

router.post("/register", validateSchema({ body: registerSchema }), passportCall("register"), authController.register);

router.get("/current", passportCall("jwt"), authController.current);

router.get("/logout", passportCall("jwt"), authController.logout);

export default router;