export const authorizeUserByEmail = (req, res, next) => {
    const { email } = req.params;
    const user = req.user;

    if (user.role === "admin") return next();

    if (user.email !== email) {
        return res.status(403).json({
            status: "error",
            msg: "No estás autorizado para ver el historial de otro usuario",
        });
    }

    next();
};
