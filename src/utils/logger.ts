import winston, { transports } from 'winston';
import fs from 'fs';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';
const logDirectory = 'D:/logs';
const transport = new DailyRotateFile({
  filename: path.join(logDirectory, 'application-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d' // Keep logs for 14 days
});
// Create the log directory if it doesn't exist
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}
const logger = winston.createLogger({
  level: 'http',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logDirectory, `error.log`),
      level: 'error'
    }),
    new winston.transports.File({
      filename: path.join(logDirectory, 'combined.log')
    }),
    transport
  ]
});
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ level, timestamp, message }) => {
          return `${level} | ${timestamp} | ${message}`;
        })
      )
    })
  );
}
logger.rejections.handle(new transports.File({ filename: path.join(logDirectory, 'rejection.log') }));
logger.exceptions.handle(new transports.File({ filename: path.join(logDirectory, 'exception.log') }));
export default logger;
