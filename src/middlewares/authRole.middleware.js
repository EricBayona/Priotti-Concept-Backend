import { logger } from "../utils/logger.js";

export const authRole = (roles) => {
    return (req, res, next) => {
        try {
            if (!req.user) return res.status(400).json({ status: "error", msg: "Unauthorized" });
            if (!roles.includes(req.user.role)) return res.status(403).json({ status: "error", msg: "Forbidden" });

            next();
        } catch (error) {
            logger.warn(error);
            res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
    }
} 