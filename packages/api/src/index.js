import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';

// Custom imports
import {
  ALLOWED_ORIGINS_FOR_CORS,
  DB_URL,
  MODE,
  PORT,
} from '../config';
import routes from './routes';
import profileRoutes from './routes/profileRoutes';
import { batchRoutes } from './routes/batchRoutes';
import { batchTopics } from './routes/batchTopics';
import { topicMaster } from './routes/topicMaster';
import { batchExercise } from './routes/batchExercise';
import { exerciseMaster } from './routes/exerciseMaster';
import { userTopic } from './routes/userTopics';
import { userExercise } from './routes/userExercise';

const { internalServerError, noPort, noDBUrl } = require('../constants/ERR_MSGS');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

if (MODE === 'DEV') {
  app.use((req, res, next) => {
    res.setHeader('access-control-allow-origin', req.get('origin') || Object.values(ALLOWED_ORIGINS_FOR_CORS));
    res.setHeader('access-control-allow-credentials', true);
    next();
  });
  app.options('*', (req, res) => {
    res.setHeader('access-control-allow-headers', 'content-type, authorization');
    res.setHeader('access-control-allow-methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.status(204).end();
  });
} else {
  app.use(cors({
    origin: Object.values(ALLOWED_ORIGINS_FOR_CORS),
    credentials: true,
  }));
}

app.use('/', routes);
app.use('/user', profileRoutes);

app.use('/batchExercise', batchExercise);
app.use('/batchTopics', batchTopics);

app.use('/instructor/batch', batchRoutes);
app.use('/instructor/topicMaster', topicMaster);
app.use('/instructor/exerciseMaster', exerciseMaster);

app.use('/userTopic', userTopic);
app.use('/userExercise', userExercise);
// a generic database/server error handler
// handler *must* have 4 args, so disabling the relevant eslint rule
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (!res.headersSent) {
    res.status(500).json({ error: internalServerError });
  }
  console.error(err); // eslint-disable-line no-console
});


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
