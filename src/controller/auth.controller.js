import jwt from "jsonwebtoken";
import { authService } from "../services/authService.js";
import { userService } from "../services/userService.js";
import { logger } from "../utils/logger.js";
import { envsConfig } from "../config/envs.config.js";
import { hasPassword } from "../utils/hasPassword.js";
import { sendRecoveryMail } from "../utils/mail.js";

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
            logger.error("Login error", error);
            res.status(401).json({
                stattus: "error",
                message: "Credenciales inválidas. Verificá tu email y contraseña"
            });
        }
    };

    async register(req, res) {
        try {
            const user = await authService.register(req.user);
            res.status(201).json({ status: "ok", user });
        } catch (error) {
            logger.error("Register error:", error);
            res.status(500).json({
                status: "error",
                message: "No se pudo completar el registro. Intentá más tarde."
            });
        }
    };

    async current(req, res) {
        try {
            const result = await authService.current(req.user, req.cookies.token);
            res.status(200).json({ status: "ok", user: result });
        } catch (error) {
            logger.error("Current user error:", error);
            res.status(500).json({
                status: "error",
                message: "No se pudo obtener el usuario actual."
            });
        }
    };

    async logout(req, res) {
        try {
            const result = await authService.logout();
            res.clearCookie("token");
            res.status(200).json({ status: "ok", message: "Sesión cerrada correctamente." });
        } catch (error) {
            logger.error("Logout error:", error);
            res.status(500).json({
                status: "error",
                message: "No se pudo cerrar la sesión."
            });
        }
    };

    async forgotPassword(req, res) {
        const { email } = req.body;
        try {
            const user = await userService.getUserByEmail(email);
            if (!user) return res.status(404).json({ stattus: "error", message: "No se encontró un usuario con ese email." });

            const token = jwt.sign(
                { email },
                envsConfig.JWT_SECRET,
                { expiresIn: "30m" }
            );

            const recoveryUrl = `http://localhost:8080/api/auth/reset-password/${token}`;

            await sendRecoveryMail(email, recoveryUrl);
            res.status(200).json({
                status: "ok", message: "Correo de recuperacion enviado"
            });
        } catch (error) {
            logger.error("Forgot password error:", error);
            res.status(500).json({
                status: "error",
                message: "No se pudo enviar el correo de recuperación."
            });
        };
    };

    async resetPassword(req, res) {
        const { token } = req.params;
        const { newPassword } = req.body;
        try {
            const decoded = jwt.verify(token, envsConfig.JWT_SECRET);
            const user = await userService.getUserByEmail(decoded.email);
            if (!user) return res.status(404).json({ stattus: "error", message: "Usuario no encontrado." });

            const passaword = hasPassword(newPassword);
            await userService.updatePassword(user._id, passaword);

            res.status(200).json({ status: "ok", message: "Contraseña actualizada" });
        } catch (error) {
            logger.error("Reset password error:", error);
            res.status(500).json({ status: "error", message: "No se pudo actualizar la contraseña." });
        }
    };
}

export const authController = new AuthController();