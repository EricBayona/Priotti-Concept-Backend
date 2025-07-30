import winston from "winston";

const customLevels = {
    levels: { fatal: 0, error: 1, warn: 2, info: 3, http: 4, debug: 5 },
    colors: {
        fatal: "bold red",
        error: "red",
        warn: "yellow",
        info: "blue",
        http: "magenta",
        debug: "cyan",
    },
};

const environment = process.env.NODE_ENV || "development";

winston.addColors(customLevels.colors);

const transports = [
    new winston.transports.Console({
        level: environment === "development" ? "debug" : "info",
        format: winston.format.combine(
            winston.format.colorize({ level: true }),
            winston.format.timestamp(),
            winston.format.printf(({ timestamp, level, message }) => {
                return `${timestamp} [${level}]: ${message}`;
            })
        ),
    }),
];

if (environment === "production") {
    transports.push(
        new winston.transports.File({
            filename: "./src/logs/errors.log",
            level: "error",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
        })
    );
}

export const logger = winston.createLogger({
    levels: customLevels.levels,
    transports,
});


export const middlewareLogger = (req, res, next) => {
    req.logger = logger;
    next();
};

