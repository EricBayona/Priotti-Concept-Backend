export default {
    PORT: process.env.PORT || 3000,
    MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017/priotti-concept",
    SESSION_SECRET: process.env.SESSION_SECRET || "secret",
    JWT_SECRET: process.env.JWT_SECRET || "secret"
}