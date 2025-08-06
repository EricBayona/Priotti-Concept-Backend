import dotenv from 'dotenv';
dotenv.config();

const config = () => ({
    PORT: process.env.PORT || 3000,
    MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017/priotti-concept",
    SESSION_SECRET: process.env.SESSION_SECRET || "secret",
    JWT_SECRET: process.env.JWT_SECRET || "secret",
    MAIL_USER: process.env.MAIL_USER || "notificaciones@priotticoncep.dev",
    MAIL_PASS: process.env.MAIL_PASS || "CLAVEuser",
    MP_ACCESS_TOKEN: process.env.MP_ACCESS_TOKEN,
});
export const envsConfig = config();