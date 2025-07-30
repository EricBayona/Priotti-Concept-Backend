import { authService } from "../services/authService.js";
import { logger } from "../utils/logger.js";

class AuthController {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const { user, token } = await authService.login(email, password);

            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
            });

            res.status(200).json({ status: "ok", user, token });
        } catch (error) {
            logger.warn("Login error", error);
            res.status(401).json({ stattus: "error", message: "Email or password is incorrect" });
        }
    };

    async register(req, res) {
        try {
            const user = await authService.register(req.body);
            res.status(201).json({ message: user });
        } catch (error) {
            logger.warn("Register error:", error);
            res.status(500).json({ status: "error", message: "Error en el registro" });
        }
    };

    async current(req, res) {
        try {
            const result = await authService.current(req.user, req.cookies.token);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
    };

    async logout(req, res) {
        try {
            const result = await authService.logout();
            res.clearCookie("token");
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
    };
}

export const authController = new AuthController();