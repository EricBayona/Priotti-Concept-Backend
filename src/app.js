
import express from 'express';
import cookieParser from 'cookie-parser';
import { connectMongoDB } from './config/mongoDb.config.js';
import { envsConfig } from './config/envs.config.js';
import router from './routes/router.routes.js';
import { logger, middlewareLogger } from './utils/logger.js';
import { errorHandler } from './middlewares/errorHandler.middlewares.js';
import passport from './config/passport/index.js';
import { swaggerSpec, swaggerUi } from './config/swagger.config.js';


const app = express();

connectMongoDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(passport.initialize());
app.use(middlewareLogger);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", router);

app.use((req, res, next) => {
    res.status(404).json({ ok: false, mensaje: 'Ruta no encontrada' });
});
app.use(errorHandler);

app.listen(envsConfig.PORT, () => {
    logger.info(`Server to listen in port ${envsConfig.PORT}`);
});