import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Custom imports
import { PORT, DB_URL } from '../config';
import routes from './routes';
import winston from '../winston.config';

const { noPort, noDBUrl } = require('../constants/ERR_MSGS');

dotenv.config();
const app = express();

app.use(morgan('combined', { stream: winston.stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', routes);

// We only want to start the server from here if this script is run directly
// In other cases, such as integration tests, we want to start the server elsewhere
//   so we can stop it when the tests are done
if (!module.parent) {
  if (!PORT) {
    throw new Error(noPort); // Port not specified message
  }
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // eslint-disable-line no-console
  });

  if (!DB_URL) {
    throw new Error(noDBUrl); // DB URL not specified message
  }
  mongoose.connect(DB_URL, { useNewUrlParser: true }, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Connected to database at ${DB_URL}`); // eslint-disable-line no-console
  });
}

// because integration test module needs a reference to server
module.exports = app;
