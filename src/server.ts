import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

import customResponse from './middlewares/customErrorMiddleware';
import { languageRouter, userRouter } from './routes';
import { firebaseConfig } from './config/Firebase';

try {
  dotenv.config();

  const PORT = process.env.PORT || 4000;
  const HOSTNAME = 'http://localhost';

  firebaseConfig();

  const app = express();

  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors({ origin: [`${HOSTNAME}:${PORT}`] }));

  app.use(customResponse);

  app.use('/api', languageRouter);
  app.use('/api', userRouter);

  app.listen(PORT, () => `server running ${HOSTNAME}:${PORT}`);
  console.log(`Server running on ${HOSTNAME}:${PORT}`);
} catch (error) {
  console.log('Error on server initialization', error);
}
