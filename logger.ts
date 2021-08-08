import winston, {format } from "winston";

let transports:any[] = [new winston.transports.File({ filename: 'combined.log' })];

if (process.env.NODE_ENV !== 'production') {
    transports.push(new winston.transports.Console({format: format.combine(format.colorize(),format.simple())}));
}

const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
const logger = winston.createLogger({
  format: combine(
    label(),
    timestamp(),
    myFormat
  ),
  defaultMeta: { service: process.env.SERVICE! },
  transports: transports,
});

export default logger;








