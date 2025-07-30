export const authCartOwner = (req, res, next) => {
    const { cid } = req.params;
    if (!req.user.cart || req.user.cart.toString() !== cid) {
        return res.status(403).json({ status: "error", msg: "You do not have permission to access or modify carts that belong to other users." });
    }
    next();
};