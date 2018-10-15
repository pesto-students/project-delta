import winston from 'winston';

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
const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
  write(message) {
    logger.info(message);
  },
};

module.exports = logger;
