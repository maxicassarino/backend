import winston from "winston";

const devLogger = winston.createLogger({
    transports: [new winston.transports.Console({ level: "verbose" })],
});

const prodLogger = winston.createLogger({
    transports: [
        new winston.transports.Console({ level: "http" }),
        new winston.transports.File({
            filename: "./errors-entorno.log",
            level: "warn",
        }),
    ],
});

export const addLogger = (req, res, next) => {
    const env = "production";
    req.logger = env === "production" ? prodLogger : devLogger;
    next();
};