import passport from "passport";
import { logger } from "../utils/logger.js";

export const passportCall = (strategy) => {
    return (req, res, next) => {
        passport.authenticate(strategy, (err, user, info) => {
            if (err) return next(err);
            logger.info(info)
            if (!user) return res.status(401).json({ status: "error", msg: info.message, });
            req.user = user;
            next();
        })(req, res, next);
    };
};
