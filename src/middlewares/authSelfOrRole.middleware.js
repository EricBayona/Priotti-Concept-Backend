export const authSelfOrRole = (roles) => {
    return (req, res, next) => {
        try {
            if (!req.user) return res.status(400).json({ status: "error", msg: "Unauthorized" });
            if (req.user._id?.toString() === req.params.uid) return next();
            if (roles.includes(req.user.role)) return next();

            return res.status(403).json({ status: "error", msg: "Forbidden" });
        }
        catch (error) {
            logger.warn(error);
            res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
    }
}