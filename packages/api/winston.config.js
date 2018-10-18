const winston = require('winston');
const path = require('path');

const options = {
  file: { // Logging config for files
    level: 'warn',
    filename: path.join(__dirname, '/logs/app.log'),
    handleExceptions: true,
    json: true,
    maxsize: 5 * 1024 * 1024, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: { // Logging config for console
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const alignedWithColorsAndTime = winston.format.combine(
  winston.format.colorize(),
  winston.format.simple(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf((info) => {
    const {
      timestamp, level, message, ...args
    } = info;
    const ts = timestamp.slice(0, 19).replace('T', ' ');
    return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
  }),
);

const logger = winston.createLogger({
  format: alignedWithColorsAndTime,
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
  write(message) {
    logger.info(message);
  },
};

module.exports = logger;
