import mongoose from "mongoose";

export const validateParamsObjectId = (...paramKeys) => {
    return (req, res, next) => {
        for (const key of paramKeys) {
            const value = req.params[key];

            if (!mongoose.Types.ObjectId.isValid(value)) {
                req.logger?.warn?.(`${req.method} ${req.originalUrl} - Param ${key} inválido`);
                return res.status(400).json({
                    status: "error",
                    message: `Invalid ${key} ID format`,
                });
            }
        }
        next();
    };
};